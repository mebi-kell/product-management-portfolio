# From a Stalled Initiative to a Bounded MVP

**How a CPaaS initiative with integrations but no product became a defined platform, and how the MVP stayed bounded under constant pressure to grow.**

## Context

The goal was a B2B communications platform: one platform and one API for SMS, WhatsApp, Email and RCS, so businesses wouldn't have to integrate with each provider separately.

I joined as one of three PMs. Design, engineering and QA were dedicated teams. My role sat in the translation layer: business need → product decision → requirements → design → engineering → validation.

## What existed

The initiative had been running for a long time but had no product. There were:

- **No product definition:** no agreed modules, workflows or scope.
- **No platform foundation:** channels were integrated individually, with nothing shared underneath.
- **An unstable interface:** many bugs and no coherent UX.

The missing piece was never another channel. It was a product.

## The reset

**Options.**
- Keep fixing the existing build and add structure gradually.
- Reset and define the product from scratch.

**Decision.** Reset. Fixing a structure that was never designed would have spent the team's effort polishing the wrong shape. The PM team rebuilt the product definition from the ground up, and the result became the shared map for design, engineering and sales:

- **17 product areas.** Examples: Onboarding, Channels, Audience, Studio, Phone Numbers, Billing, Logs, Developer Hub, Compliance, the Reseller Portal and Settings. A separate internal admin panel was mapped for operations.
- **120 epics,** each broken down into features, each with a one-line explanation of what it does.
- **A definition status per feature** (concept in progress → concept fully defined), plus PRD and user-story readiness. Scope became visible, not something argued from memory.

## The platform model

The core principle was **build once in the core, specialize at the edge.**

| Layer | What lives there | Why |
|---|---|---|
| **Shared core** | Accounts and access, phone numbers, audience, billing, logs | Every channel needs them. Building them per channel would mean four of each. |
| **Channels** | Sender identity, templates, delivery states, channel compliance | These differ by channel and can't be generalized away. |
| **Studio** | Campaigns, automation, templates library | Works across channels, so it must sit above them. |
| **Developer layer** | APIs, webhooks, integrations | Exposes the same core to technical users. |

Two audiences had to be served by one product. **Business users** manage channels, audiences, campaigns, billing and users. **Developers** need API access, webhooks and delivery information. The model let both work with the same core objects.

## MVP layering

The full map was far bigger than any MVP. Scope was decided in layers:

1. **Platform foundations** without which nothing works.
2. **Channel essentials:** the minimum that makes each of the four channels usable.
3. **Operations:** billing, numbers, logs.
4. **Developer access:** APIs.
5. **Advanced capabilities:** campaigns and automation in an initial form. Everything beyond that, including the AI capabilities, was fully defined in product and scope terms, with development scheduled after the basics.

The MVP shipped with SMS, WhatsApp, Email, RCS, onboarding, audience management, number management, billing, APIs, and initial campaigns and automation.

## The areas I owned

I owned the product definition of 50 of the 120 epics. Onboarding, Audience, Billing (shared) and the initial Studio capabilities shipped in the MVP. A few examples show the kind of decisions involved:

**Onboarding that knows about channels.** The activation checklist guides new accounts through mandatory channel prerequisites, such as connecting a business account before a channel tied to it can be used. Company type, size and industry are captured at signup so the platform can adapt to the customer. In onboarding, channel complexity shows up as next steps, not as errors later.

**Audience as a shared asset.** Contacts and segments live in the core, not inside a channel:
- **Static and dynamic segments.** Dynamic segments add and remove contacts automatically by rule.
- **Duplicate resolution on import,** keyed on phone number or email.
- **Custom fields** that segments can filter on.
- **Preferred-channel segments,** so audiences can be targeted by the channel they actually engage on.

**Routing and fallback as configurable behavior.** In Studio automation, fallback is something the customer configures:
- **Multi-channel fallback:** choose a second channel if delivery on the first fails.
- **Latency-based rerouting:** resend through another channel if delivery hasn't completed within a set time.

This turns an infrastructure concept into a product decision the customer controls. These were fully defined, with development scheduled after the initial MVP automation.

**Logs as a single source of truth.** One log of every inbound and outbound message, filterable by channel, alongside API, error, audit and billing logs. When a customer asks "what happened to this message?", there is one place to answer it.

## Teaching the domain

Many engineers were new to CPaaS. This became one of the project's main bottlenecks. Requirements only work when the people building them understand why channels behave differently, and building that understanding during development, not before it, added significant time and effort to the plan. I explained:

- **Delivery states** and why they differ by channel.
- **Sender identity and templates,** and why some channels need approval before sending.
- **Routing and fallback,** and when a message should move to another provider or channel.
- **Compliance constraints** and how they become product rules: sender registration, permissions, geographic limits.
- **Pricing differences** by channel and destination.

I didn't implement the infrastructure. My job was to understand it well enough to define correct behavior, spot gaps, and turn technical limits back into product decisions.

## From requirement to validation

The reconstructed example below uses a feature from my area. It is illustrative and not copied from internal documents.

| Step | Example: multi-channel fallback |
|---|---|
| Business goal | Higher delivery success for critical messages |
| User problem | "If WhatsApp delivery fails, my customer never gets the message." |
| Requirement | An automation can define a fallback channel used when the first delivery fails |
| User story | As a campaign manager, I set SMS as the fallback for a WhatsApp step so failed messages still reach the contact |
| Acceptance criteria | Fallback triggers only on a failed delivery state, not on "pending" · the contact receives at most one successful message · both attempts appear in the logs, linked together |
| UX | Fallback is set per step, with a visible indicator on the workflow canvas |
| Engineering | Delivery states differ by channel, so each one has its own explicit definition of "failed" |
| QA | Test each failure state per channel, and confirm no duplicate delivery and no fallback on slow-but-successful sends |

## Working across teams

| Translation | What it meant in practice |
|---|---|
| Sales → Product | Turning client promises into actual requirements, or into roadmap items |
| Product → Design | Business rules and channel constraints expressed as flows and states |
| Product → Engineering | Expected behavior made explicit, especially per-channel differences |
| Engineering → Product | Technical limits turned into product decisions, not silent gaps |
| Product → QA | Acceptance criteria as the shared definition of done |

Scope pressure is covered in the [request-triage framework](request-triage.md).

## Outcome

- The MVP was delivered with four channels, onboarding, audience management, numbers, billing, APIs, and initial campaigns and automation.
- Pilot clients and sales demonstrations.
- A full product map and definition-status system that the continuing team built on after handoff.

## What I learned

- **Domain expertise in engineering is a prerequisite, not something to build along the way.** CPaaS behavior can't be fully captured in requirements: delivery states, sender rules, routing and compliance all need engineers who understand the domain before development starts. Our team's limited CPaaS experience was one of our main bottlenecks. It added a great deal of time and effort that no amount of requirement detail could fully recover.
- **"Sent" is not a single state, and "no receipt yet" doesn't mean "failed."**
  - **SMS:** delivery receipts come from carriers. Depending on the route and country, they can arrive late, never arrive, or confirm only that the carrier accepted the message.
  - **WhatsApp:** status updates (sent, delivered, read, failed) arrive asynchronously through webhooks. Messages a business starts outside the 24-hour customer-service window must use pre-approved templates, so "send a message" can be blocked before it begins.
  - **What it changed:** any retry or fallback logic needs a per-channel definition of failure, has to treat "pending" differently from "failed," and must guard against a late success receipt arriving after the fallback has already fired. That's why the fallback example above fires only on an explicit failure and allows at most one successful message.
- **A product map is a delivery tool, not documentation.** Once every feature had an owner and a definition status, scope discussions moved from opinion to evidence.
- **Platform value lives in the shared core.** Channels are what customers ask for. What makes a platform worth more than its integrations is the audience, logs and billing underneath.
- **Turn infrastructure concepts into customer choices where you can.** Fallback and routing became understandable once they were things a user configures.
