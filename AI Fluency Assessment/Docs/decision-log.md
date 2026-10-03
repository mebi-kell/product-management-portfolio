# Decision Log

These are the product decisions that shaped the assessment. Each one records what triggered it, what else was on the table, and what it cost.

---

## 1. Measure practical use, not AI knowledge

**Context.** The competitive audit showed the market splitting three ways. Most tests used multiple-choice knowledge checks. A few frontier products embedded a live AI for candidates to work with. A small group used open scenarios.

**Options.**
- Multiple choice only: cheap, reliable to score, measures recall.
- Live AI embedded in the test: the most realistic option, but heavy to build and score.
- Written scenario tasks scored against rubrics.

**Decision.** A hybrid. The three practical skills (prompting, applying AI to a task, evaluating AI output) are open-ended written tasks scored by an LLM. Foundational understanding and governance stay multiple choice.

**Rationale.** The skills that separate "knows about AI" from "can use AI" only show up in what someone actually writes. Recall-type knowledge doesn't need an LLM to score it.

**Trade-offs.** Open-ended scoring brings model cost, latency and variance into the product. Decisions 4 and 8 exist to contain them.

**My role.** I ran the audit, defined the framework and set which sections are auto-scored and which are LLM-scored.

---

## 2. One structure for both tracks

**Context.** An earlier version of the framework gave the Technical and Non-Technical tracks different structures, with role-specific tagging.

**Options.** Separate frameworks per track, or one framework with track-specific calibration.

**Decision.** Both tracks take the same five sections and are scored on one weighting model. The tracks differ in two ways: the question difficulty mix (Technical skews hard, Non-Technical skews easy), and the scorer's expectation of what a strong answer contains. Technical answers need concrete tools and workflows to score at the top levels.

**Rationale.** With one structure, results are comparable across tracks, there is one rubric to calibrate, and recruiters have one report format to learn.

**Trade-offs.** Technical depth comes from difficulty and scorer expectations, not from role-specific content. Decision 3 explains why that was acceptable for v1.

**My role.** I made the decision and restructured the rubric and evaluator to match.

---

## 3. Role-specific tests: built, then deliberately held back

**Context.** The infrastructure for role-calibrated technical assessments was ready, and the initial MVP plan included role-based profiles.

**Options.** Ship role-specific variants at launch, or launch with the two tracks only.

**Decision.** Launch without role-specific variants and offer them as an advanced feature in the next version.

**Rationale.** AI fluency testing is a new category for HR teams. Every extra setup choice makes it harder for a recruiter to understand the core product before they've seen its value. Familiarity with the simpler version comes first.

**Trade-offs.** Technical hiring gets less role relevance in v1. Holding back a finished capability is a real cost.

**My role.** I made the scope call and sequenced it into the next version.

---

## 4. The LLM judges answers; deterministic code makes decisions

**Context.** These scores influence hiring. If a language model produced the overall verdict, nobody could fully audit or reproduce it.

**Options.** Let the model score the whole assessment and recommend an outcome, or confine the model to narrow, verifiable judgments.

**Decision.** The model scores one answer at a time against a section rubric. It rates four dimensions on a 0–4 scale, writes a one-line rationale citing evidence for each, applies anti-gaming checks, and reports its confidence. Everything above that level is deterministic code: the overall score, tiers, labels and recommended next step. The AI-written summary is a separate model call that receives only tier labels: no numbers and no raw responses.

**Rationale.** Splitting it this way keeps every hiring-relevant output reproducible and explainable, and limits model error to a single answer.

**Trade-offs.** It needs more application logic and stricter response validation, and per-answer scoring means more model calls.

**Validation.** During QA, one result came out with more decimal places than the scoring code could produce, which meant the model had computed its own aggregate. The same defect also exposed mismatched section keys that were silently scoring as zero. I fixed both:
- Section keys are now normalized.
- Unknown or missing keys now raise an error instead of defaulting to zero.
- The prompt now explicitly forbids the model from emitting aggregate scores.

**My role.** I designed the architecture and wrote the evaluator module, which engineering integrated as written. I traced and fixed the defect.

---

## 5. Recruiters see labels, not numbers

**Context.** Earlier report versions showed band letters and, in places, numeric scores. They also used four tiers, which put solid performers and exceptional ones in the same top band.

**Options.** Numbers plus labels, or labels only.

**Decision.** Labels only. Recruiters see five fluency tiers, a fit recommendation and a description per section, written to match the candidate's tier. Numeric scores and bands are kept internally for sorting and analytics but stripped before rendering. A new top tier now separates candidates who are solid and independent from those who can raise a whole team's AI capability.

**Rationale.** This is based on how HR teams actually use results. A 0.68 next to a 0.71 invites comparisons the measurement can't support and pushes users toward arbitrary cut-offs. Labels match how recruiters act on a result.

**Trade-offs.** Ranking large candidate pools becomes less granular, and two candidates in the same tier look the same.

**Validation.** A recruiter-language defect showed this rule needed enforcing in the AI summary too. Summaries were coming out in the candidate's test language instead of the recruiter's panel language. The fix made output language explicit and added a filter that strips any stray numbers the model writes.

**My role.** I made the product decision, wrote the result-page specification and fixed the summary defect.

---

## 6. Cut a competency because it couldn't be measured

**Context.** Iterative reasoning means diagnosing a weak AI output and refining toward a better one. It's a real marker of fluency, and it was scored as a small cross-cutting bonus.

**Options.** Keep inferring it from written answers, or remove it from scoring.

**Decision.** Remove it as a scored component and fold its weight into Task Simulation.

**Rationale.** Without a live AI in the test, candidates can't actually iterate. They can only *describe* iterating. Scoring that description would measure writing about a skill, not the skill itself.

**Trade-offs.** A real fluency signal goes unmeasured until the product supports live AI interaction.

**My role.** I made the decision and updated the rubric and scoring model.

---

## 7. No live AI inside the test, for v1

**Context.** The competitive audit identified embedded AI interaction as the frontier. Several competitors already offered it.

**Options.** Build an embedded AI workspace for candidates, or ship written scenario tasks first.

**Decision.** Written scenario tasks for v1.

**Rationale.** The architecture had a 7–10 day window. An embedded AI workspace would have multiplied both build scope and scoring complexity inside it.

**Trade-offs.** The product gives up the most realistic test format, and it directly caused decision 6.

**My role.** I set the v1 scope.

---

## 8. Cut the evaluator prompt by about 78%

**Context.** The first version of the evaluator prompt was about 8K tokens per scoring call. Instructions overlapped across blocks, and every competency and example was sent on every call.

**Options.** Keep the comprehensive prompt, split it into chained calls, or restructure it as a modular single call.

**Decision.** Restructure it into modular injection. A compact core prompt holds the scoring rules, and the right section rubric, competency definition and calibration examples are added per section. The result is about 1.75K tokens per call, roughly 78% less.

**Rationale.** The cut lowers per-call cost and latency. It also improves consistency, because the model weighs fewer competing instructions. Each scoring concept now lives in exactly one place, which makes the prompt easier to maintain.

**Trade-offs.** Assembly logic moves into code, and changes to the prompt need regression checks against the calibration examples.

**My role.** The first draft came from an AI assistant. I challenged it as over-engineered before it went further, then directed and validated the restructure.

---

## 9. Warning flags only where the overall score can mislead

**Context.** A candidate can reach a respectable overall tier on understanding and governance while being weak at actually using AI.

**Decision.** A warning badge appears only when Prompt Engineering or Task Simulation falls below a working threshold. No other section triggers one.

**Rationale.** These two sections are the practical core of AI fluency. The flag tells the recruiter when the headline tier may overstate readiness.

**Trade-offs.** It deliberately leaves weakness in the other sections unflagged, which is a judgment call about which gaps matter for day-to-day work.

**My role.** I designed the flag logic.
