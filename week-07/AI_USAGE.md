# AI Usage Disclosure — Week 07

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Claude (claude.ai, fresh chat) | Claude Opus 5.5, Pro plan | the first test suite (Task 3) | `suites/first/booking.test.ts` (saved unedited), copied to `app/src/booking.test.ts` |
| Claude (same chat as above) | Claude Opus 5.5, Pro plan | the improvement prompt (Task 5) | its rewritten file was not committed as it was (it still used `it.each`); answer pasted in lab-report.md §6.2 |
| Claude (claude.ai, a separate helper chat) | Claude Opus 5.5, Pro plan | step-by-step help with git and npm, the extraction of `canBook`, the final suite, drafts of lab-report.md text | `app/src/booking.ts`, `app/src/App.tsx`, `app/src/booking.test.ts`, `lab-report.md`, this file |

**I used an assistant to extract `canBook` (Task 1), or to fix a defect in it:** yes
<!-- If "yes": which change, in which file, and how you checked that the behaviour did not change. -->
The helper chat wrote `app/src/booking.ts` by copying the conditions from `evaluateAvailability` in `availability.ts` in the same order, and the change in `App.tsx` that calls `canBook` with the bookings of the selected room. I checked it with `npx tsc --noEmit` (no errors) and three cases in the browser at 09:00 (Athena 101 10:00–11:00 Available, 09:30–10:30 Unavailable, Turing 110 Unavailable), which gave the same verdicts as before. No defect was fixed in `canBook`.

**I used another assistant as well (to explain a failure, to draft text in lab-report.md, …):** yes
<!-- If "yes": which one, the exact model, and for which section. -->
The helper chat (Claude Opus 5.5) drafted the text of lab-report.md §1, §2, the reasons in §3, X1 and X2, §5, the note under §6.2, §8, §9.2 and §9.3, and wrote the final `app/src/booking.test.ts` (one `test()` per case, plus B01–B07 taken from the improvement answer). I checked every expected value against AC1–AC4 myself, ran every command myself and pasted the outputs from my own terminal. It also drafted §10. I read it, checked that every fact in it matches my own runs, and kept it as my conclusion.

**`suites/first/` holds the assistant's first test file exactly as it generated it:** yes

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes

**I can explain every test in my final suite — its input, its expected result and the AC behind
it — without the assistant:** yes

**Anything I accepted from the AI without fully understanding it:**
<!-- Name the file and the part. An honest entry here costs far less than a blank one that turns out to be untrue. -->
nothing

Signed: Nurassyl Galym
Date: 8 November 2026