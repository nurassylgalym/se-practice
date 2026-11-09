# Week 08 — Lab report

**Name:** Nurassyl Galym
**Group:** CSCI2208 
**Date:** 2026-11-09

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I debugged with (tool) | |
| Exact model (with its version, or `not displayed`) | |
| Where the skill was installed (ChatGPT / Claude web / Claude Code / prompt-only simulation) | |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | my computer (Windows, cmd) |
| Vitest version (the `RUN  v…` line of a run) | 3.2.4 |
| Language of my booking module (`ts` or `js`) — the file I copied from `buggy/` | ts |

---

## 2. Task 1 — baseline, buggy code, failing tests

### 2.1 My Week 07 suite on my own code

The **real** output of your Week 07 suite, run in `week-08/app/` **before** you replace
anything. It should be green. If it is not, say why under the block.

```text
 RUN  v3.2.4 C:/Users/Nurassyl Galym/Desktop/KBTU/Software Engineering/Lab Week 1/se-practice/week-08/app

 ✓ src/booking.test.ts (24 tests) 10ms
   ✓ canBook — plan T01–T14 > T01 AC4: 660–720 touches the booking end, allowed 3ms
   ✓ canBook — plan T01–T14 > T02 AC1: 540–570 starts exactly at now, rejected 0ms
   ✓ canBook — plan T01–T14 > T03 AC1: 720–720 zero duration, rejected 0ms
   ✓ canBook — plan T01–T14 > T04 AC1: 750–720 reversed, rejected 0ms
   ✓ canBook — plan T01–T14 > T05 AC1: 1380–1441 past the end of the day, rejected 0ms
   ✓ canBook — plan T01–T14 > T06 AC2: 720–840 exactly 120 minutes, allowed 0ms
   ✓ canBook — plan T01–T14 > T07 AC2: 720–841 is 121 minutes, rejected 0ms
   ✓ canBook — plan T01–T14 > T08 AC4: 570–600 touches the booking start, allowed 0ms
   ✓ canBook — plan T01–T14 > T09 AC4: 630–690 partial overlap, rejected 0ms
   ✓ canBook — plan T01–T14 > T10 AC4: 570–690 contains the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T11 AC4: 615–645 inside the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T12 AC4: 600–660 identical to the booking, rejected 0ms
   ✓ canBook — plan T01–T14 > T13 AC3: 660–720 in a blocked room, rejected 0ms
   ✓ canBook — plan T01–T14 > T14 AC4: 630–690 with no bookings, allowed 0ms
   ✓ canBook — own cases and extra boundaries > X1 AC1: 1380–1440 ends exactly at 24:00, allowed 0ms
   ✓ canBook — own cases and extra boundaries > X2 AC4: 660–720 touches two bookings, allowed 0ms
   ✓ canBook — own cases and extra boundaries > B01 AC1: 541–570 first minute after now, allowed 0ms
   ✓ canBook — own cases and extra boundaries > B02 AC1: 660–720 with now 700, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B03 AC1: 701–720 with now 700, allowed 0ms
   ✓ canBook — own cases and extra boundaries > B04 AC4: 659–720 one minute over the booking end, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B05 AC4: 570–601 one minute into the booking start, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B06 AC4: 700–750 overlaps only the second booking, rejected 0ms
   ✓ canBook — own cases and extra boundaries > B07 AC4: 630–690 overlaps a booking listed second in an unsorted list, rejected 0ms
   ✓ canBook — data preservation > AC5: an Available request leaves the bookings unchanged 0ms

 Test Files  1 passed (1)
      Tests  24 passed (24)
   Start at  16:20:40
   Duration  1.68s (transform 74ms, setup 0ms, collect 71ms, tests 10ms, environment 0ms, prepare 202ms)
```

All 24 tests pass on my own Week 07 code (T01–T14, X1–X2, B01–B07, AC5).

### 2.2 The same suite on the provided canBook

You copied the whole `canBook` function from `buggy/booking.ts` (or `.js`) over yours and changed
nothing else. This is the real output:

```text
(paste here)
```

### 2.3 One failing test per bug

Add the two regression tests from README Part 1, step 5: one named `BUG-A` and one named `BUG-B`.
Run them **on the buggy code**. Both must fail here. That is the evidence that each test can see
its bug.

```text
(paste here)
```

---

## 3. Defect log

One row per defect. At least **BUG-A and BUG-B**. "Suspected cause" is your hypothesis
**before** you ask any assistant: the line and why.

| Defect | Test ID | Input | Expected | Actual | Suspected cause (line and why) |
| --- | --- | --- | --- | --- | --- |
| BUG-A | | | | | |
| BUG-B | | | | | |

---

## 4. Tasks 2–3 — the skill

**The checks from the deck, before you zip it.** Answer each one yes / no:

| Check | yes / no |
| --- | --- |
| The file is plain UTF-8 text, named exactly `SKILL.md` (not `SKILL.md.txt`) | yes / no |
| The first and the closing YAML delimiter are exactly three hyphens: `---` | yes / no |
| `name` is lowercase with hyphens, and `description` says WHEN to use it | yes / no |
| I read the whole file once: no passwords, API keys or private student data | yes / no |

**The contents of `skills/bug-detector.zip`.** Paste the listing (Windows: open the ZIP and copy
the paths; macOS/Linux: `unzip -l skills/bug-detector.zip`):

```text
(paste here)
```

**Installation.** Where you uploaded it, what the upload said, and whether a new chat showed the
skill as enabled. If upload was not available, write `prompt-only simulation` and say why.
Screenshot of the result: `evidence/install.png`.

<!-- Write below this line -->

---

## 5. Task 4 — without the skill

A **fresh chat, with no skill enabled**. Paste exactly what you sent: the deck's question, then
the same input you will use in section 6 (AC1–AC6, the failing test output, the code of
`canBook`):

```text
(paste here)
```

**The assistant's answer, pasted unedited:**

```text
(paste here)
```

---

## 6. Task 5 — with the skill

**Another fresh chat, with `bug-detector` enabled.** Send exactly the same input as in section 5.
Only the question changes, to the deck's skill question:

```text
(paste here)
```

**The assistant's answer, pasted unedited:**

```text
(paste here)
```

Did the environment show that the skill was invoked? yes / no / not shown

---

## 7. Comparison — judged against the actual code

Do not assume the skill did better. Judge both answers against the code and against what your
tests showed. Write a short verdict in each cell, and give a reason where they differ.

| Criterion | No skill | With skill |
| --- | --- | --- |
| Correct root cause | | |
| Reproducible test | | |
| Minimal proposed patch | | |
| Unsupported claims | | |
| Clarity of explanation | | |

**Which bugs did each answer find?** (BUG-A, BUG-B, both, neither)

-

---

## 8. Task 6 — repair and regression

Review the proposed patch yourself, then make **one minimal change per bug**, one commit each.
Rerun the test that was failing, then the full suite.

### 8.1 The BUG-A patch

The change as a diff (`git diff`, or the old and the new line), then the real run:

```text
(paste here)
```

### 8.2 The BUG-B patch and the final run

The change as a diff, then the real output of the **full** suite. Every test must pass.

```text
(paste here)
```

---

## 9. What still fails, and what AI-assisted debugging cannot do

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 One limitation of AI-assisted debugging

<!-- Use something that actually happened in sections 5-8. 20 words or more. -->
-

---

## 10. Conclusion (80–150 words)

<!-- Answer both, in your own words, without the assistant (3-5 sentences, as the deck asks):
     (a) Did the skill help? Show it with one row of section 7.
     (b) What did your tests actually prove - and what did they not?
     Worthless: "The skill made the AI much better at debugging."
     Worth everything: "Both answers found BUG-A from the T01 failure. Only the skill answer
     separated BUG-B as a hypothesis instead of a fact, because step 4 told it to. BUG-B was only
     visible after the BUG-A patch: the AC5 test had been failing for the wrong reason." -->

<!-- Write your conclusion below this line -->