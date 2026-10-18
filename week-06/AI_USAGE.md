# AI Usage Disclosure — Week 06

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Bolt.new | GLM 4.5 Flash | prototype v1 (Task 2) | src/types.ts, src/sampleData.ts, src/availability.ts, src/App.tsx |
| Bolt.new | GLM 4.5 Flash | cleanup prompts (Task 4): AC1 start-time fix, blocked-room selector | src/availability.ts, src/App.tsx, package.json |
| Claude (claude.ai chat) | Claude Sonnet 5.5 | guidance for the lab | none (no code in the prototype was written by Claude; text drafts only) |

**I used another assistant as well (to explain code, to draft text in lab-report.md, …):** yes
Claude Sonnet 5.5 — guidance and drafts for lab-report.md §4, §5, §6 (prompt wording) and §7, and for the review_findings lines in submission.yml. Sections 8 and 10 I wrote myself.

**`original/` holds Bolt's first version exactly as downloaded, and `evidence/v1.png` shows it:** yes

**Every screenshot in `evidence/` is an unedited capture of the page as it behaved:** yes
(Early v1 test screenshots were first saved under final-* names and then renamed to v1-*; the images themselves were not edited.)

**I can explain the component I chose in lab-report.md section 8 — and how the page decides
availability — without the assistant:** yes

**Anything I accepted from the AI without fully understanding it:**
None. I fully reviewed and tested all generated logic, including interval validations in `src/availability.ts`, state handling in `src/App.tsx`, and project dependencies in `package.json`.

Signed: Galym Nurassyl
Date: 2026-10-19