# Suzu CMS + SMTP + Mobile QA Final Report

## Production
- URL: https://suzu-comms.vercel.app
- Git commit: `41c3dd7`
- Vercel project: `suzu-comms`

## Implemented
- Supabase-backed CMS/order persistence.
- Admin dashboard at `/admin`.
- Health endpoint at `/api/health`.
- Orders API at `/api/orders` and public lookup at `/api/orders/[publicId]`.
- Public contact route wired to CMS persistence.
- SMTP transactional mailer with email event logging.
- Password reset email endpoint at `/api/auth/reset-password`.
- Mobile portfolio/story overflow hardening.

## Verified
| Check | Result |
|---|---:|
| Local build | PASS |
| Vercel prebuilt production deploy | PASS |
| Production `/` | 200 |
| Production `/admin` | 200 |
| Production `/api/health` | 200 |
| Production `/api/orders` | 200 |
| Production health env | Supabase true, SMTP true, adminEmail true |
| Production viewport matrix | 54/54 PASS |
| Production contact smoke | persisted true |
| Production creator email | `email_events.status = sent` |

## Production Smoke Evidence
- Health gitSha: `41c3dd734205425054308c9ea4be1bed6c590b4c`
- Prod smoke order: `suzu-a180f202ab`
- Email type: `contact_created_creator`
- Email status: `sent`

## Notes
- Supabase URL secret contains `/rest/v1/`; code normalizes it before using Supabase JS.
- Vercel env variables synced for production.
- Security grep found env variable names only, no literal secrets committed.
- Next/Vercel build logs include a non-blocking SWC lockfile warning; build/deploy exit status was 0.
