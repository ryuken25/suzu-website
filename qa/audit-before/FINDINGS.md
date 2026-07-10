# Mobile & Story Audit — BEFORE (2026-07-10)

## Evidence setup
- Target: live production `https://suzu-comms.vercel.app`
- Browser: Playwright Chromium headless — launch confirmed before capture.
- Widths: 320, 360, 390, 430, 768, 1024, 1280, 1440, 1920.
- Core sections: home, pricing, portfolio/story, archive, collab, FAQ.
- Screenshots: `qa/audit-before/suzu-{section}-{width}.png`.
- Story state screenshots: `qa/audit-before/suzu-story-{start|middle|end}-{width}.png` at 320/390/768.

## Defects / required improvements
1. **Mobile story is a vertical stack rather than the requested swipeable snap story.**
   - Source hides the pinned desktop GSAP implementation below `lg`, but renders every story beat as a vertical card.
   - This avoids pinning, but misses the requested one-card swipe/tap progression and persistent 01/05-style progress.
   - Evidence: `suzu-story-start-320.png`, `suzu-story-middle-390.png`, `suzu-story-end-768.png`; source `src/components/portfolio/PortfolioStory.tsx` lines 303–323.

2. **Mobile story eagerly mounts artwork across all five beats.**
   - Each mobile beat mounts two Next/Image elements, so the story starts up to ten images instead of current + adjacent content.
   - Scope: mobile carousel/snap behavior with lazy loading and correct `sizes` on every image.

3. **Image sizing needs hardening on secondary images.**
   - Main desktop portfolio cards have `sizes`, but mobile story thumbnail images and some archive/pricing usages do not explicitly set responsive sizes.
   - This is the source-level follow-up for the reported overly-large image delivery; post-fix capture will measure requested optimized URLs.

4. **1px overflow at 1280px in most sections.**
   - 1280px body scroll width = 1281px for home/pricing/portfolio/archive/collab; FAQ passed exactly.
   - Low severity but violates the zero-overflow criterion.
   - Evidence: `suzu-home-1280.png`, `suzu-portfolio-1280.png`.

## Non-defects observed
- 320–1024, 1440, 1920 core section overflow checks passed.
- No production console errors were captured.
- Existing request modal code includes an `overflow-y-auto` fixed overlay and mobile full-height handling; retain this during changes.
