// One place for the site's tools, guides and the links between them.
// The sidebar, homepage, sitemap and "next steps" blocks all read from here.

export interface Entry {
  href: string;
  name: string;
  blurb: string;
}

const t = (href: string, name: string, blurb: string): Entry => ({ href, name, blurb });

export const TOOL = {
  drying: t("/tools/drying-calculator", "Drying calculator", "Dehumidifiers and air movers by room and class."),
  log: t("/tools/drying-log", "Daily drying log", "Readings by spot and visit, with dry and stalled flags."),
  gpp: t("/tools/psychrometric-calculator", "GPP and dew point", "Grains, dew point and dehumidifier performance."),
  scrubber: t("/tools/air-scrubber-calculator", "Air scrubber calculator", "Units needed by air changes per hour."),
  mold: t("/tools/mold-planner", "Mold job planner", "PPE and containment level from the size of the job."),
  demo: t("/tools/demo-calculator", "Flood cut and demo quantities", "Drywall, sheets, baseboard, insulation, debris."),
  billing: t("/tools/equipment-billing", "Equipment days and billing", "Days on site and consumables, ready for the invoice."),
  convert: t("/tools/unit-converter", "Unit converter", "Pascals, inches of water, CFM, GPP and more."),
  estimate: t("/tools/estimate-compare", "Estimate comparison", "Two estimates side by side, every difference flagged."),
};

export const GUIDE = {
  equipment: t("/equipment", "Equipment and care guide", "Scrubbers, filters, containment, PPE, dehus, meters."),
  water: t("/guides/water-category-class", "Water category and class", "What they mean and how to call them."),
  fire: t("/guides/fire-and-smoke", "Fire and smoke guide", "Residue types, cleaning order, ozone and hydroxyl."),
  forms: t("/forms", "Printable job forms", "Moisture log, equipment checklist, pressure log."),
  resources: t("/resources", "Outside resources", "Good tools from other providers."),
};

export const TOOL_GROUPS: { label: string; items: Entry[] }[] = [
  { label: "Drying", items: [TOOL.drying, TOOL.log, TOOL.gpp] },
  { label: "Mold and air", items: [TOOL.mold, TOOL.scrubber] },
  { label: "Job math", items: [TOOL.demo, TOOL.billing, TOOL.convert] },
];

export const ALL_TOOLS: Entry[] = TOOL_GROUPS.flatMap((g) => g.items);
export const ALL_GUIDES: Entry[] = [GUIDE.equipment, GUIDE.water, GUIDE.fire, GUIDE.forms, GUIDE.resources];

const step = (e: Entry, note: string) => ({ href: e.href, label: e.name, note });

// What naturally follows each page.
export const NEXT: Record<string, { href: string; label: string; note: string }[]> = {
  "/tools/drying-calculator": [
    step(TOOL.log, "Track the dry-down once equipment is set."),
    step(TOOL.gpp, "Check that each dehumidifier is pulling water."),
    step(GUIDE.water, "Not sure which class to pick?"),
  ],
  "/tools/drying-log": [
    step(TOOL.gpp, "Work out grain depression for a stalled area."),
    step(TOOL.billing, "Tally equipment days when the job is dry."),
    { href: "/forms/moisture-log", label: "Paper moisture log", note: "A blank form for the truck." },
  ],
  "/tools/psychrometric-calculator": [
    step(TOOL.log, "Record readings visit by visit."),
    { href: "/equipment/dehumidifiers", label: "Dehumidifier care", note: "Low grain depression is often a dirty filter or coil." },
    step(TOOL.convert, "Switch between GPP and grams per kilogram."),
  ],
  "/tools/air-scrubber-calculator": [
    step(TOOL.mold, "Get the containment and PPE level for the job."),
    { href: "/equipment/air-scrubbers", label: "Air scrubber care", note: "Filters, pressure checks and cross-contamination." },
    { href: "/forms/containment-log", label: "Containment pressure log", note: "Record your manometer readings." },
  ],
  "/tools/mold-planner": [
    step(TOOL.scrubber, "Size the negative air for the containment."),
    { href: "/equipment/containment", label: "Containment guide", note: "Setup, daily checks and teardown." },
    { href: "/equipment/ppe", label: "PPE and respirators", note: "Levels, fit testing and care." },
  ],
  "/tools/demo-calculator": [
    step(TOOL.billing, "Add equipment days and consumables."),
    { href: "/equipment/vacuum-saws", label: "Dust-collecting saws", note: "Clean flood cuts and lead-safe demo." },
    step(TOOL.drying, "Size the drying equipment after demo."),
  ],
  "/tools/equipment-billing": [
    { href: "/forms/equipment-checklist", label: "Equipment checklist", note: "Track every unit on site." },
    { href: "/equipment/filters", label: "Filter guide", note: "What to change, and when it is billable." },
    step(TOOL.log, "Back up equipment days with the drying record."),
  ],
  "/tools/unit-converter": [step(TOOL.gpp, "Grains and dew point from temperature and RH."), step(TOOL.scrubber, "Airflow and air changes.")],
  "/guides/fire-and-smoke": [
    step(TOOL.scrubber, "Size air scrubbers for the work area."),
    { href: "/equipment/filters", label: "Filter guide", note: "Carbon handles odor; HEPA does not." },
    { href: "/equipment/ppe", label: "PPE and respirators", note: "Fit testing and what each level covers." },
  ],
  "/guides/water-category-class": [
    step(TOOL.drying, "Size equipment by class."),
    { href: "/equipment/ppe", label: "PPE and respirators", note: "What to wear for Category 3." },
    step(TOOL.log, "Document the dry-down."),
  ],
};

// Tools that go with each equipment guide.
export const EQUIPMENT_NEXT: Record<string, { href: string; label: string; note: string }[]> = {
  "air-scrubbers": [step(TOOL.scrubber, "How many units the space needs."), { href: "/forms/containment-log", label: "Containment pressure log", note: "Record manometer readings." }],
  filters: [step(TOOL.billing, "Log filter changes as billable consumables."), { href: "/forms/equipment-checklist", label: "Equipment checklist", note: "Track pre-filter dates per unit." }],
  containment: [step(TOOL.mold, "Which containment level the job calls for."), step(TOOL.scrubber, "Size the negative air."), { href: "/forms/containment-log", label: "Containment pressure log", note: "Your proof it stayed negative." }],
  ppe: [step(TOOL.mold, "PPE level from the size of the job."), step(GUIDE.water, "Category drives the precautions.")],
  "vacuum-saws": [step(TOOL.demo, "Flood-cut quantities and sheets to hang.")],
  "hepa-vacuums": [step(TOOL.mold, "Plan the mold job around the cleanup."), step(GUIDE.fire, "Dry soot comes off with a HEPA vacuum first.")],
  dehumidifiers: [step(TOOL.drying, "How many units to set."), step(TOOL.gpp, "Check grain depression.")],
  "air-movers": [step(TOOL.drying, "Air mover counts by room."), step(TOOL.billing, "Tally equipment days.")],
  meters: [step(TOOL.log, "Log readings by spot and visit."), { href: "/forms/moisture-log", label: "Paper moisture log", note: "A blank form for the truck." }],
};
