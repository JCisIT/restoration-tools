# Launch checklist

Five owner tasks stand between the site as it is and the site doing its job. The first two take about five minutes and matter most.

## Do these first

1. **Turn on analytics.** Open https://vercel.com/jace-brain/restoration-tools/analytics and click Enable. The code is already in place.
2. **Set the "Talk to an expert" link.** Give Claude a booking page, a contact form link, or a mailto or tel link. The orange button stays hidden until this is set.

## Then

3. **Read the guides and mark anything wrong.** Use the content review checklist in this folder.
4. **Read the Privacy and Terms pages** and have a lawyer look before relying on them.
   - https://restorationtools.org/privacy
   - https://restorationtools.org/terms
5. **Switch on estimate comparison** when ready:
   1. Copy the service_role key from https://supabase.com/dashboard/project/eiaryzhvkitjwuhvvzlt/settings/api-keys
   2. Create a key at https://console.anthropic.com/settings/keys
   3. Add both at https://vercel.com/jace-brain/restoration-tools/settings/environment-variables with these exact names: `SUPABASE_SERVICE_ROLE_KEY` and `ANTHROPIC_API_KEY`
   4. Redeploy, then test with two real estimates for the same loss, with personal details removed.

Never paste a key into a chat or a document.

## Before promoting the site

- [ ] Analytics on
- [ ] Expert link set and tested from a phone
- [ ] Guides read by someone with field experience
- [ ] Privacy and Terms read
- [ ] Site opened on your own phone and added to the home screen
- [ ] A link texted to yourself to see the preview card

## Optional

- Swap the plain "RT" icon and typed brand name for the 9 Construction logo files.
- Add the company contact line to the About page.
- Register restorationtools.net to stop someone else taking it.

## Running costs

| Item | Cost |
| --- | --- |
| Domain | About $15 a year at renewal |
| Vercel hosting | Free tier covers current traffic |
| Supabase | Free tier covers the usage table |
| AI for estimate comparison | Billed per use once switched on. Limited to 3 runs per visitor per day. |
