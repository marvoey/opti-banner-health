import { getClient } from '@optimizely/cms-sdk';
import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { DEFAULT_LOCALE } from '@/lib/locales';

/**
 * The request origin (e.g. "http://localhost:3008"), used to scope Graph lookups
 * to THIS site's content. Optimizely indexes each site's pages under its own
 * `_metadata.url.base` (the hostname), so multiple sites can share a root path
 * like "/". Without a host filter, getContentByPath matches every site's "/" and
 * its type-resolution can land on an unregistered type → empty result → 404.
 */
async function requestOrigin(): Promise<string | undefined> {
  const h = await headers();
  const host = h.get('host');
  if (!host) return undefined;
  // x-forwarded-proto wins behind a proxy; locally there's none, so default http
  // for loopback hosts and https everywhere else.
  const proto =
    h.get('x-forwarded-proto') ??
    (/^(localhost|127\.0\.0\.1)(:|$)/.test(host) ? 'http' : 'https');
  return `${proto}://${host}`;
}

type Props = {
  params: Promise<{ locale: string; slug?: string[] }>;
};

/**
 * Catch-all for CMS-managed content. `proxy.ts` rewrites clean URLs (/vb-demo)
 * into the locale-prefixed internal route (/en/vb-demo) so `locale` is populated
 * and the Graph path matches what the CMS indexed.
 */
async function Page({ params }: Props) {
  const { locale, slug = [] } = await params;
  // The default-locale URL is indexed clean (no locale prefix) once a hostname is
  // configured, e.g. "/vb-demo/". Non-default locales keep their route segment in
  // `url.default` (e.g. "/fr/vb-demo/"), so fold it back into the Graph path.
  const cleanPath = slug.length ? `/${slug.join('/')}/` : '/';
  const isDefault = locale === DEFAULT_LOCALE;
  const prefixedPath = `/${locale}${cleanPath}`;
  const path = isDefault ? cleanPath : prefixedPath;

  const client = getClient();
  // Scope to this site's hostname so a shared root path ("/") resolves to THIS
  // site's page rather than another site indexed at the same path.
  const host = await requestOrigin();
  let content = await client.getContentByPath(path, { host });

  if (!content?.[0]) {
    // Default locale: content under the site start page is indexed clean
    // ("/vb-demo/"), but content elsewhere keeps the locale prefix
    // ("/en/vb-demo/") — try the prefixed form before giving up.
    // Non-default locale: fall back to the default-locale version when this page
    // hasn't been translated/published yet (so it renders instead of 404ing).
    content = await client.getContentByPath(isDefault ? prefixedPath : cleanPath, { host });
  }
  if (!content?.[0]) notFound();

  return <OptimizelyComponent content={content[0]} />;
}

export default withAppContext(Page);
