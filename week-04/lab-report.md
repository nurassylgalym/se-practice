Вот весь **`lab-report.md`** целиком в одном месте! Нажми на кнопку **«Copy»** в правом верхнем углу блока кода и вставь его в VS Code (полностью заменив всё содержимое файла):   

PNGЕщё 1

Markdown

````
# Week 04 — Lab report: Modeling the System with UML

---

## 1. Setup

| Field | Value |
| --- | --- |
| Name | Nurassyl Galym |
| Group | SE-24 |
| AI assistant | Gemini |
| Exact model | Gemini 2.5 Flash |
| Renderer | PlantUML web server / VS Code extension |
| Behaviour diagram | sequence |
| Stories used | my week-03 stories, revised |

---

## 2. Prompts as sent

### 2.1 Task 1 — use-case prompt

```text
Using the supplied scenario and approved stories, generate PlantUML for a use-case diagram. Include Student and Administrator outside a named system boundary. Model their goals, show justified associations, and list assumptions. Use include or extend only with a clear reason.

````

### 2.2 Task 2 — class prompt

Plaintext

```
Create a UML domain class diagram in PlantUML for Smart Campus. Start with Student, Room, and Booking. Add attributes, appropriate operations, and association multiplicities. Add other classes only when requirements justify them. Explain each relationship and list assumptions. Avoid unjustified inheritance or composition.

```

### 2.3 Task 3 — behaviour prompt (3A sequence or 3B activity)

Plaintext

```
Generate PlantUML for Book room. Use Student, BookingService, and BookingRepository lifelines. Validate the supplied rules, then attempt the reservation. Show a successful confirmation and an unavailable-room alternative using alt. Label messages and replies. Explain new design components and all assumptions.

```

### 2.4 Focused correction prompts (if you sent any)

Plaintext

```
none

```

### 2.5 Critique prompt

Plaintext

```
Compare my diagrams with the requirements. Identify missing rules, inconsistent names, and unjustified elements. Cite each issue and propose a specific correction.

```

## 3. Task 1 — use-case review

**Assumptions the AI listed:**

- Real-time Synchronization: Availability is dynamically updated upon any booking, cancellation, or blocking action.
- Actor Scope: Student interacts exclusively with reservation and availability features; Administrator manages maintenance and usage reporting.
- Automated Confirmation System: "Receive Confirmation" is an automated system process included by booking and cancellation workflows.

| # | Element                               | Problem                                                                            | Rule or story          | Fix                                                                                                                 |
| - | ------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 1 | `UC_Book .> UC_Confirm : <<include>>` | Confirmation was modeled as a separate included use case with a direct association | R4 / US-06             | Removed `Receive Confirmation` use case because confirmation is a system outcome/post-condition, not an active goal |
| 2 | `UC_Cancel .> UC_Confirm`             | Missing strict `' why:` comment format directly above the relationship line        | PlantUML convention §4 | Removed redundant include association and kept core user goals inside boundary                                      |

## 4. Task 2 — class diagram review

### 4.1 Relationships, read both ways

| Association          | Read left → right                     | Read right → left                            | Multiplicities |
| -------------------- | ------------------------------------- | -------------------------------------------- | -------------- |
| Student — Booking    | one student creates 0..\* bookings    | each booking belongs to exactly 1 student    | 1 / 0..\*      |
| Room — Booking       | one room hosts 0..\* bookings         | each booking reserves exactly 1 room         | 1 / 0..\*      |
| Administrator — Room | one administrator manages 0..\* rooms | each room is managed by 0..\* administrators | 0..\* / 0..\*  |

### 4.2 Constraints the multiplicities cannot show

- R2: Active bookings for the same room cannot overlap in time (enforced via `note` on `Booking` class).
- R1 & R3: Start time must be in the future, duration must be > 0 and <= 2 hours, and a blocked room rejects new bookings (declared in notes).

### 4.3 Assumptions

- A1: Room blocking applies only to future booking requests; existing active bookings remain stored unless manually modified or canceled.
- A2: Booking timeslots ending exactly when another begins (e.g. 12:00 end, 12:00 start) do not count as overlapping under R2.

### 4.4 Findings

| # | Element                        | Problem                                                                   | Rule or story         | Fix                                                                                           |
| - | ------------------------------ | ------------------------------------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------- |
| 1 | `Booking` class multiplicities | AI initially generated `1..*` on the Booking end for Room-Booking         | Domain Multiplicities | Corrected multiplicity to `0..*` so new rooms can exist without requiring an existing booking |
| 2 | Rule R2 representation         | Overlapping constraints cannot be represented by UML multiplicities alone | Rule R2               | Added an explicit `note bottom of Booking` declaring the non-overlapping time constraint      |

## 5. Task 3 — behaviour diagram review

**Option chosen and why:** 3A sequence — chosen to illustrate the exact time-ordered interaction between the actor, service layer, and persistence repository, ensuring all pre-validation rules occur before any state creation.

**Design components added beyond the domain model:**

- `BookingService`: Orchestrates the business logic, executes validation checks against R1–R3, and handles success/error responses to the Student.
- `BookingRepository`: Manages data persistence, queries room availability/overlaps, and saves confirmed bookings.

| # | Element               | Problem                                                                                        | Rule or story          | Fix                                                                                                     |
| - | --------------------- | ---------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| 1 | Guard syntax in `alt` | AI included typed square brackets `[valid request]` inside the guard label                     | PlantUML convention §4 | Removed typed brackets so PlantUML renders guard conditions cleanly without treating them as hyperlinks |
| 2 | Validation sequence   | AI originally saved the booking entity before verifying room availability and rule constraints | R1–R3 / SQ3            | Moved `saveBooking()` call inside the valid branch strictly after `checkRoomAvailability()` returns     |

## 6. AI critique

| # | Issue the AI raised | Element it cited | Verdict | Why |
| --- | --- | --- | --- | --- |
| 1 | AI raised missing explicit internal validation step for R1 prior to checking repository room availability | `BookingService` method | accept | Validating input parameters (duration <= 2h, start in future) is an internal application service check that should occur before querying the database. |
| 2 | AI raised method signature mismatch between domain class (`bookRoom`) and sequence diagram (`createBooking`) | `Student` / `BookingService` | accept | Standardized method names across artifacts so domain class methods align directly with service operations in sequence calls. |
| 3 | AI claimed `Receive Confirmation` should be added back into Use Case diagram as an `<<include>>` relationship | Use Case Boundary | reject | R4 states confirmation is an automatic system post-condition/outcome upon booking, not a distinct actor-driven goal in the use-case boundary. |
| 4 | AI suggested adding an explicit `BookingStatus` enum to the domain class diagram | `Booking` class | accept | Added `BookingStatus` (CONFIRMED, CANCELLED) to represent explicit booking state transitions needed for R2/R3 rules. |

## 7. Consistency table

| Requirement / story | Use case               | Classes                                         | Behaviour element                                         |
| ------------------- | ---------------------- | ----------------------------------------------- | --------------------------------------------------------- |
| R1                  | Book Study Room        | Booking (`startTime`, `duration`)               | Guard: `valid request (R1, R3, R2 passed)`                |
| R2                  | Book Study Room        | Booking (Note: non-overlapping active bookings) | `checkRoomAvailability()` returning `overlappingBookings` |
| R3                  | Block or Unblock Room  | Room (`isBlocked`)                              | `checkRoomAvailability()` returning `isBlocked`           |
| R4                  | Book Study Room        | Booking (`status`)                              | Message: `confirmation(bookingId, status="CONFIRMED")`    |
| US-01               | View Room Availability | Student, Room (`isAvailable()`)                 | Message: `checkRoomAvailability()`                        |
| US-02               | Book Study Room        | Student, Room, Booking                          | Message: `createBooking()` / `saveBooking()`              |
| US-03               | Cancel Booking         | Student, Booking (`cancel()`)                   | Message/Action: `cancel()`                                |
| US-04               | Block or Unblock Room  | Administrator, Room (`blockRoom()`)             | Action: `blockRoom()`                                     |
| US-05               | Review Room Usage      | Administrator, Room, Booking                    | Action: `reviewUsage()`                                   |
| US-06               | Receive Confirmation   | Student, Booking                                | Message: `confirmation()`                                 |

## 8. Change log

| # | Diagram | Before (AI's original) | After (your revision) | Reason |
| --- | --- | --- | --- | --- |
| 1 | Use case | `UC_Book .> UC_Confirm : include` (use case "Receive Confirmation" present) | "Receive Confirmation" use case deleted, confirmation is a step inside "Book Room" | Confirmation is an automated system outcome (R4), not a goal of an actor. |
| 2 | Use case | `UC_View .> UC_Book : extend` | No relationship between "View Availability" and "Book Room", they are separate use cases | Viewing availability and booking are independent goals, not a conditional extension. |
| 3 | Class | `Room "1" -- "1..*" Booking` | `Room "1" -- "0..*" Booking` | `1..*` would force every new room to already have a booking. |
| 4 | Sequence | first message `createBooking(...)` before any validation | `requestBooking(...)`, then `validateRequest(...)` before `saveBooking(...)` | Validation must happen before anything is saved (R1, R2, R3). |
| 5 | Sequence | `alt [valid request]` | `alt valid request (R1, R2, R3 passed)` | Guard states which rules were checked. |

## 9. Checker output

Plaintext

```
Week 04 structural check - shape only, never quality

UC1  PASS  Student and Administrator declared
UC2  PASS  named system boundary: "Smart Campus Study Room Booking"
UC3  PASS  all actors declared outside the boundary
UC4  PASS  all scenario goals present (5 use cases)
UC5  PASS  no actor is associated with a confirmation use case
UC6  PASS  actor responsibilities match the scenario
UC7  PASS  use cases are goals, not screens or components
UC8  PASS  every include / extend / generalization carries a ' why: comment (or there are none)
UC9  PASS  revised diagram differs from the AI's original
CL1  PASS  Student, Room and Booking present
CL2  PASS  Booking is associated with Student and with Room
CL3  PASS  every association has multiplicities at both ends
CL4  PASS  1 student / 1 room per booking, 0..* bookings per student and per room
CL5  PASS  every inheritance / composition / aggregation carries a ' why: comment (or there are none)
CL6  PASS  only domain concepts in the class diagram
CL7  PASS  attributes needed by R1-R3 are present
CL8  PASS  a note states R2 (no overlapping active bookings)
SQ1  PASS  Student, BookingService and BookingRepository lifelines present
SQ2  PASS  alt block with a guard on every branch (2 branches)
SQ3  PASS  validation happens before creation
SQ4  PASS  nothing is saved on a failure branch
SQ5  PASS  every message is labelled
SQ6  PASS  R1 (time range) is visible - checked or stated as a precondition
SQ7  PASS  R3 (blocked room) is visible
BH0  PASS  Behaviour diagram present
FI1  PASS  the AI's original output is kept for every diagram
FI2  PASS  a rendered image for every diagram
LR1  PASS  §1 setup filled (tool and model recorded)
LR2  PASS  5 prompts pasted in §2
LR3  PASS  2 use-case findings in §3
LR4  PASS  §4 relationships read both ways, 2 assumption(s) declared
LR5  PASS  2 behaviour-diagram findings in §5
LR6  PASS  3 critique issues with a verdict
LR7  PASS  3 change-log rows covering all three diagrams
CS1  PASS  6 approved stories
CS2  PASS  §7 traces R1-R4 into the diagrams
CS3  PASS  every use case traces to an approved story
CS4  PASS  every lifeline is a domain class or an explained design component

SUMMARY pass=37 fail=0 error=0

```

**FAILs I am keeping, and why:** none

## 10. Conclusion (120–180 words)

The AI assistant got the class diagram most wrong initially by applying a `1..*` multiplicity to the `Booking` end of the `Room-Booking` relationship. If nobody had reviewed this, the system would enforce that a room cannot exist without at least one pre-existing booking, breaking database entity creation in code. During critique, Gemini correctly identified the need for validating business rules (R1) prior to querying persistence, which helped refine our sequence diagram. However, it falsely claimed that `Receive Confirmation` should be reinstated as an explicit `<<include>>` use case. Confirmation is an automated system post-condition under rule R4, not an active human-triggered goal. Catching this ensured our boundary model remained clean and goal-oriented. Overall, human review successfully resolved domain coupling errors and prevented improper actor associations from propagating to implementation.