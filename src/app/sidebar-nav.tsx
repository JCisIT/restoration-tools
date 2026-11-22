"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tools = [
  { href: "/tools/drying-calculator", name: "Drying calculator" },
  { href: "/tools/drying-log", name: "Daily drying log" },
  { href: "/tools/psychrometric-calculator", name: "GPP and dew point" },
  { href: "/tools/air-scrubber-calculator", name: "Air scrubber calculator" },
  { href: "/tools/demo-calculator", name: "Flood cut and demo quantities" },
  { href: "/tools/equipment-billing", name: "Equipment days and billing" },
];
const estimateTool = { href: "/tools/estimate-compare", name: "Estimate comparison" };

const guides = [
  { href: "/equipment", name: "Equipment and care guide" },
  { href: "/guides/water-category-class", name: "Water category and class" },
  { href: "/forms", name: "Printable job forms" },
  { href: "/resources", name: "Outside resources" },
];

const label = "pb-1.5 font-head text-xs font-semibold uppercase tracking-[0.26em] text-on-dark-muted";
const item = "block rounded-xs px-3 py-2.5 text-bone hover:bg-forest";

export function SidebarNav({ expertUrl, estimateReady }: { expertUrl: string | null; estimateReady: boolean }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-7">
      <nav aria-label="Tools" className="flex flex-col gap-1">
        <span className={label}>Tools</span>
        {(estimateReady ? [...tools, estimateTool] : tools).map((tool) => {
          const active = pathname === tool.href;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              aria-current={active ? "page" : undefined}
              className={`${item} ${active ? "bg-forest" : ""}`}
            >
              {tool.name}
            </Link>
          );
        })}
      </nav>

      <nav aria-label="Guides" className="flex flex-col gap-1">
        <span className={label}>Guides</span>
        {guides.map((guide) => {
          const active = pathname === guide.href || pathname.startsWith(`${guide.href}/`);
          return (
            <Link
              key={guide.href}
              href={guide.href}
              aria-current={active ? "page" : undefined}
              className={`${item} ${active ? "bg-forest" : ""}`}
            >
              {guide.name}
            </Link>
          );
        })}
      </nav>

      {!estimateReady && (
        <div className="flex flex-col gap-1">
          <span className={label}>Coming soon</span>
          <span className="px-3 py-2.5 text-on-dark-muted">{estimateTool.name}</span>
        </div>
      )}

      {expertUrl && (
        <a
          href={expertUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xs bg-orange px-5 py-3 text-center text-sm font-semibold text-charcoal"
        >
          Talk to an expert
        </a>
      )}
    </div>
  );
}
