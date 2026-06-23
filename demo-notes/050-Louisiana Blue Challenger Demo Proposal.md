# Louisiana Blue: "One Louisiana Blue" Challenger Demo Strategy & Design Proposal

This document outlines a **Challenger Demo Website Design** for Louisiana Blue (formerly BCBSLA). It leverages the unified digital experience principles from modern healthcare networks—specifically a patient/member-centric, hyper-personalized role-based experience—to show how Louisiana Blue can collapse its 12 siloed websites into a cohesive, high-performing digital ecosystem on Optimizely CMS, all while running cleanly inside a shared demo environment.

---

## 1. The Challenger Thesis: "One Louisiana Blue"

Louisiana Blue's current digital footprint is highly fragmented, consisting of 12 distinct websites split across **Sitecore** (expensive, developer-bottlenecked, slow to market) and **WordPress** (security risks, brand fragmentation, lack of governance), with various landing pages running on Marketo and Epic. 

The **Challenger Thesis** reframes their perspective:
> **"A member, an employer, a broker, and a provider are not separate audiences requiring separate website platforms—they are different dimensions of the same Louisiana healthcare community. You do not need 12 disconnected sites; you need a single, unified Content Platform governed by a shared Design System, delivering hyper-personalized experiences in real-time."**

By moving from a fragmented multi-platform architecture to **Optimizely's CMS and Optimizely Graph**, Louisiana Blue can unify its digital presence. This eliminates the Sitecore developer bottleneck, provides visual-first low-code editing, secures enterprise-grade compliance, and scales design systems effortlessly.

---

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

---

## 3. The Hyper-Personalized Role-Based Experience (The Personalized Care Play)

Rather than forcing users to navigate to confusing subdomains, the demo homepage (`lablue.com`) employs **Optimizely's Real-Time Personalization** to morph based on visitor profile, search intent, or referral source.

### The Responsive Challenger Homepage Layout
The homepage features a modern, clean, mobile-first design leveraging a unified brand palette:
* **Primary Brand Colors**: Deep Louisiana Blue (`#002F6C`), Crescent Blue (`#009CDE`), and Gold Accent (`#FFC72C`) against a high-contrast Warm Grey background (`#F4F5F7`) for ultimate readability and WCAG compliance.
* **The Dynamic Challenger Hero Section**:
  * **Default (Anonymous/Prospect)**: "Health Insurance Designed for Louisiana." Prominent buttons to "Shop Plans" (Individual or Medicare) and "Find a Doctor."
  * **Employer Segment**: "Simplify Group Coverage for Your Team." Hero shifts to employer management tools, renewal calculators, and open enrollment resources.
  * **Broker Segment**: "The Tools You Need to Grow Your Book of Business." Focuses on commission tracking, client renewals, and marketing kits.
  * **Provider Segment**: "Streamlined Tools for Quality Care." Displays immediate links to Medical Policies, Prior Authorizations, and Billing Guidelines.

---

## 4. Four Core Demo Scenarios (The Challenger Plays)

These interactive scenarios prove Optimizely's superiority over their legacy Sitecore and WordPress configurations.

### Scenario 1: The Visual Builder Re-platform (Sitecore Challenger)
* **Goal**: Prove that marketers can build and publish pages without IT dependency.
* **Action**: Demonstrate the **Optimizely Visual Builder**. Show a marketer dragging and dropping a "Medicare Advantage Open Enrollment" block, editing copy inline, adjusting layout grid systems, and previewing the responsive mobile view instantly.
* **The Challenger Contrast**: Contrast this with Sitecore's rigid, developer-heavy template structure, where a layout adjustment requires a developer sprint and deployment cycle.

### Scenario 2: The Multi-Audience Personalization Play (Audience-Centric Challenger)
* **Goal**: Demonstrate how to create personalized campaigns in minutes.
* **Action**: Configure a personalization campaign targeting "Medicare-Eligible Seniors" in South Louisiana (based on location and age criteria). Show how the homepage hero image and call-to-action dynamically switch to a friendly, community-oriented Medicare Advantage message.
* **The Challenger Contrast**: Site-wide Sitecore personalization requires heavy configuration of profile cards and xDB rules; Optimizely accomplishes this in a visual marketer-facing wizard.

### Scenario 3: Unified AI Knowledge Search (Optimizely Graph & Opal)
* **Goal**: Unify content silos (blogs, news, FAQs, and dashboards) into a single search experience.
* **Action**: Use a single search bar on the homepage powered by **Optimizely Graph**. Search for "prior authorization." The search returns federated results:
  1. A Provider guideline document from `providers.lablue.com`
  2. A Member blog post explaining the process from `straighttalkla.com`
  3. A press release from `news.lablue.com`
* **The Challenger Contrast**: Sitecore and WordPress search are historically siloed. Optimizely Graph indexes all sites and external content platforms headlessly to provide instant, semantic, unified results.

### Scenario 4: Parallel Workflows with Page Branching
* **Goal**: Show collaborative workflow and speed to market.
* **Action**: Show two designers working on the same "Individual Health Plans" landing page concurrently. Using **Page Branching**, Designer A works on a layout branch containing an updated plan comparison grid, while Designer B works on an A/B test branch testing different hero images. They merge their branches into a unified publishing workflow for supervisory review.
* **The Challenger Contrast**: Eliminates Sitecore's "locked item" bottlenecks and WordPress's complete lack of native page branching, enabling rapid, agile team collaboration.

---

## 5. RFP Requirements Mapping to Optimizely CMS

The following table demonstrates how Optimizely CMS directly fulfills Louisiana Blue's exact RFP requirements, highlighting the platform’s native capabilities.

| RFP Category | Louisiana Blue Requirement | Optimizely CMS Native Capability |
|---|---|---|
| **1. General** | Low-code, no-code visual website building | **Optimizely Visual Builder**: Drag-and-drop page composition, visual grid layouts, and direct component editing. |
| **1. General** | Collaborative workflows | **Projects and Collaboration**: In-context commenting, task assignments, and editorial calendars. |
| **2. Design & Content** | Drag-and-drop with shared libraries | **Shared Block Library**: Reusable content blocks stored in centralized folder trees (e.g., `/Sites/Louisiana Blue/`) shared across all domains. |
| **2. Design & Content** | Native A/B Testing & Personalization | **Optimizely Web Experimentation**: Native multi-variant testing and real-time behavioral/demographic personalization. |
| **2. Design & Content** | Visual & Programmatic Headless APIs | **Hybrid CMS & Optimizely Graph**: Deliver structured content headlessly via GraphQL APIs to the MyLABlue SSO Member Portal, while maintaining visual editing for web pages. |
| **3. Workflow** | Page branching | **Page Branching**: Create isolated draft branches of any page or site section for parallel design and editing, merging only upon approval. |
| **3. Workflow** | Site Activity Log & Audit Log API | **Admin Audit Trail**: Granular logging of all system, user, and content actions, accessible via administrative UI or programmatic API. |
| **5. Analytics** | Adobe Analytics Integration | **Optimizely Integration Hub**: Native connectors for Adobe Analytics, Marketo, and Google Tag Manager. |
| **6. Security** | SSO, SCIM, SOC 2 Type II, DDoS | **Opti ID**: Centralized SSO and SCIM provisioning. Optimizely DXP runs on Microsoft Azure with cloud-native Cloudflare/AWS Shield DDoS protection and SOC 2 Type II certification. |
| **6. Security** | Web accessibility (WCAG) | **Optimizely Content Diagnostics**: Integrated, real-time accessibility checking (WCAG 2.1 AA) directly in the content editor. |

---

## 6. Parent Containers for the Implementation

As a best practice for constructing and organizing this demo environment, the following container configurations are established within the CMS space to maintain strict structural alignment:

1. **Parent Page Container**: All demo pages and multi-site experiences will be housed under the parent container page:
   * **Louisiana Blue Parent Page Key**: `48f81cca01654cdea24cea5a82a0881e`
2. **Shared Assets Folder**: All shared design components, blocks, forms, and media will be stored in the designated assets folder:
   * **Assets Folder Path**: `Sites/Louisiana Blue/`
   * **Assets Container Key**: `19c24aa5721740e291776b53964ee7e9`

---
*Source: Louisiana Blue WCMS RFP Requirements & Optimizely Product Documentation.*
