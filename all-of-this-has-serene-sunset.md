# Plan: Optimizely Visual Builder — minimal connection POC

## Context

The Banner site has been built as a static Next.js mock. We're now starting the Optimizely CMS
(SaaS) integration. The chosen architecture is **Visual Builder / Experiences with on-page editing**,
content types defined **code-first** and pushed with `@optimizely/cms-cli`, rendered via
`@optimizely/cms-sdk` v2.

This first milestone is deliberately **small and throwaway-friendly**: a self-contained proof of
concept to learn the mechanics of the catch-all route, the `/preview` route, and on-page editing
overlays — **without touching any existing Banner components**. The user has found the SDK docs
internally inconsistent, so a secondary goal is to produce one coherent, working reference setup.

Success = open an Experience in the CMS Visual Builder, drop ≤3 simple demo components, edit their
fields (including a DAM/CMS image asset and several field types), and see the live preview update
with click-to-edit overlays focusing both **elements** and **individual properties**.

## Scope (explicitly small)

- New **catch-all** route + **preview** route, built strictly from the resolved docs.
- **3 brand-new demo element components** (no reuse of existing Banner components), collectively
  exercising varied field types + a DAM/CMS asset reference.
- Composition rendered through the SDK's built-in `BlankExperience` + `BlankSection` so we exercise
  the experience → section → rows/columns → elements tree and overlays at each level.
- Existing mock pages and routes are left **untouched**.

## Doc inconsistencies being resolved (decisions)

The docs assume a different project shape; these are the authoritative choices for THIS repo:

1. **`src/app` vs `app`** — docs use `src/app`; this repo uses root `app/` with tsconfig alias
   `@/* → ./*`. We keep `app/` and put CMS code under a new top-level `cms/` dir (`@/cms/...`).
2. **Preview route shape** — `13-agent-skills.md` mentions `app/api/optimizely/preview/route.ts`,
   but the authoritative `7-live-preview.md` uses a **page route** `app/preview/page.tsx` with
   `getPreviewContent(searchParams)`. We use the **page route**.
3. **Preview component** — docs show both `PreviewComponent` (`/react/client`) and the
   Next-optimized `NextPreviewComponent` (`@optimizely/cms-sdk/next`). The package-export list did
   **not** clearly include the `/next` subpath, so **verify `@optimizely/cms-sdk/next` resolves
   first**; if it doesn't in v2.0.0, fall back to `PreviewComponent` from `/react/client`.
4. **Client creation** — use the `config()` + `getClient()` pattern (configured once in layout),
   not `new GraphClient()` per route.
5. **Locale prefix** — docs browse `/en/...`. The published Experience path may be locale-prefixed;
   the catch-all passes whatever slug arrives, so we test against the actual published URL.

## Files to create / modify

Create:
- `optimizely.config.mjs` — `buildConfig({ components: ['./cms/**/*.tsx'], propertyGroups: [...] })`.
- `.env.example` — documents the five env vars (below). Real values go in `.env.local` (gitignored).
- `cms/registry.tsx` — side-effect module: `config({...})` + `initContentTypeRegistry([...])` +
  `initReactComponentRegistry({ resolver: {...} })`. Registers `BlankExperienceContentType`,
  `BlankSectionContentType`, and the 3 demo types.
- `cms/wrappers.tsx` — reusable `ComponentWrapper`, `DemoRow`, `DemoColumn` (each using
  `getPreviewUtils(node).pa(node)`), shared by the composition renderers. This is the one place the
  section/row/column complexity lives.
- `cms/BlankExperience.tsx` — renders `OptimizelyComposition` over `content.composition.nodes`.
- `cms/BlankSection.tsx` — renders `OptimizelyGridSection` over `content.nodes` with `DemoRow`/`DemoColumn`.
- `cms/DemoCard.tsx` — `_component`, `elementEnabled`. Fields: `heading` (string), `body` (richText),
  `featured` (boolean), `sortIndex` (integer). Tests text/richtext/bool/int overlays.
- `cms/DemoMedia.tsx` — `_component`, `elementEnabled`. Fields: `image` (contentReference,
  `allowedTypes: ['_image']`) + `altText` (string) + `caption` (string). Tests the **DAM/CMS asset**
  reference using `src()` + `damAssets()` + `pa('image')`.
- `cms/DemoCallout.tsx` — `_component`, `elementEnabled`. Fields: `title` (string), `cta` (link),
  `publishedDate` (dateTime). Tests link + dateTime field types.
- `app/[...slug]/page.tsx` — `getClient().getContentByPath('/'+slug+'/')`; `notFound()` on empty;
  `<OptimizelyComponent content={content[0]} />`; default export wrapped in `withAppContext`.
- `app/preview/page.tsx` — resolved preview route (`getPreviewContent`, communication-injector
  `<Script>` from `OPTIMIZELY_CMS_URL`, `NextPreviewComponent`/fallback, `OptimizelyComponent`),
  `export const dynamic = 'force-dynamic'`, default export wrapped in `withAppContext`.

Modify:
- `app/layout.tsx` — `import '@/cms/registry'` (side-effect registration). Keep existing html/body/fonts.
- `.gitignore` — ensure `.env*` ignored except `.env.example` (Next default may already cover).

Note: a required catch-all `[...slug]` does **not** match `/`, and fixed routes outrank it, so
`app/page.tsx` and `/services`, `/locations`, etc. keep working unchanged.

## Demo content model — field-type coverage

| Component  | Field          | Type             | What it demonstrates            |
|------------|----------------|------------------|---------------------------------|
| DemoCard   | heading        | string           | plain text overlay              |
| DemoCard   | body           | richText         | rich-text overlay + `RichText`  |
| DemoCard   | featured       | boolean          | boolean field                   |
| DemoCard   | sortIndex      | integer          | numeric field                   |
| DemoMedia  | image          | contentReference | **DAM/CMS image asset** + `src` |
| DemoMedia  | altText        | string           | text                            |
| DemoMedia  | caption        | string           | text                            |
| DemoCallout| title          | string           | text                            |
| DemoCallout| cta            | link             | link (url/title/target)         |
| DemoCallout| publishedDate  | dateTime         | date field                      |

All three are `compositionBehaviors: ['elementEnabled']` so they drop into a `BlankSection` grid.

## Prerequisites you provide (gating items)

Env vars (`.env.local`), per `7-live-preview.md` / `5-fetching.md`:
- `OPTIMIZELY_GRAPH_SINGLE_KEY` — CMS → Settings → API Keys → Render Content → Single Key (delivery).
- `OPTIMIZELY_GRAPH_GATEWAY` — `https://cg.optimizely.com/content/v2`.
- `OPTIMIZELY_CMS_URL` — instance URL, no trailing slash (communication injector + CLI).
- `OPTIMIZELY_CMS_CLIENT_ID` / `OPTIMIZELY_CMS_CLIENT_SECRET` — for `opti-cli config push`.

CMS-side config (UI): add hostname `http://localhost:3000`; Live Preview → Use Preview Tokens →
preview URL `http://localhost:3000/preview`.

Open item: confirm whether I push types via `opti-cli` (needs the client id/secret) or create them
via the already-authenticated MCP. I can also scaffold a starter Experience + sample image via MCP
so there's something to view immediately — but the actual drag/drop editing is yours to test in VB.

## Implementation steps

1. Verify `@optimizely/cms-sdk/next` export resolves (decide `NextPreviewComponent` vs fallback).
2. Scaffold `optimizely.config.mjs`, `.env.example`, `.gitignore` update.
3. Build `cms/` modules: 3 demo components + `BlankExperience`/`BlankSection` renderers + `wrappers.tsx` + `registry.tsx`.
4. Wire `app/layout.tsx` (import registry), add `app/[...slug]/page.tsx` and `app/preview/page.tsx`.
5. `npx @optimizely/cms-cli login` then `config push optimizely.config.mjs` (or create types via MCP).
6. Create + publish a `BlankExperience` at a simple slug (e.g. `/vb-demo`) containing one
   `BlankSection` with the 3 components; ensure one `_image` asset exists for DemoMedia.
7. CMS UI: hostname + Live Preview URL.

## Verification (end-to-end)

- `npm run dev`; visit the published Experience path (e.g. `/vb-demo` or `/en/vb-demo`) — confirm the
  3 components render with their field values and the DAM image loads.
- In the CMS, open the Experience in **Visual Builder**; confirm the `/preview` route renders inside
  the editor, edits update live (no full reload), and hovering/clicking highlights **elements**
  (component wrapper) and **individual properties** (`pa('field')`), jumping to the right CMS field.
- Confirm existing mock routes (`/`, `/services`, `/locations`, …) still render unchanged.

## Out of scope (later milestones)

Migrating real Banner components/pages to CMS, global chrome (Nav/Footer) as content, content-model
granularity decisions, and reuse/extension of the existing `OT_*` block library.
