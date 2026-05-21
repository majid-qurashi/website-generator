import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. api routes (/api)
     * 2. Next.js internals (/_next)
     * 3. Static files inside public folder (favicon.ico, assets, uploads)
     */
    '/((?!api|_next|_static|_image|favicon.ico|sitemap.xml|robots.txt|uploads).*)',
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get host (e.g. localhost:3000, greenvalley.localhost:3000, school.com)
  const host = req.headers.get('host') || '';
  
  // Clean hostname
  const hostname = host.split(':')[0].toLowerCase();
  
  // Define platform domains
  const platformDomains = ['localhost', 'myschoolbuilder.com', 'schoolbuilder.vercel.app'];

  // Check if it's a subdomain or a custom domain
  let isSubdomain = false;
  let subdomain = '';
  let isCustomDomain = false;
  let customDomain = '';

  const parts = hostname.split('.');
  
  if (parts.length > 1) {
    if (hostname.endsWith('.localhost')) {
      // e.g. greenvalley.localhost
      if (parts.length === 2) {
        isSubdomain = true;
        subdomain = parts[0];
      }
    } else {
      // For production platform domains
      const isPlatformDomain = platformDomains.some(d => hostname.endsWith('.' + d));
      if (isPlatformDomain) {
        // e.g. greenvalley.myschoolbuilder.com
        if (parts[0] !== 'www') {
          isSubdomain = true;
          subdomain = parts[0];
        }
      } else {
        // e.g. schoolname.com
        const isPlatformItself = platformDomains.includes(hostname);
        if (!isPlatformItself) {
          isCustomDomain = true;
          customDomain = hostname;
        }
      }
    }
  }

  // Rewrite school paths internally
  if (isSubdomain && subdomain) {
    // Avoid infinite rewriting loop
    if (url.pathname.startsWith(`/school/subdomain/${subdomain}`)) {
      return NextResponse.next();
    }
    
    // Ignore main admin panels or template selectors
    if (
      url.pathname.startsWith('/admin') || 
      url.pathname.startsWith('/templates') || 
      url.pathname.includes('/customize')
    ) {
      return NextResponse.next();
    }
    
    const rewrittenUrl = new URL(`/school/subdomain/${subdomain}${url.pathname}`, req.url);
    return NextResponse.rewrite(rewrittenUrl);
  }

  if (isCustomDomain && customDomain) {
    // Avoid infinite rewriting loop
    if (url.pathname.startsWith(`/school/domain/${customDomain}`)) {
      return NextResponse.next();
    }

    if (
      url.pathname.startsWith('/admin') || 
      url.pathname.startsWith('/templates') || 
      url.pathname.includes('/customize')
    ) {
      return NextResponse.next();
    }

    const rewrittenUrl = new URL(`/school/domain/${customDomain}${url.pathname}`, req.url);
    return NextResponse.rewrite(rewrittenUrl);
  }

  return NextResponse.next();
}
