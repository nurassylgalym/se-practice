# Approved stories — Smart Campus study room booking

> **Replace this file's stories with your own Week 03 stories, as revised after review**
> (`week-03/requirements/user-stories.md`), keeping their IDs. If you did not complete Week 03, or
> your set was rejected in review, keep the reference set below and say so in `lab-report.md` §1.
> Either way, the IDs here are the ones your consistency table (§7) must use.

**Source of this set:** <my week-03 stories, revised / the reference set>

## Scenario (from the Lesson 04 practice deck, slide 7)

Students view room availability, book a room, and cancel their own bookings. Administrators block
or unblock rooms and review usage.

- **R1** Future start, with duration greater than 0 and at most 2 hours.
- **R2** Active bookings for the same room cannot overlap.
- **R3** A blocked room cannot accept a new booking.
- **R4** A successful booking produces a confirmation.

## Reference set

# User Stories — Smart Campus Study Room Booking

## US-01 — View Room Availability
- **Story:** As a Student, I want to view room availability, so that I can find a free time slot to study.
- **Priority:** High
- **Assumption:** Room availability is updated in real time.

## US-02 — Book a Study Room
- **Story:** As a Student, I want to book a free room, so that I can reserve a space for my study session.
- **Priority:** High
- **Assumption:** A student can book any room that is currently unreserved and not blocked.

## US-03 — Cancel Booking
- **Story:** As a Student, I want to cancel my reservation, so that the room becomes available for other students.
- **Priority:** Medium
- **Assumption:** Students can only cancel their own reservations.

## US-04 — Block or Unblock Room
- **Story:** As an Administrator, I want to block or unblock a room, so that out-of-service rooms cannot be reserved.
- **Priority:** High
- **Assumption:** Blocked rooms automatically reject new booking requests.

## US-05 — Review Room Usage
- **Story:** As an Administrator, I want to review usage stats, so that I can monitor library room utilization.
- **Priority:** Low
- **Assumption:** Usage reports cover historical booking logs.

## US-06 — Receive Confirmation
- **Story:** As a Student, I want to receive confirmation, so that I know my booking or cancellation succeeded.
- **Priority:** Medium
- **Assumption:** Confirmations are sent automatically by the system upon completion.

**Out of scope** (do not model): payments, equipment in rooms, recurring bookings, waiting lists,
notifications other than the booking confirmation, user registration.
