import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { ContactSchema } from '@/lib/validations';
import { contactRateLimit } from '@/lib/upstash';
import { getResend } from '@/lib/resend';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';
import { buildUnsubscribeUrl } from '@/lib/email-unsubscribe';
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
    const honeypotValue = typeof body?.honeypot === 'string' ? body.honeypot.trim() : '';
    if (honeypotValue.length > 0) {
      const autofillValues = [body?.name, body?.email, body?.phone, body?.company]
        .filter((value): value is string => typeof value === 'string')
        .map((value) => value.trim());

      const looksLikeAutofill = autofillValues.includes(honeypotValue);
      if (!looksLikeAutofill) {
        console.warn('[contact] Honeypot triggered', { length: honeypotValue.length });
        return NextResponse.json({ success: true });
      }

      console.warn('[contact] Honeypot filled by likely autofill, continuing');
    }

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const lead = {
      type: data.type ?? 'business',
      name: data.name?.trim() || 'Website Lead',
      company: data.company?.trim() || null,
      email: data.email?.trim() || '',
      phone: data.phone?.trim() || '',
      services: data.services ?? [],
      budgetRange: data.budgetRange,
      message: data.message,
    };

    console.log('[contact] Valid submission received', {
      type: lead.type,
      email: lead.email,
      servicesCount: lead.services.length,
    });

    const db = getFirebaseAdminDb();
    const leadRef = await db.collection('leads').add({
      type: lead.type,
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      services: lead.services,
      budgetRange: lead.budgetRange ?? null,
      message: lead.message,
      source: 'contact-form',
      status: 'new',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    console.log('[contact] Lead saved', { leadId: leadRef.id, email: lead.email });

    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL || !process.env.RESEND_TO_EMAIL) {
      console.error('[contact] Missing Resend configuration', {
        leadId: leadRef.id,
        hasApiKey: Boolean(process.env.RESEND_API_KEY),
        hasFromEmail: Boolean(process.env.RESEND_FROM_EMAIL),
        hasToEmail: Boolean(process.env.RESEND_TO_EMAIL),
      });
      return NextResponse.json(
        {
          success: true,
          message: 'Quote submitted successfully. We will contact you shortly.',
          emailStatus: 'failed-config',
        },
        { status: 200 },
      );
    }

    const resend = getResend();
    const contactPayload = {
      type: lead.type,
      name: lead.name,
      company: lead.company ?? undefined,
      email: lead.email,
      phone: lead.phone,
      services: lead.services,
      budgetRange: lead.budgetRange,
      message: lead.message,
    };

    const confirmationPromise = lead.email
      ? resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: lead.email,
          subject: 'Welcome to Walktopus - We received your quote request',
          react: ContactConfirmation({
            name: lead.name,
            type: lead.type,
            unsubscribeUrl: buildUnsubscribeUrl(lead.email),
          }),
        })
      : Promise.resolve({ data: null, error: null });

    const [
      { data: confirmationData, error: confirmationError },
      { data: notificationData, error: notificationError },
    ] = await Promise.all([
      confirmationPromise,
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.RESEND_TO_EMAIL,
        subject: `New ${lead.type === 'business' ? 'B2B' : 'Individual'} Lead: ${lead.name}`,
        react: ContactNotification({ data: contactPayload }),
      }),
    ]);

    if (confirmationError || notificationError) {
      console.error('[contact] Resend error', {
        leadId: leadRef.id,
        confirmationError,
        notificationError,
      });
      return NextResponse.json(
        {
          success: true,
          message: 'Quote submitted successfully. We will contact you shortly.',
          emailStatus: 'failed-send',
        },
        { status: 200 },
      );
    }

    console.log('[contact] Resend accepted', {
      leadId: leadRef.id,
      confirmationId: confirmationData?.id,
      notificationId: notificationData?.id,
    });

    return NextResponse.json({ success: true, message: "We'll be in touch within 24 hours.", emailStatus: 'sent' });
  } catch (error) {
    console.error('[contact] Unexpected error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
