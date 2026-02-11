# Specification

## Summary
**Goal:** Ensure every newly created backend `Listing` explicitly defaults `propertyStatus` to `#available`.

**Planned changes:**
- Update `backend/main.mo` listing creation logic to set `propertyStatus = #available` whenever constructing and storing a new `Listing`.
- Apply the explicit `propertyStatus` assignment across all code paths that create new listings (including owner/user-created, public submission flows that become listings, and any demo/seed creation if present).

**User-visible outcome:** Newly created listings returned by the existing backend API have `propertyStatus` set to `#available` by default, with no other behavior changes.
