import type { MetadataRoute } from "next";
import { EQUIPMENT } from "@/lib/equipment";
import { FORMS } from "@/lib/forms";

const BASE = "https://restorationtools.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/tools/drying-calculator",
    "/tools/psychrometric-calculator",
    "/tools/air-scrubber-calculator",
    "/tools/demo-calculator",
    "/tools/equipment-billing",
    "/tools/estimate-compare",
    "/equipment",
    "/guides/water-category-class",
    "/forms",
  ];
  return [
    ...pages.map((path) => ({ url: `${BASE}${path}` })),
    ...EQUIPMENT.map((e) => ({ url: `${BASE}/equipment/${e.slug}` })),
    ...FORMS.map((f) => ({ url: `${BASE}/forms/${f.slug}` })),
  ];
}
