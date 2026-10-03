# Metrics Framework

**How to tell whether an AI interview product is working: not just whether it runs, but whether its judgments deserve trust.**

An AI hiring product can be fast, stable and widely used while still scoring candidates badly. So metrics are split into four layers. A good result in one layer never stands in for another.

## Status key

| Status | Meaning |
|---|---|
| **Reported** | Measured, and the number is published here |
| **Tracked** | Measured, but the number is not disclosed |
| **Defined** | Metric and target set, but no reported value yet |
| **Proposed** | My recommendation for what should be measured next |

## 1. AI quality: are the judgments right?

| Metric | What it answers | Status |
|---|---|---|
| Agreement with human reviewers | Do scores line up with how experienced recruiters judge the same answers? | Tracked |
| F1 against recruiter decisions | Does the AI recommendation match the reference decision, balancing false positives and false negatives? | Defined |
| Score distribution health | Are scores spread realistically? Watch the share of answers with five identical scores, and the share at top relevance. | Proposed |
| Cap trigger rate | How often refusal, generic or non-answer caps fire, by question type | Proposed |
| Repeat-scoring consistency | Does the same answer get the same scores when re-evaluated? | Proposed |
| Drift after prompt or model changes | Do scores on a fixed reference set move when the evaluator changes? | Proposed |

The distribution and cap metrics come straight from the failures found in pre-launch testing: scores bunching low, a halo effect, and over-scored relevance. Monitoring them after launch catches the same problems if they come back. See [case study 01](01-calibrating-ai-evaluation.md).

## 2. Product: does the workflow work for people?

| Metric | What it answers | Status |
|---|---|---|
| Interview completion rate | Do invited candidates finish? | Tracked |
| Invitation-to-start conversion | Where do candidates drop before recording? | Proposed |
| Retry usage per question | Are retry limits and timing set right? | Proposed |
| Report opened before decision | Do recruiters actually read the AI output before acting? | Proposed |

## 3. Business: does it save recruiter effort?

| Metric | What it answers | Status |
|---|---|---|
| Candidate volume | Is it being used at scale? (**4,360+ candidates in Beta**) | Reported |
| Screening effort vs. the manual process | How much recruiter time and workload does it remove? | Defined |
| Time to screen | How long from invitation to a reviewable report? | Proposed |
| Repeat usage per organization | Do teams keep using it after the first project? | Proposed |

## 4. System: does it run reliably?

| Metric | What it answers | Status |
|---|---|---|
| API response time | **Under 200 ms in load testing** | Reported |
| Report generation time | **Under 30 seconds in load testing** | Reported |
| AI processing success rate | **Above 99.5% in load testing** | Reported |
| Concurrent request handling | Backend behavior under high request volume | Tracked |
| Processing within SLA, uptime, email delivery | Is each step reliable end to end? | Defined |

Load-test results describe backend behavior under request volume. They aren't a claim about real-world concurrent users. Realistic candidate concurrency and the AI-processing workload are separate capacity questions.

## What F1 can't prove

F1 is useful, but it measures agreement with a reference decision. If past recruiter decisions were themselves inconsistent, a high F1 can mean the AI copied that inconsistency faithfully. For a hiring product, F1 should sit alongside:

- **Agreement at criterion level**, against calibrated human ratings, not only the final recommendation. This shows where disagreement comes from.
- **Consistency:** the same answer scored again gives the same result.
- **Error analysis:** reading the cases where the AI and the humans disagree, not just counting them.
- **Group-level checks**, where legally and ethically appropriate, so no group of candidates is scored systematically differently.
- **Qualitative review** of the evidence notes and summaries, since that is what recruiters actually read.

## What is deliberately not measured

Facial-analysis signals aren't part of any quality metric. They never feed the score (see [decision 7](decision-log.md)), so measuring the evaluation against them would quietly bring them back into the decision.

---

*Target values and internal figures are withheld. Only the four "Reported" numbers are published.*
