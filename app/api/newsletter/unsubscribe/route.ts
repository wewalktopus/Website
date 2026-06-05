import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

function getEmailFromRequest(req: NextRequest): string {
  const searchEmail = req.nextUrl.searchParams.get('email');
  return (searchEmail ?? '').trim().toLowerCase();
}

function renderHtml(status: 'success' | 'invalid'): string {
  if (status === 'invalid') {
    return `<!doctype html><html><head><meta charset="utf-8" /><title>Invalid Request</title></head><body style="font-family:Arial,sans-serif;padding:24px;"><h1>Invalid unsubscribe request</h1><p>Please use the unsubscribe link from your email.</p></body></html>`;
  }

  return `<!doctype html><html><head><meta charset="utf-8" /><title>Unsubscribed</title></head><body style="font-family:Arial,sans-serif;padding:24px;"><h1>You are unsubscribed</h1><p>You will no longer receive promotional emails from Walktopus at this address.</p></body></html>`;
}

export async function GET(req: NextRequest) {
  const email = getEmailFromRequest(req);
  if (!email.includes('@')) {
    return new NextResponse(renderHtml('invalid'), {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const db = getFirebaseAdminDb();
  const docId = Buffer.from(email).toString('base64');
  const ref = db.collection('newsletter_subscribers').doc(docId);

  await ref.set(
    {
      email,
      active: false,
      unsubscribedAt: FieldValue.serverTimestamp(),
      source: 'unsubscribe-link',
      subscribedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  return new NextResponse(renderHtml('success'), {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function POST(req: NextRequest) {
  let email = '';
  try {
    const body = (await req.json()) as { email?: string };
    email = (body.email ?? '').trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  if (!email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const db = getFirebaseAdminDb();
  const docId = Buffer.from(email).toString('base64');
  await db.collection('newsletter_subscribers').doc(docId).set(
    {
      email,
      active: false,
      unsubscribedAt: FieldValue.serverTimestamp(),
      source: 'unsubscribe-api',
      subscribedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  return NextResponse.json({ success: true });
}
