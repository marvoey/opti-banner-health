From a front-end designer perspective, **Generative AI** and **Generative UI** sound similar but they solve different layers of the experience.

Think of it as:

* **Generative AI = generates content, decisions, or meaning**
* **Generative UI = generates the interface itself**

### Generative AI → “What should be said?”

The model produces **text, images, code, recommendations, summaries, actions, intent**.

Examples:

* Chat assistant writes an email
* AI recommends products
* AI summarizes a dashboard
* AI generates marketing copy
* AI answers “What should I do next?”

**Designer concerns:**

* Prompt design
* Trust and transparency
* Tone and personality
* Hallucination handling
* Conversation flows
* Explainability
* Empty/error states

Example:

User:

> “Plan my trip to Rome”

Generative AI outputs:

> “3 days, Vatican, Trastevere, bike route…”

That output is still mostly content.

---

### Generative UI → “How should this appear?”

The system dynamically creates **screens, layouts, controls, cards, workflows, visual hierarchy** based on context.

Instead of designing every screen ahead of time, you design **building blocks and rules**.

Examples:

* AI decides to show:

  * map widget
  * calendar picker
  * hotel cards
  * expense estimator
* UI reorganizes itself depending on user intent
* Dashboard creates visualizations on demand
* Components appear/disappear dynamically

User:

> “Plan my trip to Rome”

Generative UI may create:

```
[Map]
[Day 1 Timeline]
[Book Hotels]
[Weather Widget]
[Budget Slider]
[Save Itinerary]
```

No designer explicitly designed that exact screen.

---

### Traditional UI vs Generative UI

| Traditional UI                 | Generative UI                   |
| ------------------------------ | ------------------------------- |
| Fixed screens                  | Dynamic screens                 |
| Designer specifies every state | Designer specifies system rules |
| Navigation-driven              | Intent-driven                   |
| Static components              | Adaptive components             |
| User clicks through flow       | UI assembles around user goal   |

---

### What changes for a front-end designer?

Old mindset:

> Design pages

New mindset:

> Design systems + composition rules

You start designing:

#### 1. Component grammar

What components can exist?

```
Card
Chart
Prompt input
Table
Map
Timeline
Actions
```

---

#### 2. Assembly rules

When should components appear?

Example:

```
If user intent == compare
→ show table

If user intent == explore
→ show cards + filters

If confidence < threshold
→ show clarification
```

---

#### 3. State orchestration

You design transitions:

```
loading
thinking
streaming
refining
executing
completed
```

---

### Real-world examples

**ChatGPT**

* Generative AI → generates answer
* Generative UI → decides whether to show:

  * tables
  * charts
  * maps
  * search results
  * code blocks
  * widgets

**Figma AI**

* AI creates design concepts
* UI adapts into editable design artifacts

**Notion AI**

* AI writes content
* UI creates pages, blocks, databases

**Vercel v0**

* AI generates actual React UI

---

### Designer skill shift (2026)

Old:

```
Wireframes
→ Components
→ Screens
```

New:

```
Intent
→ Component system
→ Context engine
→ Generated experience
```

A useful mental model:

> Generative AI is the brain.
> Generative UI is the body the user interacts with.
