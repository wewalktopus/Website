import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { getResend } from '@/lib/resend';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role === 'viewer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { to, subject, body, recipientType } = await req.json();

    if (!subject || !body) {
      return NextResponse.json({ error: 'Missing subject or body' }, { status: 400 });
    }

    // `to` can be an array of emails or 'all_leads' / 'all_subscribers'
    let recipients: string[] = [];

    if (Array.isArray(to)) {
      recipients = to.filter((e: string) => typeof e === 'string' && e.includes('@'));
    }

    if (recipients.length === 0) {
      return NextResponse.json({ error: 'No valid recipients' }, { status: 400 });
    }

    // Send in batches of 50 (Resend batch limit)
    const resend = getResend();
    const batchSize = 50;
    const results: { email: string; status: 'sent' | 'failed' }[] = [];

    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      const settled = await Promise.allSettled(
        batch.map(email =>
          resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL ?? 'hello@walktopus.in',
            to: email,
            subject,
            html: body,
          })
        )
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

    console.log(`[admin/email/send] Sent: ${sent}, Failed: ${failed} | By: ${session.email}`);

    return NextResponse.json({ success: true, sent, failed, results });
  } catch (err) {
    console.error('[admin/email/send]', err);
    return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
  }
}
