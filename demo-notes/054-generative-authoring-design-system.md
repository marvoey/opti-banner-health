# Generative Authoring Design System

## Purpose
This design system shifts Generative UI from runtime assembly to AI-assisted authoring.

Principle:

> AI does not assemble experiences for visitors.
>
> AI helps authors create the right page structure before publishing.

Author flow:

```text
Author Intent
→ AI Page Planner
→ Content Type Selection
→ Block Composition
→ Draft Generation
→ Human Review
→ Publish
```

---

# 1. System Architecture

## Layers

### Experience Intent Layer
Captures:
- page objective
- audience
- campaign type
- business domain
- conversion goal

Example:

```yaml
intent:
  audience: medicare
  goal: enroll
  page_type: landing
```

### Content Intelligence Layer
Maps prompts to:
- content types
- reusable blocks
- taxonomies
- templates

### Composition Engine
Produces:
- page outline
- block order
- validation

### Governance Layer
Applies:
- legal
- WCAG
- approvals
- expiration

---

# 2. Metadata Model

## Content Type Metadata

```yaml
content_type:
  id:
  purpose:
  audience:
  journey_stage:
  business_domain:
  supported_intents:
  ai_description:
  generation_priority:
```

## Composition Metadata

```yaml
composition:
  allowed_after:
  recommended_before:
  max_instances:
  dependencies:
  prohibited_with:
```

## Governance Metadata

```yaml
governance:
  legal_review:
  accessibility:
  requires_disclaimer:
  retention:
```

## Discovery Metadata

```yaml
discovery:
  tags:
  synonyms:
  embeddings:
```

---

# 3. Canonical Content Types

## Journey Page
Purpose:
Guide users through completion.

Metadata:

```yaml
purpose: conversion
supported_intents:
 - enroll
 - find_care
recommended_blocks:
 - Hero
 - Timeline
 - CTA
```

## Decision Page

```yaml
purpose: compare
supported_intents:
 - evaluate
recommended_blocks:
 - Comparison
 - Calculator
```

## Workspace Page

```yaml
purpose: transact
supported_intents:
 - submit
 - search
```

## Campaign Page

```yaml
purpose: acquisition
```

## Knowledge Page

```yaml
purpose: educate
```

---

# 4. Block Catalog

## Universal Navigation
Role:
Persistent orientation.

Metadata:

```yaml
block:
 audience_aware: true
 required: true
```

## Dynamic Hero

```yaml
supported_goals:
 - educate
 - convert
```

## Search Gateway

```yaml
intents:
 - discover
 - lookup
```

## Grid Card Collection

```yaml
display_modes:
 - card
 - carousel
```

## Regulatory Disclaimer

```yaml
required_when:
 - healthcare
 - medicare
```

## Lead Capture

```yaml
goals:
 - convert
```

## Status Alert

```yaml
priority: critical
```

---

# 5. Author Prompt Contract

Prompt:

```text
Create a provider page for prior authorization.
```

Resolved:

```yaml
page_type: workspace
blocks:
 - Hero
 - Search
 - Forms
 - FAQ
 - Disclaimer
```

---

# 6. AI Decision Framework

Scoring:

```yaml
score:
 intent_match: 40
 composition_fit: 25
 governance: 20
 historical_use: 15
```

Thresholds:
- 90–100 Auto draft
- 70–89 Recommend
- <70 Clarify

---

# 7. Author Experience

Step 1 Describe page
Step 2 Review outline
Step 3 Generate content
Step 4 Refine
Step 5 Publish

---

# 8. Governance Checklist

- Accessibility
- Legal
- Required content
- Metadata completeness
- Search optimization
- Content freshness

---

# 9. Example Generated Output

```yaml
page:
 title: Turning 65
 blocks:
   - Hero
   - Eligibility
   - Comparison
   - Timeline
   - FAQ
   - Disclaimer
```

This model transforms CMS authoring from manual assembly into intent-driven page creation while preserving governance and reusable content architecture.
