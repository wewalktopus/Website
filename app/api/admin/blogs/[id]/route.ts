import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const db = getFirebaseAdminDb();
  const doc = await db.collection('blogs').doc(id).get();

  if (!doc.exists) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });

  return NextResponse.json({
    blog: {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate?.()?.toISOString() ?? null,
      updatedAt: doc.data()?.updatedAt?.toDate?.()?.toISOString() ?? null,
    },
  });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role === 'viewer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const updates: Record<string, unknown> = { updatedAt: FieldValue.serverTimestamp() };

  for (const key of ['title', 'excerpt', 'content', 'status']) {
    if (key in body) updates[key] = body[key];
  }

  const db = getFirebaseAdminDb();
  await db.collection('blogs').doc(id).update(updates);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role === 'viewer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const db = getFirebaseAdminDb();
  await db.collection('blogs').doc(id).delete();
  return NextResponse.json({ success: true });
}
