import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const db = getFirebaseAdminDb();
    const url = new URL(req.url);
    const status = url.searchParams.get('status');
    const type = url.searchParams.get('type');
    const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50'), 200);
    const offset = parseInt(url.searchParams.get('offset') ?? '0');

    let query = db.collection('leads').orderBy('createdAt', 'desc') as FirebaseFirestore.Query;

    if (status) query = query.where('status', '==', status);
    if (type) query = query.where('type', '==', type);

    const snapshot = await query.limit(limit + offset).get();
    const docs = snapshot.docs.slice(offset);

    const leads = docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() ?? null,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() ?? null,
    }));

    // Get total count
    const totalSnap = await db.collection('leads').count().get();
    const total = totalSnap.data().count;

    return NextResponse.json({ leads, total });
  } catch (err) {
    console.error('[admin/leads GET]', err);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role === 'viewer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { ids } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Missing ids array' }, { status: 400 });
    }

    const db = getFirebaseAdminDb();
    const batch = db.batch();
    ids.forEach((id: string) => batch.delete(db.collection('leads').doc(id)));
    await batch.commit();

    return NextResponse.json({ success: true, deleted: ids.length });
  } catch (err) {
    console.error('[admin/leads DELETE]', err);
    return NextResponse.json({ error: 'Failed to delete leads' }, { status: 500 });
  }
}
