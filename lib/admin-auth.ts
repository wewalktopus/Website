/**
 * admin-auth.ts — Server-only admin authentication utilities
 * Import ONLY in app/api/admin/** and app/superadmin/** server components.
 */
import { cookies } from 'next/headers';
import { getFirebaseAdminAuth, getFirebaseAdminDb } from './firebase-admin';
import type { AdminSession, AdminRole } from '@/types';

export const SESSION_COOKIE_NAME = 'walktopus_admin_session';
export const SESSION_DURATION_MS = 5 * 24 * 60 * 60 * 1000; // 5 days

/** Permissions matrix */
const PERMISSIONS: Record<AdminRole, string[]> = {
  superadmin: ['*'],
  moderator: ['leads:read', 'leads:write', 'subscribers:read', 'email:send', 'blogs:read', 'blogs:write', 'templates:read', 'templates:write'],
  viewer: ['leads:read', 'subscribers:read', 'blogs:read', 'templates:read'],
};

export function hasPermission(role: AdminRole, permission: string): boolean {
  const perms = PERMISSIONS[role];
  return perms.includes('*') || perms.includes(permission);
}

/**
 * Creates a Firebase session cookie and returns it.
 * Call this in the login API route after verifying idToken.
 */
export async function createAdminSession(idToken: string): Promise<string> {
  const auth = getFirebaseAdminAuth();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION_MS,
  });
  return sessionCookie;
}

/**
 * Verifies the session cookie and returns admin session data.
 * Returns null if the session is invalid or the user is not an admin.
 */
export async function verifyAdminSession(sessionCookie: string): Promise<AdminSession | null> {
  try {
    const auth = getFirebaseAdminAuth();
    const decoded = await auth.verifySessionCookie(sessionCookie, true);

    const db = getFirebaseAdminDb();
    const adminDoc = await db.collection('admins').doc(decoded.uid).get();

    if (!adminDoc.exists) return null;

    const data = adminDoc.data()!;
    if (!data.active) return null;

    return {
      uid: decoded.uid,
      email: decoded.email ?? data.email,
      name: data.name,
      role: data.role as AdminRole,
    };
  } catch {
    return null;
  }
}

/**
 * Server-side helper for use in server components (layouts, pages).
 * Reads the cookie from the request and returns session data.
 */
export async function getAdminSessionFromCookies(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!cookie?.value) return null;
  return verifyAdminSession(cookie.value);
}

/**
 * Verifies session from a raw cookie string (for use in API routes).
 */
export async function verifyAdminRequest(req: Request): Promise<AdminSession | null> {
  const cookieHeader = req.headers.get('cookie') ?? '';
  const match = cookieHeader.match(new RegExp(`${SESSION_COOKIE_NAME}=([^;]+)`));
  if (!match) return null;
  return verifyAdminSession(match[1]);
}
