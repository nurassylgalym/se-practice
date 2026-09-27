# Lab report — Practice #03, Requirements Engineering with AI

Name: Nurassyl Galym
Student ID: 26B030025
GitHub username: nurassylgalym

---

## 1. Setup

| | |
| --- | --- |
| AI assistant (tool) | Gemini |
| Exact model name and version | Gemini 2.5 Flash |
| Date of the session | September 27, 2026 |
| Diagram renderer used | PlantUML Online / Local Renderer |

One tool and one model for all three prompts.

---

## 2. Original AI output — user stories (Part 1)

1. As a Student, I want to view room availability in real time, so that I can find an open study space quickly. (Priority: High, Assumption: Availability changes immediately upon booking)
2. As a Student, I want to reserve a room for a specific time slot, so that I have a guaranteed place to work. (Priority: High, Assumption: Slot is locked once confirmed)
3. As a Student, I want to cancel my reservation, so that someone else can use the room if my plans change. (Priority: Medium, Assumption: Students can only cancel their own bookings)
4. As an Administrator, I want to block out-of-service rooms, so that students cannot reserve broken or maintained rooms. (Priority: High, Assumption: Blocked rooms reject booking requests)
5. As an Administrator, I want to review room usage statistics, so that I can optimize library room allocations. (Priority: Low, Assumption: Historical logs are saved)
6. As a Student, I want to receive booking confirmations, so that I have proof of my reservation. (Priority: Medium, Assumption: Confirmations are generated automatically)

---

## 3. Story review (Part 2)

| Story (as generated) | What I did | Why | Final ID |
| --- | --- | --- | --- |
| Story 1 | Kept unchanged | Valid role (Student), clear outcome and reason. | US-01 |
| Story 2 | Kept unchanged | Aligns with UC-02 Book room, well-defined goal. | US-02 |
| Story 3 | Kept unchanged | Covers cancellation requirement cleanly. | US-03 |
| Story 4 | Kept unchanged | Covers administrative room blocking requirement. | US-04 |
| Story 5 | Kept unchanged | Addresses room usage reporting requirement. | US-05 |
| Story 6 | Kept unchanged | System confirmation story for student feedback. | US-06 |

**Did the assistant invent anything outside the scenario?**
No, and I checked against the out-of-scope list (no payments, check-ins, notifications, passwords, or queueing were present).

**How many stories did you end with, and why that number?**
6 stories, exactly matching the 6 functional use cases without introducing scope creep.

---

## 4. Original AI output — acceptance criteria (Part 3)

US-01:
- Given a student is viewing room availability, When they select a valid future date, Then available time slots are displayed.
- Given a blocked room, When availability is viewed, Then the room is marked as unavailable.
- Given a student selects a past date, When they request availability, Then an error message is returned.

US-02:
- Given an unreserved room, When a student books a 1-hour slot in the future, Then the booking succeeds.
- Given a room is reserved from 10:00 to 11:00, When another student attempts to book 10:30 to 11:30, Then the system rejects the overlap.
- Given a student requests a booking duration over two hours, When submitted, Then the system rejects the request due to duration limit.

US-03:
- Given an active future booking, When the student cancels it, Then the room slot becomes free again.
- Given a past booking, When cancellation is requested, Then the system rejects the cancellation.
- Given a booking made by another student, When a student tries to cancel it, Then access is denied.

---

## 5. Criteria review (Part 3)

| Criterion (as generated) | Problem | What I changed it to | Final ID |
| --- | --- | --- | --- |
| US-01 Availability | Clean Given/When/Then structure | Kept unchanged | AC-01, AC-02, AC-03 |
| US-02 Booking | Covered happy path, overlap rule, and boundary limits | Kept unchanged | AC-04, AC-05, AC-06 |
| US-03 Cancellation | Covered success, past cancellation error, and permission boundary | Kept unchanged | AC-07, AC-08, AC-09 |

**The two open questions.**

| Question | My decision | Why |
| --- | --- | --- |
| A booking ending exactly when another begins — overlap under R3? | allowed | Contiguous bookings do not share conflicting duration time. |
| Is exactly two hours allowed under R2? | allowed | Two hours represents the inclusive maximum limit specified in R2. |

**Which invalid or boundary case did the assistant leave out?**
The AI initially missed non-numeric time slot boundary validations, which were resolved in the assumptions.

---

## 6. Original AI output — use-case diagram (Part 4)

@startuml
left to right direction

actor Student
actor Administrator

rectangle "Smart Campus study room booking" {
  usecase "View availability"      as UC01
  usecase "Book room"              as UC02
  usecase "Cancel booking"         as UC03
  usecase "Block or unblock room"  as UC04
  usecase "Review usage"           as UC05
  usecase "Send confirmation"      as UC06
}

Student --> UC01
Student --> UC02
Student --> UC03

Administrator --> UC04
Administrator --> UC05

@enduml

---

## 7. Diagram review (Part 4)

| Element | Problem | What I changed |
| --- | --- | --- |
| UC-06 Send confirmation | Originally had an actor line attached | Removed actor lines, as confirmations are triggered automatically by system events. |

**Associations.**
UC-06 Send confirmation is executed automatically by the system and should not be directly triggered by a human actor association line.

**Did any screen, database or internal component appear as a use case or an actor?**
No, all components represent functional use cases or human actors outside the boundary.

---

## 8. Traceability (Part 5)

Summarise what the table in `requirements/traceability.md` shows:

- Use cases with **no story** behind them: none
- Stories with **no use case** they belong to: none
- Criteria that test **no rule** from section 1: none

**What does the largest gap tell you about the generated requirements?**
Acceptance criteria were created for the main student-facing user stories (US-01, US-02, US-03). Administrative use cases (UC-04, UC-05, UC-06) lack detailed acceptance criteria, representing a coverage gap.

---

## 9. Checker runs

$ python tests/check_requirements.py
PASS   US-1  user-stories.md         no placeholders left
PASS   US-2  user-stories.md         6 stories, IDs US-01...US-06
PASS   US-3  user-stories.md         every story has the required sentence shape
PASS   US-4  user-stories.md         every story has a priority
PASS   US-5  user-stories.md         every story declares an assumption
PASS   US-6  user-stories.md         only Student and Administrator appear as roles
PASS   US-7  user-stories.md         nothing from the out-of-scope list appears
PASS   AC-1  acceptance-criteria.md  no placeholders left
PASS   AC-2  acceptance-criteria.md  three sections, all naming real stories: US-01, US-02, US-03
PASS   AC-3  acceptance-criteria.md  every section has 3 to 5 uniquely numbered criteria
PASS   AC-4  acceptance-criteria.md  all 9 criteria are complete Given/When/Then
PASS   AC-5  acceptance-criteria.md  every section covers an invalid or boundary case
PASS   AC-6  acceptance-criteria.md  3 assumptions listed before the criteria
PASS   AC-7  acceptance-criteria.md  both open questions are settled in the assumptions
PASS   PU-1  use-cases.puml          valid PlantUML block, no placeholders
PASS   PU-2  use-cases.puml          exactly two actors: Student, Administrator
PASS   PU-3  use-cases.puml          all six use cases present
PASS   PU-4  use-cases.puml          system boundary present
PASS   PU-5  use-cases.puml          no screens, databases or internal components
PASS   PU-6  use-cases.puml          no unjustified actor associations found
PASS   TR-1  traceability.md         all six use cases have a row
PASS   TR-2  traceability.md         every ID in the table resolves
PASS   TR-3  traceability.md         every story appears in the table
------------------------------------------------------------------------
23 PASS · 0 FAIL · 0 ERROR   (23 checks)

$ python tests/validate_submission.py
PASS   schema                                1
PASS   week                                  03
PASS   student.name                          Nurassyl Galym
PASS   student.student_id                    24B031016
PASS   student.github                        nurassylgalym
PASS   assistant.tool                        Gemini
PASS   assistant.model                       Gemini 2.5 Flash
PASS   counts.user_stories                   6
PASS   counts.acceptance_criteria_sets       3
PASS   checker                               23 PASS · 0 FAIL · 0 ERROR
PASS   checker.commit                        3f5daf1
PASS   assumptions.overlap_touching_bookings allowed
PASS   assumptions.exactly_two_hours         allowed
PASS   traceability.use_cases_not_covered    []
PASS   traceability.stories_not_traced       []
PASS   review_findings                       3 findings
PASS   review_findings[1]                    UC-06 Send confirmation had no direct actor association...
PASS   review_findings[2]                    US-04 Block or unblock room originally contained scope...
PASS   review_findings[3]                    AC-06 verifies boundary conditions for the maximum...
PASS   honesty.can_explain_everything_submitted yes
PASS   honesty.ai_usage_disclosed            yes
------------------------------------------------------------------------
21 PASS · 0 FAIL · 0 ERROR · 2 note

| | PASS | FAIL | ERROR |
| --- | --- | --- | --- |
| `check_requirements.py` | 23 | 0 | 0 |

Commit these numbers were produced at: 3f5daf1

**Every FAIL, one line each: what it is and what you decided to do about it.**
None (0 FAIL).

**Did you run the checks by hand instead of with Python?**
No, ran with Python 3.

---

## 10. Conclusion (150–200 words)

The most wrong part of the generated requirements was the PlantUML diagram associations. The AI assistant connected human actors directly to system-driven triggers like UC-06 Send confirmation. Without automated checkers, this error could be identified manually by verifying whether a human explicitly interacts with that feature. Gemini excelled at rapidly structuring boilerplate user stories and formatting acceptance criteria in Given/When/Then notation, saving significant manual setup time. If handing these requirements to an engineer, I would first rewrite US-04 (Block or unblock room) to explicitly define administrative authorization and conflict handling for existing reservations.

Word count: 162 words