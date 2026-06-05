import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

function apiKey(): string {
  const k = process.env.RESEND_API_KEY?.trim();
  if (!k) throw new Error('RESEND_API_KEY missing');
  return k;
}

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // Use Resend receiving endpoint (not the sent-emails /emails endpoint)
    const resp = await fetch('https://api.resend.com/emails/receiving', {
      headers: { Authorization: `Bearer ${apiKey()}` },
      cache: 'no-store',
    });
    const payload = (await resp.json().catch(() => ({}))) as { data?: unknown[]; error?: unknown };
    if (!resp.ok) {
      return NextResponse.json({ error: 'Failed to fetch inbox from Resend', details: payload.error ?? null }, { status: 502 });
    }

    const items = Array.isArray(payload.data) ? payload.data : [];

    // Fetch locally soft-deleted email IDs from Firestore
    const db = getFirebaseAdminDb();
    const deletedSnap = await db.collection('inbox_deleted').get();
    const deletedIds = new Set(deletedSnap.docs.map((doc) => doc.id));

    const messages = items
      .filter((entry): entry is Record<string, unknown> => Boolean(entry && typeof entry === 'object'))
      .filter((entry) => !deletedIds.has(String(entry.id ?? '')))
      .map((entry) => {
        const toArr = Array.isArray(entry.to)
          ? (entry.to as unknown[]).filter((v): v is string => typeof v === 'string').map((v) => v.trim())
          : typeof entry.to === 'string'
            ? (entry.to as string).split(',').map((v) => v.trim()).filter(Boolean)
            : [];

        const preview =
          typeof entry.text === 'string' && entry.text.trim()
            ? (entry.text as string).slice(0, 200)
            : typeof entry.html === 'string'
              ? (entry.html as string).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200)
              : '';

        return {
          id: String(entry.id ?? ''),
          folder: 'inbox',
          from: typeof entry.from === 'string' ? entry.from : 'unknown',
          to: toArr,
          toLine: toArr.join(', '),
          subject: typeof entry.subject === 'string' ? entry.subject : '(No subject)',
          preview,
          createdAt: typeof entry.created_at === 'string' ? entry.created_at : null,
        };
      });

    return NextResponse.json({ messages, source: 'resend-receiving' });
  } catch (error) {
    console.error('[admin/email/inbox GET]', error);
    return NextResponse.json({ error: 'Unable to load inbox from Resend' }, { status: 500 });
  }
}
