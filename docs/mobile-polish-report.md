# Suzu Mobile Polish Report

## Before issues
- Previous fixes existed, but modal/viewport safety needed another mobile pass.
- Story sticky should not trap mobile layout.
- Global tap target and input zoom baseline needed reinforcement.

## Files changed
- `src/app/globals.css`
- `src/components/request/SuzuRequestModal.tsx`

## Mobile/modal/X-link improvements
- Added global `html, body` width guard and tap-target/input mobile baseline.
- Disabled forced story sticky behavior under 768px.
- Request modal overlay can scroll if viewport is short.
- Modal preview column uses safe `92svh` scroll behavior.
- Existing modal price preview and sticky footer structure preserved.

## Build result
Pending after patch.

## Deploy URL
https://suzu-comms.vercel.app

## Known limitations
- Fresh X data depends on the existing fetch/data source; build does not verify live X API freshness.
