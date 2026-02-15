# Specification

## Summary
**Goal:** Finalize the official “STYO Tech Neon” logo asset set (optimized, background-free SVGs + required PNG icons) and ensure all frontend references load from the correct public paths without broken assets.

**Planned changes:**
- Create finalized “STYO Tech Neon” vector logo assets (full + icon-only) as optimized SVGs with transparent background, correct proportions, and a subtle/sharp neon glow using vector-only effects (no rasterized glow/data URIs).
- Export required raster deliverables: 512x512 app icon PNG, 32x32 favicon PNG, and white monochrome SVG variants (full + icon-only), all placed under `frontend/public/assets/generated/`.
- Update/verify frontend asset references (Header, Footer, `index.html`, and social/metadata images) to point to the finalized generated filenames under `/assets/generated/`, removing any legacy/broken paths.
- Add brief developer-facing notes in code documenting the exact paths used for (1) header/footer full logo and (2) favicon, matching the shipped filenames.

**User-visible outcome:** The site shows the finalized STYO Tech Neon logo consistently in the header/footer across devices, the favicon/app icon display correctly, and no logo/icon asset URLs 404.
