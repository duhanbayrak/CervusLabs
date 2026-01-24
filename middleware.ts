import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Basic protection - actual auth check will be done in server components
  // This just redirects if no auth cookies are present
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const hasAuthCookie = request.cookies.has('sb-access-token') || 
                           request.cookies.has('supabase.auth.token');
    
    if (!hasAuthCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
