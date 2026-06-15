# Visual Builder assembly guide

How to assemble each mock page as an Optimizely CMS **Visual Builder Experience**
from the `BannerDemo*` blocks. Each is a **Blank Experience** published at the
listed URL, built from single-element, reference-based blocks (no grid drag-drop).

## General notes (apply to every page)
- **Routing:** only `/mock**` is static; every other path routes to the CMS. **No
  proxy change** is needed — just publish the experience at the target URL.
- **Header/footer:** rendered automatically by `SiteChrome` (published pages and
  the VB preview) — do **not** add them as blocks.
- **Reference blocks** (cards picked via a reference field) require their library
  items to be **published** to show on the live page. The VB preview shows drafts
  (expansion is preview-aware), but publish before going live.
- **After pushing new content types**, allow a short **Graph reindex lag** before
  blocks appear / pages stop 400ing — refresh, or publish one instance of each new type.
- Blocks self-center (own container), so drop them directly in the experience outline.

---

## 1. Home — published at `/`
1. **Hero** — `kicker`, `headline`, `description`, `primaryCta`, `secondaryCta`, and
   either `imageUrl` (e.g. the Unsplash hero URL) or a DAM `image` (+ `imageAlt`).
2. **Quick Care Cards** — reference published **Quick Care Card** items (Find a
   Doctor, Urgent Care, Find a Location, Classes & Events: `title`/`description`/`icon`/`link`).
3. **Services Grid (Auto)** — `title`/`description`/`cta` + reference published
   **Service** items. (Or the **Services Grid** section + **Services Header** + dropped
   **Service** cards.)
4. **Testimonial** — `quote`, `attribution`.

## 2. Services directory — published at `/services`
Create + publish the **Service** items first (Cardiology = `featured`, link → `/services/heart`).
1. **Services Hero** — `headline` ("Conditions & Services"), `description`, `searchPlaceholder`.
2. **Services Grid (Auto)** ×3 — one per category; set `title`/`description`, reference
   that category's Service items, and set **Card Style = Simple**, **Columns = 3**:
   - Everyday Medicine — Urgent Care, Primary Care, Pediatrics, Imaging, Telehealth, Laboratory
   - Specialty Care — Cardiology, Cancer Care, Neurosciences, Orthopedics, Women's Health, Maternity
   - Rehab & Support — Physical Therapy, Behavioral Health, Hospice, Home Care, Diabetes Care, Wound Care
3. **Service CTA Banner** — `heading` ("Not sure which service you need?"),
   `description`, `cta` ("Start Symptom Checker").

## 3. Heart specialty — published at `/services/heart`
Create + publish the **Condition** items first (Heart Valve Disease, Arrhythmia,
Heart Failure, Vascular Care, Cardiac Rehab, Pediatric Heart: `title`/`description`/`icon`).
1. **Detail Hero** — `breadcrumbParent` ("Services") / `breadcrumbCurrent` ("Heart &
   Cardiovascular"), `headline` ("World-Class Heart Care"), `description`, `cta`
   ("Find a Heart Specialist"), `imageUrl` (or `image`), `badgeTitle` ("Preferred
   Choice") / `badgeText` ("Ranked #1 …").
2. **Condition Grid** — `heading` ("Conditions We Treat"), `description`,
   `trackingLabel` ("ODP Intent Tracking Active"), reference the **Condition** items.

## 4. Locations hub — published at `/locations`
Create + publish the **Location** items first (the 3 Phoenix urgent-care sites:
`name`/`address`/`wait`/`status`/`scheduleLink`/`phone`).
1. **Location Search Hero** — `headline` ("Urgent Care Near You"), `searchPlaceholder`
   ("Phoenix, AZ"), `ctaLabel` ("Update Location").
2. **Location Results** — reference the **Location** items; optionally set
   `sortLabel`, `mapImageUrl`, `mapLoadingLabel` (defaults match the mock).

## 5. Facility detail — published at `/locations/urgent-care/phoenix`
Create + publish the **Doctor** items first (Dr. Paul Sorajja, Dr. Wilber Su:
`name`/`specialty`/`rating`/`reviews`/photo/`profileLink`/`bookLink`).
1. **Facility Hero** — `breadcrumb` (["Locations","Phoenix","Heart Institute"]),
   `headline`, `addressLine1`/`addressLine2`, `phone`, `primaryCta` ("Schedule
   Appointment") / `secondaryCta` ("Get Directions"), `specializationsTitle`
   ("Institute Specializations") + `specializations` (Structural Heart, Heart
   Transplant, Valve Clinic, Aortic Care, Clinical Trials, Vascular Center).
2. **Facility Info** — `image`/`imageUrl`, `heading` ("Visit the Institute"), two
   info blocks (Hours of Operation; Parking Information — each `label`/`primary`/`secondary`),
   `disclaimer`.
3. **Featured Doctors** — `heading` ("Meet Our Phoenix Specialists"),
   `directoryLabel`/`directoryLink` ("View Full Directory"), reference the **Doctor** items.

---

### Presentation options worth knowing
- **Services Grid (Auto):** `Card Style` (Rich / Simple) and `Columns` (2/3/4) are
  **content fields** on the block (same panel as Title) — the same referenced
  Service content renders either way.
- **Blank Section** (if you use one): `Vertical Overlap` and `Content Width` are
  **display-template settings** (Styles panel).
- **Services Grid** (section, not Auto): `Columns` is a display-template setting (Styles panel).
