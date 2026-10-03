# How the Product Definition Evolved

**Four passes over a few months, from a prioritized feature list to a staged, ready-to-build MVP.**

The definition wasn't written once. Each pass changed its structure, not just its content. That's the clearest evidence of how scope decisions were actually made.

## The four passes

| Pass | Structure | What it added |
|---|---|---|
| **1. Feature list** | 159 features across 10 categories. Each had a priority: Ready & Critical, Build Now (MVP gap), Fast-Follow, Growth, Delight/Experiment, or **Not Sure**. Grouped into six sprints plus a backlog. | The first full picture, with uncertainty labelled honestly instead of hidden |
| **2. Prototype review** | About 220 required UX and feature changes across nine modules of the first MVP prototype | Turned "it works" into "it works the way HR works" |
| **3. User-story backlog** | 229 user stories grouped under epics, each epic framed by a main user story. Prioritized with MoSCoW: 136 Must, 73 Should, 15 Could, 4 Won't. | Testable requirements and explicit trade-offs |
| **4. Staged delivery plan** | Every function assigned to MVP (89), MMP (120) or MLP (20), with separate status tracking for concept, design, PRD and acceptance criteria | A sequence engineering could start on at any point |

## What the prototype review changed

The review of the first MVP prototype was the most hands-on pass. Recurring change patterns:

- **Navigation:** secondary rails for Settings and the Help Center, instead of crowded tabs.
- **Findability:** search with filter chips and shareable filtered URLs across campaigns, segments and content.
- **Operations at scale:** bulk actions on employees, segments and campaigns.
- **Trust in data:** an HRIS sync health indicator, a source badge on every employee, locked fields for HRIS-sourced records, and a sync-failure drawer.
- **Governance:** content approval states, a campaign approval matrix, and conflict detection when scheduling.
- **Context preservation:** creating a campaign from the calendar returns you to the same calendar state afterwards, and settings changes restore your filters and scroll position.
- **Edge cases:** empty states, error states and loading skeletons, specified per component.
- **AI placement:** the standalone AI module was dissolved into each workflow.

## How scope moved between passes

| Capability | First pass | Final staged plan | Why it matters |
|---|---|---|---|
| AI-suggested segments | Build Now (MVP gap) | MLP, behind a beta waitlist until acceptance can be measured | Ambition was held back until quality could be measured |
| AI content generation | Build Now (MVP gap) | MMP, built into the content studio | Kept, but sequenced after the core loop |
| Engage+ (reactions, polls, leaderboards, badges) | Growth, with individual scoring marked Not Sure | Deferred to later stages | The more basic and important features came first |
| Optional employee portal | Every item marked Not Sure | Deferred to later stages | Same reason: the core loop before extra destinations |
| Slack and Teams | Part of distribution | MLP | Email, SMS and WhatsApp first |
| HRIS integration | Planned | MMP; the MVP runs on CSV import and manual entry | The MVP isn't blocked by a connector |
| Authentication and account security | To build | Reused from the CPaaS platform | Not rebuilt |

## Why staging mattered here

Development resources hadn't been assigned, so the plan had to stay valuable whenever engineering arrived. Staging into MVP, MMP and MLP meant:

- a working, promotable product first, about 1.5 months for a four-person team
- two close follow-up milestones
- every timeline explicitly marked as an assumption

The backlog was ready to start from the top on any day.

---

*Counts come from the backlog versions themselves. Feature names are generalized, and no internal links or environment details are included.*
