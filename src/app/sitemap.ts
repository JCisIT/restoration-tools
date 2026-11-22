import type { MetadataRoute } from "next";
import { EQUIPMENT } from "@/lib/equipment";

const BASE = "https://restorationtools.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/tools/drying-calculator", "/tools/estimate-compare", "/equipment"];
  return [
    ...pages.map((path) => ({ url: `${BASE}${path}` })),
    ...EQUIPMENT.map((e) => ({ url: `${BASE}/equipment/${e.slug}` })),
  ];
}
