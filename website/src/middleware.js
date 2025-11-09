// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ Redirect only when user visits the root "/"
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/mother-child-care', req.url));
  }

  // ✅ Let all other routes work normally
  return NextResponse.next();
}

export const config = {
  matcher: ['/'], // runs only on the root
};
