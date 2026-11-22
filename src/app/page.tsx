import type { Metadata } from "next";
import Link from "next/link";
import { ESTIMATE_READY, EXPERT_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Restoration Tools | Free tools for the restoration industry" },
  description:
    "Free calculators, equipment guides and job forms for everyone in water, fire and mold restoration: contractors, consultants, estimators and new technicians.",
};

const audiences = [
  {
    who: "Contractors and shop owners",
    what: "Size jobs, bill equipment days, and keep your fleet clean and working.",
    links: [
      { href: "/tools/equipment-billing", label: "Equipment billing" },
      { href: "/equipment", label: "Equipment care guide" },
    ],
  },
  {
    who: "New technicians",
    what: "Learn the gear, the categories and the care routines without guessing on your first loss.",
    links: [
      { href: "/guides/water-category-class", label: "Category and class" },
      { href: "/equipment/ppe", label: "PPE basics" },
    ],
  },
  {
    who: "Consultants and estimators",
    what: "Check equipment counts, run the psychrometrics, and review the drying record.",
    links: [
      { href: "/tools/psychrometric-calculator", label: "GPP and dew point" },
      { href: "/tools/drying-calculator", label: "Equipment counts" },
    ],
  },
  {
    who: "Project managers",
    what: "Track the dry-down, get quantities for the rebuild, and document the job from day one.",
    links: [
      { href: "/tools/drying-log", label: "Drying log" },
      { href: "/tools/demo-calculator", label: "Demo quantities" },
      { href: "/forms", label: "Job forms" },
    ],
  },
];

const tools = [
  { href: "/tools/drying-calculator", name: "Drying equipment", blurb: "Dehumidifiers and air movers by room and class." },
  { href: "/tools/drying-log", name: "Daily drying log", blurb: "Readings by room and visit, with dry and stalled flags." },
  { href: "/tools/psychrometric-calculator", name: "GPP and dew point", blurb: "Grains, dew point and dehumidifier performance." },
  { href: "/tools/air-scrubber-calculator", name: "Air scrubbers", blurb: "Units needed by air changes per hour." },
  { href: "/tools/demo-calculator", name: "Flood cut quantities", blurb: "Drywall, sheets, baseboard, insulation, debris." },
  { href: "/tools/equipment-billing", name: "Equipment days", blurb: "Days on site and consumables, ready for the invoice." },
  ...(ESTIMATE_READY
    ? [{ href: "/tools/estimate-compare", name: "Estimate comparison", blurb: "Two estimates side by side, every difference flagged." }]
    : []),
];

const guides = [
  { href: "/equipment", name: "Equipment and care guide", blurb: "Scrubbers, filters, containment, PPE, dehus, meters." },
  { href: "/guides/water-category-class", name: "Water category and class", blurb: "What they mean and how to call them." },
  { href: "/forms", name: "Printable job forms", blurb: "Moisture log, equipment checklist, pressure log." },
];

const label = "font-head text-xs font-semibold uppercase tracking-[0.26em]";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="on-dark -mx-4 -mt-8 bg-charcoal px-4 py-14 text-bone md:-mx-12 md:-mt-12 md:px-12 md:py-20">
        <p className={`${label} text-on-dark-muted`}>restorationtools.org</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-black uppercase leading-[0.95] tracking-normal md:text-7xl">
          We&apos;re here to help you put it back together.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-on-dark-muted">
          Free calculators, equipment guides and job forms for everyone in restoration. Contractors, consultants,
          estimators and techs on their first loss. No signup. No sales pitch.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#tools" className="rounded-xs bg-orange px-5 py-3 text-sm font-semibold text-charcoal">
            Start with a tool
          </Link>
          <Link href="/equipment" className="rounded-xs border border-bone px-5 py-3 text-sm font-semibold hover:bg-bone hover:text-charcoal">
            Read the equipment guide
          </Link>
        </div>
      </section>

      <section aria-labelledby="who">
        <p className={`${label} text-olive`}>Who it&apos;s for</p>
        <h2 id="who" className="mt-2 text-3xl">Anyone who works a loss</h2>
        <ul className="mt-6 grid gap-px border border-olive bg-olive sm:grid-cols-2">
          {audiences.map((a) => (
            <li key={a.who} className="flex flex-col gap-3 bg-white p-6">
              <h3 className="font-head text-xl font-semibold uppercase tracking-wide">{a.who}</h3>
              <p className="text-ink-muted">{a.what}</p>
              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-1 text-sm font-semibold">
                {a.links.map((l) => (
                  <Link key={l.href} href={l.href} className="underline">
                    {l.label}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="tools" aria-labelledby="tools-h" className="scroll-mt-6">
        <p className={`${label} text-olive`}>Tools</p>
        <h2 id="tools-h" className="mt-2 text-3xl">Run the numbers</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="group flex h-full flex-col gap-2 border-2 border-charcoal p-5 hover:bg-charcoal hover:text-bone">
                <span className="font-head text-lg font-semibold uppercase tracking-wide">{t.name}</span>
                <span className="text-sm text-ink-muted group-hover:text-on-dark-muted">{t.blurb}</span>
                <span aria-hidden="true" className="mt-auto pt-2 font-head text-xl">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="guides-h" className="on-dark -mx-4 bg-forest px-4 py-12 text-bone md:-mx-12 md:px-12">
        <p className={`${label} text-on-dark-muted`}>Guides and forms</p>
        <h2 id="guides-h" className="mt-2 text-3xl">Know the gear. Document the job.</h2>
        <ul className="mt-6 grid gap-px bg-olive md:grid-cols-3">
          {guides.map((g) => (
            <li key={g.href} className="bg-forest">
              <Link href={g.href} className="flex h-full flex-col gap-2 p-5 hover:bg-charcoal">
                <span className="font-head text-lg font-semibold uppercase tracking-wide">{g.name}</span>
                <span className="text-sm text-on-dark-muted">{g.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-6 bg-bone p-6 md:p-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl">Built by people who do the work</h2>
          <p className="mt-2 text-ink-muted">
            Restoration Tools is made by 9 Construction, a Northern California reconstruction contractor. We built the
            tools we wanted on our own jobs and made them free for the whole industry.
          </p>
        </div>
        {EXPERT_URL && (
          <a
            href={EXPERT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xs border-2 border-charcoal px-5 py-3 text-sm font-semibold hover:bg-white"
          >
            Talk to an expert
          </a>
        )}
      </section>
    </div>
  );
}
