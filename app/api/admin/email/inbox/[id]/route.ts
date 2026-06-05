import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import { getResend } from '@/lib/resend';

export const runtime = 'nodejs';

function getApiKey(): string {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is missing');
  }
  return apiKey;
}

function toEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.includes('@') ? trimmed : null;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const response = await fetch(`https://api.resend.com/emails/${id}`, {
      headers: {
        Authorization: `Bearer ${getApiKey()}`,
      },
      cache: 'no-store',
    });

    const payload = (await response.json().catch(() => ({}))) as { data?: Record<string, unknown>; error?: unknown };
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch message detail', details: payload.error ?? null }, { status: 502 });
    }

    const data = payload.data ?? {};
    const to = Array.isArray(data.to)
      ? data.to.filter((value): value is string => typeof value === 'string')
      : typeof data.to === 'string'
        ? data.to.split(',').map((value) => value.trim()).filter(Boolean)
        : [];

    return NextResponse.json({
      message: {
        id,
        subject: typeof data.subject === 'string' ? data.subject : 'No subject',
        from: typeof data.from === 'string' ? data.from : null,
        to,
        cc: Array.isArray(data.cc) ? data.cc : [],
        bcc: Array.isArray(data.bcc) ? data.bcc : [],
        createdAt: typeof data.created_at === 'string' ? data.created_at : null,
        text: typeof data.text === 'string' ? data.text : '',
        html: typeof data.html === 'string' ? data.html : '',
        lastEvent: typeof data.last_event === 'string' ? data.last_event : null,
      },
    });
  } catch (error) {
    console.error('[admin/email/inbox/:id GET]', error);
    return NextResponse.json({ error: 'Unable to fetch message details' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role === 'viewer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const body = (await req.json()) as { message?: string; subject?: string };
  const replyMessage = (body.message ?? '').trim();

  if (!replyMessage) {
    return NextResponse.json({ error: 'Reply message is required' }, { status: 400 });
  }

  try {
    const detailResponse = await fetch(`https://api.resend.com/emails/${id}`, {
      headers: {
        Authorization: `Bearer ${getApiKey()}`,
      },
      cache: 'no-store',
    });

    const detailPayload = (await detailResponse.json().catch(() => ({}))) as { data?: Record<string, unknown> };
    const fromAddress = toEmail(detailPayload.data?.from);
    if (!fromAddress) {
      return NextResponse.json({ error: 'Unable to detect sender for reply' }, { status: 400 });
    }

    const originalSubject = typeof detailPayload.data?.subject === 'string' ? detailPayload.data.subject : 'No subject';
    const subject = (body.subject ?? `Re: ${originalSubject}`).trim();

    const resend = getResend();
    const from = `Walktopus <${process.env.RESEND_FROM_EMAIL ?? 'hello@walktopus.in'}>`;
    await resend.emails.send({
      from,
      to: fromAddress,
      subject,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">${replyMessage.replace(/\n/g, '<br/>')}</div>`,
      text: replyMessage,
    });

    const db = getFirebaseAdminDb();
    await db.collection('email_messages').add({
      folder: 'sent',
      subject,
      body: replyMessage,
      from,
      toCount: 1,
      sampleRecipients: [fromAddress],
      sent: 1,
      failed: 0,
      inReplyTo: id,
      createdBy: session.uid,
      createdByEmail: session.email,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[admin/email/inbox/:id POST]', error);
    return NextResponse.json({ error: 'Failed to send reply' }, { status: 500 });
  }
}
