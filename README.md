# Restoration Tools

Free calculators, guides and job forms for the restoration industry.
Live at https://restorationtools.org. Built and run by 9 Construction Inc.

## What's in it

| Area | Pages |
| --- | --- |
| Drying | Drying calculator, daily drying log, GPP and dew point |
| Mold and air | Mold job planner, air scrubber calculator |
| Job math | Flood cut and demo quantities, equipment days and billing, unit converter |
| Guides | Equipment and care guide (9 guides), water category and class, fire and smoke, printable forms, outside resources |
| Gated | Estimate comparison (PDF upload, AI). Hidden until its keys are set. |

## How it's built

- Next.js (App Router) on Vercel. Every push to `main` deploys.
- All calculators run in the browser. The drying log saves to the visitor's device only.
- `src/lib/` holds the math and content as plain TypeScript, with no UI:
  `drying`, `psychro`, `airchange`, `demo`, `billing`, `mold`, `convert`, `dryinglog`, `equipment`, `forms`.
- `src/lib/links.ts` is the single list of tools, guides and the "next steps" links between
  them. The sidebar, homepage and sitemap all read from it. Add a new tool there first.
- Brand: 9 Construction colours and type, defined in `src/app/globals.css`.
  Orange is the single accent, used once per view.

## Commands

```bash
npm run dev     # local development
npm test        # calculator and link tests
npm run build   # runs the tests, then builds (this is what Vercel runs)
```

A failing test blocks the deploy, so the live site keeps the last good version.

## Settings (Vercel environment variables)

| Name | Needed for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_EXPERT_URL` | "Talk to an expert" button | Booking page, `mailto:` or `tel:` link. Button is hidden when empty. |
| `ANTHROPIC_API_KEY` | Estimate comparison | Secret. |
| `SUPABASE_URL` | Estimate comparison usage limit | Already set. |
| `SUPABASE_SERVICE_ROLE_KEY` | Estimate comparison usage limit | Secret. From the Supabase `restoration-tools` project. |
| `IP_HASH_SALT`, `FREE_RUNS_PER_DAY` | Usage limit | Already set. |

Estimate comparison turns itself on at the next deploy once the AI key and both Supabase
values are present. Until then it shows as "coming soon" and its API refuses requests.

## Content rules

- Guides summarise published manufacturer, EPA and OSHA guidance and list their sources.
  IICRC standards are named but never quoted.
- Tools document scope, quantities and conditions. They do not interpret insurance policies
  or coverage. Keep it that way: in several states that is licensed public adjusting.
- No pricing data from estimating software is stored.

## Open items

- Owner review of the equipment guides and the privacy and terms pages.
- Turn on Vercel Web Analytics in the project dashboard.
- Set `NEXT_PUBLIC_EXPERT_URL`.
- Add the two secret keys to switch on estimate comparison, then test it on two real estimates.
- The header uses plain type for the brand name; swap in the 9 Construction logo files if wanted.
