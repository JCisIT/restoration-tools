"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tools = [
  { href: "/tools/drying-calculator", name: "Drying calculator", alsoActiveOn: "/" },
  { href: "/tools/estimate-compare", name: "Estimate comparison" },
];

const guides = [{ href: "/equipment", name: "Equipment and care guide" }];

const comingSoon = ["Equipment care log", "Supplement request draft", "Photo-to-scope draft"];

// Third-party tools we point to instead of rebuilding. No affiliation.
const resources = [
  {
    href: "https://www.verisk.com/resources/campaigns/pdf-to-esx-conversions-with-xactrestore-pro/",
    name: "PDF to ESX conversion",
    source: "Verisk",
  },
  {
    href: "https://iicrc.org/wp-content/uploads/2024/04/US-Imperial-Initial-Dehumidification-Recommendation-Factors-and-Formulas.pdf",
    name: "Dehumidification worksheet",
    source: "IICRC",
  },
  {
    href: "https://iicrc.org/wp-content/uploads/2024/04/US-Imperial-Airmover-and-Gallons-Calculations-Worksheet-7.1.22.pdf",
    name: "Air mover worksheet",
    source: "IICRC",
  },
];

const label = "pb-1.5 font-head text-xs font-semibold uppercase tracking-[0.26em] text-on-dark-muted";
const item = "block rounded-xs px-3 py-2.5 text-bone hover:bg-forest";

export function SidebarNav({ expertUrl }: { expertUrl: string | null }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-7">
      <nav aria-label="Tools" className="flex flex-col gap-1">
        <span className={label}>Tools</span>
        {tools.map((tool) => {
          const active = pathname === tool.href || pathname === tool.alsoActiveOn;
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

      <div className="flex flex-col gap-1">
        <span className={label}>Coming soon</span>
        {comingSoon.map((name) => (
          <span key={name} className="px-3 py-2.5 text-on-dark-muted">
            {name}
          </span>
        ))}
      </div>

      <nav aria-label="Resources from other providers" className="flex flex-col gap-1">
        <span className={label}>Resources</span>
        {resources.map((r) => (
          <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className={item}>
            {r.name}
            <span className="block text-xs text-on-dark-muted">{r.source} · opens in a new tab</span>
          </a>
        ))}
      </nav>

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
