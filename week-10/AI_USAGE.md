# AI Usage Disclosure — Week 10

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Claude (chat), reviewer | Claude Opus 5.5 | read-only risk review (Task 2) | none — "WITHOUT editing files"; it read the public `week-10` branch in its own sandbox |
| Claude (chat), reviewer | Claude Opus 5.5 | AGENTS.md review and patch draft (Task 6) | `app/AGENTS.md`, only after my approval; I applied the approved patch myself |
| Claude (chat), reviewer | Claude Opus 5.5 | minimal patches for two risks (Task 8) | `app/src/booking.ts`, `app/src/App.tsx` (the R2 refactor, applied by me after reading the diff) |
| Claude (chat), lab helper | Claude Opus 5.5 | a separate chat that walked me through the lab, drafted the text of `lab-report.md` (including §10, which the instructor allowed for this lab), `AI_USAGE.md` and `submission.yml`, prepared the files I pasted in, and ran the checker on a copy of my project | `lab-report.md`, `AI_USAGE.md`, `submission.yml`; I replaced `app/AGENTS.md`, `app/src/booking.ts` and `app/src/App.tsx` with files it prepared from the approved diffs |

**The review in Task 2 ran in a mode where the assistant could not edit, and `git status` showed no
change afterwards:** yes
<!-- If it edited anything, say what and how you undid it. -->
The reviewer works in its own sandbox and cannot write to my computer or push to my repo. Before the review prompt it cloned the branch and tried patches in its own scratch copy on its own; my `week-10/app` did not change.

**I labelled every claim in lab-report.md §3.2 after opening the cited file myself:** yes

**Every change to `app/` was reviewed by me as a diff before I accepted it:** yes
<!-- Name anything you rejected in §8; name here anything you accepted without reading. -->
I removed one unrelated change from my own `git diff`: the final newline of `App.tsx` had been lost when I replaced the file.

**I used another assistant as well (to explain a risk, to draft text in lab-report.md, …):** yes
<!-- If "yes": which one, the exact model, and for which section. -->
A second Claude Opus 5.5 chat (the "lab helper" row above) drafted the text of every section of `lab-report.md`, including §10, and prepared `AI_USAGE.md` and `submission.yml`. I checked the facts against my own runs and files.

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes

**I can explain every score in my register, and why my release decision follows from it, without
the assistant:** yes

**Anything I accepted from the AI without fully understanding it:**
<!-- Name the file and the part. An honest entry here costs far less than a blank one that turns out to be untrue. -->
Nothing in the code. I did not reproduce the reviewer's claims that it compared old and new functions on 3,840 and 1,530 inputs, so I do not rely on them (§3.2 row 7, §7.3).

Signed: Galym Nurassyl
Date: 2026-11-18