# Plan: Louisiana Blue generative-authoring blocks (from demo-notes/052)

## Context

`demo-notes/052-Louisiana Blue Demo Block Properties.md` specifies a "Generative
Authoring Content Model" — a catalog of reusable blocks, each carrying *authoring
metadata* (purpose, intents, audiences, governance) that an AI page-planner can read
from Optimizely Graph to draft pages before publish. Today `cms/` holds only the two
container types from earlier work (`ExperiencePage`, `Page`); none of the catalog
blocks exist yet.

This task scaffolds the catalog blocks as **real, pushable Optimizely content types**
with React components, and encodes their authoring metadata so it ships to Graph.

Decisions (confirmed with user):
- **Scope:** the content types **+ authoring metadata**. NOT the blueprint/validation
  engine (spec §6–7) — that's a later phase.
- **Metadata encoding:** `Sys*` content properties on each block (the precedent set by
  the deleted `GenUIImpact` block), grouped and Graph-queryable.
- **`UniversalNavigationBlock`: skipped** for now — the static `SiteChrome`
  (`TopNav`/`MainNav`/`Footer`) already covers header/footer. → **6 blocks**, not 7.

## Blocks to build

All are `baseType: '_component'` with `compositionBehaviors: ['elementEnabled']` so they
drop onto an `ExperiencePage` canvas AND fit `Page.Content[]`. Two **nested** helper
types (`CardBlock`, `FormFieldBlock`) are `_component` with **no** composition behavior
— they're inserted into a parent's `ContentArea` (an `array` of `content`) via the
property's block picker, not dropped on the canvas. Each top-level block = one `cms/<Name>.tsx` file exporting
`<Name>ContentType` + a default React component, following the exact pattern in
`cms/Page.tsx` / `cms/ExperiencePage.tsx` (and the richer deleted blocks, recoverable via
`git show 64c4591:cms/Hero.tsx`, `:cms/QuickCareCards.tsx`, `:cms/GenUIImpact.tsx`).

Property names, data types, and the **Localizable** flag come from
`demo-notes/052a-...md` (the authoritative property spec); `maxLength`/`required`/
`pattern` constraints are carried over additively from the original `052` doc.
SDK type mapping: `LinkItem`→`link`, `PageReference`→`contentReference` (allowedTypes
`['_page']`), `XhtmlString`→`richText`, `ContentArea`→`array` of **`content`** (the
`Page.Content` pattern), `Select`→string `enum`, `Integer`→`integer` `enum`.
✔ = `isLocalized: true` per 052a.

**Every image/video/icon is TWO fields** (per user): a `contentReference` to a CMS
media asset **plus** a `url` string override (suffix `Url`). The renderer prefers the
`Url` override when non-empty, else resolves the asset reference via
`getPreviewUtils().src(...)` — the proven pattern from the deleted `Hero.tsx`
(`image` + `imageUrl`). Both fields share the base field's `isLocalized` flag.
So: `HeroImage` (contentReference `_image`) + `HeroImageUrl` (url); `HeroVideo`
(contentReference `_video`) + `HeroVideoUrl` (url); `CardIcon` (contentReference
`_image`) + `CardIconUrl` (url).

| File | key | Core properties (SDK type) |
|---|---|---|
| `cms/DynamicHero.tsx` | `DynamicHeroBlock` | SuperHeader (string,max40,✔), MainTitle (string,max72,**required**,✔), SubTitle (string,max180,✔), **HeroImage (contentReference `_image`,✔) + HeroImageUrl (url,✔)**, **HeroVideo (contentReference `_video`) + HeroVideoUrl (url)**, PrimaryCTA (link,**required**,✔), SecondaryCTA (link,✔), ContrastMode (boolean) |
| `cms/SearchGateway.tsx` | `SearchGatewayBlock` | PlaceholderText (string,max80,✔), SearchTargetPage (contentReference `_page`,**required**), EnableTypeAhead (boolean), IndexScope (string `enum`: Current Site Only / All Louisiana Blue Sites / Provider / Member / Medicare) |
| `cms/RegulatoryDisclaimer.tsx` | `RegulatoryDisclaimerBlock` | DisclosuresID (string, `pattern` `^LA-BLUE-DISC-[0-9]{4}`,**required**), DisclaimerBody (richText,✔), ShowLicensingLogo (boolean) |
| `cms/GridCardSelector.tsx` | `GridCardSelectorBlock` (+ `CardBlock`) | GridTitle (string,max80,✔), GridColumns (integer `enum` 2/3/4), CardsArea (**ContentArea = array of `content`**, allowedTypes `[CardBlock, '_image']`, min2/max4, ✔). CardBlock: **CardIcon (contentReference `_image`) + CardIconUrl (url)**, CardTitle (string,max60,**required**), CardBody (string,max160), CardLink (link,**required**) |
| `cms/LeadCaptureForm.tsx` | `LeadCaptureFormBlock` (+ `FormFieldBlock`) | FormTitle (string,max80,✔), MarketoProgramID (string,**required**), FormFields (**ContentArea = array of `content`**, allowedTypes `[FormFieldBlock]`, min2/max8, ✔), SubmitButtonText (string,max28,✔), SuccessRedirectPage (contentReference `_page`,**required**). FormFieldBlock: Label (string,**required**), FieldType (string `enum`: text/email/tel/select/checkbox), IsRequired (boolean) |
| `cms/NetworkStatusAlert.tsx` | `NetworkStatusAlertBlock` | AlertSeverity (string `enum`: Info/Warning/Critical), AlertMessage (string,max180,**required**,✔), AlertLink (link,✔), IsDismissible (boolean), GlobalPublish (boolean) |

Property mapping rule: **enforceable** constraints become real schema
(`maxLength`, `isRequired`, `enum`, `isLocalized` per 052a's Localizable column,
`pattern`); **advisory** metadata from 052 (`generation_mode`, `source_policy`, `tone`)
goes into each property's `description`. No `default` attr exists on properties →
booleans (`EnableTypeAhead`, `ShowLicensingLogo`, `IsDismissible`) default to "on"
**in the React component** (treat `undefined` as true) and note it in the description.

## Authoring metadata (`Sys*` properties)

Add a DRY helper `cms/authoringMetadata.ts` exporting `authoringMetadata({...})` that
returns a block of `Sys*` property definitions, all `group: 'authoring'`,
`indexingType: 'queryable'` (so Graph can filter), `enum`-constrained where the spec has
a controlled vocabulary, with the block's canonical value documented in each
`description`. Fields (block-level metadata from spec §3/§5):
`SysPurpose`, `SysSupportedIntents`, `SysSupportedPageTypes`, `SysSupportedAudiences`,
`SysRecommendedPosition`, `SysGenerationPriority`, plus governance booleans where the
spec demands them (e.g. `SysRequiresLegalReview` on RegulatoryDisclaimer/LeadCapture,
`SysGlobalApprovalRequired` on NetworkStatusAlert). Each block spreads
`...authoringMetadata({ purpose: 'page_introduction', intents: [...], ... })` into its
`properties`. Reusing one helper keeps the metadata schema consistent and makes it a
single source to extend later (e.g. a Graph-driven AI planner in a future phase).

## Wiring & config

- **`optimizely.config.mjs`** — add one property group:
  `{ key: 'authoring', displayName: 'Authoring Metadata', sortOrder: 100 }` (positive →
  sits *below* the content/system groups in the editor). Content properties stay
  ungrouped (default Content group).
- **`cms/registry.ts`** — import all 6 blocks **and** the 2 nested types; add every
  `*ContentType` (including `CardBlock`/`FormFieldBlock`) to `initContentTypeRegistry`,
  and every component (including nested) to the `initReactComponentRegistry` resolver so
  a directly-rendered nested block doesn't fall back to blank. No display templates
  needed (presentational options are content `enum` fields per the architecture's
  "elements use content fields, not display templates" rule).
- `Page` / `ExperiencePage` need **no change** — `elementEnabled` covers the canvas and
  `Page.Content` already accepts any content.

## React components

Server components following `cms/Page.tsx`: `const { pa, src } = getPreviewUtils(content)`,
spread `pa('Field')` on every editable field and `pa(content.__composition)` for the
block boundary, render with Tailwind brand tokens from `app/globals.css`
(`bg-blue-950`/`text-blue-800`/`brand-red` for Critical alerts, etc.). Reuse markup
ideas from `app/_components/Hero.tsx` (DynamicHero) and the deleted Banner blocks.
- `DynamicHero`: image = `content.HeroImageUrl` if set else `src(content.HeroImage)`
  (same precedence for video); CTAs via `link` `.url.default`/`.text`.
- `GridCardSelector`: maps `content.CardsArea` (a `content` array — full nested content
  delivered inline, like `Page.Content`; render each via `<OptimizelyComponent>`, no
  `expandReferences`) into a grid whose column count comes from `GridColumns`.
- `LeadCaptureForm`: renders a **static** form by mapping `FormFields` (content array of
  `FormFieldBlock`, via `<OptimizelyComponent>`) with `MarketoProgramID`
  as a `data-` attribute; actual Marketo submit wiring is explicitly **out of scope**
  (note in code). If made interactive later it becomes `'use client'`.
- `NetworkStatusAlert`: severity→color; dismiss is a small `'use client'` subcomponent
  or rendered non-dismissible for the scaffold (note).

## Verification

1. `npx tsc --noEmit -p tsconfig.json` — clean.
2. `npm run config:push` — expect "Successfully imported N content types"; fix any
   `InvalidModel` validation errors (watch `isLocalized`/`isRequired` naming — see
   memory `sdk-property-field-names`).
3. `mcp__opal-cms__cms_get_content_type_details` for the new keys — confirm properties,
   enums, and `Sys*` group landed as intended.
4. In the CMS: open an `ExperiencePage`, drop each new block onto the canvas, confirm it
   appears in the element picker and the fields render; load `/preview` to see it draw.
   (Expect brief Graph reindex "N errors" right after push — refresh/publish to clear.)
5. Spot-check brand styling against `app/globals.css` tokens.

## Out of scope (future phases)
- `UniversalNavigationBlock` and CMS-driving the static chrome.
- Page-blueprint generator + validation engine (spec §6–7).
- Marketo form submission and alert-dismissal persistence.
