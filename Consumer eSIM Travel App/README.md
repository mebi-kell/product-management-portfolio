# Consumer eSIM Travel App

**Making a technically complex product understandable to ordinary travelers, from purchase through installation, use, sharing and expiry.**

**Formal title:** Project Management Assistant
**Actual scope:** lifecycle mapping, product and UX requirements, business rules and edge cases, design and development review, QA and store release, pricing research, rebranding, product marketing
**Stage:** Live and revenue-generating, with 100K+ downloads on Google Play
**Focus:** Consumer UX · Lifecycle state design · Payment and installation reliability · Market and pricing research

---

## The problem

The app already worked. Users could buy an eSIM. What they couldn't do was *understand* one. An eSIM moves through states most travelers have never had to think about, and the app made them guess:

> *What did I buy? Is it installed? Can I use it yet? Which eSIM is for whom? How much data is left? Did my payment go through? What happens when it expires?*

The problem wasn't any single screen. It was the lack of a mental model.

## The same SIM, seen from two sides

This app was later integrated into [CMP](../Connectivity%20Management%20Platform/README.md), the company's B2B connectivity platform, as a sub-account. The two products deal with the same SIM in very different language:

| The operator sees (CMP) | The traveler needs (this app) |
|---|---|
| Activate · Assign · Monitor · Suspend · Resume · Deactivate · Retire | Bought · Installed · In use · Running low · Expired |

The product work here was translating the first column into the second.

## My role

There was no dedicated Product Manager when I joined. I worked with the CPO, designers, developers and marketing:

- **Discovery:** mapped the end-to-end eSIM lifecycle and identified the main UX problems with the CPO.
- **Definition:** wrote requirements, business rules and edge cases for onboarding, purchase, payment, installation, active use, multiple eSIMs, regional packages and expiry.
- **Design and development review:** turned requirements into UX requirements, reviewed designs, clarified details for developers, and checked the implementation against the intended behavior.
- **QA and release:** worked through the release checklist, pre-release QA, store content, and the App Store and Google Play release.
- **Research:** desk research on the market and pricing across major eSIM providers.
- **Rebrand and marketing:** coordinated the rebrand across the app, store listings, website and messaging, and contributed to positioning, ICP, launch strategy and KPIs.

I wasn't the sole owner of the product; it was a team effort led with the CPO.

## Key decisions

1. **One clear status per eSIM.** Each eSIM shows one state from a fixed set, so "which one can I use?" always has an answer.
2. **eSIMs bought for other people.** Travelers buy eSIMs for family and companions too, so every eSIM gets an owner label and its own installation hand-off.
3. **Installation separate from activation.** Install before the trip, use on arrival, with guided installation paths and a compatibility check before purchase.
4. **Installation messages that tell you what to do.** Every installation success or error says what happened, what it means, and what to do next.
5. **Packages that match real trips.** Regional bundles such as Europe or the Balkans, built from where people actually travel.
6. **Show success only when the payment provider confirms it.** The success screen and eSIM delivery wait for the payment provider's server-side confirmation, not just what the app sees.

## Outcome

- The new version was released and the app was rebranded.
- The product is live and revenue-generating, with **100K+ downloads on Google Play**.

## Explore

- [`Docs/01-making-esim-understandable.md`](Docs/01-making-esim-understandable.md): the lifecycle problems, the requirements behind each decision, and the research.
- [`Docs/lifecycle-map.md`](Docs/lifecycle-map.md): each stage with the user's question, the system state, the risk, and how the product handled it.
- [`Prototype`](https://mebi-kell.github.io/product-management-portfolio/Consumer%20eSIM%20Travel%20App/Prototype/Tavi%20eSIM%20v2.dc.html): an interactive walkthrough of the app. It is a portfolio reconstruction with synthetic data.

---

*The product, company and individual names are omitted. No AI functionality is claimed for the product.*
