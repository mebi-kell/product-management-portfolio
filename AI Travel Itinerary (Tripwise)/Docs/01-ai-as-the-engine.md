# AI as the Engine, Not the Interface

**How TripWise went from a concept to a functional prototype: an AI travel product built around decisions instead of chat, a three-sided ecosystem, and a deliberately narrow MVP.**

## Starting from nothing

TripWise began as an idea, with no existing product, backlog or design. I took it from concept through research, strategy, ecosystem design, AI product design, UX and UI, to a functional prototype ready for MVP development.

## What research changed

I researched itinerary planners such as **TripIt** and **Wanderlog**, along with booking, discovery, social-travel and recommendation products. Most tools were strong at *one moment* of a trip, whether planning, booking or inspiration, and then left the traveler to deal with whatever happened next.

That shaped the core position: **TripWise covers the whole trip, and keeps working after the plan is made.**

```
Discover → Create trip → AI itinerary → Book → Travel → Real-time adaptation → Share and connect
```

## Designing AI as an engine

The design question was never "where do we put the chatbot?" It was **"where can intelligence reduce friction or improve a decision?"** That led to AI being spread across the product:

- **Planning:** an itinerary built from the traveler's profile (mood, interests, pace, accessibility, favorite cities), the trip, and what's actually available.
- **During the trip:** monitoring traffic, transport and weather against the plan.
- **Discovery:** relevant experiences and creator picks surfaced in free time.

Two kinds of logic do different jobs:

- **The LLM** generates itineraries and writes alternatives and explanations.
- **Deterministic logic** validates plans (opening hours, travel times, bookings, accessibility) and watches the trip with cheap rule checks.

The LLM runs only when a trip is generated or edited, or when a trigger fires. That keeps cost and latency under control, and keeps the facts the AI can't verify itself (whether a place is open, whether you can get there in time) in deterministic checks.

The full model is in the [decision model](decision-model.md).

## Keeping the traveler in control

Real-time adaptation is where AI products most often overstep. The rules were strict:

- **Suggest, never silently change.** Every suggestion reads *cause → impact → option → what you keep*, and nothing changes until the traveler accepts.
- **Alerts tiered by urgency:**
  - a disrupted booked leg is immediate
  - traffic matters only when it threatens a fixed commitment
  - weather matters only for outdoor plans
  - opportunities wait for free time, with a daily limit
- **Bookings are fixed anchors.** The engine never touches a paid booking.
- **Fail safe.** If live data is stale, the plan stays as it is and the app says so, with no confident suggestions based on old data.
- **Honest marketplace.** Partner offers are labelled, relevance-gated, and never replace the traveler's choice.

## A three-sided ecosystem

TripWise served three groups, and the work was designing how they relate, not just three separate interfaces:

| Side | Gets | Gives |
|---|---|---|
| **Travelers** | Personalized planning, real-time help, booking, discovery, social travel | Intent, preferences, bookings, content |
| **Partners** (hotels, transport, attractions, experiences) | Distribution to relevant travelers, bookings | Offers the engine can recommend |
| **Creators** | Audience, influence, monetization | Guides and recommendations that drive discovery |

Partners and creators each had their own desktop admin experience within the same platform. Partners worked with listings, availability, bookings and performance. Creators had a more CRM-like view of content, audience and earnings.

**Monetization was planned in stages.** It would start simple, with affiliate revenue, then add booking commissions, sponsorships and subscriptions as the ecosystem matured.

## A narrow MVP, a fully defined vision

The vision was very broad: itinerary, booking, real-time adaptation, partners, creators, social and shared trips, gamification, even mood-based music (with Spotify and Apple Music integrations planned). Building all of it first would have meant validating none of it.

| MVP | Later phases (defined and prototyped) |
|---|---|
| AI itinerary generation | Real-time adaptation |
| Basic booking: flights and hotels | Partner marketplace and admin |
| | Creators, social, shared trips |
| | Gamification (badges, travel scores, lists) |
| | Personalized music |

Every later-phase feature was still **defined and included in the prototype.** That made the dependencies visible up front, such as how real-time changes, partner offers and creator content would each connect back to the itinerary. The MVP was narrow, but it wasn't built in a way that would block the rest.

## Designing it myself

I owned the full design work: UX research, information architecture, user flows, wireframes, high-fidelity UI, a design system shared by the traveler app and the partner and creator admin, interaction design for AI states (suggestion, explanation, accept, keep plan, data unavailable), and responsive behavior.

## Building the prototype with AI

The prototype itself was built with AI tools:

1. **Figma Make (Figma's AI)** for the first interactive prototype, to explore flows and screens quickly.
2. **A vibe-coded functional prototype** next, so the experiences could actually be clicked through, including the dynamic scenarios.

That moved validation from "does this screen look right?" to "does this decision flow feel right?" much earlier than static design would have.

## Outcome

- Taken from concept to a functional prototype ready for MVP development handoff.
- A defined product direction, ecosystem and MVP boundary, a design system, and designed experiences for all three sides.
- AI requirements covering triggers, explanations, guardrails, fallbacks and cost.

The product wasn't launched during my involvement.

## What I learned

- **Most of the AI work isn't the AI.** The LLM writes plans and explanations, but trustworthiness came from the boring parts: opening-hour checks, travel-time validation, booking anchors, stale-data fallbacks. If the model can't verify a fact, don't let it be the one deciding it.
- **Alert fatigue is a product bug.** A traffic API will happily tell you about every slowdown. Tying triggers to *consequences* (a fixed booking at risk, an outdoor plan in the rain) is what keeps notifications worth reading.
- **Explanations are part of the UX.** "Cause → impact → option → what you keep" is a trust mechanism, not decoration. People accept changes they understand, and can confidently reject the ones they don't want.
- **Prototype the whole vision, ship the core.** Putting later-phase features into the prototype wasn't scope creep. It exposed dependencies while they were still cheap to fix.
- **AI tools change when you can validate.** Going from Figma Make to a vibe-coded prototype meant testing real decision flows, not static screens, before a development team was involved.
