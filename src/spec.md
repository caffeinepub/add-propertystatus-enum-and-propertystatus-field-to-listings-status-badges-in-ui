# Specification

## Summary
**Goal:** Add a new `PropertyStatus` field to backend listings with a default of “available”, and display it as a status badge on listing cards and the listing detail page.

**Planned changes:**
- Backend: Define a `PropertyStatus` enum with exactly `#available`, `#visitCompleted`, `#underConfirmation`, `#bookedViaSTYO` in `backend/main.mo`.
- Backend: Extend the `Listing` record to include `propertyStatus : PropertyStatus` while keeping the existing `availability` field unchanged.
- Backend: Ensure `propertyStatus` defaults to `#available` for newly created listings and for any existing listings returned by listing query methods, without modifying existing `availability` values.
- Frontend: Regenerate/update consumed backend types so `Listing.propertyStatus` is strongly typed and usable without TypeScript workarounds.
- Frontend: Add a dynamic `propertyStatus` badge to `frontend/src/components/ListingCard.tsx` using labels: “Available”, “Visit Completed”, “Under Confirmation”, “Booked via STYO”, with a runtime fallback to “Available” if missing.
- Frontend: Add the same dynamic `propertyStatus` badge to `frontend/src/pages/UnlockPage.tsx`, consistent with the card labels and visible whenever listing data is shown.

**User-visible outcome:** Users see a clear “Property Status” badge on both property cards and the property detail page, reflecting the listing’s current status (defaulting to “Available”).
