# Louisiana Blue Demo: Content Modeling & Block Properties Schema

This schema defines the **Base Properties** (content models) for the seven high-impact reusable block types suggested for the Louisiana Blue Challenger Demo. 

In Optimizely CMS, these properties represent fields that content editors can edit visually in the **Visual Builder** or headless developers can query via **Optimizely Graph (GraphQL)**.

---

## 1. Universal Navigation Block (`UniversalNavigationBlock`)
Defines the global header, audience segment selectors, utilities, and footer links. It handles secure login redirection via Opti ID.

| Property Name | Data Type | Localizable | Description / Visual Builder Use Case |
|---|---|---|---|
| `BrandLogo` | `Url` (Image) | No | Global corporate or sub-site logo asset. |
| `LogoAltText` | `String` | Yes | Accessible alternative text (WCAG 2.1 AA requirement). |
| `SegmentLinks` | `LinkItemCollection` | Yes | Audience toggles (e.g., "Members", "Employers", "Providers"). |
| `PrimaryNavigation` | `LinkItemCollection` | Yes | Main menu hierarchy links. |
| `UtilityLinks` | `LinkItemCollection` | Yes | Top-right quick actions (e.g., "Find a Doctor", "Contact Us"). |
| `AuthGatewayUrl` | `Url` | No | Target URL routing to the **Opti ID** secure member/provider portal. |
| `FooterLinks` | `LinkItemCollection` | Yes | Columnar lists of bottom-level navigation (privacy, legal, etc.). |

### Headless JSON Structure (Optimizely Graph)
```json
{
  "brandLogo": "/globalassets/brand/la-blue-logo.svg",
  "logoAltText": "Louisiana Blue Home",
  "segmentLinks": [
    { "text": "For Providers", "href": "https://providers.lablue.com" },
    { "text": "For Employers", "href": "https://employers.lablue.com" }
  ],
  "primaryNavigation": [
    { "text": "Shop Plans", "href": "/shop-plans" },
    { "text": "Medicare", "href": "/medicare" }
  ],
  "authGatewayUrl": "https://login.lablue.com/opti-id/sso"
}
```

---

## 2. Dynamic Hero Block (`DynamicHeroBlock`)
The primary visual element on homepages used for **Optimizely Web Experimentation** personalization.

| Property Name | Data Type | Localizable | Description / Visual Builder Use Case |
|---|---|---|---|
| `SuperHeader` | `String` | Yes | Small kicker text placed above the main headline (e.g., "NEW FOR 2026"). |
| `MainTitle` | `String` | Yes | H1 hero title (e.g., "Health Insurance Designed for Louisiana"). |
| `SubTitle` | `String` | Yes | Supporting descriptive paragraph. |
| `HeroImage` | `Url` (Image) | Yes | Background image asset (supports media folder paths). |
| `HeroVideo` | `Url` (Video) | No | Optional MP4 background loop path. |
| `PrimaryCTA` | `LinkItem` | Yes | Core action button (e.g., "Shop Plans"). |
| `SecondaryCTA` | `LinkItem` | Yes | Alternative option button (e.g., "Find a Doctor"). |
| `ContrastMode` | `Boolean` | No | Overrides layout colors to high-contrast warm grey for WCAG accessibility. |

---

## 3. Search Gateway Block (`SearchGatewayBlock`)
A search input box that triggers federated search results across multi-site domains via **Optimizely Graph**.

| Property Name | Data Type | Localizable | Description / Visual Builder Use Case |
|---|---|---|---|
| `PlaceholderText` | `String` | Yes | Default box text (e.g., "Search medical policies, blogs, forms..."). |
| `SearchTargetPage` | `PageReference` | No | The page to redirect the user to display the unified search results card. |
| `EnableTypeAhead` | `Boolean` | No | If true, triggers semantic predictive text as the editor types. |
| `IndexScope` | `String` (Select) | No | Defines search limits (e.g., "Current Site Only", "All Louisiana Blue Sites"). |

---

## 4. Regulatory Disclaimer Block (`RegulatoryDisclaimerBlock`)
A static, audited text block containing legal disclaimers and licensing statements. Stored in the shared folder `/Sites/Louisiana Blue/` to restrict edit access to compliance leads.

| Property Name | Data Type | Localizable | Description / Visual Builder Use Case |
|---|---|---|---|
| `DisclosuresID` | `String` | No | Internal compliance indexing tracking code (e.g., "LA-BLUE-DISC-2026"). |
| `DisclaimerBody` | `XhtmlString` | Yes | Rich text editor supporting formatted compliance text and legal links. |
| `ShowLicensingLogo` | `Boolean` | No | If true, appends the official Blue Cross Blue Shield Association licensing badge. |

---

## 5. Grid / Card Selector Block (`GridCardSelectorBlock`)
A container structure used to feature distinct pathways or programs side-by-side.

| Property Name | Data Type | Localizable | Description / Visual Builder Use Case |
|---|---|---|---|
| `GridTitle` | `String` | Yes | Section title block placed above the grid (e.g., "Plan Benefits"). |
| `GridColumns` | `Integer` | No | Number of grid columns to display (2, 3, or 4 layout options). |
| `CardsArea` | `ContentArea` | Yes | Drag-and-drop area where editors insert nested **Card Blocks** or individual images. |

### Nested Card Block Properties (`CardBlock`)
Each card nested inside the `CardsArea` content area utilizes this base model:
*   `CardIcon`: `Url` (SVG or high-contrast PNG)
*   `CardTitle`: `String` (H3 heading)
*   `CardBody`: `String` (Brief description text)
*   `CardLink`: `LinkItem` (Action button or card-level hit link)

---

## 6. Lead Capture Form Block (`LeadCaptureFormBlock`)
Integrates custom front-end forms with back-end marketing automation platforms.

| Property Name | Data Type | Localizable | Description / Visual Builder Use Case |
|---|---|---|---|
| `FormTitle` | `String` | Yes | Legend title display for the form block. |
| `MarketoProgramID` | `String` | No | Connects the form fields directly to the corresponding **Marketo** campaign routing. |
| `FormFields` | `ContentArea` | Yes | Drag-and-drop container for visual form fields (Text inputs, Picklists, Checkboxes). |
| `SubmitButtonText` | `String` | Yes | Display text for form completion (e.g., "Request Information"). |
| `SuccessRedirectPage` | `PageReference`| No | The landing page shown after successful form submission. |

---

## 7. Network Status Alert Block (`NetworkStatusAlertBlock`)
A global, dismissible alert banner designed for fast-action communications across all digital domains in the event of major status changes.

| Property Name | Data Type | Localizable | Description / Visual Builder Use Case |
|---|---|---|---|
| `AlertSeverity` | `String` (Select) | No | Styling rules: `Info` (Blue), `Warning` (Yellow), `Critical` (Red). |
| `AlertMessage` | `String` | Yes | High-visibility warning text (e.g., "System Outage: Provider portal undergoing maintenance"). |
| `AlertLink` | `LinkItem` | Yes | Directs visitors to updates (e.g., a status updates page). |
| `IsDismissible` | `Boolean` | No | If true, user can click "X" to cache-close the banner on their browser. |
| `GlobalPublish` | `Boolean` | No | If true, forces the alert onto every site root configured under the parent container. |

---
*Source: Louisiana Blue RFP content requirements & Optimizely Developer Content Modeling guidelines.*
