# Specification

## Summary
**Goal:** Ensure all newly created `Listing` records have `propertyStatus` set to `#available` at creation time.

**Planned changes:**
- Update every listing-creation code path in `backend/main.mo` to explicitly set `propertyStatus = #available` when constructing and storing a new `Listing`.
- Verify this applies consistently across all listing-creation entry points (including any owner flows, public submission flows, and any demo/seed listing creation logic if present).

**User-visible outcome:** Any newly created listing is stored and returned by listing queries with `propertyStatus` set to `#available` by default.
