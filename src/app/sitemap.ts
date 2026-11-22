import type { MetadataRoute } from "next";
import { EQUIPMENT } from "@/lib/equipment";
import { FORMS } from "@/lib/forms";
import { ALL_GUIDES, ALL_TOOLS, TOOL } from "@/lib/links";
import { ESTIMATE_READY } from "@/lib/site";

const BASE = "https://restorationtools.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    ...ALL_TOOLS.map((t) => t.href),
    ...(ESTIMATE_READY ? [TOOL.estimate.href] : []),
    ...ALL_GUIDES.map((g) => g.href),
    ...EQUIPMENT.map((e) => `/equipment/${e.slug}`),
    ...FORMS.map((f) => `/forms/${f.slug}`),
    "/privacy",
    "/terms",
  ];
  return pages.map((path) => ({ url: `${BASE}${path}` }));
}
