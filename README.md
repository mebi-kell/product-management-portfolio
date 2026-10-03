# Product Management Portfolio

**Mobina Kalhorian** · AI-fluent Product Manager · Product Marketing · Product Builder · Digital Storyteller

This portfolio showcases eight selected projects from my work: AI evaluation systems, B2B platforms and a consumer app. Each case study covers the problem, what I decided and why, and what shipped.

I define the product, write the parts I can build myself (evaluator prompts, scoring logic, prototypes) when that is the fastest way to prove a decision, and turn the result into a story a team can build and a market can understand.

---

## Case studies

| Project | What it is | My role | Stage |
|---|---|---|---|
| [AI Fluency Assessment](ai-fluency-assessment/README.md) | A scenario-based test of whether a candidate can use AI in real work, scored by an LLM against rubrics | PM / PO | Shipped, in Beta with enterprise clients |
| [Async AI Video Interview](async-ai-video-interview/README.md) | Recorded interview answers turned into structured, explainable hiring signals | PM / PO | Shipped, 4,360+ candidates in Beta |
| [TripWise](tripwise/README.md) | An AI travel platform that replans around real conditions and leaves the final call to the traveler | PM / Product Builder | Functional prototype, ready for MVP handoff |
| [Accounting Product Ecosystem](accounting-product-ecosystem/README.md) | Three connected products for accounting firms, including AI document capture with human review | Product Management Assistant, no dedicated PM | MVP reached, beta prepared |
| [Employee Communications & Engagement Platform](employee-communications-platform/README.md) | An HR product that hides communications infrastructure behind segments, campaigns and automation | PM / Product Builder | MVP defined, designed and prototyped |
| [B2B CPaaS Platform](b2b-cpaas-platform/README.md) | A stalled multi-channel messaging initiative reset into a defined platform and a delivered MVP | PM / PO, one of three | MVP delivered with pilot clients |
| [Connectivity Management Platform](connectivity-management-platform/README.md) | A B2B platform for operating eSIM connectivity across operators, resellers and white-label partners | Project Management Assistant, with product and PMM scope | Commercialized |
| [Consumer eSIM Travel App](consumer-esim-travel-app/README.md) | Making eSIM purchase, installation and use understandable to ordinary travelers | Project Management Assistant, with product and PMM scope | Live, 100K+ Google Play downloads |

Two pairs are connected. The employee communications product is built on top of the CPaaS platform, and the eSIM app was later integrated into the connectivity platform as a sub-account.

**Short on time?** Start with the [AI Fluency Assessment](ai-fluency-assessment/README.md) for AI product work, the [B2B CPaaS Platform](b2b-cpaas-platform/README.md) for scope and delivery, and the [Consumer eSIM Travel App](consumer-esim-travel-app/README.md) for UX and go-to-market.

## How I work

### Principles

The same few principles show up across these projects.

1. **The AI judges; code and people decide.** An LLM scores one answer, extracts one document or drafts one suggestion. Deterministic code aggregates and validates, and a person makes the final call. See [AI Fluency](ai-fluency-assessment/README.md), [Video Interview](async-ai-video-interview/README.md), [TripWise](tripwise/README.md) and [Accounting](accounting-product-ecosystem/README.md).
2. **AI only where it adds value.** A competency was cut because it couldn't be measured honestly. Facial-analysis output is shown as context and never scored. An AI segmentation feature stayed behind a beta gate until its quality could be measured.
3. **Boundaries before features.** What each product, system or tier owns is decided first: the lifecycle boundary in [CMP](connectivity-management-platform/README.md), three products instead of one in [Accounting](accounting-product-ecosystem/README.md), a shared core under the channels in [CPaaS](b2b-cpaas-platform/README.md).
4. **Translate complexity into the user's language.** Operator lifecycle states become "bought, installed, in use" for a traveler. Providers and delivery states become employees and engagement for an HR manager.
5. **Every request is a hypothesis.** One customer's request for its own question catalogue became a governed template model. AI and new-channel requests were fully defined, and only their development was deferred.
6. **Be precise about ownership.** Every case study separates what I owned from what the wider team owned.

### Workflow

- **AI in daily work.** AI assistants are part of most working days: competitive research, rubric and prompt drafting, specifications and documentation, design exploration, prototyping and defect tracing. The judgment stays with me. I cut two evaluator prompts I own by about 78% and 66%, one of them after questioning an AI-written first draft as over-engineered.
- **Strategy and decisions.** I start from the problem and the market: competitive audits, discovery with customers and stakeholders, and a product model before a feature list. Scope is staged (MVP, then MMP and MLP), and each decision is written down with its context, alternatives and trade-offs.
- **Technical contribution and collaboration.** I write integration architecture, API-level specifications and the evaluator modules that engineering integrates as written. I break requirements into engineering tasks, test implementations, trace defects to root cause and propose resolution options. When a domain is new to the team, I help engineers understand it well enough to build the right behavior.

## What I cover

| Area | In practice | Best seen in |
|---|---|---|
| Product management | Discovery, scope, requirements, prioritization, acceptance, delivery | All eight |
| Product marketing | Positioning, ICP, messaging, launch strategy, sales materials | CMP, eSIM app, Accounting |
| Product building | Evaluator prompts and scoring logic that run in production; prototypes built with AI tools | AI Fluency, Video Interview, TripWise |
| Storytelling | Website copy, demo narratives, rebrand, client documentation, and these case studies | Accounting, eSIM app |

## How each case study is organized

Every project folder opens with a README: the problem, my role, key decisions and the outcome. The deeper material differs from project to project, depending on what the work produced. Across the portfolio you'll find:

| Document | What it covers | Examples |
|---|---|---|
| Case study | The long-form story behind the main decisions | `01-calibrating-ai-evaluation`, `01-from-concept-to-commercial-platform`, `01-making-esim-understandable` |
| Decision log, map or model | Product decisions with context, alternatives and trade-offs; for AI features, the triggers, guardrails and fallbacks | `decision-log` |
| Product model or map | How the product is structured and where its boundaries sit | `account-model`, `lifecycle-map`, `boundary-map`, `definition-evolution` |
| Research and frameworks | Market findings, and how the product should be judged | `competitive-landscape`, `metrics-framework` |
| Prototype | An interactive walkthrough of the product | `prototype` |
| Evidence | Supporting material behind the case study | In some projects |

No project has all of these. Each README's **Explore** section links to what that project includes.

## Contact

- LinkedIn: [linkedin.com/in/mebi-kell](https://www.linkedin.com/in/mebi-kell/)
- Website: [mebikell.com](https://mebikell.com)
- Email: [m.kalhorian@gmail.com](mailto:m.kalhorian@gmail.com)

---

*Most company, product and client names are withheld under NDA or by choice. Diagrams are conceptual and example data is synthetic.*
