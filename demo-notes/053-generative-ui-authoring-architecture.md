# Generative UI Architecture for CMS Authoring

## Core Framing

Generative UI for authors is **not**:

> AI assembles the live page for visitors at runtime.

Generative UI for authors is:

> AI helps authors create the right page structure before publishing.

This distinction is important. The goal is not to remove governance, editorial control, compliance review, or CMS publishing workflows. The goal is to make page creation faster, smarter, and more consistent by allowing authors to describe what they want to create and receive a structured, editable page draft using approved content types and reusable components.

In this model, authors do not start with a blank page or manually select every block. Instead, they describe the page goal, audience, topic, and desired outcome. The system then recommends a page structure composed of approved CMS blocks, content types, layout patterns, and governance rules.

The author remains in control.

---

## Authoring-First Generative UI Workflow

```text
Author intent
→ AI page planner
→ suggested page structure
→ editable CMS blocks
→ author review and refinement
→ compliance / governance validation
→ publish
```

Example author prompt:

> Create a Medicare Advantage landing page for people turning 65 in Louisiana.

Generated editable page draft:

```text
1. Hero Block
2. Eligibility Checklist
3. Plan Comparison Cards
4. Enrollment Timeline
5. Doctor and Pharmacy Lookup CTA
6. Medicare FAQ Block
7. Regulatory Disclaimer
8. Lead Capture Form
```

The system is not creating an unpredictable live experience for each visitor. It is helping the author assemble a strong starting point inside the CMS.

---

## Why This Is a Better Fit for Enterprise CMS

For a regulated healthcare organization, runtime assembly can introduce concerns around compliance, accessibility, legal review, brand governance, and content accuracy. An authoring-first approach keeps the benefits of Generative UI while preserving enterprise control.

| Runtime Generative UI | Authoring Generative UI |
|---|---|
| UI changes live for each visitor | AI drafts pages before publishing |
| Visitor intent drives layout | Author intent drives layout |
| Harder to govern | Easier to approve |
| Dynamic rendering at runtime | Editable CMS page structure |
| Higher compliance risk | Human-in-the-loop governance |
| More complex testing | Fits existing publishing workflows |

The authoring-first model positions AI as a **page creation assistant**, not an autonomous publishing engine.

---

## Proposed Architecture

```text
Author Prompt
   ↓
Authoring Assistant / AI Page Planner
   ↓
Content Type + Block Registry
   ↓
Governance Rules
   ↓
Suggested Page Blueprint
   ↓
CMS Draft Page
   ↓
Author Review
   ↓
Workflow Approval
   ↓
Published Page
```

### Key Architectural Components

#### 1. Author Prompt Interface

A CMS author describes the page they want to create in plain language.

Examples:

```text
Create a provider page for prior authorization.
```

```text
Create a landing page for small businesses shopping for group health plans.
```

```text
Create a newsroom page announcing a new community health grant.
```

The prompt should capture:

- Audience
- Business line
- Page goal
- Topic
- Desired call to action
- Required compliance or legal content
- Preferred tone
- Existing content to reuse

---

#### 2. AI Page Planner

The AI Page Planner interprets the author’s request and maps it to approved page patterns, content types, and blocks.

Its job is to answer:

```text
What type of page is this?
What blocks should it include?
What order should those blocks appear in?
What content is required?
What governance rules apply?
What CTAs make sense?
```

The output is a structured page blueprint, not a final uncontrolled web page.

---

#### 3. Content Type and Block Registry

The registry defines what the AI is allowed to use.

Example reusable blocks:

| Block | Purpose |
|---|---|
| Universal Navigation Block | Shared header, footer, segment navigation, login gateway |
| Dynamic Hero Block | Page introduction, primary CTA, audience-specific messaging |
| Search Gateway Block | Search across providers, medical policies, articles, or resources |
| Regulatory Disclaimer Block | Required legal and compliance language |
| Grid / Card Selector Block | Feature cards, plan cards, resource cards, task cards |
| Lead Capture Form Block | Forms integrated with marketing automation or CRM |
| Network Status Alert Block | Emergency, maintenance, or service disruption alerts |
| FAQ Block | Common questions and answers |
| Comparison Table Block | Plan, benefit, or service comparisons |
| Timeline Block | Enrollment, claims, or process steps |
| Document Download Block | PDFs, forms, policy documents, guides |

The AI cannot invent arbitrary UI. It selects from governed building blocks.

---

#### 4. Governance Rules

Governance rules constrain and validate what the AI recommends.

Examples:

```text
Medicare pages must include approved disclaimers.
Provider pages must include policy search or support pathways.
Lead capture forms must include privacy language.
Pages must use WCAG 2.1 AA-compliant components.
Emergency alerts can only use approved alert styles.
Legal disclaimers must be pulled from shared content, not generated from scratch.
```

This allows the AI to operate safely within enterprise rules.

---

#### 5. Page Blueprint Output

The AI produces a structured page plan that can be converted into a CMS draft.

Example:

```json
{
  "pageType": "Medicare Landing Page",
  "audience": "People turning 65 in Louisiana",
  "goal": "Educate and drive plan exploration",
  "recommendedBlocks": [
    {
      "type": "HeroBlock",
      "purpose": "Introduce Medicare Advantage options",
      "required": true
    },
    {
      "type": "EligibilityChecklistBlock",
      "purpose": "Help users understand whether they qualify",
      "required": true
    },
    {
      "type": "PlanComparisonBlock",
      "purpose": "Compare available plans",
      "required": true
    },
    {
      "type": "EnrollmentTimelineBlock",
      "purpose": "Explain enrollment windows and next steps",
      "required": false
    },
    {
      "type": "FAQBlock",
      "purpose": "Answer common Medicare questions",
      "required": false
    },
    {
      "type": "RegulatoryDisclaimerBlock",
      "purpose": "Display required Medicare compliance language",
      "required": true
    }
  ]
}
```

---

## Applying This to the Multi-Site Architecture

The existing multi-site model can support authoring-first Generative UI very well.

Instead of manually creating each page across each domain, authors can generate draft pages by business segment.

| Site / Domain | Author Prompt Example | Generated Page Pattern |
|---|---|---|
| lablue.com | Create a page for individuals shopping for family coverage | Consumer plan landing page |
| employers.lablue.com | Create a page for small businesses evaluating group plans | Employer decision page |
| producers.lablue.com | Create a broker resource page for plan selling materials | Broker resource hub |
| providers.lablue.com | Create a prior authorization support page | Provider task page |
| blueadvantage.lablue.com | Create a page for people turning 65 | Medicare enrollment page |
| news.lablue.com | Create a press release page for a community initiative | Newsroom article page |
| labluefoundation.org | Create a grant application landing page | Foundation campaign page |

The AI understands the target site, audience, content model, and approved blocks. It then creates a draft page that fits that specific business context.

---

## Example: Provider Prior Authorization Page

Author prompt:

> Create a provider page that helps clinics submit prior authorization requests and find medical policies.

Suggested page structure:

```text
1. Provider Task Hero
   - Clear title
   - Short explanation
   - Primary CTA: Start prior authorization

2. Prior Authorization Gateway
   - Request type selector
   - Link to portal login
   - Required documentation guidance

3. Medical Policy Search
   - Search by procedure, code, or policy name

4. Required Forms and Downloads
   - Most-used authorization forms
   - Specialty-specific documents

5. Provider FAQ
   - Turnaround times
   - Required information
   - Appeal process

6. Contact Support Block
   - Provider service phone number
   - Secure message option

7. Regulatory Disclaimer
   - Approved shared disclaimer content
```

The author can accept the structure, remove blocks, reorder sections, edit copy, attach approved assets, and submit the draft into workflow.

---

## Example: Employer Group Plans Page

Author prompt:

> Create a landing page for small and mid-sized employers comparing group health plan options.

Suggested page structure:

```text
1. Employer Hero
2. Group Plan Overview Cards
3. Cost and Premium Calculator
4. Benefits Comparison Table
5. Broker / Sales Contact CTA
6. Case Study or Testimonial Block
7. FAQ Block
8. Lead Capture Form
9. Legal Disclaimer
```

This page is not assembled live for each employer visitor. It is generated as an editable CMS draft for the author to review and publish.

---

## Example: Medicare Turning 65 Page

Author prompt:

> Create a Medicare Advantage page for Louisiana residents turning 65.

Suggested page structure:

```text
1. Medicare Hero
2. Eligibility Checklist
3. Enrollment Timeline
4. Plan Comparison Cards
5. Doctor and Pharmacy Lookup CTA
6. Educational FAQ
7. Speak With an Advisor CTA
8. Regulatory Disclaimer
```

The system should automatically know that Medicare-related content requires approved compliance language and that disclaimers should come from a shared governed content source.

---

## Authoring Experience Design

The CMS authoring interface should feel like guided creation, not a chatbot bolted onto a CMS.

Recommended capabilities:

### Page Brief

The author provides a short page brief:

```text
Audience: Providers
Goal: Submit prior authorization
Business line: Clinical portal
CTA: Start request
Tone: Clear and task-oriented
```

### Suggested Structure

The AI recommends a page outline using approved block types.

### Block-Level Rationale

Each suggested block should explain why it is included.

Example:

```text
Medical Policy Search is recommended because prior authorization pages often require providers to confirm policy requirements before submitting a request.
```

### Editable Draft

The page is created as a normal CMS draft page with editable blocks.

### Governance Warnings

The assistant flags missing required blocks.

Example:

```text
This page appears to be Medicare-related. A Regulatory Disclaimer Block is required before publishing.
```

### Content Reuse Suggestions

The assistant recommends existing content, assets, forms, or related pages.

Example:

```text
Suggested existing assets:
- 2026 Medicare Enrollment Guide
- Pharmacy Formulary Lookup
- Find a Doctor CTA
```

---

## Role of AI vs. Role of the Author

| AI Responsibilities | Author Responsibilities |
|---|---|
| Interpret author intent | Confirm business goal |
| Recommend page type | Review and refine page structure |
| Suggest approved blocks | Edit content |
| Apply governance rules | Validate accuracy |
| Identify required disclaimers | Submit for approval |
| Recommend reusable assets | Publish final page |

The AI accelerates page creation. The author owns the page.

---

## Updated Generative UI Definition

Generative UI in this CMS context means:

> A guided authoring experience where AI translates an author’s intent into an editable, governed page structure using approved content types, reusable blocks, design-system rules, and publishing workflows.

This is different from traditional CMS authoring because the author does not manually construct the page from scratch.

This is different from runtime Generative UI because the live visitor experience remains governed, reviewed, and published.

---

## Strategic Value

This approach creates value in several ways:

### Faster Page Creation

Authors can move from idea to draft much faster.

### Better Consistency

Pages across multiple domains follow approved patterns and design-system rules.

### Stronger Governance

Required disclaimers, accessibility rules, and brand standards can be enforced during page creation.

### More Reuse

The assistant can recommend existing blocks, assets, forms, articles, and CTAs.

### Lower Training Burden

New authors do not need to memorize every content type or page pattern.

### Better Enterprise Scalability

The organization can support many sites and business lines without every page being manually architected from scratch.

---

## Positioning Statement

This is not about replacing authors or creating unpredictable live pages.

It is about giving authors a smarter way to create structured, compliant, reusable digital experiences.

> The author describes the goal.  
> The AI recommends the structure.  
> The CMS governs the content.  
> The human reviews and publishes.

That is the authoring-first Generative UI model.
