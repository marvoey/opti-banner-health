---
name: optimizely-nextjs-cms
description: >-
  Reference patterns for wiring Optimizely CMS SaaS (@optimizely/cms-sdk v2) into
  a Next.js 16 App Router app. Use when implementing locale-aware clean URLs via
  proxy.ts (the Next 16 replacement for Middleware), the app/[locale]/[[...slug]]
  catch-all, RSC-only Optimizely Graph fetching, or the preview/Draft route that
  branches between Pages, shared Blocks (contentassets/), and Visual Builder
  Experiences (_experience). Trigger on tasks touching Optimizely Graph,
  getContentByPath/getPreviewContent, on-page editing overlays (getPreviewUtils),
  proxy.ts, or @optimizely/cms-sdk.
---

# Optimizely CMS SaaS on Next.js 16 (App Router)

Implementation guidance + reference code for connecting this app to Optimizely CMS SaaS using
`@optimizely/cms-sdk` v2 and `@optimizely/cms-cli` v2.

> **Verify against the source of truth before emitting code.** This repo runs a modified Next.js 16
> (see `AGENTS.md`) — read `node_modules/next/dist/docs/` for any Next API. Read the SDK guides in
> `/docs` (`1`–`13`) for SDK APIs. Two things have differed from the SDK docs in practice and MUST
> be confirmed at implementation time:
> 1. Whether `@optimizely/cms-sdk/next` (`NextPreviewComponent`) is exported in the installed
>    version — if not, fall back to `PreviewComponent` from `@optimizely/cms-sdk/react/client`.
> 2. The exact preview-URL markers the CMS sends (`ctx`, `key`, `ver`, `loc`, `preview_token`, and
>    the `_experience` / `contentassets/` discriminators below) — log the incoming `searchParams`
>    once and confirm before relying on them.

This repo specifics: app dir is `app/` (no `src/`); tsconfig alias `@/* → ./*`; CMS code lives under
`@/cms/...`. Env vars (`.env.local`): `OPTIMIZELY_GRAPH_SINGLE_KEY`, `OPTIMIZELY_GRAPH_GATEWAY`
(`https://cg.optimizely.com/content/v2`), `OPTIMIZELY_CMS_URL`, and `OPTIMIZELY_CMS_CLIENT_ID` /
`OPTIMIZELY_CMS_CLIENT_SECRET` (CLI push only).

---

## 1. Locale routing with `proxy.ts`

Optimizely Graph resolves content by a locale-prefixed path (e.g. `/en/home/`). We want **clean
public URLs** (`/home`) while still routing internally to `app/[locale]/...` so the `[locale]` param
is populated and Graph queries stay consistent.

`proxy.ts` (Next 16 Middleware replacement) is the right tool: it does **routing only — no data
fetching** (fetching here inflates TTFB and is explicitly discouraged in the Next docs). Place it at
the project root, sibling of `app/`.

```ts
// proxy.ts  (project root — NOT inside app/)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALES = ['en'] as const;          // add 'es', 'fr', … as the CMS enables them
const DEFAULT_LOCALE = 'en';

function localeIn(pathname: string): string | null {
  const seg = pathname.split('/')[1];
  return (LOCALES as readonly string[]).includes(seg) ? seg : null;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const found = localeIn(pathname);

  // 1) Default-locale prefix is visible → REDIRECT to the clean path (SEO).
  //    /en/home  ->  /home   ;   /en  ->  /
  if (found === DEFAULT_LOCALE) {
    const stripped = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
    return NextResponse.redirect(new URL(stripped + search, request.url));
  }

  // 2) A non-default locale is present (e.g. /es/home) → leave it; [locale] is already populated.
  if (found) return NextResponse.next();

  // 3) Clean path with no locale → REWRITE to the default-locale route so [locale] is populated.
  //    /home  ->  /en/home   ;   /  ->  /en
  const rewritten = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(new URL(rewritten + search, request.url));
}

export const config = {
  // Run on everything EXCEPT API, Next internals, the preview route, and static assets.
  // (Without a matcher, proxy runs on _next/static, _next/image and public/ too — see proxy docs.)
  matcher: ['/((?!api|_next/static|_next/image|preview|favicon.ico|.*\\..*).*)'],
};
```

**Why redirect for the prefix but rewrite for the clean path?** Redirect makes the clean URL the one
canonical, indexable address. Rewrite keeps the clean URL in the address bar while the framework
internally renders the locale-prefixed route — so `params.locale` is real and the Graph path matches
what the CMS indexed.

Excluding `/preview` from the matcher is important: preview requests come from the CMS with their own
query params and must hit the preview route untouched.

---

## 2. `app/[locale]` structure + catch-all page

```
app/
├── layout.tsx                      # imports '@/cms/registry' (config + registries)
├── [locale]/
│   └── [[...slug]]/
│       └── page.tsx                # resolves any CMS path via Graph
└── preview/
    └── page.tsx                    # CMS preview / on-page editing (section 3)
```

`[[...slug]]` is an **optional** catch-all so `/en` (home) and `/en/a/b` both resolve here.

```tsx
// app/[locale]/[[...slug]]/page.tsx
import { getClient } from '@optimizely/cms-sdk';
import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ locale: string; slug?: string[] }>;
};

async function Page({ params }: Props) {
  const { locale, slug = [] } = await params;
  const path = `/${[locale, ...slug].join('/')}/`; // e.g. /en/home/

  const content = await getClient().getContentByPath(path);
  if (!content?.[0]) notFound();

  return <OptimizelyComponent content={content[0]} />;
}

export default withAppContext(Page);
```

`getClient()` requires `config({...})` to have run once — do it in `@/cms/registry` (imported by
`app/layout.tsx`) alongside `initContentTypeRegistry()` and `initReactComponentRegistry()`.

> Keep fetching in this Server Component (RSC), never in `proxy.ts`. Lean on the Next data
> cache / streaming for published content; preview content (section 3) must be dynamic.

---

## 3. Preview / Draft route with branching

The CMS opens your `/preview` URL with preview params and expects three different render shells
depending on **what** is being previewed. Detect the kind from the incoming params, then render the
matching shell. All three share: the communication-injector `<Script>`, the live-update component,
and `withAppContext`.

```tsx
// app/preview/page.tsx
import { getClient, type PreviewParams } from '@optimizely/cms-sdk';
import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';
// Prefer the Next-optimized component; fall back if the /next subpath isn't exported:
import { NextPreviewComponent } from '@optimizely/cms-sdk/next';
// import { PreviewComponent } from '@optimizely/cms-sdk/react/client';
import Script from 'next/script';

export const dynamic = 'force-dynamic'; // preview is always per-request, never cached

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function Page({ searchParams }: Props) {
  const params = (await searchParams) as PreviewParams & Record<string, string>;

  // Discriminate the preview kind. CONFIRM these markers against a real preview URL.
  const isExperience = 'key' in params && (params.ctx === 'experience' || '_experience' in params);
  const isSharedBlock = typeof params.key === 'string' && params.key.includes('contentassets/');

  const content = await getClient().getPreviewContent(params);

  const injector = new URL(
    '/util/javascript/communicationinjector.js',
    process.env.OPTIMIZELY_CMS_URL,
  ).href;

  return (
    <>
      <Script src={injector} strategy="afterInteractive" />
      <NextPreviewComponent />
      {/* Pages, Experiences, and Blocks all render through OptimizelyComponent, which resolves
          the registered React component for the content's type. The branch lets you wrap each in
          a different shell (full chrome for pages, bare canvas for experiences, isolated wrapper
          for shared blocks) so the in-editor overlay matches the real context. */}
      {isSharedBlock ? (
        <div className="preview-block-shell">
          <OptimizelyComponent content={content} />
        </div>
      ) : isExperience ? (
        <main className="preview-experience-shell">
          <OptimizelyComponent content={content} />
        </main>
      ) : (
        <OptimizelyComponent content={content} />
      )}
    </>
  );
}

export default withAppContext(Page);
```

- **Pages** → render directly (optionally inside your normal page chrome).
- **Shared Blocks** (`contentassets/`) → wrap in an isolated shell so a block authored outside any
  page still previews correctly.
- **Visual Builder Experiences** (`_experience`) → render in a bare canvas shell; the experience's
  own registered component (`BlankExperience` etc.) draws the composition via `OptimizelyComposition`.

CMS-side setup (per `docs/7-live-preview.md`): add hostname `http://localhost:3000`; Live Preview →
Use Preview Tokens → preview URL `http://localhost:3000/preview`.

---

## 4. On-page editing overlays

In every component (page, section, element), spread `pa()` from `getPreviewUtils` onto the elements
that map to properties, and wrap composition nodes so editors can click both the **element** and the
**individual property**:

```tsx
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';

const { pa, src } = getPreviewUtils(content);
// <h2 {...pa('heading')}>{content.heading}</h2>
// <img {...pa('image')} src={src(content.image)} alt={...} />
```

For composition renderers, give `OptimizelyComposition` a `ComponentWrapper` and
`OptimizelyGridSection` custom `row`/`column` components, each applying `pa(node)` — this is where the
section / row / column / element overlay focus is wired. See `docs/8-experience.md`.

---

## Gotchas

- `proxy.ts` lives at the project **root**, not in `app/`. Only one per project. Node.js runtime.
- Exclude `/preview`, `api`, and static assets from the proxy `matcher`, or preview/asset requests
  break.
- `getClient()` needs `config()` to have run first (in the registry module imported by the layout).
- `getContentByPath` returns an **array** — guard `content[0]` and call `notFound()` when empty.
- Trailing slash: build the Graph path with a trailing `/` (`/en/home/`) as the SDK docs show.
- Published content can be cached; the preview route must be `dynamic = 'force-dynamic'`.

## References
- Next 16 Proxy: `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md` and
  `.../03-api-reference/03-file-conventions/proxy.md`
- SDK fetching/rendering/preview/experience: `docs/5-fetching.md`, `docs/6-rendering-react.md`,
  `docs/7-live-preview.md`, `docs/8-experience.md`, `docs/3-modelling.md`
