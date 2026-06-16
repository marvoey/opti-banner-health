# CMP ↔ this CMS app — one-page overview

Consolidates the five `*-*.html` reference docs in the repo root (CMP / OCC docs)
into a single through-line: **CMP is the upstream marketing authoring + workflow
layer; this Next.js + Optimizely Graph app is a downstream _pull_ channel.**

> CMP = **Content Marketing Platform** · OCC = **Omnichannel Content** (CMP's content
> model) · this app = **CMS SaaS** delivery (`@optimizely/cms-sdk` + Optimizely Graph;
> see `CONTENT-ARCHITECTURE.md`). CMP and CMS SaaS are **different products** that
> integrate via OCC + Optimizely Graph.

---

## The through-line

```
        UPSTREAM (CMP)                                    DOWNSTREAM (this app)
  ┌────────────────────────────┐                   ┌──────────────────────────────┐
  │ Author OCC in tasks/library │                   │ app/[locale]/[[...slug]]      │
  │ Model content types         │   Optimizely      │   getContentByPath()  (pull)  │
  │ (Source* metadata = mapping)│ ─── Graph ──────▶ │ app/preview/page.tsx          │
  │ Remote Fields (editor UI)   │   (pull / GraphQL)│   getPreviewContent() (pull)  │
  │ Preview handshake (webhook) │                   │ cms/ resolvers render it      │
  └────────────────────────────┘                   └──────────────────────────────┘
         push ──▶ email / social / WordPress / other store-and-render channels
```

**Net:** for delivery *and* preview, this app is the **Pull/Graph consumer**. CMP's
authoring features (preview handshake, remote fields) are upstream/separate and
require little-to-no net-new code in this repo.

---

## The five docs, mapped

| # | Doc | What it covers | Relation to this app |
|---|---|---|---|
| 00 | `WORKING-WITH-CMP` | OCC nouns: instance, content type, **task**, draft/version, **library/asset**, content preview, analytics pixel | Vocabulary only. Task/library/draft lifecycle has **no equivalent here** — this app only sees *published* (or draft-for-preview) results. |
| 01 | `MODEL-IN-CMP` | How to model types: from domain / **from design** / hybrid; `Source` / `Source ID` / `Source Metadata` | Our model is **design-derived** (deconstructed components → reusable cards + grids). `Source*` fields make a CMP↔CMS type mapping **reversible**. Caveat: CMP prefers *pure, presentation-free* content; our model fuses content + presentation for Visual Builder — so a sync would map the **reusable cards** (pure content) and leave experiences/sections/display-templates CMS-side. |
| 02 | `PUSH-AND-PULL` | **Push** (webhooks → store-and-render channel) vs **Pull** (fetch via Optimizely Graph) | **This app is Pull.** Same `getClient()` mechanism we already use. CMP syncs schema+content into Graph; versioned types get `I`-prefixed interfaces (same idea as our `_IComponent` fragment). Extra queryable metadata: `LibraryPath`, `ParentFolderGuid`, `FolderGuids`, `Labels`, `Status` (`Draft`/`Published`). Gate: only **Organization View** content syncs; integration **enabled by CSM/AE**. |
| 03 | `WORK-WITH-PREVIEWS` | CMP preview protocol: `content_preview_requested` webhook → **acknowledge** → **complete** (`keyed_previews` of HTML URLs) | Distinct from our existing CMS live-preview (`/preview`). **This app is the Pull-preview case**: don't create throwaway drafts — point CMP at a stable route that pulls the `Draft` from Graph and renders via our resolvers. Gaps to build: webhook listener, ack/complete glue (`content_hash`), and **HMAC** auth to read drafts from Graph (`epi-hmac …`) — different from our published-site `apiKey`. |
| 04 | `REMOTE-FIELDS` | Custom field-editor widgets mounted as an **iframe** in CMP's editor; SPI over HTTP + `postMessage`; deployed as a **container** (Dockerfile.production, port 8000) to CMP infra | Authoring-side only — a **separate app**, not this repo (the reference example is its own Next.js app). The one touchpoint: a remote field stores a **JSON** value that arrives via Graph pull and **renders in this app** like any other content field. |

---

## What integrating CMP would actually require here

Nothing is wired today (no webhook handlers, no CMP client, no `Source*` mapping).
If/when we integrate, the work is small *because we already pull from Graph*:

- **Delivery (pull):** enable CMP→Graph sync (CSM/AE). Confirm whether CMP content
  lands in the **same Graph endpoint** as our `BannerDemo*` types or a separate
  source to federate. Then query it with the existing `getClient()` flow.
- **Preview (pull):** add a webhook route (`content_preview_requested` → ack →
  wait-for-`Draft`-in-Graph → complete) + an **HMAC-signed** Graph client for drafts,
  reusing the `/preview` renderer.
- **Authoring (optional):** build any Remote Field as a standalone container app;
  consume its JSON value in our `cms/` components.

---

## Reference

Source HTML docs live in the repo root: `00-WORKING-WITH-CMP.html`,
`01-MODEL-IN-CMP.html`, `02-PUSH-AND-PULL.HTML`, `03-WORK-WITH-PREVIEWS.HTML`,
`04-REMOTE-FIELDS.HTML`. This app's own content model: `CONTENT-ARCHITECTURE.md`.
