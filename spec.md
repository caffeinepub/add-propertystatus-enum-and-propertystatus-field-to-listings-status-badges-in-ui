# Specification

## Summary
**Goal:** Fix the broken logo image in the navbar (and footer) by resolving the asset path/loading issue so the STYO logo displays correctly across all pages.

**Planned changes:**
- Audit and fix the logo `src` path in `Header.tsx` to ensure it resolves correctly in production (correct root-relative path or Vite asset import, case-sensitive filename match)
- Ensure the logo asset file (`styo-logo-transparent.dim_200x80.png` or equivalent) is physically present in `frontend/public/` and included in the production build output
- Apply the same corrected logo path/import approach to `Footer.tsx` for consistency

**User-visible outcome:** The STYO logo appears correctly in the navbar and footer on all pages (no broken image placeholder), including after a fresh production build and across all routes.
