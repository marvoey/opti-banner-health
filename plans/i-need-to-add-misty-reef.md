# Blog-post translation demo (flat content + reusable blocks for scale)

## Context

We're building a demo that shows Optimizely + Opal AI translation working reliably. The
known limitation: Opal translates **flat** content (simple blocks / Assets-panel items)
reliably, but struggles with **nested** composition trees as a whole. The most dependable
localization workflow is therefore to translate the individual library blocks/assets, and
let the page reassemble them per locale.

A **blog article** is the ideal vehicle: the article itself is flat content (category,
title, author, date, hero image, rich-text body) — an easy, reliable Opal target — and the
page can then host **existing library blocks** (Featured Doctors, Conditions grid, Services
grid, Testimonial, etc.) to demonstrate scale. Modeled after
https://www.bannerhealth.com/healthcareblog (categories: Better Me / Teach Me / Advise Me /
Inspire Me; article cards with category tag, title, author, date, hero image).

Decisions (from the user): **single article page**; **seed content via the opal-cms MCP
tools**; translate into **Korean (`ko`)**.

### Current-state facts (verified this session)
- Locale infra already built: CMS-driven locales (`lib/locales.ts` + generated file),
  `proxy.ts` routing, locale-aware fetch in `app/[locale]/[[...slug]]/page.tsx` with
  fallback to default locale, and a working `LanguageSwitcher` (CMS has `en, fr, sv, ko,
  ko-KR, cy, zh` enabled).
- **Linchpin gap:** `cms/expandRefs.ts` `expandReferences()` fetches referenced library
  blocks with `{ key }` only on the **published** path — no locale — so translated blocks
  do NOT appear on a published localized page. Verified against the SDK: `getContent({ key,
  locale })` (no preview token needed) filters published content by locale. Fixing this is
  required for the whole "translate the blocks → page localizes" workflow to work live.
- Proven, reusable pattern in the repo: inline grid block → array of `contentReference` →
  flat shared **card assets**, expanded via `expandReferences(refs, previewContextOf(content))`.
  Pairs: QuickCareCard/QuickCareCards, Condition/ConditionGrid, Doctor/FeaturedDoctors,
  Location/LocationResults, Service/ServicesGridAuto. All properties now have `isLocalized: true`.
- `_experience` types support custom typed properties **and** a dynamic composition area;
  rendered via a registered component. `BlankExperience` (`cms/BlankExperience.tsx`) renders
  composition with `<OptimizelyComposition nodes={content.composition?.nodes} ComponentWrapper=.../>`.
- Content types are pushed with `npm run config:push`; registered in `cms/registry.ts`
  (`initContentTypeRegistry`, `initReactComponentRegistry` resolver, keyed `BannerDemo*`).

## Goal

1. A **Blog Post** page type whose flat fields are an easy Opal translation target, with a
   dynamic area to drop existing library blocks (scale).
2. Referenced library blocks render in the active locale on the **published** site.
3. A seeded, clickable demo: one article assembled from existing blocks, published in
   English and Korean, switchable via the language switcher.

## Approach

### 1. Fix locale-aware reference expansion — `cms/expandRefs.ts` (the linchpin)

Always pass the parent locale to `getContent`, with a graceful fallback so untranslated
blocks still render (mirrors the page-level fallback already in the catch-all):
- `usePreview` path: unchanged (`{ key, locale }` + preview token).
- Published path: fetch `{ key, locale: ctx.locale }`; if it returns null and a locale was
  set, retry `{ key }` (default/any published branch). Keeps order, drops only truly
  unresolvable refs.
This makes all five existing grid pairs localize on the live site for free.

### 2. New content type — `cms/BlogPost.tsx` (`BannerDemoBlogPost`, baseType `_experience`)

Flat, all `isLocalized: true`, `group: 'demo'`:
- `category` (string enum: Better Me / Teach Me / Advise Me / Inspire Me)
- `title` (string, required), `author` (string), `authorTitle` (string),
  `publishDate` (string — keep string for easy seeding/display), `readTime` (string)
- `heroImageUrl` (string), `heroImageAlt` (string), `excerpt` (string)
- `body` (richText)
- Built-in `_experience` dynamic composition area = where existing blocks are dropped.

Render component `BlogPost` (mirrors conventions in `cms/Hero.tsx` + `cms/BlankExperience.tsx`):
hero band (category tag, title, author•date•readTime, hero image via `heroImageUrl`),
`excerpt`, rich-text `body` (`<RichText>`), then
`<OptimizelyComposition nodes={content.composition?.nodes} ComponentWrapper={...}>` for the
dropped library blocks. Use `getPreviewUtils`/`pa` for on-page-edit overlays.

Register in `cms/registry.ts`: add `BlogPostContentType` to `initContentTypeRegistry` and
`BannerDemoBlogPost: BlogPost` to the resolver. Push with `npm run config:push`.

### 3. Seed the demo content via MCP (English + Korean)

Using `cms_update_content_item` (upsert+populate → draft) and `cms_publish_content_item`:
1. Reuse existing published **card assets** where present (query via
   `graph_content_search_tool` / `cms_get_content_data`); create a few (Doctors, Conditions,
   Services) under the shared asset folder `e56f85d0e8334e02976a2d11fe4d598c` if needed.
2. Create the **BlogPost** experience (EN) under a page container with a `RouteSegment`
   (e.g. a `/blog` parent page, article slug like `navigating-heart-health`); populate flat
   fields; drop the existing reference-grid blocks (e.g. FeaturedDoctors, ConditionGrid,
   ServicesGridAuto, Testimonial) into its composition area; publish.
3. Create the **Korean (`ko`)** branch of the BlogPost (upsert with same `ContentKey` +
   `Locale: "ko"`, Korean flat fields) and the `ko` branches of the referenced card assets
   (the "translate each block in the Assets panel" step); publish each.

Composition wiring and exact property shapes will be confirmed iteratively against the live
instance during execution (via `cms_get_content_type_details` for the registered type and
`graph_content_graphql_executor` to inspect results) — these are not fully predeterminable
from code.

## Files
- `cms/expandRefs.ts` (locale fix)
- `cms/BlogPost.tsx` (new type + component)
- `cms/registry.ts` (register type + resolver)
- CMS content (created via MCP, not files): BlogPost EN+ko, referenced card assets EN+ko

## Verification
1. `npx tsc --noEmit` and `npm run config:push` succeed; `BannerDemoBlogPost` appears via
   `cms_get_content_type_details`.
2. Confirm `getContent({ key, locale: 'ko' })` returns the Korean branch of a card asset
   (via `graph_content_graphql_executor` or a quick check) — validates the expandRefs fix.
3. `npm run dev`: visit the English article URL → renders hero + body + dropped blocks (200).
4. Switch to Korean (language switcher) / visit `/ko/<slug>`: flat article fields AND the
   referenced blocks render in Korean; any untranslated block falls back to English (no 404,
   no missing blocks).
5. Sanity: an untranslated/partial block still appears (fallback), demonstrating the
   per-asset translation workflow degrades gracefully.

## Notes
- The page's composition tree stays in English structurally; all *translatable text* lives
  in flat assets (the BlogPost flat fields + the referenced card assets), which is exactly
  the reliable "translate blocks in the Assets panel" workflow this demo is meant to show.
- No change needed to `proxy.ts`, the catch-all page, or the switcher — the locale infra
  from the previous task already handles routing/fetch/fallback.
