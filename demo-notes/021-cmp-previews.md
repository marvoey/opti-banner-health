# CMP content previews — protocol + how this app fits

Clean-markdown capture of `03-WORK-WITH-PREVIEWS.HTML` plus notes on how it maps to
this Next.js + Optimizely Graph app. For the big-picture through-line across all five
CMP docs, see `020-cmp-overview.md`.

> **Don't conflate two "previews."** This doc is the **CMP** preview protocol — a
> webhook-driven handshake that renders a thumbnail/preview *inside a CMP task and
> library*. It is **not** our existing CMS SaaS live-preview / on-page-editing route
> (`app/preview/page.tsx`), which the CMS opens directly with `preview_token, key,
> ctx, ver, loc`. They're cousins (both render a draft) but mechanically separate.

---

## The protocol (entirely API-driven)

Three steps, all over CMP webhooks/APIs:

1. **Preview requested** — CMP fires a `content_preview_requested` webhook. The
   generator first checks the content type in the payload (*"can I render this?"*) and
   reads the **`content_hash`** at:
   ```
   $.data.assets.structured_contents[_index_].content_body.fields_version.content_hash
   ```
   `content_hash` is a digest of the content's version; the acknowledgment carries it
   so CMP can tell whether a cached preview is outdated.

2. **Acknowledge** — POST back that *this* system will generate the preview.
   Acknowledgment exists because CMP doesn't know up front whether anything can render
   a given type (some types never get a preview). **Only one system may acknowledge** a
   given content — any subsequent ack errors.

3. **Complete** — POST a `keyed_previews` dictionary of `{ key → HTML URL }`.
   - The **key is the dropdown label** shown in CMP; you may return **multiple**
     previews (locales, personalized variants, multi-channel renders) in one response.
   - The URL must point to an **HTML** file. If it's behind auth, embed a **JWT** in
     the URL.
   - CMP **caches the URL indefinitely and fetches it once** — so the URL must be
     stable and self-contained.

---

## Two render strategies

### Push strategy (store-and-render CMS) — *not us*
- Acknowledge after confirming you handle the content type.
- Create **draft content** in the CMS from the payload; copy assets (or serve them from
  the CMP DAM CDN).
- Generate a preview URL for that draft (+ auth tokens), call complete.
- Wait ~15 min, then clean up the draft (the preview is cached on CMP).

### Pull strategy (runtime fetch) — **this app**
> *"the renderer fetches data at runtime, so integration middleware does not need to
> create draft content."*
- Predictably generate the preview URL.
- **Wait for the content to be available as a `Draft` in Optimizely Graph.**
- Call complete with that URL.
- **Auth:** use **HMAC** to read draft content from Graph. Publicly-accessible related
  assets via Graph need the integration enabled by your **CSM/AE**.

#### HMAC request shape (from the doc's TypeScript sample)
- Endpoint: `https://cg.optimizely.com` + uri `/content/v2`, `POST`.
- Header: `Authorization: epi-hmac <key>:<timestamp>:<nonce>:<base64hmac>`.
- Signature: `HmacSHA256( key + method + uri + timestamp + nonce + md5Base64(body), base64Decode(secret) )`, base64-encoded.
- ⚠️ The sample uses `new Date().getTime()` and `Math.random()` for timestamp/nonce —
  fine in a normal request handler, but **banned inside this repo's workflow scripts**
  (per `AGENTS.md` tooling), so don't lift it into one.

---

## How it maps to this app

| Need | Status here | Note |
|---|---|---|
| Route that renders a draft via Graph pull | ✅ pattern exists | `app/preview/page.tsx` renders through our `cms/` resolvers |
| Listener for `content_preview_requested` | ❌ | new API route |
| `acknowledge` → `complete` (`content_hash`, `keyed_previews`) | ❌ | the middleware glue |
| **HMAC** auth to read **drafts** from Graph | ❌ | different credential than our published-site `apiKey` |
| Stable, self-contained preview URL (+ JWT if gated) | ⚠️ | CMP fetches once, caches forever |

Ties back to `02-PUSH-AND-PULL`: the pull preview literally waits for `Status: Draft`
to appear in Graph before completing.

---

## If we build it (sketch)

1. Add a webhook route handler: validate type → read `content_hash` → **acknowledge**.
2. Poll/await the `Draft` in Graph (HMAC client).
3. Build a stable preview URL targeting a route that reuses the `/preview` renderer.
4. **Complete** with `keyed_previews` (one key per locale/variant as needed).

Keep it as a clearly-marked spike alongside the existing CMS preview so the two
don't interfere.

---

_Source: `03-WORK-WITH-PREVIEWS.HTML` (repo root). Related: `020-cmp-overview.md`,
`CONTENT-ARCHITECTURE.md`, `app/preview/page.tsx`._
