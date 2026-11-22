// Printable job forms. Blank tables with header fields, printed from the browser.

export interface JobForm {
  slug: string;
  name: string;
  summary: string;
  landscape: boolean;
  fields: string[]; // header fields
  columns: string[];
  rows: number;
  notes?: string;
}

export const FORMS: JobForm[] = [
  {
    slug: "moisture-log",
    name: "Daily moisture log",
    summary: "Material readings and drying conditions, room by room, visit by visit.",
    landscape: true,
    fields: ["Job / claim #", "Address", "Category / class", "Meter (make, model)"],
    columns: ["Date / time", "Room", "Material / location", "Reading", "Dry goal", "Temp °F", "RH %", "GPP", "Dehu outlet GPP", "Tech"],
    rows: 16,
    notes: "Use the same meter for follow-up readings on the same job. Check it on its reference before the first reading.",
  },
  {
    slug: "equipment-checklist",
    name: "Equipment checklist",
    summary: "Every unit on site: where it is, when it went in, filters, and how it was cleaned.",
    landscape: true,
    fields: ["Job / claim #", "Address", "Category of water", "Mold or fire job? (Y/N)"],
    columns: ["Asset #", "Type", "Room", "Set date", "Pre-filter fitted (date)", "Filter changes", "Pickup date", "Cleaned / disinfected (date, initials)"],
    rows: 16,
    notes: "Replace pre-filters and carbon used on mold, fire or Category 3 jobs. Bag or wrap ports before units leave containment.",
  },
  {
    slug: "containment-log",
    name: "Containment pressure log",
    summary: "Manometer readings and containment checks, the proof that your containment stayed negative.",
    landscape: false,
    fields: ["Job / claim #", "Address", "Containment type", "Setup date", "Manometer (make, model)"],
    columns: ["Date", "Time", "Pressure (Pa or in. w.c.)", "Units running", "Intact? (Y/N)", "Repairs made", "Tech"],
    rows: 18,
    notes: "Confirm negative pressure before demo starts. Re-tape anything lifted or torn.",
  },
];

export function getForm(slug: string) {
  return FORMS.find((f) => f.slug === slug);
}
