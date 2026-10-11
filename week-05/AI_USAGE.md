# AI Usage Disclosure — Week 05

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Gemini | Gemini 2.5 Flash | the plan (Task 1) | lab-report.md (section 2, pasted unedited) |
| Gemini | Gemini 2.5 Flash | the first version, v1 (Task 2) | code/original/booking_v1.py, code/booking.py (first copy) |
| Gemini | Gemini 2.5 Flash | the critique (Task 5) | lab-report.md (section 6, pasted unedited) |
| Claude | Claude Sonnet 5.5 | reading the checker output, fixing the AC1 bug, writing extra tests, drafting report text and submission.yml | code/booking.py (one line), code/test_booking.py, lab-report.md, submission.yml, AI_USAGE.md |

**The assistant wrote, or helped write, my tests in `code/`:** yes
Claude changed test_06 and wrote test_15 to test_27, and switched all assertions to `assertIs`. The expected values come from AC1–AC5 and from the checker descriptions (F1–F10), not from what the code returns. For example test_06 expects False because AC1 needs the start strictly in the future, and I confirmed it by running it against v1, where it fails.

**`code/original/` holds the assistant's first answer exactly as returned:** yes

**Everything I submitted, I can explain and defend in class — including the overlap condition:** yes

**Anything I accepted from the AI without fully understanding it:**
- code/original/booking_v1.py, line 1 (`start >= now`) and the plan step with the same rule: I accepted it from Gemini and marked it "correct as written" without checking it against AC1. The checker found the bug (F1, F3).
- lab-report.md, section 10: the first draft of the conclusion was written by Claude, and I rewrote it in my own words.

Signed: Nurassyl Galym
Date: 2026-10-11