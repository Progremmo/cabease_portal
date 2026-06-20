import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login', '/forgot-password', '/reset-password'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    // Redirect authenticated users away from login
    if (pathname === '/login' && request.cookies.has('accessToken')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Check for access token
  const token = request.cookies.get('accessToken');

  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
