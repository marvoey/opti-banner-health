## 2. Multi-Site Architecture & Shared Asset Library (The Enterprise Governance Model)

To solve the multi-site challenge in a shared demo environment, the demo showcases a consolidated **Single Root Multi-Tenant Site Tree** inside Optimizely CMS, governed by a single, WCAG 2.1 AA-compliant design system. 

Optimizely CMS allows multiple distinct sites with unique domains to be provisioned under a **Single Root Parent Node**. This allows Louisiana Blue to isolate this entire ecosystem under a single node, preventing interference with other demos running in the same tenant.

### 2.1 Proposed Demo Page Structure & Existing Content Sources
Under the single parent container, we establish the core pages for the demo. Each child page node designated with "Site Start" acts as the homepage for that specific business segment, complete with its own theme and navigation tree. 

To make the demo as realistic and resonant as possible, content is gathered directly from Louisiana Blue's existing properties, showing how they seamlessly transition to Optimizely:

```
[Optimizely CMS Shared Tenant]
└── 🌐 Single Root: Louisiana Blue Parent (Key: 48f81cca01654cdea24cea5a82a0881e)
    │
    ├── 📄 Site Start: lablue.com (Main Consumer Portal) ◄── [Source: lablue.com & MyLABlue SSO Content]
    │   ├── 📄 Shop Plans (Individual & Family) ◄── [Source: lablue.com/shop-plans & Marketo Landing Pages]
    │   ├── 📄 Find a Doctor (Provider Search) ◄── [Source: lablue.com/find-a-doctor]
    │   └── 📄 Medicare Advantage ◄── [Source: blueadvantage.lablue.com]
    │       ├── 📄 2026 Benefits & Coverage ◄── [Source: blueadvantage.lablue.com/medicare/benefits]
    │       └── 📄 Pharmacy & Formulary Lookup ◄── [Source: blueadvantage.lablue.com formulary documents]
    │
    ├── 📄 Site Start: employers.lablue.com (B2B Enterprise Hub) ◄── [Source: employers.lablue.com]
    │   ├── 📄 Small & Large Group Plans ◄── [Source: employers.lablue.com plan documents]
    │   ├── 📄 Broker Resource Center ◄── [Source: producers.lablue.com & accessblue.lablue.com]
    │   └── 📄 ROI & Premium Calculator ◄── [Source: Epic & Marketo calculation logic]
    │
    ├── 📄 Site Start: providers.lablue.com (Clinical Portal) ◄── [Source: providers.lablue.com]
    │   ├── 📄 Prior Authorization Request Gateway ◄── [Source: providers.lablue.com authorizations portal]
    │   └── 📄 Medical Policy Search Directory ◄── [Source: providers.lablue.com medical policies index]
    │
    └── 📄 Site Start: news.lablue.com (Newsroom & Foundation) ◄── [Source: news.lablue.com]
        ├── 📄 Straight Talk Blog ◄── [Source: straighttalkla.com]
        ├── 📄 Foundation Community Grants ◄── [Source: labluefoundation.org]
        └── 📄 PR & Media Press Kits ◄── [Source: news.lablue.com press resources]
```

### Detailed Content Mapping Matrix
This matrix details the exact files, text, and tools to harvest from the legacy Sitecore and WordPress sites to construct each demo page:

| Proposed Demo Page | Existing Website Source | Core Content & Assets to Gather |
|---|---|---|
| **`lablue.com` (Homepage)** | `lablue.com` & `MyLABlue SSO content` (Sitecore) | Corporate logos (new rebranding), main consumer navigation hierarchy, member portal secure login gateway, and family-oriented consumer photography. |
| **`Shop Plans`** | `lablue.com/shop-plans` & Marketo Landing Pages | Copay/deductible comparison grids, plan eligibility guidelines, regional availability zip-code checkers, and enrollment lead forms. |
| **`Find a Doctor`** | `lablue.com/find-a-doctor` (Sitecore) | Physician search filters (specialty, location, zip, languages), primary Care Physician (PCP) networks, and clinic locator map data. |
| **`Medicare Advantage`** | `blueadvantage.lablue.com` (Sitecore) | CMS-mandated senior-targeted photography, eligibility checklist copy, open enrollment timers, and federally mandated legal disclaimers. |
| **`2026 Benefits & Coverage`** | `blueadvantage.lablue.com/medicare` | Dental, vision, and hearing coverage tables, premium breakdown schedules, and 2026 Summary of Benefits PDF directories. |
| **`Pharmacy & Formulary Lookup`**| `blueadvantage.lablue.com` pharmacies | Prescription drug formulary lists (PDF search engines), tier structures (preferred vs. non-preferred generic), and mail-order pharmacy sign-up instructions. |
| **`employers.lablue.com`** | `employers.lablue.com` (Sitecore) | Administrative portal quick-links, group renewal calculators, wellness program options, and employer account management materials. |
| **`Small & Large Group Plans`** | `employers.lablue.com` directories | Fully-insured vs. self-funded benefit breakdowns, enrollment grids, employee benefits booklets, and group health brochures. |
| **`Broker Resource Center`** | `producers.lablue.com` & `accessblue` (Sitecore) | Broker licensing forms, commission schedule grids, marketing assets (logos, flyers), and producer dashboard resources. |
| **`ROI & Premium Calculator`** | Legacy landing pages | Quote form fields, employee demographic upload sheets, and background premium math. |
| **`providers.lablue.com`** | `providers.lablue.com` (Sitecore) | Claims check resources, provider manuals, news bulletin archives, and electronic health record portal links. |
| **`Prior Auth Gateway`** | `providers.lablue.com` (Sitecore) | Code lookup input fields (CPT/HCPCS), clinical criteria PDFs, and electronic prior-authorization request forms. |
| **`Medical Policy Search`** | `providers.lablue.com` directories (Sitecore) | Medical policy PDF database (including chiropractic and bioengineered skin policies), medical coding guidelines, and updates log tables. |
| **`news.lablue.com`** | `news.lablue.com` (Sitecore) | Press release feed content, executive bios, media spokesperson contact cards, and corporate re-branding press kits. |
| **`Straight Talk Blog`** | `straighttalkla.com` (WordPress) | Michael Bertaut's health economics articles, blog author biography, rich-text article copy, and editorial commentary grids. |
| **`Foundation Grants`** | `labluefoundation.org` (WordPress) | Grant funding eligibility guides, past Angel Award winners databases, community application forms, and grant timeline charts. |
| **`PR & Media Press Kits`** | `news.lablue.com` (Sitecore) | Rebranding brand-guide PDFs, downloadable high-res vector logo assets, corporate fact sheets, and brand color palette hex tables. |

---

### 2.2 Suggested Reusable Block Types (Shared Asset Library)
Stored in the isolated folder path `Sites/Louisiana Blue/` (Key: `19c24aa5721740e291776b53964ee7e9`), these blocks are built once and shared across the entire page structure. They demonstrate how global design updates and layout overrides work in real-time.

| Block Name | Block Purpose | Demo Application / Multi-Site Use Case |
|---|---|---|
| **Universal Navigation Block** | Unified, WCAG-compliant header and footer. | Shared across all 4 root sites. It features a dropdown segment selector and an **Opti ID** secure login gateway. |
| **Dynamic Hero Block** | Visually-built hero section with background video, text overlays, and dual CTAs. | Used on all homepages. It serves as the canvas for **Optimizely Web Experimentation** personalization (shifting copy/imagery for members vs. providers). |
| **Search Gateway Block** | Centralized search field powered by **Optimizely Graph**. | Positioned on `lablue.com` and `providers.lablue.com`. Delivers federated search results across medical policies, member blogs, and PR. |
| **Regulatory Disclaimer Block** | Static content block containing CMS-mandated licensing and legal notices. | Locked and stored in the Shared Assets folder. Changing it once instantly updates the footer disclaimers on all 12 properties. |
| **Grid / Card Selector Block** | Container that holds 3-4 feature cards with high-contrast icons, headers, and buttons. | Used on `lablue.com` to feature plans, on `providers.lablue.com` to feature clinical tools, and on `employers.lablue.com` to highlight group plan tiers. |
| **Lead Capture Form Block** | Reusable, drag-and-drop form integrated with **Marketo**. | Placed on "Shop Plans" (consumer) and "Foundation Community Grants" (philanthropy) to capture and route user leads. |
| **Network Status Alert Block** | A high-visibility, dismissible notification strip (yellow/red) placed at the top of pages. | Kept in the shared library. Allows marketing admins to publish emergency network updates (e.g., natural disasters, portal maintenance) globally across all domains in one click. |