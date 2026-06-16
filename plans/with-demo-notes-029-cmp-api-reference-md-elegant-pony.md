# Plan: CMP → app preview bridge (`lib/cmp` + webhook + render route)

## Context

The repo has five CMP/OCC reference docs in `demo-notes/` (020/021/029/030/031/032).
The verified contract from 029/031/032 is the **content-preview handshake**: CMP fires a
`content_preview_requested` webhook, an integration **acknowledges** it (once), renders an
HTML preview, then **completes** it by posting preview URLs back. Today this app has **no**
route handlers and **no** CMP client — only a CMS-SaaS delivery/preview path
(`app/preview/page.tsx` via `getClient().getPreviewContent`).

This builds a small, self-contained **bridge library** plus the two routes needed to run the
preview protocol end-to-end. Per decisions: **preview scope only**, **mock/sandbox mode** so
it runs without live CMP/Graph credentials, and **both render sources** (CMS content via the
SDK preview path *and* CMP-native OCC drafts via a new HMAC Graph client).

Outcome: a developer can POST a sample webhook locally and watch ack → render → complete fire,
with a generated preview URL that renders real HTML — then flip one env flag to go live once
CSM/AE provisions credentials.

## Verified API contract (from docs)

- **CMP REST base:** `https://api.cmp.optimizely.com/v3` · **Auth:** OAuth2 *client credentials*,
  token at `https://accounts.cmp.optimizely.com/o/oauth2/v1/token`, header `Authorization: Bearer <token>`.
- **Acknowledge:** `POST …/previews/{preview_id}/acknowledge`, body `{ acknowledged_by, content_hash }` → 200 / 422. **Once only.**
- **Complete:** `POST …/previews/{preview_id}/complete`, body `{ keyed_previews: { [label]: string | {completed,name?,orderIndex?,mimeType?,locale?} | {error,…} } }` → 200 / 422.
- **Webhook:** `content_preview_requested`; `content_hash` at
  `$.data.assets.structured_contents[i].content_body.fields_version.content_hash`.
  **Doc rule:** use the `links.acknowledge` / `links.complete` URLs from the payload as-is — do not hand-build them.
- **Graph drafts (OCC):** `POST https://cg.optimizely.com/content/v2`, header
  `Authorization: epi-hmac <key>:<timestamp>:<nonce>:<base64hmac>` where
  `hmac = base64( HmacSHA256( key+method+uri+timestamp+nonce+md5Base64(body), base64Decode(secret) ) )`.

## Environment facts that shape the build

- Node **22.x**, ESM (`module: esnext`, `moduleResolution: bundler`), path alias `@/*` → repo root.
- **No** crypto-js / jose / jsonwebtoken installed → use built-in **`node:crypto`** for all HMAC/MD5/base64. **No new dependencies.**
- Existing reuse targets: `getClient()` (`cms/registry.ts`), `getPreviewContent` + `OptimizelyComponent` + `withAppContext` + `PreviewComponent` (pattern in `app/preview/page.tsx`), `SiteChrome` (`app/_components/SiteChrome.tsx`).
- `proxy.ts` matcher already excludes `/api` and `/preview`; the new render route path must be added to that exclusion (see below).
- `OPTIMIZELY_PREVIEW_SECRET` already reserved in `.env.example` — reuse it to sign preview-URL tokens.

## Architecture

```
CMP ──webhook(content_preview_requested)──▶ app/api/cmp/preview/route.ts
                                              │  verify sig · parse · guard content type
                                              ▼
                                         lib/cmp/previewBridge.ts  (orchestrator)
                                              │ 1. acknowledge (links.acknowledge)
                                              │ 2. await draft in Graph (bounded poll)
                                              │ 3. build signed preview URL(s)
                                              │ 4. complete (links.complete, keyed_previews)
                                              ▼
CMP fetches preview URL ──▶ app/cmp-preview/page.tsx
                              verify token · pick source:
                                · cms  → getClient().getPreviewContent(...)   [existing SDK path]
                                · occ  → lib/cmp/graphHmac.ts query()         [new HMAC client]
                              → <SiteChrome><OptimizelyComponent/></SiteChrome>
```

## Files to create

**Library — `lib/cmp/` (all `.ts`, framework-agnostic except where noted):**

- `types.ts` — `ContentPreviewRequestedEvent`, `StructuredContent`, `AcknowledgeRequest`
  (`{ acknowledged_by, content_hash }`), `KeyedPreview` union, `CompleteRequest`
  (`{ keyed_previews }`), `PreviewSource = 'cms' | 'occ'`. Mirrors the OpenAPI schemas in 031/032 verbatim.
- `config.ts` — central env reader + `CMP_MOCK` flag. Exposes `cmpConfig` with base URLs,
  OAuth creds, webhook secret, ack user id, graph HMAC key/secret, preview secret, poll timeout.
  Throws clear errors only when a *live* path needs a missing value (mock path never throws).
- `oauth.ts` — `getCmpAccessToken()`: client-credentials POST to the token URL, in-memory cache
  with expiry; in mock mode returns a fake token. Pure `fetch`.
- `client.ts` — `CmpClient` with `acknowledgePreview(ackUrl, body)` and `completePreview(completeUrl, body)`.
  Uses `getCmpAccessToken()`, posts JSON, maps 422 → typed error. **Uses the payload `links` URLs**;
  a `buildPreviewUrls(ids)` fallback exists only for tests. Mock mode logs + returns success.
- `webhook.ts` — `parsePreviewRequested(raw)`, `extractContentHash(event, index?)` (the JSON path,
  array-aware), `verifyWebhookSignature(rawBody, header, secret)` (HMAC-SHA256 via `node:crypto`,
  constant-time compare), and `canHandle(event)` content-type guard so we only ack what we render.
- `graphHmac.ts` — `signEpiHmac({key,secret,method,uri,body})` and `queryGraphDraft(query, vars)`
  against `cg.optimizely.com/content/v2`. Pure `node:crypto` (`createHash('md5')`, `createHmac('sha256')`,
  base64). This is the **OCC draft** render source. Mock mode returns a fixture.
- `previewUrl.ts` — `signPreviewToken(payload)` / `verifyPreviewToken(token)` (compact HMAC token via
  `OPTIMIZELY_PREVIEW_SECRET`, not a full JWT — keeps zero-dep) and `buildPreviewUrl({source,key,ver,locale})`
  → absolute, stable URL to `/cmp-preview`. Stable + signed satisfies CMP's "cache once, fetch once".
- `previewBridge.ts` — `handlePreviewRequested(event)`: orchestrates guard → acknowledge →
  `awaitDraftInGraph()` (bounded poll, configurable timeout; short default for demo) → build URL(s) →
  `completePreview()` with a `keyed_previews` map (one key per locale/variant). Returns a structured result.
- `mock.ts` — sample `content_preview_requested` payload fixture + helpers the route uses when `CMP_MOCK=1`.
- `index.ts` — barrel exports.

**Routes (Next.js App Router):**

- `app/api/cmp/preview/route.ts` — `POST` handler: read raw body, `verifyWebhookSignature`,
  `parsePreviewRequested`, call `handlePreviewRequested`, return `200` fast. A `GET` returns a short
  mock-usage hint in dev. (Route handler = new pattern; none exist today.)
- `app/cmp-preview/page.tsx` — render target. `verifyPreviewToken` from query, branch on `source`:
  `cms` → `getClient().getPreviewContent(...)` (reuse `app/preview/page.tsx` shape, incl.
  `withAppContext`, `SiteChrome`, optional `PreviewComponent`); `occ` → `queryGraphDraft(...)`.
  Renders via `<OptimizelyComponent>`.

**Wiring / config:**

- `proxy.ts` — add `cmp-preview` to the matcher negative-lookahead (alongside `preview`) so locale
  rewriting doesn't intercept it.
- `.env.example` — append a documented `# --- CMP preview bridge ---` block:
  `CMP_MOCK=1`, `CMP_API_BASE`, `CMP_OAUTH_TOKEN_URL`, `CMP_CLIENT_ID`, `CMP_CLIENT_SECRET`,
  `CMP_WEBHOOK_SECRET`, `CMP_ACK_USER_ID`, `OPTIMIZELY_GRAPH_HMAC_KEY`, `OPTIMIZELY_GRAPH_HMAC_SECRET`,
  `CMP_PREVIEW_POLL_TIMEOUT_MS` (reuse existing `OPTIMIZELY_PREVIEW_SECRET`).
- `demo-notes/033-cmp-preview-bridge.md` — short README: env setup, mock-run steps, go-live checklist
  (CSM/AE: OAuth client creds + CMP→Graph HMAC enablement), and the experimental-API caveat from 029.

## Reuse (do not reinvent)

- Render path & discriminators: copy the proven shape from `app/preview/page.tsx` (`withAppContext`,
  `SiteChrome`, `OptimizelyComponent`, `PreviewComponent`, communicationinjector `<Script>`).
- Graph client + env: `getClient()` / `OPTIMIZELY_GRAPH_*` from `cms/registry.ts`.
- Reference-fetch precedent for "fetch-by-key, preview-aware": `cms/expandRefs.ts` (`getContent`, locale fallback).
- All crypto via `node:crypto` — mirror the doc's TS HMAC sample but with Node built-ins (no crypto-js).

## Key decisions & assumptions

- **Zero new dependencies** — `node:crypto` covers HMAC/MD5/base64; preview-URL token is a compact
  signed token, not a full JWT (avoids adding `jose`). Flagged in the README if real JWT is later required.
- **Use payload `links`** for ack/complete (doc rule); id-based builder kept only for unit tests.
- **Mock mode is the default** (`CMP_MOCK=1` in `.env.example`) so the flow runs with no live creds;
  going live = set creds + `CMP_MOCK=0`.
- **Draft-wait poll** is bounded and configurable (short default for demo; doc mentions up to ~15 min).
- `acknowledged_by` comes from `CMP_ACK_USER_ID` (no user in a service-to-service flow).
- Library lives in `lib/cmp/` (not `cms/`) so the `./cms/**/*.tsx` push glob never sees it.

## Verification

1. **Mock end-to-end (primary):** `npm run dev` with `CMP_MOCK=1`; `POST` the `mock.ts` fixture to
   `/api/cmp/preview` (curl example in the README). Expect: signature OK → ack logged → draft-wait
   resolves (mock) → `complete` logged with a `keyed_previews` URL. Open that URL → `/cmp-preview`
   renders HTML (try both `source=cms` and `source=occ`).
2. **Crypto correctness:** assert `signEpiHmac` produces the expected `epi-hmac …` header for fixed
   inputs, and `signPreviewToken`/`verifyPreviewToken` round-trip + reject tampering. Run as a small
   `node --test` self-check (Node 22 built-in) over the pure helpers, or inline dev asserts if TS-loading
   a test is awkward.
3. **Build/lint:** `npm run build` and `npm run lint` pass; confirm the new route handler compiles under
   Next 16 and `/cmp-preview` is excluded by `proxy.ts`.
4. **Negative paths:** bad webhook signature → `401`; unhandleable content type → skip ack (no stall);
   `complete` 422 surfaces a typed error.

## Out of scope

Task API events (030) and push/pull publishing ingestion (left as documented future work); real
credential provisioning (CSM/AE); production hardening of the draft-wait (queue/retry) beyond the
bounded poll.
