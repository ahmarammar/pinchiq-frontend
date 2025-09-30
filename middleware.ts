import { NextRequest, NextResponse } from 'next/server';

import { canAccessBrokerRoutes, canAccessProviderRoutes } from '@/lib/role-utils';
import { User } from '@/types/auth.types';
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from '@/utils/app-constants';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get authentication data
  const authToken = request.cookies.get(AUTH_TOKEN_KEY)?.value;
  const userData = request.cookies.get(USER_DATA_KEY)?.value;

  // Check if basic auth data exists
  let isAuthenticated = !!(authToken && userData);
  let user: User | null = null;

  if (isAuthenticated) {
    try {
      const parsedUserData = userData ? JSON.parse(userData) : null;
      user = parsedUserData?.data as User;

      if (!user) {
        isAuthenticated = false;
      }
    } catch (error) {
      console.error('Middleware: Failed to parse user data', error);
      isAuthenticated = false;
    }
  }

  // Handle login route
  if (pathname.startsWith('/login')) {
    if (isAuthenticated && user) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // All other routes require authentication
  if (!isAuthenticated || !user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Define role-based route access
  const brokerRoutes = ['/', '/dashboard', '/clients', '/policies', '/reports'];
  const providerRoutes = ['/', '/services', '/appointments', '/billing'];

  // Check broker access
  if (canAccessBrokerRoutes(user.role)) {
    const isAllowedRoute = brokerRoutes.some(route =>
      route === '/' ? pathname === '/' : pathname.startsWith(route)
    );

    if (!isAllowedRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Check provider access
  if (canAccessProviderRoutes(user.role)) {
    const isAllowedRoute = providerRoutes.some(route =>
      route === '/' ? pathname === '/' : pathname.startsWith(route)
    );

    if (!isAllowedRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Unknown role - redirect to login
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};
