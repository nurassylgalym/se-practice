# AI Usage Disclosure — Week 08

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Claude (claude.ai web) | Claude Opus 5.5, Pro plan, no skill enabled | diagnosis without the skill (Task 4) | none — "Do not edit code" |
| Claude (claude.ai web) | Claude Opus 5.5, Pro plan, `bug-detector` skill enabled | diagnosis with bug-detector (Task 5) | none — "Do not edit code" |
| Claude (claude.ai, separate chat in my course project) | Claude Opus 5.5, Pro plan | step-by-step walkthrough of the lab; wrote the two regression tests, the chat input file, `SKILL.md` + ZIP (copied from README), the BUG-A/BUG-B versions of `booking.ts` I pasted in, and drafted every section of `lab-report.md` and this file from my real terminal outputs, with my instructor's permission | `app/src/booking.test.ts` (regression block), `app/src/booking.ts` (via files I copied in), `skills/bug-detector/*`, `lab-report.md`, `AI_USAGE.md`, `submission.yml`, `evidence/chat_input.txt` |

**`skills/bug-detector/SKILL.md` was typed by me from the deck's text, not generated:** no
<!-- If "yes": which one, the exact model, and for which section. -->
The text is word for word the deck's text from README Part 2, step 3. Claude copied it into the file and built the ZIP, and my instructor allowed this. I checked the file against the README and installed it myself on claude.ai (`evidence/install.png`).

**I applied the patches myself, one minimal change per bug, after reviewing what the assistant
proposed:** yes
<!-- If an assistant edited app/ directly, say which change and how you reviewed it. -->
No assistant edited `app/` directly. I replaced `booking.ts` with versions prepared in the walkthrough chat, one change per commit. I checked each change with `git diff` (one line for BUG-A, the `push` line plus its comment for BUG-B), then ran the failing test and the full suite before each commit.

**I used another assistant as well (to explain a failure, to draft text in lab-report.md, …):** yes
Claude Opus 5.5 (claude.ai, the walkthrough chat in the third row above) drafted all sections of `lab-report.md`, including §3, §7, §9 and §10, from my real runs and the two chat answers. My instructor allowed this. I read them and agree with them.

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes
The only changes: in §5 and §6 the inner code fences of the chat answers are shown as `~~~`, and in §8.1 the ten detailed failure blocks of the full run are left out (marked inside the block). Both are noted under the blocks.

**I can explain both bugs and both fixes — which line, why it was wrong, which test proves the
fix — without the assistant:** yes

**Anything I accepted from the AI without fully understanding it:**
<!-- Name the file and the part. An honest entry here costs far less than a blank one that turns out to be untrue. -->
Nothing in the code. The one claim I could not check is the skill answer's "I reproduced both with a small script" (§6), and I marked it as unverifiable in §7.

Signed: Nurassyl Galym
Date: 2026-11-09