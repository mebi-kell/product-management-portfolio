# Decision Log

---

## 1. AI as the engine, not a chatbot

**Context.** The default AI travel product is a chat window that answers "where should I go?"
**Decision.** Spread AI across the product: itinerary generation, live monitoring and contextual suggestions. Don't put it behind one conversational interface.
**Why.** The value is in decisions made *during* the trip, which a chat window only reaches if the traveler thinks to ask.
**Trade-off.** It's harder to demo than a chatbot, and it needs reliable context data to be worth anything.

---

## 2. Suggest, never silently change

**Context.** Real-time adaptation could have rewritten the itinerary automatically.
**Decision.** Every change is a suggestion in a fixed format, *cause → impact → option → what you keep*, and nothing changes until the traveler accepts.
**Why.** A trip is personal, and silent changes break trust the first time the AI is wrong.
**Trade-off.** Each change needs one more tap.

---

## 3. Alerts tiered by urgency and consequence

**Context.** Live traffic, transit and weather data produce far more events than a traveler wants to hear about.
**Decision.**
- Disruption on a booked leg → immediate alert.
- Traffic → only when it threatens a fixed commitment, or passes a delay threshold.
- Weather → only for outdoor activities in the affected time window.
- Opportunities → only in free gaps, with a daily limit.

**Why.** Notifications tied to consequences keep the assistant worth listening to.
**Trade-off.** Some useful but non-urgent information is deliberately held back.

---

## 4. Bookings are fixed anchors

**Decision.** The engine never modifies a paid booking. The rest of the day reflows around bookings, and if a booking itself is at risk, the provider's change or cancellation policy is shown first.
**Why.** Money and contracts with third parties are where an AI mistake costs the most.
**Trade-off.** Plans are less flexible on days with many bookings.

---

## 5. Validate before showing

**Decision.** Deterministic checks on opening hours, travel time between stops and booked times run before any itinerary is shown.
**Why.** An LLM can write a beautiful plan that is physically impossible. The checks stop it from presenting one.
**Trade-off.** Extra logic and latency when itineraries are generated.

---

## 6. Accessibility is a constraint; mood is a preference

**Decision.** Accessibility needs (for example, step-free routes and venues) are hard constraints every plan must satisfy. Mood, interests and pace are soft preferences that shape the plan; for example, "relaxed" means fewer stops.
**Why.** Getting a preference wrong is disappointing. Getting an accessibility need wrong can ruin the trip.

---

## 7. Fail safe on stale data

**Decision.** If live data is unavailable or out of date, keep the plan and show "Live updates unavailable" with the time of the last update.
**Why.** A confident suggestion built on stale traffic data is worse than no suggestion.

---

## 8. Use the LLM only where it adds value

**Decision.** The LLM generates itineraries and writes alternatives and explanations. Monitoring is cheap, rule-based checks against live data, and the LLM is called only when a trigger fires.
**Why.** Calling a model continuously for every traveler would be slow and expensive, and mostly unnecessary.
**Trade-off.** Two kinds of logic to maintain, rules and prompts.

---

## 9. An honest marketplace

**Decision.** Partner offers are always labelled, shown only when they match the traveler's profile, and never silently replace the traveler's choice. Monetization starts simple, with affiliate revenue, before booking commissions, sponsorships and subscriptions.
**Why.** If recommendations feel bought, the engine loses its credibility. And a staged business model fits a marketplace that has to earn trust before it can charge for it.

---

## 10. A narrow MVP, a fully prototyped vision

**Decision.** The MVP is AI itinerary generation plus basic booking (flights and hotels). Every other capability was defined and built into the prototype but scheduled for later phases.
**Why.** The MVP should prove the core value. Prototyping the rest exposed the dependencies early, while they were still cheap to fix.
**Trade-off.** A bigger prototype to build and maintain, which was made practical by building it with AI tools (Figma Make, then vibe-coded).
