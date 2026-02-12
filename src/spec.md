# Specification

## Summary
**Goal:** Enforce a backend-only PropertyStatus transition state machine for listings, including a 24-hour timeout that auto-reverts expired `#underConfirmation` listings back to `#available`.

**Planned changes:**
- Add a shared backend method to request a `propertyStatus` transition for a given listing id, rejecting any transition outside: `#available → #visitCompleted`, `#visitCompleted → #underConfirmation`, `#underConfirmation → #bookedViaSTYO`, and rejecting any transitions from `#bookedViaSTYO`.
- Return clear English error messages for invalid transitions.
- Enforce authorization so only the listing owner or an admin can perform valid transitions (system-driven auto-revert bypasses caller authorization).
- Persist non-breaking tracking data for when a listing entered `#underConfirmation`, and automatically revert to `#available` once 24 hours elapse without transitioning to `#bookedViaSTYO`, clearing the stored tracking data.
- Ensure reads (e.g., getListing/getListings) do not continue to show expired `#underConfirmation` statuses after the auto-revert is applied.

**User-visible outcome:** Listings will only move through the allowed status sequence; unauthorized or invalid transitions will fail with clear English errors; and any listing left in `#underConfirmation` for over 24 hours will automatically revert to `#available`.
