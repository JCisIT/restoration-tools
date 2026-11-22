# Restoration Tools: project overview

Restoration Tools (restorationtools.org) is a free set of calculators, guides and job forms for the restoration industry, built and run by 9 Construction Inc. Its job is to earn trust with restoration and mitigation shops so that 9 Construction is the reconstruction partner they call. It is not run as a software business.

## Who it is for

- Contractors and shop owners
- New technicians
- Consultants and estimators
- Project managers

## What is live

| Area | Page | What it does |
| --- | --- | --- |
| Drying | Drying calculator | Dehumidifier and air mover counts by room and class of water |
| Drying | Daily drying log | Readings by spot and visit, with dry and stalled flags. Holds several jobs. Saves on the device only. |
| Drying | GPP and dew point | Grains per pound, dew point and dehumidifier grain depression |
| Mold and air | Mold job planner | PPE and containment level from EPA size tiers |
| Mold and air | Air scrubber calculator | Units needed for a target air-change rate |
| Job math | Flood cut and demo quantities | Drywall, sheets, baseboard, insulation, debris weight |
| Job math | Equipment days and billing | Equipment days and consumables, with text and CSV export |
| Job math | Unit converter | Pressure, temperature, airflow, area, water removal, moisture |
| Guides | Equipment and care guide | Nine care guides with schedules, mistakes, standards and sources |
| Guides | Water category and class | Plain-English explanation with common mistakes |
| Guides | Fire and smoke guide | Safety, residue types, cleaning order, ozone and hydroxyl |
| Guides | Printable job forms | Moisture log, equipment checklist, containment pressure log |
| Other | About, Privacy, Terms, Outside resources | Trust and housekeeping pages |

One tool is built but switched off: **estimate comparison**. It reads two estimate PDFs with AI and lists every line that differs. It turns on by itself once its two keys are added (see the launch checklist).

## How it is built

- **Website:** Next.js, hosted on Vercel. Every change pushed to GitHub deploys automatically.
- **Code:** GitHub repository `JCisIT/restoration-tools`.
- **Database:** a Supabase project named `restoration-tools`. It holds one small table that counts estimate-comparison runs for a daily limit. It stores no documents and no personal details.
- **Domain:** restorationtools.org, registered at Namecheap and pointed at Vercel.
- **Tests:** 15 automated tests check the calculator math and every internal link. They run before each deploy. A failing test blocks the deploy and the live site keeps the last good version.

All calculators run in the visitor's browser. Nothing a visitor types is sent to a server, apart from estimate comparison when that is switched on.

## Accounts and where things live

| What | Where |
| --- | --- |
| Live site | https://restorationtools.org |
| Code | https://github.com/JCisIT/restoration-tools |
| Hosting dashboard | https://vercel.com/jace-brain/restoration-tools |
| Database dashboard | https://supabase.com/dashboard/project/eiaryzhvkitjwuhvvzlt |
| Design options canvas | https://claude.ai/artifact/D5RTV224wgtSBofPHWauXu |

## Rules the site follows

- Guides summarise published manufacturer, EPA and OSHA guidance and list their sources. IICRC standards are named but never quoted.
- Tools document scope, quantities and conditions. They never interpret insurance policies or coverage. In several states that is licensed public adjusting.
- No pricing data from estimating software is stored.
- Brand: 9 Construction colours and type. Orange is the single accent, used once per view.

## How to change the site

Ask Claude Code to make the change in the `JCisIT/restoration-tools` repository. The README in the repository explains the structure. A new tool is added to one shared list, and the menu, homepage and sitemap update from it.
