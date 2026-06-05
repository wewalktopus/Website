import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role === 'viewer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const body = (await req.json()) as {
    subject?: string;
    body?: string;
    to?: string[];
    folder?: 'draft' | 'sent';
  };

  const db = getFirebaseAdminDb();
  await db.collection('email_messages').doc(id).set(
    {
      subject: body.subject,
      body: body.body,
      to: Array.isArray(body.to) ? body.to : undefined,
      toCount: Array.isArray(body.to) ? body.to.length : undefined,
      folder: body.folder ?? 'draft',
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: session.uid,
    },
    { merge: true },
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role === 'viewer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const db = getFirebaseAdminDb();
  await db.collection('email_messages').doc(id).delete();

  return NextResponse.json({ success: true });
}
