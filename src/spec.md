# Specification

## Summary
**Goal:** Add the official STYO “Tech Neon” primary logo asset set and replace existing logo usage across the UI, plus introduce a modular SVG-based Gold “Verified” badge and use it on verified listings.

**Planned changes:**
- Generate and add new STYO Tech Neon logo assets (full logo, icon-only, and white monochrome), each as lightweight SVG and transparent PNG, under `frontend/public/assets/generated/`.
- Update header, footer, favicon, and SEO/social metadata image references to use the new logo assets (replacing usages of the current `styo-logo-transparent.dim_200x80.png`).
- Implement a reusable inline-SVG Gold “Verified” badge React component with a prop-based API (size/className + variant/type pattern for future additions).
- Update listing cards to render the new SVG Gold “Verified” badge when `listing.verified` is true, replacing the current “Verified” pill while keeping mobile-responsive layout.

**User-visible outcome:** The app displays the new Tech Neon STYO branding in the header/footer and browser/social previews, and verified listings show a premium gold SVG “Verified” badge on listing cards.
