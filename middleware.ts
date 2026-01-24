import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const projectRef = supabaseUrl?.split('//')[1]?.split('.')[0] || 'lieailmnmczmxiqwdaai';
  
  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for Supabase auth cookies
    const hasAuthCookie = 
      request.cookies.has('sb-access-token') || 
      request.cookies.has('supabase.auth.token') ||
      request.cookies.has(`sb-${projectRef}-auth-token`);
    
    if (!hasAuthCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect authenticated users away from /login
  if (request.nextUrl.pathname === '/login') {
    const hasAuthCookie = 
      request.cookies.has('sb-access-token') || 
      request.cookies.has('supabase.auth.token') ||
      request.cookies.has(`sb-${projectRef}-auth-token`);
    
    if (hasAuthCookie) {
      return NextResponse.redirect(new URL('/admin', request.url));
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
