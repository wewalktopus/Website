import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { ContactSchema } from '@/lib/validations';
import { contactRateLimit } from '@/lib/upstash';
import { getResend } from '@/lib/resend';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import { ContactConfirmation } from '@/emails/ContactConfirmation';
import { ContactNotification } from '@/emails/ContactNotification';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() ?? 'anonymous';

    const rate = await contactRateLimit.limit(`contact:${ip}`);
    if (!rate.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    if (body?.honeypot) {
      return NextResponse.json({ success: true });
    }

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && process.env.RESEND_TO_EMAIL) {
      const resend = getResend();
      await Promise.all([
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: data.email,
          subject: 'Thanks for reaching out - Walktopus',
          react: ContactConfirmation({ name: data.name, type: data.type }),
        }),
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: process.env.RESEND_TO_EMAIL,
          subject: `New ${data.type === 'business' ? 'B2B' : 'Individual'} Lead: ${data.name}`,
          react: ContactNotification({ data }),
        }),
      ]);
    }

    const db = getFirebaseAdminDb();
    await db.collection('leads').add({
      type: data.type,
      name: data.name,
      company: data.company ?? null,
      email: data.email,
      phone: data.phone,
      services: data.services,
      budgetRange: data.budgetRange ?? null,
      message: data.message,
      source: 'contact-form',
      status: 'new',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, message: "We'll be in touch within 24 hours." });
  } catch (error) {
    console.error('[contact] Unexpected error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
