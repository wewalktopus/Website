import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getFirebaseAdminAuth, getFirebaseAdminDb } from '@/lib/firebase-admin';
import { createAdminSession, SESSION_COOKIE_NAME, SESSION_DURATION_MS } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    if (!idToken || typeof idToken !== 'string') {
      return NextResponse.json({ error: 'Missing idToken' }, { status: 400 });
    }

    // Verify idToken with Firebase Admin
    const auth = getFirebaseAdminAuth();
    let decoded;
    try {
      decoded = await auth.verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check if user exists in admins collection and is active
    const db = getFirebaseAdminDb();
    const adminDoc = await db.collection('admins').doc(decoded.uid).get();

    if (!adminDoc.exists) {
      return NextResponse.json({ error: 'Access denied. Not an admin account.' }, { status: 403 });
    }

    const adminData = adminDoc.data()!;
    if (!adminData.active) {
      return NextResponse.json({ error: 'Your admin account has been deactivated.' }, { status: 403 });
    }

    // Create session cookie
    const sessionCookie = await createAdminSession(idToken);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_DURATION_MS / 1000,
      path: '/',
    });

    return NextResponse.json({
      success: true,
      admin: {
        uid: decoded.uid,
        email: adminData.email,
        name: adminData.name,
        role: adminData.role,
      },
    });
  } catch (err) {
    console.error('[admin/auth/login]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
