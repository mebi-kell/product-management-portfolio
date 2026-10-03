# AI Fluency Assessment

**Can this candidate use AI effectively, critically and responsibly in their actual work?**

An end-to-end product case study: defining a new assessment category, designing an LLM-based evaluation system a hiring team can trust, and shipping it to Beta in a lean team.

**Role:** Product Manager / Product Owner
**Stage:** Shipped. In Beta with existing enterprise clients.
**Focus:** AI product management · Assessment design · LLM evaluation · UX · Technical PM · QA

---

## The problem

Companies are adopting AI faster than their hiring methods are changing. Candidates claim AI proficiency, but interviews and CVs can't tell someone who knows AI vocabulary from someone who can get reliable work out of an AI tool.

A competitive audit I ran covered 17 platforms. Only 11 actually tested a person's AI proficiency. The rest were organizational readiness diagnostics, AI *engineering* tests, or platforms that use AI to score other skills. Even among the 11, multiple-choice knowledge checks were common.

Knowing about AI and being able to use it are different skills. This product is built around that gap.

## What it is

A scenario-based assessment of practical AI fluency, about 46 minutes long, in five sections:

| Section | What it measures | Format |
|---|---|---|
| Core Understanding | A working mental model of what AI can and can't do | Multiple choice, auto-scored |
| Prompt Engineering | Writing clear, constrained, strategic instructions | Open-ended, LLM-scored |
| Task Simulation | Breaking real work into AI and human steps with validation | Open-ended, LLM-scored |
| Output Evaluation | Catching errors, bias and false confidence in AI output | Open-ended, LLM-scored |
| AI Governance & Security | Responsible use, data handling, security boundaries | Multiple choice, auto-scored |

Recruiters choose a **Technical** or **Non-Technical** track. Both tracks take the same five sections. They differ only in the mix of question difficulty and in what the scorer expects from a strong answer.

Recruiters see **qualitative fluency labels only**: an overall tier, a tier for each section, a short AI-written summary and a recommended next step. No numbers are shown.

## My role

I owned the product from early concept to Beta. The team had no dedicated designer, QA function or Scrum Master, so the PM/PO role also covered those areas.

- **Product.** I set the problem framing, scope, requirements, backlog and prioritization, and decided what shipped and what waited.
- **Assessment design.** I designed the five-section framework, the scoring rubrics, the weighting model and the tier system.
- **Evaluation layer.** I designed and wrote the evaluator module: the rubric-driven scoring prompt, the response validation, and the deterministic code that turns scores into tiers and labels. Engineering integrated it as written.
- **Technical architecture.** I wrote the integration architecture under a 7–10 day MVP deadline, with the assessment running as a separate service inside the host platform.
- **UX.** I specified the result page and designed the report experience, using AI design tools for exploration.
- **QA.** I tested flows and scoring output, traced defects to root cause, and fixed them in the evaluator module.
- **Market research.** I ran the competitive audit of the AI-proficiency testing market.

## Key decisions

The full reasoning, alternatives and trade-offs are in the [decision log](Docs/decision-log.md).

1. **Measure use, not knowledge.** The three practical sections are open-ended and scored by an LLM against rubrics. They carry most of the scoring weight.
2. **The LLM judges answers; code makes decisions.** The model scores one answer at a time. Deterministic code produces the aggregate score, tiers and recommendations.
3. **Labels, not numbers.** Recruiters see fluency tiers because numeric scores invite false precision in hiring.
4. **One structure for both tracks.** The tracks share one framework and differ by difficulty, which keeps results comparable and the rubric calibratable.
5. **Role-specific tests built but held back.** The market is new to this category, so clients start with the simpler version.
6. **A competency cut because it couldn't be measured.** Iterative reasoning matters, but without a live AI in the test there was nothing honest to score.
7. **Evaluator prompt cut by about 78%.** It went from about 8K to about 1.75K tokens per scoring call, with lower cost and latency, more consistent output, and easier maintenance.

## How AI was part of my workflow

AI was part of the product, and it was also part of how I built the product. I used AI assistants for the competitive audit, rubric and prompt drafting, architecture documentation, report design exploration and defect tracing.

The product judgment stayed with me. I questioned the AI's own first-draft evaluator prompt as over-engineered, which led to the ~78% reduction. The labels-only report, the deferral of role-specific tests and the removal of an unmeasurable competency were product decisions I made. The AI helped draft and test them; it didn't make them.

## Outcome

- Shipped to Beta with existing enterprise clients.
- Established a scoring framework, rubric set and evaluator system that run in production.
- Delivered a recruiter result experience that shows only qualitative labels.

## Explore

- [`Docs/decision-log.md`](Docs/decision-log.md): nine product decisions with context, alternatives and trade-offs.
- [`Docs/evaluation-flow.md`](Docs/evaluation-flow.md): how answers become a result. It covers who decides what, the guardrails, and what happens when the AI is wrong.
- [`Prototype`](https://mebi-kell.github.io/product-management-portfolio/AI%20Fluency%20Assessment/Prototype/AI%20Fluency%20Assessment%20v2.dc.html): an interactive walkthrough. It sets up a test, picks a strong or weak answer for each written section, follows one answer through scoring, and compares the recruiter report with what it hides. The interface is reconstructed and scoring is simulated.
- More to come: the assessment framework overview.

---

*Company and product names are withheld under NDA. Scoring weights, thresholds and prompt text are described at an abstracted level only.*
