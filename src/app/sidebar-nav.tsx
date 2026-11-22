"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ALL_GUIDES, TOOL, TOOL_GROUPS, type Entry } from "@/lib/links";

const label = "pb-1.5 font-head text-xs font-semibold uppercase tracking-[0.26em] text-on-dark-muted";
const item = "block rounded-xs px-3 py-2 text-bone hover:bg-forest";

export function SidebarNav({ expertUrl, estimateReady }: { expertUrl: string | null; estimateReady: boolean }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const link = (e: Entry) => (
    <Link key={e.href} href={e.href} aria-current={isActive(e.href) ? "page" : undefined} className={`${item} ${isActive(e.href) ? "bg-forest" : ""}`}>
      {e.name}
    </Link>
  );

  const groups = estimateReady
    ? TOOL_GROUPS.map((g) => (g.label === "Job math" ? { ...g, items: [...g.items, TOOL.estimate] } : g))
    : TOOL_GROUPS;

  return (
    <div className="flex flex-col gap-6">
      {groups.map((g) => (
        <nav key={g.label} aria-label={`${g.label} tools`} className="flex flex-col gap-0.5">
          <span className={label}>{g.label}</span>
          {g.items.map(link)}
        </nav>
      ))}

      <nav aria-label="Guides" className="flex flex-col gap-0.5">
        <span className={label}>Guides</span>
        {ALL_GUIDES.map(link)}
      </nav>

      {!estimateReady && (
        <div className="flex flex-col gap-0.5">
          <span className={label}>Coming soon</span>
          <span className="px-3 py-2 text-on-dark-muted">{TOOL.estimate.name}</span>
        </div>
      )}

      {expertUrl && (
        <a href={expertUrl} target="_blank" rel="noopener noreferrer" className="rounded-xs bg-orange px-5 py-3 text-center text-sm font-semibold text-charcoal">
          Talk to an expert
        </a>
      )}
    </div>
  );
}
