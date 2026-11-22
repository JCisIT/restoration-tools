import Link from "next/link";
import { EXPERT_URL } from "@/lib/site";

const tools = [
  {
    href: "/tools/drying-calculator",
    name: "Drying equipment calculator",
    blurb: "Initial dehumidifier and air mover counts from room dimensions and damage class.",
  },
  {
    href: "/tools/estimate-compare",
    name: "Estimate comparison",
    blurb: "Upload two estimates and see missing line items and price differences side by side.",
  },
];

// Third-party tools we point to instead of rebuilding. No affiliation.
const resources = [
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

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Free tools for restoration contractors</h1>
      <p className="mt-3 max-w-2xl opacity-80">
        Size your drying setup and find what an estimate is missing. No signup needed to start.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="block h-full rounded-lg border border-black/10 p-5 hover:border-black/40 dark:border-white/15 dark:hover:border-white/50"
            >
              <h2 className="font-medium">{tool.name}</h2>
              <p className="mt-1 text-sm opacity-75">{tool.blurb}</p>
            </Link>
          </li>
        ))}
      </ul>

      {EXPERT_URL && (
        <section className="mt-12 rounded-lg border border-black/10 p-5 dark:border-white/15">
          <h2 className="text-lg font-semibold">Stuck on an estimate?</h2>
          <p className="mt-1 text-sm opacity-75">
            Get a second set of eyes on scope, pricing, or documentation from a restoration estimating expert.
          </p>
          <a
            href={EXPERT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            Talk to an expert
          </a>
        </section>
      )}

      <h2 className="mt-12 text-lg font-semibold">More resources</h2>
      <p className="mt-1 text-sm opacity-75">Useful tools from other providers. We are not affiliated with them.</p>
      <ul className="mt-4 divide-y divide-black/10 dark:divide-white/15">
        {resources.map((r) => (
          <li key={r.href} className="py-3">
            <a href={r.href} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
              {r.name} <span className="font-normal opacity-60">· {r.source} ↗</span>
            </a>
            <p className="text-sm opacity-75">{r.blurb}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
