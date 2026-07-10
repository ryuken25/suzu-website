# Suzu Content Inventory (Phase 1 — 2026-07-10)

## Stack and deployment
- Framework: Next.js App Router.
- Primary page: `src/app/page.tsx` client composition.
- Existing request flow: `src/components/request/SuzuRequestModal.tsx`; it builds/copies summaries and hands off via mailto/X/Discord helpers. No persistent server order route exists yet.

## Public content → proposed CMS storage
| Content | Current source | CMS model |
|---|---|---|
| Hero/title/subcopy/open status | hero components/page | `site_settings` |
| Anime/chibi package prices, USD/IDR, samples | pricing data/components | `packages`, `images` |
| Portfolio/archive images, alt, category/tag | `data/portfolio`, portfolio components | `images` |
| Five Portfolio Story titles/body/tags/image mapping | `PortfolioStory.tsx` | `story_steps` |
| Collab pitch cards | `OpenCollab.tsx` | `collab_offers` |
| Verified X collab works | `CollabFeed.tsx` | `collab_proof` |
| Terms/process/FAQ/contact/socials/footer | sections/contact/social helpers | `site_settings` |
| Commission/collab submissions | `SuzuRequestModal.tsx` | `order_requests` |

## Request fields to preserve
- commission/collab type, chosen style/crop/characters
- selected artwork/title/source, price estimate
- contact method/value, project type/role
- brief/scope, references, timeline, notes
- request source and honeypot field

## Image handling
- Existing portfolio Story desktop card uses `sizes`; mobile story thumbnail and other secondary image calls need explicit responsive `sizes` during mobile fix.
- Static/data images migrate to `suzu-media` only after server upload route and Storage policies are verified.
