import { NextRequest, NextResponse } from "next/server";

import {
  canAccessBrokerRoutes,
  canAccessProviderRoutes,
} from "@/lib/role-utils";
import { User } from "@/types/auth.types";
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from "@/utils/app-constants";

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
      console.error("Middleware: Failed to parse user data", error);
      isAuthenticated = false;
    }
  }

  // Handle login route
  if (pathname.startsWith("/login")) {
    if (isAuthenticated && user) {
      // Redirect authenticated users to their dashboard
      if (user.role === "broker") {
        return NextResponse.redirect(new URL("/broker", request.url));
      } else if (user.role === "provider") {
        return NextResponse.redirect(new URL("/provider", request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Protected routes - root, broker and provider dashboards
  const isProtectedRoute =
    pathname === "/" ||
    pathname.startsWith("/broker") ||
    pathname.startsWith("/provider");

  // If not authenticated and trying to access protected route, redirect to login
  if (!isAuthenticated || !user) {
    if (isProtectedRoute) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Allow access to non-protected routes when not authenticated
    return NextResponse.next();
  }

  // If authenticated but trying to access root, redirect to dashboard
  if (pathname === "/") {
    if (user.role === "broker") {
      return NextResponse.redirect(new URL("/broker", request.url));
    } else if (user.role === "provider") {
      return NextResponse.redirect(new URL("/provider", request.url));
    }
  }

  // Role-based access control
  if (pathname.startsWith("/broker") && !canAccessBrokerRoutes(user.role)) {
    return NextResponse.redirect(new URL("/provider", request.url));
  }

  if (pathname.startsWith("/provider") && !canAccessProviderRoutes(user.role)) {
    return NextResponse.redirect(new URL("/broker", request.url));
  }

  return NextResponse.next();
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
    "/((?!api|_next|_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
  ],
};
