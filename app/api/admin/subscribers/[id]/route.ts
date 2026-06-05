import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { getFirebaseAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role === 'viewer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const db = getFirebaseAdminDb();
  await db.collection('newsletter_subscribers').doc(id).delete();

  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role === 'viewer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const body = (await req.json()) as {
    active?: boolean;
    emailPreferences?: {
      newsletter?: boolean;
      campaigns?: boolean;
    };
  };

  const hasPrefs = typeof body.emailPreferences === 'object' && body.emailPreferences !== null;
  const newsletter = hasPrefs
    ? Boolean(body.emailPreferences?.newsletter)
    : Boolean(body.active);
  const campaigns = hasPrefs
    ? Boolean(body.emailPreferences?.campaigns)
    : Boolean(body.active);

  const db = getFirebaseAdminDb();
  await db.collection('newsletter_subscribers').doc(id).update({
    active: newsletter || campaigns,
    emailPreferences: {
      newsletter,
      campaigns,
    },
  });

  return NextResponse.json({ success: true });
}
