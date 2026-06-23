To support the migration and rich layout requirements of Louisiana Blue's news, blog, and foundation properties, we need a content type that is highly optimized for editorial reading experiences, SEO, metadata sorting, and interactive content blocks.

We can define a specialized page content type called **`BlogPost`** (inheriting from `_page` or `_experience`). This single, highly versatile content type is designed to handle migrations from WordPress (*Straight Talk Blog* and *Foundation Community Grants*) and Sitecore (*PR & Media Press Kits*).

---

### 1. Proposed Content Type Definition: `BlogPost`

Below is the structured property schema designed to support the distinct requirements of Michael Bertaut's health economics blog, the Foundation’s community grants directories, and press kits:

| Property Name | CMS Property Type | Editorial Group | Purpose & Mapping |
|---|---|---|---|
| **`PageTitle`** | `string` | Information | H1 title of the article/post. Maps from WP `post_title` or Sitecore `displayName`. |
| **`Kicker / Subtitle`** | `string` | Information | A short, punchy sentence shown above or below the main title. |
| **`Excerpt`** | `longString` | Information | A short 2-3 sentence summary of the article for blog card listing views and SEO description. |
| **`Category`** | `string` (selectOne) | Classification | Dropdown selection (e.g., `Health Economics`, `Community Grants`, `Corporate News`, `Brand Resources`) used for filtering. |
| **`Tags`** | `array` (of strings) | Classification | Multi-select tags (e.g., `Michael Bertaut`, `Angel Awards`, `2026 Rebranding`, `Grants`). |
| **`PublishDate`** | `dateTime` | Information | Date published. Controls the chronological ordering of feeds. |
| **`ReadTime`** | `integer` | Information | Estimated read time (in minutes) shown to readers. |
| **`AuthorName`** | `string` | Author Details | Name of the writer (e.g., `"Michael Bertaut"`). |
| **`AuthorTitle`** | `string` | Author Details | The professional title of the writer (e.g., `"Chief Health Economist"`). |
| **`AuthorImage`** | `contentReference` | Author Details | Headshot of the author. Restricted to image types (`_image`). |
| **`HeroImage`** | `contentReference` | Media | Large background image featured at the top of the article. |
| **`BodyContent`** | `richText` (XhtmlString)| Body Content | The core rich text of the blog article (handles standard HTML, lists, inline tables, and styled text). |
| **`ContentBlocks`** | `array` (of `content`) | Layout Components | Content Area allowing editors to drop in specialized blocks (Forms, Grid/Card Selectors, Alert Banners, or Document Downloads). |

---

### 2. Legacy Migration Mapping Matrix (WordPress & Sitecore to Optimizely)

Here is how the legacy content from WordPress and Sitecore maps cleanly into this unified `BlogPost` structure:

#### A. The *Straight Talk Blog* (WordPress ➔ `/news/straight-talk-blog`)
*   **Legacy Fields:** WordPress author bio, post body, category taxonomy, and Michael Bertaut's columns.
*   **Optimizely Mapping:**
    *   Author info maps directly to `AuthorName`, `AuthorTitle`, and `AuthorImage` (which can be a locked shared asset for Michael Bertaut).
    *   The rich editorial body text maps cleanly to `BodyContent` with standard WordPress formatting preserved.
    *   Related articles or "further reading" links can be placed in `ContentBlocks` using the **`GridCardSelectorBlock`** pointing to other published blog posts.

#### B. *Foundation Community Grants* (WordPress ➔ `/news/foundation-grants`)
*   **Legacy Fields:** Grant timelines, Angel Award winners databases, eligibility guidelines, and application forms.
*   **Optimizely Mapping:**
    *   Core guidelines map to `BodyContent`.
    *   **Interactive Grants Application:** Placed under the `ContentBlocks` area using the **`LeadCaptureFormBlock`** (integrated directly with Marketo) to let organizations submit applications or request information.
    *   **Angel Award Winners & Timelines:** Rendered in `ContentBlocks` using the **`GridCardSelectorBlock`** to showcase past winners in a high-contrast 3-column layout.

#### C. *PR & Media Press Kits* (Sitecore ➔ `/news/press-kits`)
*   **Legacy Fields:** Downloadable rebranding PDFs, vector logo ZIP files, and corporate brand color palette tables.
*   **Optimizely Mapping:**
    *   Brand guidelines text maps to `BodyContent`.
    *   **Palette Tables:** Color palette HEX values can be rendered as a rich HTML table inside the `BodyContent` or within a styled block.
    *   **Document Downloads:** High-res vector logos and press kit PDFs can be referenced in `ContentBlocks` using **`CardBlock`** components that contain download links pointing directly to CMS media content (`cms://content/{media`_media` files.

---

### 3. Benefits of this Content Type Model
*   **Federated Search Readiness:** Because metadata properties (`Category`, `Tags`, `AuthorName`) are defined as separate primitive types, **Optimizely Graph** can perform incredibly fast, structured filtering across the entire B2B, consumer, and news sections in one request.
*   **Flexible Layouts:** Keeping `ContentBlocks` as a trailing content area allows simple blog posts to remain text-only, while complex pages (like the Foundation page) can become highly interactive without requiring separate page types.