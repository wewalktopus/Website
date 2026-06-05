import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { NewsletterSchema } from '@/lib/validations';
import { newsletterRateLimit } from '@/lib/upstash';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() ?? 'anonymous';

    const rate = await newsletterRateLimit.limit(`newsletter:${ip}`);
    if (!rate.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const result = NewsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const db = getFirebaseAdminDb();
    const docId = Buffer.from(result.data.email).toString('base64');
    const docRef = db.collection('newsletter_subscribers').doc(docId);
    const existing = await docRef.get();

    if (!existing.exists) {
      await docRef.set({
        email: result.data.email,
        active: true,
        source: 'newsletter-form',
        subscribedAt: FieldValue.serverTimestamp(),
      });
    } else {
      await docRef.set(
        {
          email: result.data.email,
          active: true,
          source: 'newsletter-form',
          resubscribedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully.' });
  } catch (error) {
    console.error('[newsletter] Unexpected error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
