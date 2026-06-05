import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const db = getFirebaseAdminDb();
    const url = new URL(req.url);
    const active = url.searchParams.get('active');
    const preference = url.searchParams.get('preference');
    const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '100'), 500);

    const snapshot = await db.collection('newsletter_subscribers').orderBy('subscribedAt', 'desc').limit(limit * 3).get();
    const subscribers = snapshot.docs
      .map(doc => ({
      id: doc.id,
      ...doc.data(),
      active:
        typeof doc.data().active === 'boolean'
          ? doc.data().active
          : Boolean(doc.data().emailPreferences?.newsletter || doc.data().emailPreferences?.campaigns),
      emailPreferences: {
        newsletter:
          typeof doc.data().emailPreferences?.newsletter === 'boolean'
            ? doc.data().emailPreferences.newsletter
            : Boolean(doc.data().active ?? true),
        campaigns:
          typeof doc.data().emailPreferences?.campaigns === 'boolean'
            ? doc.data().emailPreferences.campaigns
            : Boolean(doc.data().active ?? true),
      },
      subscribedAt: doc.data().subscribedAt?.toDate?.()?.toISOString() ?? null,
      }))
      .filter((subscriber) => {
        if (active !== null && subscriber.active !== (active === 'true')) {
          return false;
        }
        if (preference === 'newsletter' && subscriber.emailPreferences.newsletter !== true) {
          return false;
        }
        if (preference === 'campaigns' && subscriber.emailPreferences.campaigns !== true) {
          return false;
        }
        return true;
      })
      .slice(0, limit);

    const totalSnap = await db.collection('newsletter_subscribers').count().get();
    const total = totalSnap.data().count;

    return NextResponse.json({ subscribers, total });
  } catch (err) {
    console.error('[admin/subscribers GET]', err);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
