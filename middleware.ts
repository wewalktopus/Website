/**
 * middleware.ts — Edge-safe route protection for /superadmin/*
 *
 * NOTE: Firebase Admin SDK cannot run in Edge runtime.
 * This middleware only checks cookie PRESENCE.
 * Full JWT verification happens in each server component layout.
 */
import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'walktopus_admin_session';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect all /superadmin/* routes except the login page itself
  if (pathname.startsWith('/superadmin') && pathname !== '/superadmin') {
    const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME);

    if (!sessionCookie?.value) {
      const loginUrl = new URL('/superadmin', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect all /api/admin/* routes (API-level auth is still handled in each route)
  // Middleware just blocks cookie-less requests early
  if (pathname.startsWith('/api/admin/') && !pathname.startsWith('/api/admin/auth/')) {
    const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME);
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/superadmin/:path*', '/api/admin/:path*'],
};
