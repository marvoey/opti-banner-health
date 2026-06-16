# CMP preview bridge (`lib/cmp`)

A self-contained bridge that runs the CMP **content-preview** protocol
(`content_preview_requested` → **acknowledge** → render → **complete**) against
this app, reusing the Optimizely Graph + `@optimizely/cms-sdk` delivery layer.
Built from the contract in `029`/`031`/`032`; concepts in `020`/`021`.

> ⚠️ The CMP structured-content preview APIs are marked **Experimental** (029).
> Endpoints/payloads may change. This ships in **mock mode by default**.

## Pieces

| Path | Role |
|---|---|
| `lib/cmp/` | The bridge library (see below) |
| `app/api/cmp/preview/route.ts` | Webhook receiver — verifies signature, drives the protocol |
| `app/cmp-preview/page.tsx` | Render target CMP fetches (signed token; `occ` or `cms` source) |
| `proxy.ts` | `cmp-preview` excluded from locale rewriting |
| `.env.example` | `# --- CMP preview bridge ---` block |

**Library modules:** `config` (env + `CMP_MOCK`), `oauth` (client-credentials token),
`client` (acknowledge/complete), `webhook` (parse, HMAC verify, content-hash extract,
handleability guard), `graphHmac` (`epi-hmac` Graph draft reads), `previewUrl` (signed
stable token), `previewBridge` (orchestrator), `mock` (fixtures), `index` (barrel).

## Run it in mock mode (no credentials)

```bash
npm run dev                      # CMP_MOCK=1 is the default in .env.example
# 1. grab the sample payload
curl -s http://localhost:3006/api/cmp/preview | jq .sample > /tmp/cmp-sample.json
# 2. fire the webhook
curl -X POST http://localhost:3006/api/cmp/preview \
  -H 'content-type: application/json' --data @/tmp/cmp-sample.json
```

Expect a `200` with `{ handled, acknowledged, completed, previewUrls }`. The server log
shows the mocked `acknowledge` and `complete` POSTs. Open the `previewUrls` value in a
browser → `/cmp-preview` renders the OCC field viewer (default `CMP_PREVIEW_SOURCE=occ`).
Set `CMP_PREVIEW_SOURCE=cms` to render content modelled in this instance instead.

## Protocol (verified contract)

- **Webhook** `content_preview_requested`; `content_hash` at
  `$.data.assets.structured_contents[i].content_body.fields_version.content_hash`.
  Acknowledge/complete URLs come from `data.links` and are used **as-is** (doc rule).
- **Acknowledge** `POST …/acknowledge` `{ acknowledged_by, content_hash }` → 200/422. **Once only.**
- **Complete** `POST …/complete` `{ keyed_previews: { [label]: url | {completed,…} | {error,…} } }` → 200/422.
- **OCC draft read** `POST https://cg.optimizely.com/content/v2`, header
  `Authorization: epi-hmac <key>:<timestamp>:<nonce>:<base64hmac>`.

## Going live (CMP_MOCK=0)

Provision via your CSM/AE, then fill `.env`:

1. **CMP OAuth2 client** → `CMP_CLIENT_ID`, `CMP_CLIENT_SECRET`.
2. **Webhook signing secret** → `CMP_WEBHOOK_SECRET` (the receiver returns `401` without a valid signature). Confirm the real signature header name and scheme and adjust `app/api/cmp/preview/route.ts` / `verifyWebhookSignature` if needed.
3. **CMP→Graph sync + HMAC key** for OCC drafts → `OPTIMIZELY_GRAPH_HMAC_KEY`, `OPTIMIZELY_GRAPH_HMAC_SECRET`.
4. Set `CMP_APP_ORIGIN` to the deployed origin and `CMP_MOCK=0`.
5. Register `https://<origin>/api/cmp/preview` as the CMP webhook target.

## Known gaps / follow-ups

- **OCC GraphQL query** in `graphHmac.ts` is a best-effort placeholder — adjust the type
  name and field selection to the real OCC schema (`I`-prefixed abstract type) once sync is on.
- **CMS source** renders the latest version by key; wiring a CMS-issued preview token for
  unpublished drafts is a follow-up.
- Preview-URL token is a compact HMAC token, **not a JWT** (zero-dep). Swap to `jose` if
  real JWT interop is required.
- Draft-wait is a bounded poll (default 15s); production may want a queue/retry.
- Out of scope: Task API events (030), push/pull publishing ingestion.
