// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Protect admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }
  
  // Protect user dashboard and checkout routes
  if (pathname === '/dashboard' || pathname === '/checkout') {
    // Let the client-side auth handle this since Firebase Auth state is client-side
    // The pages themselves will redirect if not authenticated
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard', '/checkout'],
};
