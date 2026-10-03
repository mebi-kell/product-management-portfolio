# From Infrastructure to an HR Product

**How an old "simplified CPaaS for HR" concept became an HR communications and engagement product, and how it was defined and designed under a dependency it didn't control.**

## Context

HR and People teams communicate with every employee: announcements, onboarding, policy reminders, surveys, lifecycle moments. The organization already had communications infrastructure through a CPaaS platform. The question was whether that infrastructure could become a product HR teams would actually choose.

I joined as Product Manager / Product Builder, working with a dedicated designer. An earlier concept and a dated frontend MVP already existed.

## The starting hypothesis

The original concept was, in effect, **a simplified CPaaS for HR managers**: a friendlier way to send messages to employees. I treated it as a hypothesis, not a plan, and re-tested it through:

- conversations with HR professionals and potential customers
- research into the employee-communications and engagement market, including public products such as Staffbase, Firstup, Haiilo, Workvivo, Oak Engage and Culture Amp
- what newer technology, especially generative AI, made possible

## What discovery changed

| Old belief | What we found | What changed in the product |
|---|---|---|
| HR needs a simpler way to *send* messages | HR needs to plan, target, automate and measure communication | The product became campaign management, automation and engagement, not just sending |
| Uploaded lists are enough for targeting | Lists go stale the moment someone joins, moves or leaves | Dynamic, rule-based segments maintained by the platform |
| Email reaches everyone | Frontline and field employees often have no work email | SMS and WhatsApp are first-class channels in the MVP, alongside email |
| Communication is a one-way broadcast | HR needs to hear back | Surveys, feedback and engagement tracking became part of the core loop |
| Delivery metrics prove success | "Delivered" says nothing about whether anyone read or acted | Engagement metrics: a company engagement gauge, click rate, per-employee engagement |
| Automation needs technical setup | Lifecycle communication is recurring and predictable | A visual workflow builder organized by HR categories: people events, HR lifecycle, compliance, culture |
| Communication is ad hoc | HR plans around events, holidays and cycles | A communications calendar linked to campaign scheduling, with special dates and holidays |

## Translating infrastructure into HR concepts

The core product work was abstraction: keep the power of the infrastructure, remove its vocabulary.

| Infrastructure concept | What HR sees | How the product handles it |
|---|---|---|
| Providers, sender IDs, templates | "Connect WhatsApp" | Channel setup defaults to a **managed** path, with a guided setup inside the product. Bringing your own provider is a secondary, advanced option. |
| Recipient lists | Employees | The directory is fed by HRIS sync, CSV import or manual entry. Every record shows its source. |
| Data ownership | One source of truth | HRIS-synced records are locked and edited in the HRIS, never overwritten locally. Sync health is always visible. |
| Static targeting | Segments | Rules over employee attributes, with a live member count, maintained automatically. |
| Delivery failure and retry | Follow-up | "If unread after 48 hours, resend by email": follow-up is based on **engagement**, not just delivery failure. |
| Delivery receipts | Engagement | Reads, clicks and responses roll up into engagement views HR can act on. |

That follow-up rule is the clearest difference from the underlying platform. The CPaaS reroutes when a message *fails*. The HR product follows up when a message is *ignored*, because that is what an HR manager actually cares about.

## Segmentation as the foundation

Campaigns, automation and surveys all reuse the same segments, so segmentation got the most design attention:

- **Visual rule blocks:** attribute, operator and value, with AND/OR toggles and automatic grouping for long chains.
- **A live member count** that updates while the rule is being built.
- **HR quick templates** such as "New hires < 90 days" or "Managers," which fill in a full rule set in one click.
- **A conflict guardrail:** contradictory rules are flagged and block saving.
- **Auto-join rules,** for example "If work location = Field, add to Frontline." They are evaluated nightly, and each run shows how many employees were added and removed.

Before the redesign, segmentation was mostly simple IF/AND logic. The redefined builder added more parameters, templates and automatic maintenance. An AI path came next.

## AI: inside the workflow, gated until measurable

**Dissolving the AI module.** An earlier version had a standalone "AI Generator" section. I removed it and moved the capabilities into the steps where they help:

- copy suggestions in the content studio
- send-time suggestions in campaign scheduling
- segment ideas in segmentation
- prompts in the automation builder

A separate AI tab made sense when organizations were cautious about generative tools. Built into the workflow, it means less switching between screens and AI appearing exactly where it adds value.

**AI copy assistance.** An assistant drawer sits beside the editor, so the canvas stays visible. It works on a selected block or drafts the whole message, in the channel's own format. Each request returns three variants, and the user chooses to use, copy or refine one. The AI proposes; the HR user decides.

**AI segmentation, deliberately held back.** AI-suggested segments started as a high priority. They were moved to the last stage (MLP), and the entry point opens a "beta, join the waitlist" message until there is a way to measure how often HR users accept the suggested segments. When enabled, the flow is: define parameters → review the AI-generated segments → save. Nothing is applied without review.

## Engagement that leads to action

Engagement data is only useful if it prompts something. On each employee's profile, a **rule-based engagement-risk flag** appears when interaction drops well below the company median, or when the employee hasn't read anything for an extended period. It comes with two one-click actions: send a check-in message, or assign a mentor. The flag is deliberately rule-based, not AI, so HR can see exactly why it fired.

A broader **Engage+** layer was also explored:

- reactions, read acknowledgements, quick polls and comments
- team leaderboards, badges and a recognition wall
- privacy controls, including anonymized leaderboards

Individual engagement scoring was flagged as uncertain. Engage+, along with an optional employee portal, was deferred to later stages so that the more basic and important features could come first: directory, segments, campaigns, automation, surveys and engagement analytics.

## HR-specific safeguards

Communication tools can easily overwhelm employees. The product added guardrails that a general messaging platform doesn't need:

- **Conflict detection:** warn if a segment would get more than two campaigns in one day, optionally block scheduling on company holidays, and require approval for after-hours sends.
- **Approval workflows** for content and campaigns, with versioned review.
- **Privacy settings** that control what employee data is visible, and to whom.

## Designing under a dependency

| The product team controlled | The CPaaS platform provided |
|---|---|
| Strategy, UX, requirements | Channels and provider integrations |
| Segmentation, campaigns, automation, surveys | The messaging backbone and APIs |
| Priorities and staging | Shared capabilities: authentication, account security, delivery |

Twelve functions, including login, MFA and account setup, were marked as already built on the CPaaS platform and reused, not rebuilt.

The harder dependency was people. After about two months of follow-up, no development team had been assigned and no deadline set. I staged the scope so the product could start delivering value as soon as engineering became available:

- **MVP:** a working, promotable product (about 1.5 months)
- **MMP:** what makes it marketable
- **MLP:** what makes it loved

The plan assumed a four-person team, with the timelines treated explicitly as assumptions.

## Outcome

- A fully defined product: 229 functions, 203 with the concept fully defined, 140 with PRDs and acceptance criteria ready.
- A designed MVP with a working prototype, ready for development.
- A staged plan (MVP, MMP, MLP) and a reuse model with the CPaaS platform.

The product was not built or launched before I left.

## What I learned

- **The concept I inherited was a guess, so I treated it like one.** On paper it was "a simpler CPaaS for HR," basically a nicer send button. Talking to HR people disproved that quickly: nobody's real problem was *sending*. It was knowing who should get what, when, and whether anyone actually read it. That one finding changed the core object of the product from the message to the campaign. Segments, automation and engagement all followed from there.
- **Abstraction is mostly about picking the right defaults.** I didn't try to teach HR managers about sender IDs, WhatsApp business verification or SPF/DKIM records. The managed path handles provisioning behind one "Connect" button. Bring-your-own (your own SMTP server or SMS provider) is still there for the IT person who wants it. The infrastructure didn't get simpler. It just stopped being the first thing anyone saw.
- **A vertical product changes what "failed" means.** At the CPaaS layer, failure is a delivery state: undelivered, bounced, rejected. For HR, a message that was delivered and then ignored for two days is the real failure. So follow-ups are triggered by engagement, not delivery receipts. That only works on channels that report engagement back (WhatsApp read receipts, email opens and clicks), and only if those events can be tied to each employee and each campaign.
- **Engineering capacity is a product input, not just a project-management detail.** Two months in, with no development team assigned, the backlog had to be ready to start on any given day. That's why it's split into MVP, MMP and MLP. It's also why we reused authentication and the messaging backbone from the platform instead of rebuilding them, and why the MVP runs on CSV and manual import instead of waiting on HRIS connectors.
