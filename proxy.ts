import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 16 Proxy (the replacement for Middleware) — locale clean-URLs for the
 * Optimizely CMS routes.
 *
 * Optimizely Graph resolves content by a locale-prefixed path (e.g. /en/vb-demo/).
 * We want clean public URLs (/vb-demo) but still route internally to
 * app/[locale]/[[...slug]] so the [locale] param is populated and Graph queries
 * stay consistent.
 *
 * Routing only — NO data fetching here (Next docs explicitly discourage it).
 *
 * POC NOTE: the existing static mock routes (/, /services, /locations) are
 * excluded so this rewrite does not hijack them into the CMS catch-all. As those
 * pages migrate to the CMS, drop them from MOCK_ROUTE_RE.
 */

const DEFAULT_LOCALE = process.env.OPTIMIZELY_DEFAULT_LOCALE || 'en';
const KNOWN_LOCALES = [DEFAULT_LOCALE];

// Static mock pages that must keep rendering from app/ (not the CMS catch-all).
const MOCK_ROUTE_RE = /^\/(services|locations)(\/|$)/;

function firstSegment(pathname: string): string {
  return pathname.split('/')[1] ?? '';
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Leave the static mock routes (and the mock home) untouched.
  if (pathname === '/' || MOCK_ROUTE_RE.test(pathname)) {
    return NextResponse.next();
  }

  const seg = firstSegment(pathname);

  // Default-locale prefix is visible → redirect to the clean path (canonical/SEO).
  //   /en/vb-demo → /vb-demo
  if (seg === DEFAULT_LOCALE) {
    const stripped =
      pathname.replace(new RegExp(`^/${DEFAULT_LOCALE}(?=/|$)`), '') || '/';
    return NextResponse.redirect(new URL(stripped + search, request.url));
  }

  // A non-default known locale is already present → leave it; [locale] is populated.
  if (KNOWN_LOCALES.includes(seg)) {
    return NextResponse.next();
  }

  // Clean CMS path with no locale → rewrite into the default locale so [locale] is set.
  //   /vb-demo → /en/vb-demo
  const rewritten = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(new URL(rewritten + search, request.url));
}

export const config = {
  // Run on everything EXCEPT API, Next internals, the preview route, and any path
  // containing a dot (static assets like /banner-logo.svg).
  matcher: ['/((?!api|_next/static|_next/image|preview|favicon.ico|.*\\..*).*)'],
};
