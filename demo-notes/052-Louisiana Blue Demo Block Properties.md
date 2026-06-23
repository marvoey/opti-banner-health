# Louisiana Blue — Generative Authoring Content Model Specification
## Optimizely CMS + AI-Assisted Authoring

Version: 1.1  
Focus: Property-Level Authoring Metadata + Deterministic Page Blueprint Schemas

---

# Executive Summary

This specification transforms Louisiana Blue’s Optimizely content model into a **Generative Authoring platform**.

Core principle:

> AI does not assemble live visitor experiences at runtime.
>
> AI helps content authors create the correct page structure before publishing.

The author remains in control. AI assists by generating an editable page draft using approved Optimizely content types, reusable block models, composition rules, governance constraints, and structured page blueprint schemas.

---

# 1. Reference Architecture

```text
Author Intent
↓
Prompt Interpreter
↓
Content Type + Property Metadata Retrieval
↓
Page Blueprint Generator
↓
Composition Engine
↓
Draft Block Generator
↓
Governance Validation
↓
Visual Builder Review
↓
Publish
```

AI outputs **editable CMS content**, not live runtime UI.

---

# 2. Generative Authoring Philosophy

Traditional CMS authoring:

```text
Page
→ Add Blocks
→ Populate Fields
→ Publish
```

Generative authoring:

```text
Intent
→ Select Content Types
→ Generate Page Blueprint
→ Generate Block Fields
→ Validate
→ Edit
→ Publish
```

The key shift is that content types are not only field containers. They become **authoring intelligence objects**.

Each content type needs:

- business purpose
- supported author intents
- valid page contexts
- block placement rules
- property-level generation guidance
- governance constraints
- deterministic output schema

---

# 3. Core Authoring Metadata Envelope

Every Louisiana Blue content type should receive a metadata layer that AI can use during page planning.

```yaml
AuthoringMetadata:
  purpose:
  supported_intents:
  supported_page_types:
  supported_audiences:
  recommended_position:
  required_when:
  optional_when:
  dependencies:
  prohibited_with:
  generation_priority:
  governance:
  ai_prompt_template:
  validation_rules:
```

Example:

```yaml
AuthoringMetadata:
  purpose: page_introduction
  supported_intents:
    - educate
    - convert
    - announce
  supported_page_types:
    - campaign
    - landing
    - workspace
  supported_audiences:
    - member
    - employer
    - provider
    - broker
    - medicare
  recommended_position: first_content
  generation_priority: high
```

---

# 4. Property-Level Authoring Metadata

Property-level metadata tells AI **how to populate each editable field**.

Without property-level metadata, AI only knows that a field exists. With it, AI understands:

- what the field means
- whether it can generate it
- whether it requires human review
- how long it should be
- which tone to use
- whether the field must come from approved sources
- whether the field is localizable
- whether the field is locked

## 4.1 Property Metadata Schema

```yaml
PropertyAuthoringMetadata:
  semantic_role:
  generation_mode:
  source_policy:
  constraints:
  tone:
  localization:
  accessibility:
  governance:
  validation:
  examples:
```

## 4.2 Generation Modes

| Mode | Meaning |
|---|---|
| `generate` | AI may draft the value |
| `suggest` | AI may suggest but author must confirm |
| `select` | AI must choose from approved existing values |
| `retrieve` | AI must retrieve from CMS, Graph, taxonomy, or approved source |
| `locked` | AI cannot alter |
| `manual` | Author must provide |

## 4.3 Source Policies

| Policy | Meaning |
|---|---|
| `approved_content_only` | Must come from approved CMS content |
| `brand_guidelines` | Must follow brand and voice rules |
| `legal_approved` | Must use approved compliance copy |
| `taxonomy_controlled` | Must use controlled taxonomy |
| `external_system` | Must come from Marketo, SSO, provider directory, etc. |
| `author_generated` | AI can draft with author review |

---

# 5. Louisiana Blue Content Type Specifications

---

## 5.1 UniversalNavigationBlock

### Business Purpose

Provides global identity, audience routing, utility navigation, and secure login access.

### Existing Properties

```text
BrandLogo
LogoAltText
SegmentLinks
PrimaryNavigation
UtilityLinks
AuthGatewayUrl
FooterLinks
```

### Block-Level Metadata

```yaml
AuthoringMetadata:
  purpose: orientation
  supported_intents:
    - explore
    - transact
    - login
  supported_page_types:
    - landing
    - campaign
    - search
    - workspace
    - article
  supported_audiences:
    - member
    - employer
    - provider
    - broker
    - medicare
  recommended_position: global_header
  required_when:
    - all_pages
  generation_priority: required
  ai_prompt_template: Generate audience-specific navigation using approved site links.
```

### Property-Level Metadata

```yaml
BrandLogo:
  semantic_role: brand_identity
  generation_mode: select
  source_policy: approved_content_only
  constraints:
    file_types: [svg, png]
  governance:
    review_required: brand

LogoAltText:
  semantic_role: accessibility_label
  generation_mode: generate
  source_policy: brand_guidelines
  constraints:
    max_length: 120
  accessibility:
    required: true
    wcag: 2.1_AA

SegmentLinks:
  semantic_role: audience_routing
  generation_mode: retrieve
  source_policy: taxonomy_controlled
  constraints:
    allowed_audiences:
      - Members
      - Employers
      - Providers
      - Brokers
      - Medicare
  validation:
    min_items: 2

PrimaryNavigation:
  semantic_role: primary_navigation
  generation_mode: retrieve
  source_policy: approved_content_only
  validation:
    min_items: 3
    max_items: 8

UtilityLinks:
  semantic_role: task_shortcuts
  generation_mode: suggest
  source_policy: approved_content_only
  examples:
    - Find a Doctor
    - Contact Us
    - Login

AuthGatewayUrl:
  semantic_role: secure_login
  generation_mode: locked
  source_policy: external_system
  governance:
    security_review: required

FooterLinks:
  semantic_role: legal_and_secondary_navigation
  generation_mode: retrieve
  source_policy: approved_content_only
  governance:
    legal_review: required
```

### Composition Rules

```yaml
composition:
  required: true
  position: first
  max_instances: 1
  prohibited_with: []
```

---

## 5.2 DynamicHeroBlock

### Business Purpose

Establishes page intent, audience relevance, and primary action.

### Existing Properties

```text
SuperHeader
MainTitle
SubTitle
HeroImage
HeroVideo
PrimaryCTA
SecondaryCTA
ContrastMode
```

### Block-Level Metadata

```yaml
AuthoringMetadata:
  purpose: page_introduction
  supported_intents:
    - educate
    - convert
    - announce
    - route
  supported_page_types:
    - landing
    - campaign
    - workspace
    - search
  supported_audiences:
    - member
    - employer
    - provider
    - broker
    - medicare
  recommended_position: first_content
  generation_priority: high
  ai_prompt_template: Generate hero messaging aligned to the page goal, audience, and primary CTA.
```

### Property-Level Metadata

```yaml
SuperHeader:
  semantic_role: campaign_kicker
  generation_mode: generate
  source_policy: brand_guidelines
  constraints:
    max_length: 40
  examples:
    - New for 2026
    - For Louisiana Members
    - Medicare Advantage

MainTitle:
  semantic_role: h1_page_promise
  generation_mode: generate
  source_policy: brand_guidelines
  constraints:
    max_length: 72
    required: true
  tone:
    clear: true
    reassuring: true
    action_oriented: true
  accessibility:
    heading_level: h1

SubTitle:
  semantic_role: supporting_message
  generation_mode: generate
  source_policy: brand_guidelines
  constraints:
    max_length: 180
  tone:
    plain_language: true
    benefits_led: true

HeroImage:
  semantic_role: visual_context
  generation_mode: suggest
  source_policy: approved_content_only
  constraints:
    file_types: [jpg, png, webp]
  accessibility:
    decorative_allowed: true

HeroVideo:
  semantic_role: optional_motion_background
  generation_mode: suggest
  source_policy: approved_content_only
  constraints:
    optional: true
  accessibility:
    avoid_autoplay_audio: true

PrimaryCTA:
  semantic_role: primary_action
  generation_mode: suggest
  source_policy: approved_content_only
  constraints:
    required: true
    max_label_length: 28
  examples:
    - Shop Plans
    - Find a Doctor
    - Request Information

SecondaryCTA:
  semantic_role: alternate_action
  generation_mode: suggest
  source_policy: approved_content_only
  constraints:
    optional: true
    max_label_length: 28

ContrastMode:
  semantic_role: accessibility_visual_control
  generation_mode: select
  source_policy: accessibility_rule
  validation:
    enable_when_contrast_low: true
```

### Composition Rules

```yaml
composition:
  recommended_position: first_content
  max_instances: 1
  allowed_after:
    - UniversalNavigationBlock
```

---

## 5.3 SearchGatewayBlock

### Business Purpose

Provides search, discovery, lookup, and federated query access across Louisiana Blue sites.

### Existing Properties

```text
PlaceholderText
SearchTargetPage
EnableTypeAhead
IndexScope
```

### Block-Level Metadata

```yaml
AuthoringMetadata:
  purpose: discovery
  supported_intents:
    - search
    - lookup
    - find
    - compare
  supported_page_types:
    - search
    - provider
    - policy
    - formulary
    - resource_center
  supported_audiences:
    - member
    - provider
    - broker
    - employer
  recommended_position: early
  generation_priority: medium_high
```

### Property-Level Metadata

```yaml
PlaceholderText:
  semantic_role: search_prompt
  generation_mode: generate
  source_policy: brand_guidelines
  constraints:
    max_length: 80
  examples:
    - Search doctors, forms, and benefits
    - Search medical policies and prior authorization forms
    - Search plans, resources, and documents

SearchTargetPage:
  semantic_role: search_results_destination
  generation_mode: select
  source_policy: approved_content_only
  validation:
    required: true

EnableTypeAhead:
  semantic_role: predictive_search_behavior
  generation_mode: select
  source_policy: product_rule
  default: true

IndexScope:
  semantic_role: search_scope
  generation_mode: select
  source_policy: taxonomy_controlled
  allowed_values:
    - Current Site Only
    - All Louisiana Blue Sites
    - Provider Content
    - Member Content
    - Medicare Content
```

### Composition Rules

```yaml
composition:
  auto_insert_when:
    - intent: find_doctor
    - intent: search_policy
    - intent: lookup_formulary
    - intent: find_resource
  recommended_after:
    - DynamicHeroBlock
  max_instances: 1
```

---

## 5.4 RegulatoryDisclaimerBlock

### Business Purpose

Ensures audited legal and licensing language is present where required.

### Existing Properties

```text
DisclosuresID
DisclaimerBody
ShowLicensingLogo
```

### Block-Level Metadata

```yaml
AuthoringMetadata:
  purpose: compliance
  supported_intents:
    - publish_regulated_content
  supported_page_types:
    - medicare
    - provider
    - campaign
    - form
  required_when:
    - audience: medicare
    - contains_form: true
    - contains_plan_information: true
    - contains_provider_policy: true
  generation_priority: required
  ai_prompt_template: Select the approved disclaimer based on audience, page type, and content domain.
```

### Property-Level Metadata

```yaml
DisclosuresID:
  semantic_role: compliance_tracking
  generation_mode: retrieve
  source_policy: legal_approved
  validation:
    required: true
    pattern: "^LA-BLUE-DISC-[0-9]{4}"

DisclaimerBody:
  semantic_role: legal_copy
  generation_mode: locked
  source_policy: legal_approved
  governance:
    legal_review: required
    ai_editing_allowed: false

ShowLicensingLogo:
  semantic_role: licensing_visual
  generation_mode: select
  source_policy: legal_approved
  default: true
```

### Composition Rules

```yaml
composition:
  required_when:
    - medicare_page
    - provider_policy_page
    - lead_capture_page
  recommended_position: footer_content
  editable_by_ai: false
  max_instances: 1
```

---

## 5.5 GridCardSelectorBlock

### Business Purpose

Presents selectable pathways, benefits, programs, resources, or comparisons.

### Existing Properties

```text
GridTitle
GridColumns
CardsArea
```

### Nested CardBlock Properties

```text
CardIcon
CardTitle
CardBody
CardLink
```

### Block-Level Metadata

```yaml
AuthoringMetadata:
  purpose: decision_support
  supported_intents:
    - compare
    - evaluate
    - navigate
    - choose
    - explain_options
  supported_page_types:
    - landing
    - campaign
    - resource_center
    - plan_comparison
    - provider_workspace
  supported_audiences:
    - member
    - medicare
    - employer
    - broker
    - provider
  recommended_position: middle
  generation_priority: high
```

### Property-Level Metadata

```yaml
GridTitle:
  semantic_role: section_heading
  generation_mode: generate
  source_policy: brand_guidelines
  constraints:
    max_length: 80
  accessibility:
    heading_level: h2

GridColumns:
  semantic_role: layout_control
  generation_mode: select
  source_policy: design_system
  allowed_values: [2, 3, 4]
  rules:
    2: use_for_comparison
    3: use_for_standard_pathways
    4: use_for_broad_resource_sets

CardsArea:
  semantic_role: nested_content_container
  generation_mode: generate
  source_policy: author_generated
  validation:
    min_items: 2
    max_items: 4
```

### Nested CardBlock Property Metadata

```yaml
CardIcon:
  semantic_role: card_visual_cue
  generation_mode: suggest
  source_policy: approved_content_only
  constraints:
    file_types: [svg, png]
  accessibility:
    decorative_allowed: true

CardTitle:
  semantic_role: card_heading
  generation_mode: generate
  source_policy: brand_guidelines
  constraints:
    max_length: 60
    required: true
  accessibility:
    heading_level: h3

CardBody:
  semantic_role: card_summary
  generation_mode: generate
  source_policy: brand_guidelines
  constraints:
    max_length: 160
  tone:
    concise: true
    plain_language: true

CardLink:
  semantic_role: card_action
  generation_mode: suggest
  source_policy: approved_content_only
  validation:
    required: true
```

### Composition Rules

```yaml
composition:
  recommended_after:
    - DynamicHeroBlock
    - SearchGatewayBlock
  allowed_before:
    - LeadCaptureFormBlock
    - RegulatoryDisclaimerBlock
  max_instances: 3
```

---

## 5.6 LeadCaptureFormBlock

### Business Purpose

Captures user interest and routes leads into marketing automation.

### Existing Properties

```text
FormTitle
MarketoProgramID
FormFields
SubmitButtonText
SuccessRedirectPage
```

### Block-Level Metadata

```yaml
AuthoringMetadata:
  purpose: conversion
  supported_intents:
    - enroll
    - request_info
    - contact_sales
    - apply
  supported_page_types:
    - campaign
    - landing
    - grant
    - employer
    - medicare
  supported_audiences:
    - member
    - employer
    - broker
    - medicare
  recommended_position: late
  generation_priority: high
```

### Property-Level Metadata

```yaml
FormTitle:
  semantic_role: form_heading
  generation_mode: generate
  source_policy: brand_guidelines
  constraints:
    max_length: 80
  examples:
    - Request Information
    - Get Help Choosing a Plan
    - Contact Our Team

MarketoProgramID:
  semantic_role: campaign_routing
  generation_mode: select
  source_policy: external_system
  validation:
    required: true
  governance:
    marketing_ops_review: required

FormFields:
  semantic_role: form_schema
  generation_mode: suggest
  source_policy: privacy_review
  validation:
    min_items: 2
    max_items: 8
  governance:
    pii_review: required

SubmitButtonText:
  semantic_role: conversion_cta
  generation_mode: generate
  source_policy: brand_guidelines
  constraints:
    max_length: 28
  examples:
    - Request Information
    - Submit
    - Get Started

SuccessRedirectPage:
  semantic_role: post_submit_destination
  generation_mode: select
  source_policy: approved_content_only
  validation:
    required: true
```

### Composition Rules

```yaml
composition:
  recommended_after:
    - GridCardSelectorBlock
  required_before:
    - RegulatoryDisclaimerBlock
  prohibited_with:
    - NetworkStatusAlertBlock[critical_unrelated]
```

---

## 5.7 NetworkStatusAlertBlock

### Business Purpose

Displays operational alerts across domains.

### Existing Properties

```text
AlertSeverity
AlertMessage
AlertLink
IsDismissible
GlobalPublish
```

### Block-Level Metadata

```yaml
AuthoringMetadata:
  purpose: operational_notification
  supported_intents:
    - notify
    - announce_outage
    - emergency_update
  supported_page_types:
    - all
  supported_audiences:
    - member
    - employer
    - provider
    - broker
    - medicare
  recommended_position: above_header_or_top_content
  generation_priority: conditional
```

### Property-Level Metadata

```yaml
AlertSeverity:
  semantic_role: urgency_level
  generation_mode: select
  source_policy: controlled_values
  allowed_values:
    - Info
    - Warning
    - Critical

AlertMessage:
  semantic_role: alert_copy
  generation_mode: generate
  source_policy: operational_approved
  constraints:
    max_length: 180
  tone:
    direct: true
    calm: true
    actionable: true

AlertLink:
  semantic_role: update_destination
  generation_mode: select
  source_policy: approved_content_only
  validation:
    required_when:
      - severity: Warning
      - severity: Critical

IsDismissible:
  semantic_role: user_control
  generation_mode: select
  default: true

GlobalPublish:
  semantic_role: global_distribution
  generation_mode: suggest
  governance:
    approval_required: executive_or_ops
```

### Composition Rules

```yaml
composition:
  auto_insert_when:
    - operational_event: true
  max_instances: 1
  global_publish_requires_approval: true
```

---

# 6. Deterministic Page Blueprint Schemas

Page blueprints make AI output predictable. Instead of returning freeform recommendations, the AI must return a validated page blueprint.

The blueprint acts as the contract between:

```text
Prompt Interpreter
→ Composition Engine
→ Visual Builder
```

---

## 6.1 Page Blueprint Base Schema

```json
{
  "blueprintVersion": "1.0",
  "page": {
    "title": "",
    "pageType": "",
    "audience": "",
    "businessDomain": "",
    "intent": "",
    "journeyStage": "",
    "locale": "en-US"
  },
  "governance": {
    "requiresLegalReview": false,
    "requiresAccessibilityReview": true,
    "requiresMarketingOpsReview": false,
    "requiresPIIReview": false,
    "requiredDisclaimers": []
  },
  "blocks": [],
  "validation": {
    "status": "",
    "warnings": [],
    "missingRequiredFields": [],
    "confidenceScore": 0
  }
}
```

---

## 6.2 Block Instance Schema

Each generated block must follow this shape.

```json
{
  "blockType": "",
  "position": 0,
  "purpose": "",
  "generationReason": "",
  "properties": {},
  "governance": {
    "lockedFields": [],
    "reviewRequired": []
  },
  "confidence": 0
}
```

---

## 6.3 Medicare Enrollment Page Blueprint

Author prompt:

```text
Create a Medicare enrollment page for people turning 65 in Louisiana.
```

Generated blueprint:

```json
{
  "blueprintVersion": "1.0",
  "page": {
    "title": "Turning 65? Explore Medicare Options",
    "pageType": "campaign",
    "audience": "medicare",
    "businessDomain": "medicare_advantage",
    "intent": "enroll",
    "journeyStage": "evaluate",
    "locale": "en-US"
  },
  "governance": {
    "requiresLegalReview": true,
    "requiresAccessibilityReview": true,
    "requiresMarketingOpsReview": true,
    "requiresPIIReview": true,
    "requiredDisclaimers": ["medicare", "lead_capture"]
  },
  "blocks": [
    {
      "blockType": "UniversalNavigationBlock",
      "position": 1,
      "purpose": "orientation",
      "generationReason": "All pages require global navigation.",
      "properties": {
        "SegmentLinks": ["Members", "Employers", "Providers", "Medicare"],
        "UtilityLinks": ["Find a Doctor", "Contact Us", "Login"]
      },
      "governance": {
        "lockedFields": ["AuthGatewayUrl"],
        "reviewRequired": ["brand"]
      },
      "confidence": 0.98
    },
    {
      "blockType": "DynamicHeroBlock",
      "position": 2,
      "purpose": "page_introduction",
      "generationReason": "Campaign pages require a clear audience-specific hero.",
      "properties": {
        "SuperHeader": "Medicare Advantage",
        "MainTitle": "Turning 65? Explore Medicare Options Built for Louisiana",
        "SubTitle": "Learn how Medicare works, compare plan options, and get help choosing coverage that fits your needs.",
        "PrimaryCTA": {
          "text": "Compare Plans",
          "href": "/medicare/compare-plans"
        },
        "SecondaryCTA": {
          "text": "Find a Doctor",
          "href": "/find-a-doctor"
        },
        "ContrastMode": true
      },
      "governance": {
        "lockedFields": [],
        "reviewRequired": ["accessibility", "brand"]
      },
      "confidence": 0.91
    },
    {
      "blockType": "GridCardSelectorBlock",
      "position": 3,
      "purpose": "decision_support",
      "generationReason": "The user needs structured options to evaluate Medicare next steps.",
      "properties": {
        "GridTitle": "Start with what you need most",
        "GridColumns": 3,
        "CardsArea": [
          {
            "CardTitle": "Understand Medicare",
            "CardBody": "Learn the basics of Medicare and what changes when you turn 65.",
            "CardLink": {
              "text": "Learn the Basics",
              "href": "/medicare/basics"
            }
          },
          {
            "CardTitle": "Compare Plan Options",
            "CardBody": "Review available plan options and see what benefits may fit your needs.",
            "CardLink": {
              "text": "Compare Plans",
              "href": "/medicare/compare-plans"
            }
          },
          {
            "CardTitle": "Check Doctors and Pharmacies",
            "CardBody": "Search for in-network doctors, hospitals, and covered prescriptions.",
            "CardLink": {
              "text": "Search Network",
              "href": "/medicare/network"
            }
          }
        ]
      },
      "governance": {
        "lockedFields": [],
        "reviewRequired": ["brand", "legal"]
      },
      "confidence": 0.88
    },
    {
      "blockType": "LeadCaptureFormBlock",
      "position": 4,
      "purpose": "conversion",
      "generationReason": "Enrollment intent requires a lead capture or advisor contact path.",
      "properties": {
        "FormTitle": "Get Help Choosing a Medicare Plan",
        "MarketoProgramID": "SELECT_APPROVED_PROGRAM",
        "SubmitButtonText": "Request Information"
      },
      "governance": {
        "lockedFields": [],
        "reviewRequired": ["marketing_ops", "pii"]
      },
      "confidence": 0.79
    },
    {
      "blockType": "RegulatoryDisclaimerBlock",
      "position": 5,
      "purpose": "compliance",
      "generationReason": "Medicare content requires approved disclaimer language.",
      "properties": {
        "DisclosuresID": "LA-BLUE-DISC-2026",
        "ShowLicensingLogo": true
      },
      "governance": {
        "lockedFields": ["DisclaimerBody"],
        "reviewRequired": ["legal"]
      },
      "confidence": 0.96
    }
  ],
  "validation": {
    "status": "requires_review",
    "warnings": [
      "MarketoProgramID must be selected from approved Marketo programs.",
      "DisclaimerBody must be retrieved from legal-approved content."
    ],
    "missingRequiredFields": ["LeadCaptureFormBlock.MarketoProgramID"],
    "confidenceScore": 0.88
  }
}
```

---

## 6.4 Find a Doctor Page Blueprint

Author prompt:

```text
Create a page that helps members find a doctor.
```

```json
{
  "blueprintVersion": "1.0",
  "page": {
    "title": "Find a Doctor",
    "pageType": "search",
    "audience": "member",
    "businessDomain": "provider_directory",
    "intent": "find_doctor",
    "journeyStage": "act",
    "locale": "en-US"
  },
  "governance": {
    "requiresLegalReview": false,
    "requiresAccessibilityReview": true,
    "requiresMarketingOpsReview": false,
    "requiresPIIReview": false,
    "requiredDisclaimers": []
  },
  "blocks": [
    {
      "blockType": "UniversalNavigationBlock",
      "position": 1,
      "purpose": "orientation",
      "generationReason": "All pages require global navigation.",
      "properties": {},
      "governance": {
        "lockedFields": ["AuthGatewayUrl"],
        "reviewRequired": ["brand"]
      },
      "confidence": 0.98
    },
    {
      "blockType": "DynamicHeroBlock",
      "position": 2,
      "purpose": "page_introduction",
      "generationReason": "Search pages need a clear task-oriented introduction.",
      "properties": {
        "MainTitle": "Find a Doctor in Your Network",
        "SubTitle": "Search for doctors, hospitals, and care providers available through your plan.",
        "PrimaryCTA": {
          "text": "Start Search",
          "href": "#doctor-search"
        },
        "ContrastMode": true
      },
      "governance": {
        "lockedFields": [],
        "reviewRequired": ["accessibility", "brand"]
      },
      "confidence": 0.9
    },
    {
      "blockType": "SearchGatewayBlock",
      "position": 3,
      "purpose": "provider_discovery",
      "generationReason": "The author intent is a lookup/search task.",
      "properties": {
        "PlaceholderText": "Search by doctor, specialty, hospital, or location",
        "EnableTypeAhead": true,
        "IndexScope": "Provider Content"
      },
      "governance": {
        "lockedFields": [],
        "reviewRequired": ["search_admin"]
      },
      "confidence": 0.95
    },
    {
      "blockType": "GridCardSelectorBlock",
      "position": 4,
      "purpose": "guided_navigation",
      "generationReason": "Members may need alternate discovery pathways.",
      "properties": {
        "GridTitle": "More ways to find care",
        "GridColumns": 3,
        "CardsArea": [
          {
            "CardTitle": "Search by Specialty",
            "CardBody": "Find providers by the type of care you need.",
            "CardLink": {
              "text": "Browse Specialties",
              "href": "/find-a-doctor/specialties"
            }
          },
          {
            "CardTitle": "Find Urgent Care",
            "CardBody": "Locate urgent care options near you.",
            "CardLink": {
              "text": "Find Urgent Care",
              "href": "/find-care/urgent-care"
            }
          },
          {
            "CardTitle": "Check Pharmacy Options",
            "CardBody": "Search pharmacy coverage and formulary information.",
            "CardLink": {
              "text": "Search Pharmacy",
              "href": "/pharmacy"
            }
          }
        ]
      },
      "governance": {
        "lockedFields": [],
        "reviewRequired": ["brand"]
      },
      "confidence": 0.86
    }
  ],
  "validation": {
    "status": "draft_ready",
    "warnings": [
      "SearchTargetPage must be selected before publish."
    ],
    "missingRequiredFields": ["SearchGatewayBlock.SearchTargetPage"],
    "confidenceScore": 0.92
  }
}
```

---

## 6.5 Provider Prior Authorization Blueprint

Author prompt:

```text
Create a provider page for prior authorization.
```

```json
{
  "blueprintVersion": "1.0",
  "page": {
    "title": "Prior Authorization Resources",
    "pageType": "workspace",
    "audience": "provider",
    "businessDomain": "provider_operations",
    "intent": "submit_prior_authorization",
    "journeyStage": "act",
    "locale": "en-US"
  },
  "governance": {
    "requiresLegalReview": true,
    "requiresAccessibilityReview": true,
    "requiresMarketingOpsReview": false,
    "requiresPIIReview": false,
    "requiredDisclaimers": ["provider_policy"]
  },
  "blocks": [
    {
      "blockType": "UniversalNavigationBlock",
      "position": 1,
      "purpose": "orientation",
      "generationReason": "All pages require global navigation.",
      "properties": {},
      "governance": {
        "lockedFields": ["AuthGatewayUrl"],
        "reviewRequired": ["brand"]
      },
      "confidence": 0.98
    },
    {
      "blockType": "DynamicHeroBlock",
      "position": 2,
      "purpose": "page_introduction",
      "generationReason": "Provider workspace pages need task clarity.",
      "properties": {
        "SuperHeader": "Provider Resources",
        "MainTitle": "Prior Authorization Resources",
        "SubTitle": "Find requirements, forms, and policy information for prior authorization requests.",
        "PrimaryCTA": {
          "text": "Search Requirements",
          "href": "#policy-search"
        },
        "SecondaryCTA": {
          "text": "Login to Provider Portal",
          "href": "AUTH_GATEWAY_URL"
        },
        "ContrastMode": true
      },
      "governance": {
        "lockedFields": ["SecondaryCTA.href"],
        "reviewRequired": ["accessibility", "brand"]
      },
      "confidence": 0.9
    },
    {
      "blockType": "SearchGatewayBlock",
      "position": 3,
      "purpose": "medical_policy_lookup",
      "generationReason": "Prior authorization pages require policy and form lookup.",
      "properties": {
        "PlaceholderText": "Search medical policies, prior authorization forms, and requirements",
        "EnableTypeAhead": true,
        "IndexScope": "Provider Content"
      },
      "governance": {
        "lockedFields": [],
        "reviewRequired": ["provider_ops", "search_admin"]
      },
      "confidence": 0.95
    },
    {
      "blockType": "GridCardSelectorBlock",
      "position": 4,
      "purpose": "task_routing",
      "generationReason": "Providers need clear pathways for common prior authorization tasks.",
      "properties": {
        "GridTitle": "Prior authorization tools",
        "GridColumns": 3,
        "CardsArea": [
          {
            "CardTitle": "Search Medical Policies",
            "CardBody": "Find policy requirements and effective dates.",
            "CardLink": {
              "text": "Search Policies",
              "href": "/providers/medical-policy"
            }
          },
          {
            "CardTitle": "Download Forms",
            "CardBody": "Access forms needed for authorization requests.",
            "CardLink": {
              "text": "View Forms",
              "href": "/providers/forms"
            }
          },
          {
            "CardTitle": "Login to Submit",
            "CardBody": "Use the provider portal to submit or manage requests.",
            "CardLink": {
              "text": "Provider Login",
              "href": "AUTH_GATEWAY_URL"
            }
          }
        ]
      },
      "governance": {
        "lockedFields": ["CardsArea[2].CardLink.href"],
        "reviewRequired": ["provider_ops"]
      },
      "confidence": 0.89
    },
    {
      "blockType": "RegulatoryDisclaimerBlock",
      "position": 5,
      "purpose": "compliance",
      "generationReason": "Provider policy content requires approved disclaimer language.",
      "properties": {
        "DisclosuresID": "LA-BLUE-DISC-2026",
        "ShowLicensingLogo": true
      },
      "governance": {
        "lockedFields": ["DisclaimerBody"],
        "reviewRequired": ["legal"]
      },
      "confidence": 0.95
    }
  ],
  "validation": {
    "status": "requires_review",
    "warnings": [
      "SearchTargetPage must be selected before publish.",
      "Provider policy disclaimer body must be retrieved from approved content."
    ],
    "missingRequiredFields": [
      "SearchGatewayBlock.SearchTargetPage",
      "RegulatoryDisclaimerBlock.DisclaimerBody"
    ],
    "confidenceScore": 0.9
  }
}
```

---

# 7. Blueprint Validation Rules

## 7.1 Required Block Rules

```yaml
required_block_rules:
  all_pages:
    - UniversalNavigationBlock

  medicare_pages:
    - RegulatoryDisclaimerBlock

  lead_capture_pages:
    - LeadCaptureFormBlock
    - RegulatoryDisclaimerBlock

  search_pages:
    - SearchGatewayBlock

  provider_policy_pages:
    - SearchGatewayBlock
    - RegulatoryDisclaimerBlock
```

## 7.2 Placement Rules

```yaml
placement_rules:
  UniversalNavigationBlock:
    position: first
    max_instances: 1

  DynamicHeroBlock:
    position: first_content
    max_instances: 1

  SearchGatewayBlock:
    recommended_after:
      - DynamicHeroBlock

  LeadCaptureFormBlock:
    recommended_after:
      - GridCardSelectorBlock

  RegulatoryDisclaimerBlock:
    recommended_position: final_content
```

## 7.3 Governance Rules

```yaml
governance_rules:
  locked_fields:
    - UniversalNavigationBlock.AuthGatewayUrl
    - RegulatoryDisclaimerBlock.DisclaimerBody

  legal_review_required_when:
    - audience: medicare
    - contains_plan_information: true
    - contains_provider_policy: true

  pii_review_required_when:
    - blockType: LeadCaptureFormBlock

  marketing_ops_review_required_when:
    - property: MarketoProgramID
```

---

# 8. Author Experience in Visual Builder

## Step 1 — Author Describes Page

Example:

```text
Create a Medicare enrollment page for people turning 65.
```

## Step 2 — AI Generates Blueprint

The system returns:

- page type
- audience
- intent
- recommended blocks
- generated property values
- confidence score
- missing required fields
- review flags

## Step 3 — Author Reviews Outline

The author sees:

```text
Recommended Page Structure

1. Navigation
2. Hero
3. Medicare Option Cards
4. Lead Capture Form
5. Regulatory Disclaimer
```

## Step 4 — Author Edits CMS Fields

All generated fields remain editable unless locked by governance.

## Step 5 — System Validates

The system checks:

- required blocks
- missing fields
- legal disclaimers
- accessibility
- Marketo routing
- taxonomy alignment
- localization readiness

## Step 6 — Publish

The final page is published only after required approvals are complete.

---

# 9. Optimizely Graph Retrieval Model

Generative authoring depends on indexing more than visible page content.

Graph should expose:

```text
Content properties
Authoring metadata
Composition rules
Governance rules
Taxonomy
Prompt examples
Approved assets
Approved disclaimers
```

Retrieval flow:

```text
Prompt
↓
Retrieve relevant content types
↓
Retrieve property metadata
↓
Retrieve approved content/assets
↓
Generate blueprint
↓
Validate
↓
Create editable draft
```

---

# 10. Final Principle

Traditional CMS:

```text
Pages
→ Blocks
→ Publish
```

Generative Authoring:

```text
Intent
→ Metadata
→ Blueprint
→ Blocks
→ Draft
→ Publish
```

Pages become outcomes.

Content types become intelligent authoring primitives.

Metadata becomes the design system.

AI becomes the page planner.

Authors remain the publisher.
