import type { Metadata } from "next";
import Link from "next/link";
import { CADENCES, EQUIPMENT, GROUPS } from "@/lib/equipment";
import { EquipmentIcon } from "./equipment-icon";

export const metadata: Metadata = {
  title: "Equipment and care guide",
  description:
    "Restoration equipment care schedules: air scrubbers, HEPA and pre-filters, containment, PPE, vacuum saws, dehumidifiers, air movers and meters.",
};

const betweenJobs = [
  "Bag or wrap scrubber and vacuum ports before units leave the containment.",
  "Replace pre-filters, carbon and dehumidifier filters used on mold, fire or Category 3 jobs.",
  "Clean and disinfect anything that touched contaminated water.",
  "HEPA-vacuum and wipe every unit, hose and saw before it goes on the truck.",
  "Drain dehumidifiers fully. Cap hose ends.",
  "Tag the unit with what it was used on and when it was cleaned.",
];

export default function EquipmentGuide() {
  return (
    <div className="space-y-14">
      <section>
        <p className="font-head text-xs font-semibold uppercase tracking-[0.26em] text-olive">Equipment guide</p>
        <h1 className="mt-2 text-3xl leading-tight md:text-4xl">Tools of the trade, and how to keep them working</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          What each piece of equipment is for, how often to service it, and the mistakes that cost shops money.
          Built from manufacturer manuals and published EPA, OSHA and trade guidance. Each page lists its sources.
        </p>
      </section>

      {GROUPS.map((group) => {
        const items = EQUIPMENT.filter((e) => e.group === group);
        if (items.length === 0) return null;
        return (
          <section key={group} aria-labelledby={`group-${group}`}>
            <div className="bg-olive px-4 py-2">
              <h2 id={`group-${group}`} className="text-xs tracking-[0.26em] text-white">
                {group}
              </h2>
            </div>
            <ul className="grid gap-px border border-olive bg-olive sm:grid-cols-2">
              {items.map((item) => (
                <li key={item.slug} className="bg-white sm:odd:last:col-span-2">
                  <Link href={`/equipment/${item.slug}`} className="group flex h-full gap-4 p-5 hover:bg-bone">
                    <EquipmentIcon path={item.icon} className="mt-1 h-7 w-7 shrink-0 text-olive" />
                    <span className="flex flex-col gap-1">
                      <span className="font-head text-lg font-semibold uppercase leading-snug tracking-wide">
                        {item.name}
                      </span>
                      <span className="text-sm text-ink-muted">{item.summary}</span>
                      <span className="mt-1 text-sm font-semibold underline">Care guide</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section aria-labelledby="glance">
        <h2 id="glance" className="text-2xl">
          Care schedule at a glance
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          The short version for the warehouse wall. Open each guide for the full list.
        </p>
        <div className="mt-4 overflow-x-auto border border-olive">
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-forest text-bone">
                <th scope="col" className="p-3 font-head text-xs font-semibold uppercase tracking-[0.2em]">
                  Equipment
                </th>
                {CADENCES.map((c) => (
                  <th key={c.key} scope="col" className="p-3 font-head text-xs font-semibold uppercase tracking-[0.2em]">
                    {c.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EQUIPMENT.map((item, i) => (
                <tr key={item.slug} className={i % 2 ? "bg-bone/50" : "bg-white"}>
                  <th scope="row" className="p-3 align-top font-semibold">
                    <Link href={`/equipment/${item.slug}`} className="hover:underline">
                      {item.name}
                    </Link>
                  </th>
                  {CADENCES.map((c) => (
                    <td key={c.key} className="p-3 align-top text-ink-muted">
                      {item.glance[c.key] ?? <span aria-label="Nothing scheduled">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="between" className="bg-charcoal p-6 text-bone md:p-8">
        <h2 id="between" className="text-2xl">
          Between jobs: stop cross-contamination
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-on-dark-muted">
          The most common equipment failure is not a broken machine. It is a dirty one carried from a sewage or mold
          job into the next customer&apos;s house.
        </p>
        <ol className="mt-5 grid gap-x-8 gap-y-3 md:grid-cols-2">
          {betweenJobs.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="font-head text-lg font-semibold text-orange">{String(i + 1).padStart(2, "0")}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="text-xs text-ink-muted">
        This guide summarises published guidance. It does not replace your equipment manuals, your company&apos;s
        written programs, or the current IICRC standards. Where they differ, follow the manufacturer and the standard.
      </p>
    </div>
  );
}
