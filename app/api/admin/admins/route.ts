import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { getFirebaseAdminAuth, getFirebaseAdminDb } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const db = getFirebaseAdminDb();
  const snapshot = await db.collection('admins').orderBy('createdAt', 'desc').get();

  const admins = snapshot.docs.map(doc => ({
    uid: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.()?.toISOString() ?? null,
  }));

  return NextResponse.json({ admins });
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (session.role !== 'superadmin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { email, name, password, role } = await req.json();

    if (!email || !name || !password || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const validRoles = ['superadmin', 'moderator', 'viewer'];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const auth = getFirebaseAdminAuth();
    const db = getFirebaseAdminDb();

    // Create Firebase Auth user
    const userRecord = await auth.createUser({ email, password, displayName: name });

    // Store in admins collection
    await db.collection('admins').doc(userRecord.uid).set({
      email,
      name,
      role,
      active: true,
      createdAt: FieldValue.serverTimestamp(),
      createdBy: session.uid,
    });

    return NextResponse.json({
      success: true,
      admin: { uid: userRecord.uid, email, name, role },
    });
  } catch (err: unknown) {
    console.error('[admin/admins POST]', err);
    const message = err instanceof Error ? err.message : 'Failed to create admin';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
