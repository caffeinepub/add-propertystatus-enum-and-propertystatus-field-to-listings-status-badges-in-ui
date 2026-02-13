# Specification

## Summary
**Goal:** Strengthen and clarify STYO’s policy/legal disclosures across the Booking Policy & Terms page and new dedicated policy pages, update footer links, and confirm backend listing verification and timeout workflows work as intended.

**Planned changes:**
- Update the Booking Policy & Terms page to include the user-provided platform disclaimer (verbatim), dispute/liability clause (verbatim), ₹99 unlock fee refund policy (bullet list with only the three eligible conditions + “non-refundable in all other cases”), and a data privacy statement about contact sharing and third-party data sharing limitations (English only).
- Add dedicated frontend pages/routes for: Privacy Policy, Terms & Conditions, and Refund Policy, ensuring the relevant legal positions (disclaimer, dispute clause, refund bullets, privacy statement) are included without contradicting the Booking Policy & Terms page.
- Update the site footer to visibly display links labeled exactly: “Privacy Policy” | “Terms & Conditions” | “Refund Policy” | “Contact Email”, with the first three navigating to their routes and “Contact Email” opening a mailto link.
- Verify the backend admin listing verification workflow and approvalStatus enforcement, and ensure listings in #underConfirmation automatically revert to #available after 24 hours via a system-driven process (and that the frontend hook can call the backend method, or an equivalent backend mechanism exists).

**User-visible outcome:** Users can read clearer legal terms, refund rules, and privacy statements (in English) across dedicated policy pages and the Booking Policy & Terms page, access them from the footer, and the platform consistently enforces listing approval/verification and automatically expires under-confirmation listings after 24 hours.
