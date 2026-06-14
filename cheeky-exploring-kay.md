# Recreate the `/services` mock as a CMS Experience

## Context
The homepage mock is already reproduced as a CMS Visual Builder experience. Now we want the
**`/services` directory page** (`app/services/page.tsx` + `app/services/_components/`) reproduced
the same way — editors build it from CMS blocks instead of it being hardcoded.

The static `/services` mock has three sections (besides the shared `SiteChrome` and the
preview badge, both already handled):
- **ServicesHero** — big "Conditions & Services" heading + description + a search box.
- **ServiceCategories** — 3 category groups ("Everyday Medicine", "Specialty Care",
  "Rehab & Support"), each a header + a grid of ~6 service items, followed by a CTA banner.
- **CTA banner** — navy panel: "Not sure which service you need?" + "Start Symptom Checker" button.

Most of this reuses existing blocks. The gap is **two new element blocks** (a search hero and a
CTA banner). The category grids reuse `Services Grid (Auto)` + `Service` items.

Decisions (confirmed with user):
- **Scope:** `/services` index only (not `/services/heart`).
- **Categories:** one **`Services Grid (Auto)`** block per category (title/description/CTA + referenced Service items).
- **New blocks:** build **ServicesHero** and **ServiceCtaBanner** as faithful dedicated types.

## Mock → CMS mapping (`/services`)

| Mock section | CMS block | Status |
|---|---|---|
| TopNav / MainNav / Footer | `SiteChrome` | ✅ done |
| PreviewBadge | preview-route badge | ✅ done |
| ServicesHero | **`BannerDemoServicesHero`** | 🔨 new |
| each ServiceCategory (3×) | `BannerDemoServicesGridAuto` (title/desc/cta + Service refs) | ✅ reuse |
| service items (Cardiology, etc.) | `BannerDemoService` library items | ✅ reuse |
| CTA banner | **`BannerDemoServiceCtaBanner`** | 🔨 new |

## Work

### 1. New block: `cms/ServicesHero.tsx`
`BannerDemoServicesHero` — `_component`, `compositionBehaviors: ['elementEnabled']`. Properties
(all `group: 'demo'`):
- `headline` (string) — "Conditions & Services"
- `description` (string)
- `searchPlaceholder` (string) — decorative search box placeholder text

React default export: light hero — `bg-slate-50 py-20 border-b border-gray-200`, inner
`container mx-auto px-4`, `h1 text-5xl lg:text-6xl font-serif font-bold text-[#00205C]`,
description `text-xl text-[#4A4A4A]`, and a **decorative** search input (`max-w-xl`,
`border-2 rounded-2xl`, lucide `Search` icon — no handler, presentational only). Editable via
`pa('headline')`/`pa('description')` and the `__composition` block boundary (pattern from
`cms/Hero.tsx:34-45`). Self-centers (own container), so droppable directly in the experience.

### 2. New block: `cms/ServiceCtaBanner.tsx`
`BannerDemoServiceCtaBanner` — `_component`, `elementEnabled`. Properties (`group: 'demo'`):
- `heading` (string) — "Not sure which service you need?"
- `description` (string)
- `cta` (link) — "Start Symptom Checker"

React default export: `bg-[#00205C] text-white rounded-[40px] p-12 lg:p-16` with the decorative
blur circle, `heading` in `font-serif italic lowercase`, description, and a yellow pill CTA
(`bg-[#FFD100] text-[#00205C] rounded-full`). Edit-mode href suppression + `pa()` like
`cms/DemoCallout.tsx`/`cms/Hero.tsx`. Wrap in `container mx-auto px-4` so it self-centers.

### 3. Wire `cms/registry.ts`
Mirror the existing pattern:
- Import both modules.
- `initContentTypeRegistry`: add `ServicesHeroContentType`, `ServiceCtaBannerContentType`.
- `resolver`: add `BannerDemoServicesHero: ServicesHero`, `BannerDemoServiceCtaBanner: ServiceCtaBanner`.
- No display templates needed.

### 4. Push
`npx @optimizely/cms-cli config push optimizely.config.mjs` (expect 15 content types imported).

## Assembly (in Visual Builder, by the user)
Create a `BlankExperience`, then drop, top to bottom (all single-element, reference-based — no
grid drag-drop):
1. **Services Hero** — headline / description / search placeholder.
2. **Services Grid (Auto)** ×3 — one per category. Set title (e.g. "Everyday Medicine"),
   description, and reference the published `Service` items for that group.
3. **Service CTA Banner** — heading / description / CTA.

Requires the referenced **Service** items to exist and be **published** in the content library
(expansion is preview-aware now, so drafts also show in VB preview).

## Routing (to serve it at `/services`)
`/services` is currently a static route held by `MOCK_ROUTE_RE` in `proxy.ts:24`. To serve the
CMS version there (mirroring the homepage migration): delete `app/services/` and drop `services`
from `MOCK_ROUTE_RE`, then **restart the dev server**, and publish the experience at URL
`/services`. Alternatively, publish at a temporary slug (e.g. `/services-cms`, not in
`MOCK_ROUTE_RE`) to preview before migrating. (This routing step is optional / the user's call.)

## Conventions to follow
- `BannerDemo` key prefix; resolver key == content-type key.
- `group: 'demo'` on every property; edit-mode link suppression + `__composition` boundary.
- Self-contained blocks (own `container`) so they drop directly into the experience.

## Known cosmetic deviations (acceptable for the demo)
- `Services Grid (Auto)` renders up to **4** columns at `lg` and shows the richer `Service` card
  (icon + name + description); the mock category grid is **3** columns of simpler name+chevron
  cards. Closeable later by adding a `columns` option to `ServicesGridAuto` — out of scope here.
- `Service.icon` enum (heart/stethoscope/activity/baby/brain/bone) doesn't cover every service
  (e.g. imaging, lab); pick the closest, or expand the enum later.

## Verification
1. `npx tsc --noEmit` — clean (two new files + registry).
2. `config push` — expect "15 content types imported".
3. `npm run dev` (3006); assemble the experience as above; ensure Service items are published.
4. Publish + view through the catch-all (at `/services` after the routing step, or a temp slug),
   compare against `app/services/page.tsx`. VB preview shows drafts live.
