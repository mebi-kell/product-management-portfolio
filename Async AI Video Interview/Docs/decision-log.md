# Decision Log

Decisions 1–8 cover the AI evaluation. Decisions 9–11 cover the product and platform model.

---

## 1. Evaluate against a rubric, not with a rating

**Context.** The obvious approach was to ask the model to "rate this answer from 1 to 10." That produces a number nobody can explain, calibrate or compare across candidates.

**Decision.** The LLM scores each answer on five independent criteria: relevance, specificity, clarity, structure and depth. Each criterion has defined levels and a short evidence note taken from the transcript. The output is fixed JSON.

**Why.** Defined levels make scores explainable to recruiters, testable in QA, and calibratable when they drift. A structured output also means the model can be swapped without changing the product.

**Trade-off.** Five criteria cost more tokens per call than a single number, and every criterion definition needs maintaining.

**My role.** I designed the rubric and wrote the evaluator.

---

## 2. Fix the scale based on how it behaved in testing

**Context.** Strong answers kept landing too low. I found two causes. The mid-level definitions were framed negatively, which pulled scores down. More fundamentally, the original 0-1-3-5 scale had no value that mapped to the "strong" label recruiters saw in the UI.

**Decision.** I rewrote the level definitions and moved to a 0-1-3-4-5 scale, so "strong" became a score the model could actually give. The prompt also states the expected spread: most good answers are a mix of 3s and 4s.

**Why.** If the scale and the UI labels disagree, the model and the recruiter are reading different instruments.

**Trade-off.** Scores before and after the change aren't directly comparable.

**My role.** I diagnosed the issue and changed the scale.

---

## 3. Judge spoken answers as speech

**Context.** The model reads a transcript of speech, not an essay. Penalizing filler words or accents would measure presentation, not substance. Speech-to-text also cleans up wording, which could make answers look more polished than they were.

**Decision.** Filler words, false starts, accent and grammar are not penalized unless meaning is lost. A clean transcript counts as baseline clarity, not exceptional clarity. Confident delivery never substitutes for reasoning: score the words.

**Why.** It's fairer to non-native speakers and nervous candidates, and it stops the transcription step from inflating scores.

**My role.** I defined these principles in the evaluator.

---

## 4. Score every answer and every criterion independently

**Context.** Pre-launch testing showed two problems. Scores on one question were influencing the next, and relevance was too often scored at the top level.

**Decision.** Each answer is evaluated statelessly, with no memory of previous answers. Criteria are scored in a fixed order, with judgment reset at each step. If all five scores come out identical, the model must re-examine them. Top relevance now requires a complete, direct answer: mentioning the topic isn't enough.

**Why.** Score leakage and halo effects make candidates incomparable, which removes the point of structured evaluation.

**My role.** I made the prompt changes.

---

## 5. Hard caps for answers that aren't really answers

**Context.** Candidates refuse, ramble, give generic answers, dodge, or record silence. Left to the rubric alone, a fluent non-answer could score well.

**Decision.** Caps are applied before rubric scoring: refusal, empty, too short, generic, off-topic dodge, on-topic non-answer, and insufficient data. When several caps apply, the most restrictive ceiling wins for each criterion. Checking for empty input moved out of the prompt into backend code.

**Why.** Edge cases are where trust is won or lost. The validation move fixed a real failure: the template engine filled in placeholders before the model ran, so the in-prompt "missing input" check misfired on genuine answers.

**My role.** I designed the caps, diagnosed the template issue and specified the backend check.

---

## 6. Relevance gates the score

**Context.** A polished answer to a different question shouldn't outrank a rough answer to the right one.

**Decision.** In the deterministic scoring layer, relevance has an outsized effect on the overall answer score, and answers with low relevance are capped no matter how strong the other criteria are. When expected points are provided for a question, the share of those points an answer covers sets ceilings on relevance and depth.

**Why.** Being on-topic is necessary but not sufficient. The scoring should reflect how recruiters actually judge answers.

**Trade-off.** The scoring logic is more complex than a simple average, so it needs explaining to clients.

**My role.** I wrote the scoring logic.

---

## 7. Facial-analysis signals are context, not criteria

**Context.** The platform can produce facial and emotional signals from video. The easy move was to fold them into the score.

**Decision.** They're shown to recruiters as supplementary insight and never feed the score or recommendation.

**Why.** Emotional expression is noisy, depends on context and varies across cultures. Turning it into a hiring criterion would add a questionable signal to a high-stakes decision.

**My role.** I challenged the assumption that every AI signal should become a score.

---

## 8. Summaries describe; they don't decide

**Context.** Recruiters want a fast read of each answer. Early versions mislabeled weak or filler-heavy answers as "placeholder text."

**Decision.** Every answer gets a short summary, written the way a recruiter would write it. It contains no scores and no hiring judgments. It describes low-quality answers honestly instead of calling them missing. Summaries are written in the job's language, and evidence notes in the candidate's language.

**Why.** A summary that sounds like a verdict pushes the recruiter toward the AI's decision. Calling a real answer missing is simply wrong.

**My role.** I defined the summary rules and fixed the mislabeling.

---

## 9. Cut the evaluator prompt by 66%

**Context.** After many iterations, the prompt had grown to about 3,500 words and was causing consistent API errors.

**Decision.** I rebuilt it at about 1,200 words. It keeps every rule, merges duplicated instructions and uses lighter formatting.

**Why.** It is cheaper, faster and more reliable. One place for each rule also makes it easier to maintain.

**Trade-off.** Each rewrite needs regression checks against known answers.

**My role.** I did the rebuild, which shipped as the production version.

---

## 10. A customer request became a product model

**Context.** An enterprise customer asked for "our own question catalogue." The catalogue was system-wide: every question was visible to everyone.

**Options.**
- Build a one-off list for that customer.
- Give the catalogue a concept of ownership.

**Decision.** Questions are scoped: system templates for everyone, company templates for a single organization. Company templates are organizational assets, so only admins can create or change them. Recruiters use them but can't modify the canonical version.

**Why.** The real problem wasn't the missing list. It was that the catalogue had no ownership model. Company scope serves every similar customer, survives employee turnover, and keeps interview standards consistent. Permissions protect consistency here, not just access. Personal and team scopes can be added later without redesign.

**Status.** Shipped, including admin-only governance.

**My role.** I reframed the request and designed the scope model.

---

## 11. Each system owns the domain it controls best

**Context.** The interview engine was being integrated into a broader assessment platform. Without clear ownership, the two systems would duplicate settings and drift apart.

**Decision.**
- **The platform owns** the assessment lifecycle (expiry, invitations, email, branding) and where results are shown.
- **The interview engine owns** the interview experience and the AI processing.
- **Candidate statuses** are reduced to Not Started, Started and Completed.
- **Interview creation** is designed to be retry-safe, so a failure can never leave a project without sessions, sessions without invitations, or duplicates after a retry.

**Why.** Recruiters should work in one workflow, not manage two products, and they need statuses that mean something to them, not a view of the backend. The split also follows the architecture. The systems run on different stacks with separate databases, so each step sits with the system that already holds its data or pipeline. Cross-system creation is made safe through retry-safe APIs, not a shared transaction.

**Status.** Shipped, including retry-safe creation.

**My role.** I defined the ownership split, the status model and the failure requirements.
