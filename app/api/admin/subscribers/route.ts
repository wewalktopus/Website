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
    const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '100'), 500);

    let query = db.collection('newsletter_subscribers').orderBy('subscribedAt', 'desc') as FirebaseFirestore.Query;
    if (active !== null) query = query.where('active', '==', active === 'true');

    const snapshot = await query.limit(limit).get();
    const subscribers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      subscribedAt: doc.data().subscribedAt?.toDate?.()?.toISOString() ?? null,
    }));

    const totalSnap = await db.collection('newsletter_subscribers').count().get();
    const total = totalSnap.data().count;

    return NextResponse.json({ subscribers, total });
  } catch (err) {
    console.error('[admin/subscribers GET]', err);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
