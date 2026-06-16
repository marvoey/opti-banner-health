# Content architecture — Banner CMS demo

How the Optimizely CMS SaaS content types ("blocks") in `cms/` are modeled, wired,
delivered, and rendered. Onboarding-oriented: covers both the content model and the
implementation. For the editor-facing steps to assemble each page, see
`EXPERIENCE-ASSEMBLY.md`; for the authoring playbook see the `banner-cms-blocks` skill.

---

## 1. Building blocks (baseTypes & roles)

Every block is a content type defined with `contentType({...})` in a `cms/*.tsx`
file. The `baseType` decides what it is in Visual Builder (VB):

- **`_experience`** — a VB page with a composition canvas. We use the SDK's
  `BlankExperience`; it renders the composition via `OptimizelyComposition`.
- **`_section`** — a layout wrapper containing a grid (rows → columns → elements).
  Sections carry **no content properties**; configurable options live on a
  **display template**. Renders its grid via `OptimizelyGridSection`.
- **`_component`** — a reusable block. With `compositionBehaviors: ['elementEnabled']`
  it can be dropped onto the canvas (an "element"); without it, it's only usable as
  a referenced/nested item.

Recurring **roles** a `_component` plays here:
- **Self-contained element** — owns its layout + container, dropped directly in the
  experience outline (e.g. `Hero`, `Testimonial`, `DetailHero`).
- **Reusable card** — a small library block referenced by a grid (e.g. `Service`,
  `Condition`, `Doctor`, `Location`, `QuickCareCard`).
- **Reference grid** — an element holding a `contentReference[]` of cards, expanded at
  render (e.g. `ServicesGridAuto`, `ConditionGrid`, `FeaturedDoctors`, `LocationResults`,
  `QuickCareCards`).

Key conventions: `BannerDemo` key prefix; resolver key **==** content-type key;
`group: 'demo'` on every property.

---

## 2. Content type reference

| Content type (key) | baseType | Role | Display template | Notes |
|---|---|---|---|---|
| `BlankExperience` | `_experience` | Page shell | — | SDK-provided; renders composition |
| `BlankSection` | `_section` | Generic section | **BlankSectionDefault** | Overlap + Content Width settings |
| `DemoSection` | `_section` | Styled section | **DemoSectionDefault** | Background + Padding settings |
| `DemoText` | `_component`/el | richText element | — | POC |
| `DemoCard` | `_component`/el | card element | — | POC |
| `DemoMedia` | `_component`/el | image element | — | POC |
| `DemoCallout` | `_component`/el | callout element | — | POC |
| `BannerDemoHero` | `_component`/el | Self-contained | — | image **or** `imageUrl` override |
| `BannerDemoQuickCareCard` | `_component`/el | Reusable card | — | referenced by QuickCareCards |
| `BannerDemoQuickCareCards` | `_component`/el | Reference grid | — | `cards` → QuickCareCard |
| `BannerDemoService` | `_component`/el | Reusable card | — | `variant` rich/simple |
| `BannerDemoServicesHeader` | `_component`/el | Self-contained | — | title/desc/CTA |
| `BannerDemoServicesGrid` | `_section` | Styled grid section | **ServicesGridDefault** | Columns setting; drop Service cards |
| `BannerDemoServicesGridAuto` | `_component`/el | Reference grid | — | `services` refs; **content-field** `cardStyle` + `columns` |
| `BannerDemoTestimonial` | `_component`/el | Self-contained | — | quote/attribution |
| `BannerDemoServicesHero` | `_component`/el | Self-contained | — | search hero (decorative input) |
| `BannerDemoServiceCtaBanner` | `_component`/el | Self-contained | — | navy CTA banner |
| `BannerDemoDetailHero` | `_component`/el | Self-contained | — | breadcrumb + image override + badge |
| `BannerDemoCondition` | `_component`/el | Reusable card | — | referenced by ConditionGrid |
| `BannerDemoConditionGrid` | `_component`/el | Reference grid | — | `conditions` refs + tracking badge |
| `BannerDemoLocationSearchHero` | `_component`/el | Self-contained | — | navy location search hero |
| `BannerDemoLocation` | `_component`/el | Reusable card | — | name/address/wait/status |
| `BannerDemoLocationResults` | `_component`/el | Reference grid | — | `locations` refs + static map placeholder |
| `BannerDemoFacilityHero` | `_component`/el | Self-contained | — | `breadcrumb[]` + `specializations[]` (string arrays) |
| `BannerDemoFacilityInfo` | `_component`/el | Self-contained | — | image override + flattened info blocks |
| `BannerDemoDoctor` | `_component`/el | Reusable card | — | referenced by FeaturedDoctors |
| `BannerDemoFeaturedDoctors` | `_component`/el | Reference grid | — | `doctors` refs |

(`/el` = `compositionBehaviors: ['elementEnabled']`.)

---

## 3. Display templates

A **display template** attaches presentational options to a content type/section
and is delivered to the renderer as `displaySettings`. Three exist:

| Key | Target | Settings (choices) |
|---|---|---|
| `DemoSectionDefault` | `DemoSection` | Background (muted/white/navy), Padding (compact/cozy/spacious) |
| `ServicesGridDefault` | `BannerDemoServicesGrid` | Columns (2/3/4) |
| `BlankSectionDefault` | `BlankSection` | Vertical Overlap (pull/push steps), Content Width (full/contained) |

All are `isDefault: true`, so their settings apply to the default render with no
variant/tag. Registered via `initDisplayTemplateRegistry([...])`.

### Display template **vs** content field — the important rule
`displaySettings` are delivered to **sections** and **grid-placed elements** (via
`OptimizelyGridSection`) — but **NOT to top-level elements** dropped in the
experience outline (`OptimizelyComposition` passes them to the wrapper, not the
component). So:
- Presentational options on a **section** → display template (e.g. Columns, Overlap, Width).
- Presentational options on a **self-contained element** → **string-enum content
  property**. That's why `ServicesGridAuto`'s `cardStyle` and `columns` are content
  fields, not a display template.

---

## 4. Data flow & rendering

```
URL → proxy.ts (→ /en/…) → app/[locale]/[[...slug]]/page.tsx
   → getClient().getContentByPath(path)            # Optimizely Graph
   → <OptimizelyComponent content={...}/>
       → resolver lookup by __typename (cms/registry.ts)
       → BlankExperience → <OptimizelyComposition>  # outline of sections/elements
            → <OptimizelyGridSection> for sections   # rows → columns → elements
            → resolves each element by __typename → the React block
```

- **The shared query** builds an `_IComponent` fragment containing an inline
  fragment for **every registered element-enabled content type**, so a block's
  fields only arrive if it's registered in `initContentTypeRegistry`. `__typename`
  is always selected, so a block still resolves (and may render a fallback icon)
  even before its fields are queryable.
- **References:** a `contentReference` property is delivered as `{ key, url }` only —
  never the target's fields. Reference grids call `expandReferences(refs,
  previewContextOf(content))` (`cms/expandRefs.ts`), which fetches each item by key
  via `getContent`. It's **preview-aware**: draft items in VB preview (preview token
  + locale), published items on the live site.
- **On-page editing:** blocks spread `pa(...)` attributes (`getPreviewUtils`) to mark
  editable boundaries/fields; these are no-ops on the published site.
- **Graph reindex lag:** after pushing new element types, the `_IComponent` query
  references them before Graph's schema catches up → CMS pages 400 ("N errors")
  briefly; refresh or publish an instance to resolve.

Two render entry points exist: the **published** catch-all
(`app/[locale]/[[...slug]]/page.tsx`, `getContentByPath`) and the **preview**
route (`app/preview/page.tsx`, `getPreviewContent`). Both wrap the body in
`SiteChrome` (header/footer).

---

## 5. Block catalog by page

Each experience is a `BlankExperience` (chrome auto-added). Composition:

- **Home `/`** — Hero → Quick Care Cards (→ QuickCareCard refs) → Services Grid (Auto)
  (→ Service refs) → Testimonial.
- **Services `/services`** — Services Hero → 3× Services Grid (Auto) (→ Service refs,
  one per category) → Service CTA Banner.
- **Heart `/services/heart`** — Detail Hero → Condition Grid (→ Condition refs).
- **Locations `/locations`** — Location Search Hero → Location Results (→ Location refs
  + map placeholder).
- **Facility `/locations/urgent-care/phoenix`** — Facility Hero → Facility Info →
  Featured Doctors (→ Doctor refs).

Reusable cards (`Service`, `Condition`, `Doctor`, `Location`, `QuickCareCard`) live
once in the content library and are referenced by the grids — edit once, reflected
everywhere. See `EXPERIENCE-ASSEMBLY.md` for field-level build steps.

---

## 6. registry.ts wiring

`cms/registry.ts` (named `.ts` so the `./cms/**/*.tsx` push glob skips it) is the
single registration point, imported for side effects by `app/layout.tsx`:
1. `config({ apiKey, graphUrl })` — Graph client.
2. `initContentTypeRegistry([...])` — every content type, **including card sub-types**.
3. `initDisplayTemplateRegistry([...])` — the 3 display templates.
4. `initReactComponentRegistry({ resolver })` — maps each content-type key → React
   component; card sub-types are registered too so a directly-dropped card doesn't
   render a blank fallback.

Content types/templates are pushed to the CMS with
`npx @optimizely/cms-cli config push optimizely.config.mjs`.
