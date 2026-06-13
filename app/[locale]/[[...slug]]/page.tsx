import { getClient } from '@optimizely/cms-sdk';
import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ locale: string; slug?: string[] }>;
};

/**
 * Catch-all for CMS-managed content. `proxy.ts` rewrites clean URLs (/vb-demo)
 * into the locale-prefixed internal route (/en/vb-demo) so `locale` is populated
 * and the Graph path matches what the CMS indexed.
 */
async function Page({ params }: Props) {
  const { slug = [] } = await params;
  // The default-locale URL is indexed clean (no locale prefix) once a hostname is
  // configured, e.g. "/vb-demo/". Locale is metadata, not part of url.default.
  const path = slug.length ? `/${slug.join('/')}/` : '/';

  const content = await getClient().getContentByPath(path);
  if (!content?.[0]) notFound();

  return <OptimizelyComponent content={content[0]} />;
}

export default withAppContext(Page);
