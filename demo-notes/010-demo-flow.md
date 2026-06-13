# Banner Health Demo Flow: The CMS "Content Engine"

This document outlines the high-impact demo narrative for Banner Health, focusing exclusively on **Optimizely DXP as a Content Management System (CMS)**. We move away from "the design" and focus on **Architecture, Reusability, and AI Speed via Opal**.

---

## **Introduction: The "Content-First" Ecosystem**
**Talk Track:** *"Today, we aren't just looking at a website design—we're looking at a **Content Engine**. For an organization as large as Banner Health, the challenge isn't making a page look good; it's managing thousands of clinical data points with 100% accuracy and maximum speed. We’re going to show you how Optimizely DXP and our AI assistant, **Opal**, turn content into a strategic asset."*

---

## **Stage 1: The Template Power (Speed & Governance)**
*   **Focus:** [Homepage Architecture](https://www.bannerhealth.com/)
*   **The CMS Story:** "This homepage is an assembly of **reusable templates**. Instead of hard-coding a banner, your editors use a 'Hero Component' that enforces brand and clinical standards. 
*   **Opal Integration:** *"Speed is critical. I'll ask **Opal** to analyze our brand guidelines and generate five high-intent copy variations for this hero banner. In seconds, Opal provides on-brand, SEO-optimized text, allowing our team to launch a campaign this morning rather than next week."* **(Req ID 28)**
*   **Key Value:** **Operational Speed.** Decoupling the 'Style' from the 'Source' so editors can move fast without breaking the design.

---

## **Stage 2: Discovery (Structured Content Architecture)**
*   **Focus:** [Services Index](https://www.bannerhealth.com/services)
*   **The CMS Story:** "These aren't 'cards' on a page; they are **Data Objects**. Each service is an instance of a structured 'Service Content Type.' The headline, clinical description, and metadata live in a central library.
*   **Opal Integration:** *"Managing thousands of services is a taxonomy nightmare. We use **Opal** to automatically scan clinical documents and suggest the correct **Taxonomy Tags (Req ID 11)**. Opal ensures that every new service is accurately categorized for search engines and internal navigation, removing hours of manual data entry."*
*   **Key Value:** **Global Accuracy.** Update a clinical fact in the 'Cardiology' object once, and it propagates to every page, app, and kiosk in the network.

---

## **Stage 3: Intent (Metadata-Driven Intelligence)**
*   **Focus:** [Heart Services Layout](https://www.bannerhealth.com/services/heart)
*   **The CMS Story:** "The intelligence here isn't in the 'look'; it's in the **Metadata**. Because our content is structured, the Data Platform (ODP) doesn't just see a 'visit.' It sees that a user is interacting with a specific 'Treatment Object' tagged with 'High-Value/Surgical.' 
*   **Opal Integration:** *"I can ask **Opal** to generate a personalized 'Summary' for this user based on their interaction. Opal takes our deep clinical content and reformats it into a 'Friendly Path' for a first-time visitor, ensuring we meet the user at their level of health literacy."*
*   **Key Value:** **Precision Personalization.** Using structured data to feed the personalization engine (ODP) without manual rule-setting.

---

## **Stage 4: Context (Decoupled Data Integration)**
*   **Focus:** [Urgent Care API Templates](https://www.bannerhealth.com/locations/urgent-care/phoenix)
*   **The CMS Story:** "This page demonstrates **Headless Capability (Req ID 34)**. The CMS provides the layout template, but the 'Wait Times' and 'Location Data' are pulled in via real-time APIs. The content is 'decoupled,' meaning the same location data can be pushed to a mobile app or a wearable device without re-authoring."
*   **Opal Integration:** *"If a clinic's hours change, **Opal** can proactively alert the marketing team to update the 'Facility Object' in the CMS, ensuring that the patient never sees conflicting information between the website and the physical clinic sign."*
*   **Key Value:** **Omnichannel Resilience.** One source of truth for location data served anywhere.

---

## **Stage 5: Conversion (Data Orchestration)**
*   **Focus:** [Clinic Destination Assembly](https://www.bannerhealth.com/locations/phoenix/university-medicine-heart-institute)
*   **The CMS Story:** "The final stage is **Data Orchestration**. This page is a dynamic assembly of three different data sources: The CMS (Marketing Content), the Provider Directory (Doctor Info/Ratings), and the Map API (Directions). Optimizely acts as the 'Glue' that brings these disparate systems into a single, cohesive patient experience."
*   **Opal Integration:** *"Before we publish this new Institute page, we use **Opal** to perform a **Governance Audit**. Opal checks for WCAG accessibility compliance, HIPAA-sensitive language, and broken links, ensuring a perfect launch every time."* **(Req ID 7, 32)**
*   **Key Value:** **Risk Mitigation & Trust.** Automating the 'Final Review' to ensure every patient touchpoint is secure, compliant, and accurate.

---

## **The Demo "Closing Statement"**
> *"We’ve shown you today that Optimizely isn't just a way to build a website—it’s a way to manage your clinical and marketing expertise at scale. By using **Structured Content** and **Opal AI**, we’ve removed the manual friction, allowing Banner Health to focus on what matters: delivering the right care to the right patient at the right time."*
