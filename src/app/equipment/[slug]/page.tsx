import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CADENCES, EQUIPMENT, getEquipment } from "@/lib/equipment";
import { EquipmentIcon } from "../equipment-icon";
import { PrintButton } from "../../print-button";

export function generateStaticParams() {
  return EQUIPMENT.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(props: PageProps<"/equipment/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const item = getEquipment(slug);
  if (!item) return {};
  return { title: `${item.name}: care guide`, description: item.summary };
}

export default async function EquipmentPage(props: PageProps<"/equipment/[slug]">) {
  const { slug } = await props.params;
  const item = getEquipment(slug);
  if (!item) notFound();

  const index = EQUIPMENT.findIndex((e) => e.slug === slug);
  const next = EQUIPMENT[(index + 1) % EQUIPMENT.length];

  return (
    <article className="space-y-10">
      <nav aria-label="Breadcrumb" className="no-print text-sm text-ink-muted">
        <Link href="/equipment" className="underline">
          Equipment guide
        </Link>{" "}
        / {item.group}
      </nav>

      <header className="flex flex-col gap-6 bg-forest p-6 text-bone md:flex-row md:items-start md:p-8">
        <EquipmentIcon path={item.icon} className="h-12 w-12 shrink-0 text-bone" />
        <div className="flex-1">
          <h1 className="text-3xl leading-tight md:text-4xl">{item.name}</h1>
          <p className="mt-3 max-w-2xl text-on-dark-muted">{item.whatItDoes}</p>
        </div>
        <PrintButton className="border border-bone text-bone hover:bg-bone hover:text-charcoal" />
      </header>

      <section aria-labelledby="specs">
        <h2 id="specs" className="sr-only">
          Key facts
        </h2>
        <dl className="grid gap-px border border-olive bg-olive sm:grid-cols-2">
          {item.specs.map((s) => (
            <div key={s.label} className="bg-white p-4">
              <dt className="font-head text-xs font-semibold uppercase tracking-[0.2em] text-olive">{s.label}</dt>
              <dd className="mt-1">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="care">
        <h2 id="care" className="text-2xl">
          Care schedule
        </h2>
        <ol className="mt-4 space-y-px border border-olive bg-olive">
          {CADENCES.filter((c) => item.care[c.key]?.length).map((c) => (
            <li key={c.key} className="grid gap-3 bg-white p-4 md:grid-cols-[10rem_1fr] md:gap-6">
              <span className="font-head text-sm font-semibold uppercase tracking-[0.2em]">{c.label}</span>
              <ul className="space-y-2">
                {item.care[c.key]!.map((task) => (
                  <li key={task} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-olive" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="mistakes">
          <h2 id="mistakes" className="text-2xl">
            Common mistakes
          </h2>
          <ol className="mt-4 space-y-3">
            {item.mistakes.map((m, i) => (
              <li key={m} className="flex gap-3">
                <span className="font-head text-lg font-semibold text-olive">{String(i + 1).padStart(2, "0")}</span>
                <span>{m}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="standards" className="h-fit bg-bone p-5">
          <h2 id="standards" className="text-2xl">
            Standards and rules
          </h2>
          <ul className="mt-4 space-y-3">
            {item.standards.map((s) => (
              <li key={s.name}>
                <span className="font-semibold">{s.name}</span>
                <span className="block text-sm text-ink-muted">{s.note}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="sources" className="border-t border-olive pt-6">
        <h2 id="sources" className="text-lg">
          Sources
        </h2>
        <ul className="mt-3 space-y-1 text-sm">
          {item.sources.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-ink-muted">
          Summary of published guidance. Follow your equipment manual and the current IICRC standards where they
          differ.
        </p>
      </section>

      <Link
        href={`/equipment/${next.slug}`}
        className="no-print flex items-center justify-between gap-4 border-2 border-charcoal p-5 hover:bg-bone"
      >
        <span>
          <span className="block font-head text-xs font-semibold uppercase tracking-[0.26em] text-ink-muted">Next guide</span>
          <span className="font-head text-lg font-semibold uppercase tracking-wide">{next.name}</span>
        </span>
        <span aria-hidden="true" className="font-head text-2xl">
          →
        </span>
      </Link>
    </article>
  );
}
