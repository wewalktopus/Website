import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { withUnsubscribeFooter } from '@/lib/email-unsubscribe';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import { getResend } from '@/lib/resend';

export const runtime = 'nodejs';

const DAILY_RECIPIENT_LIMIT = 100;
const BATCH_SIZE = 25;
const MAX_ATTACHMENTS = 5;
const MAX_ATTACHMENT_SIZE_BYTES = 10 * 1024 * 1024;

type SenderProfile = 'professional' | 'premium' | 'feedback' | 'contact' | 'custom';

function sanitizeEmails(input: unknown): string[] {
  if (!Array.isArray(input)) return [];

  const seen = new Set<string>();
  const results: string[] = [];

  for (const value of input) {
    if (typeof value !== 'string') continue;
    const email = value.trim().toLowerCase();
    if (!email || !email.includes('@') || seen.has(email)) continue;
    seen.add(email);
    results.push(email);
  }

  return results;
}

function isValidLocalPart(localPart: string): boolean {
  return /^[a-z0-9._-]{1,64}$/i.test(localPart);
}

function getSenderName(profile: SenderProfile): string {
  const map: Record<SenderProfile, string> = {
    professional: 'Walktopus Professional',
    premium: 'Walktopus Premium',
    feedback: 'Walktopus Feedback',
    contact: 'Walktopus Contact',
    custom: 'Walktopus Outreach',
  };

  return map[profile];
}

async function parsePayload(req: NextRequest): Promise<{
  recipients: string[];
  subject: string;
  body: string;
  senderProfile: SenderProfile;
  senderLocalPart: string;
  attachments: File[];
}> {
  const contentType = req.headers.get('content-type') ?? '';

  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData();
    const rawTo = formData.get('to');
    let parsedRecipients: unknown = [];
    if (typeof rawTo === 'string' && rawTo.trim()) {
      try {
        parsedRecipients = JSON.parse(rawTo);
      } catch {
        throw new Error('Invalid recipients payload');
      }
    }

    const senderProfileValue = String(formData.get('senderProfile') ?? 'professional').trim().toLowerCase();
    const senderProfile: SenderProfile =
      senderProfileValue === 'premium' ||
      senderProfileValue === 'feedback' ||
      senderProfileValue === 'contact' ||
      senderProfileValue === 'custom'
        ? senderProfileValue
        : 'professional';

    return {
      recipients: sanitizeEmails(parsedRecipients),
      subject: String(formData.get('subject') ?? '').trim(),
      body: String(formData.get('body') ?? '').trim(),
      senderProfile,
      senderLocalPart: String(formData.get('senderLocalPart') ?? '').trim().toLowerCase(),
      attachments: formData.getAll('attachments').filter((file): file is File => file instanceof File),
    };
  }

  const body = (await req.json()) as {
    to?: unknown;
    subject?: string;
    body?: string;
    senderProfile?: string;
    senderLocalPart?: string;
  };

  const senderProfileValue = (body.senderProfile ?? 'professional').trim().toLowerCase();
  const senderProfile: SenderProfile =
    senderProfileValue === 'premium' ||
    senderProfileValue === 'feedback' ||
    senderProfileValue === 'contact' ||
    senderProfileValue === 'custom'
      ? senderProfileValue
      : 'professional';

  return {
    recipients: sanitizeEmails(body.to),
    subject: (body.subject ?? '').trim(),
    body: (body.body ?? '').trim(),
    senderProfile,
    senderLocalPart: (body.senderLocalPart ?? '').trim().toLowerCase(),
    attachments: [],
  };
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role === 'viewer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const payload = await parsePayload(req);

    if (!payload.subject || !payload.body) {
      return NextResponse.json({ error: 'Missing subject or body' }, { status: 400 });
    }

    if (!payload.recipients.length) {
      return NextResponse.json({ error: 'No valid recipients' }, { status: 400 });
    }

    if (payload.attachments.length > MAX_ATTACHMENTS) {
      return NextResponse.json({ error: `Maximum ${MAX_ATTACHMENTS} attachments are allowed` }, { status: 400 });
    }

    for (const file of payload.attachments) {
      if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
        return NextResponse.json({ error: `Attachment ${file.name} exceeds 10MB` }, { status: 400 });
      }
    }

    const db = getFirebaseAdminDb();
    const recipientRefs = payload.recipients.map((email) =>
      db.collection('newsletter_subscribers').doc(Buffer.from(email).toString('base64')),
    );
    const recipientSnaps = recipientRefs.length ? await db.getAll(...recipientRefs) : [];

    const unsubscribed = new Set<string>();
    for (const snap of recipientSnaps) {
      if (!snap.exists) continue;
      const data = snap.data();
      const email = typeof data?.email === 'string' ? data.email.toLowerCase() : null;
      if (email && data?.active === false) {
        unsubscribed.add(email);
      }
    }

    const recipients = payload.recipients.filter((email) => !unsubscribed.has(email));

    if (!recipients.length) {
      return NextResponse.json({ error: 'All selected recipients are unsubscribed' }, { status: 400 });
    }

    const todayKey = new Date().toISOString().slice(0, 10);
    const dailyLimitRef = db.collection('email_daily_limits').doc(todayKey);

    try {
      await db.runTransaction(async (tx) => {
        const dailyLimitSnap = await tx.get(dailyLimitRef);
        const used = Number(dailyLimitSnap.data()?.used ?? 0);
        if (used + recipients.length > DAILY_RECIPIENT_LIMIT) {
          throw new Error(`DAILY_LIMIT_EXCEEDED:${used}`);
        }

        tx.set(
          dailyLimitRef,
          {
            date: todayKey,
            used: FieldValue.increment(recipients.length),
            updatedAt: FieldValue.serverTimestamp(),
            updatedBy: session.email,
          },
          { merge: true },
        );
      });
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('DAILY_LIMIT_EXCEEDED')) {
        const used = error.message.split(':')[1] ?? '100';
        return NextResponse.json(
          { error: `Daily sending limit reached. ${used}/${DAILY_RECIPIENT_LIMIT} already used today.` },
          { status: 429 },
        );
      }

      throw error;
    }

    const defaultSender = process.env.RESEND_FROM_EMAIL ?? 'hello@walktopus.in';
    const fallbackLocalPart = defaultSender.includes('@') ? defaultSender.split('@')[0] : 'hello';
    const senderLocalPart = payload.senderLocalPart || fallbackLocalPart;

    if (!isValidLocalPart(senderLocalPart)) {
      return NextResponse.json({ error: 'Invalid sender local-part' }, { status: 400 });
    }

    const resend = getResend();
    const from = `${getSenderName(payload.senderProfile)} <${senderLocalPart}@walktopus.in>`;

    const attachments = await Promise.all(
      payload.attachments.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()).toString('base64'),
      })),
    );

    const results: { email: string; status: 'sent' | 'failed' }[] = [];

    for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
      const batch = recipients.slice(i, i + BATCH_SIZE);
      const settled = await Promise.allSettled(
        batch.map((email) =>
          resend.emails.send({
            from,
            to: email,
            subject: payload.subject,
            html: withUnsubscribeFooter(payload.body, email),
            attachments: attachments.length ? attachments : undefined,
          }),
        ),
      );

      settled.forEach((result, idx) => {
        results.push({
          email: batch[idx],
          status: result.status === 'fulfilled' ? 'sent' : 'failed',
        });
      });
    }

    const sent = results.filter(r => r.status === 'sent').length;
    const failed = results.filter(r => r.status === 'failed').length;

    console.log(`[admin/email/send] Sent: ${sent}, Failed: ${failed} | By: ${session.email} | From: ${from}`);

    return NextResponse.json({ success: true, sent, failed, skippedUnsubscribed: unsubscribed.size, results });
  } catch (err) {
    console.error('[admin/email/send]', err);
    if (err instanceof Error && err.message === 'Invalid recipients payload') {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
  }
}
