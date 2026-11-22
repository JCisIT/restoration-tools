// Where "Talk to an expert" sends people: a booking page, mailto:, or tel: link.
// The call to action is hidden until this is set.
export const EXPERT_URL = process.env.NEXT_PUBLIC_EXPERT_URL || null;

// The estimate comparison needs both the AI key and the usage-limit database.
// Until both are set it is shown as "coming soon" and its API stays closed.
// Server-side only: evaluated at build time for static pages.
export const ESTIMATE_READY = Boolean(
  (process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN) &&
    process.env.SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// Third-party tools we point to instead of rebuilding. No affiliation.
export const RESOURCES = [
  {
    href: "https://www.verisk.com/resources/campaigns/pdf-to-esx-conversions-with-xactrestore-pro/",
    name: "PDF to ESX conversion",
    source: "Verisk",
    blurb: "Turn a PDF estimate into an editable Xactimate project file.",
  },
  {
    href: "https://iicrc.org/wp-content/uploads/2024/04/US-Imperial-Initial-Dehumidification-Recommendation-Factors-and-Formulas.pdf",
    name: "Dehumidification factors worksheet",
    source: "IICRC",
    blurb: "The official factors and formulas for initial dehumidifier sizing.",
  },
  {
    href: "https://iicrc.org/wp-content/uploads/2024/04/US-Imperial-Airmover-and-Gallons-Calculations-Worksheet-7.1.22.pdf",
    name: "Air mover worksheet",
    source: "IICRC",
    blurb: "The official worksheet for air mover counts.",
  },
];
