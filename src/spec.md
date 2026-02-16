# Specification

## Summary
**Goal:** Make the header/navbar logo larger and properly aligned without distortion, using only the SVG logo asset.

**Planned changes:**
- Update `frontend/src/components/Header.tsx` to render the header logo at ~36–40px height on mobile and ~48–56px on desktop while preserving aspect ratio (e.g., `width: auto` / equivalent).
- Adjust header/logo container styling so the logo’s displayed height is not reduced by padding/line-height/container constraints.
- Ensure the logo is vertically centered/aligned with the Login/Logout button across breakpoints.
- Ensure the navbar logo uses the existing clean SVG asset only (no PNG/JPG in the header).

**User-visible outcome:** The navbar logo appears noticeably larger, not squashed or stretched, and is vertically aligned with the Login/Logout button on both mobile and desktop.
