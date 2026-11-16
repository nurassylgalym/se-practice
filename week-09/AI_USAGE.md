# AI Usage Disclosure — Week 09

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Claude (claude.ai) | Claude Opus 5.5, medium effort | Part 2 — writing the calls for R1, R2, R3 | calls/ (saved by me, unedited) |
| Claude (claude.ai) | Claude Opus 5.5 | Wrote tool/check_room.json, drafted lab-report.md sections 2, 3, 5, 6, 7, 10, AI_USAGE.md and submission.yml; explained the git and checker steps | tool/check_room.json, lab-report.md, AI_USAGE.md, submission.yml |

**I wrote `tool/check_room.json` myself:** no
Claude wrote the whole definition. I checked it by running `python tests/check_tool.py`: D1–D6 and S01–S12 all pass, and I went through which constraint refuses which S case (lab-report §2–3).

**I used an AI to explain a JSON Schema keyword or a check:** yes
Why `maximum` and not `exclusiveMaximum` (S11, end = 1440 must pass) and why `additionalProperties: false` refuses S05.

**Every reply in `calls/` and in lab-report.md section 4 is exactly what the model returned:** yes

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes

**Anything I accepted from the AI without fully understanding it:**
None in the schema. The report text was drafted by the AI; I read it and checked it against my real checker runs and model replies.

Signed: Nurassyl Galym
Date: 16 November 2026