import type { Metadata } from "next";
import { RESOURCES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Outside resources",
  description: "Useful restoration tools and worksheets from other providers.",
};

export default function Resources() {
  return (
    <div>
      <p className="font-head text-xs font-semibold uppercase tracking-[0.26em] text-olive">Resources</p>
      <h1 className="mt-2 text-3xl leading-tight md:text-4xl">Outside resources</h1>
      <p className="mt-3 max-w-2xl text-ink-muted">
        Good tools we point to instead of rebuilding. We are not affiliated with these providers. Links open in a new
        tab.
      </p>
      <ul className="mt-8 divide-y divide-olive border border-olive">
        {RESOURCES.map((r) => (
          <li key={r.href}>
            <a href={r.href} target="_blank" rel="noopener noreferrer" className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 p-5 hover:bg-bone">
              <span>
                <span className="font-head text-lg font-semibold uppercase tracking-wide">{r.name}</span>
                <span className="block text-sm text-ink-muted">{r.blurb}</span>
              </span>
              <span className="text-sm font-semibold">{r.source}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
