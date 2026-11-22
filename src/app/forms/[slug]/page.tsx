import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FORMS, getForm } from "@/lib/forms";
import { PrintButton } from "../../print-button";

export function generateStaticParams() {
  return FORMS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata(props: PageProps<"/forms/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const form = getForm(slug);
  return form ? { title: `${form.name} (printable)`, description: form.summary } : {};
}

export default async function FormPage(props: PageProps<"/forms/[slug]">) {
  const { slug } = await props.params;
  const form = getForm(slug);
  if (!form) notFound();

  return (
    <div className="print-form">
      {form.landscape && <style>{"@page { size: letter landscape; margin: 0.4in; }"}</style>}
      {!form.landscape && <style>{"@page { size: letter portrait; margin: 0.4in; }"}</style>}

      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link href="/forms" className="text-sm underline">All forms</Link>
        <PrintButton label="Print or save as PDF" className="bg-charcoal text-bone hover:bg-forest" />
      </div>

      <header className="flex items-end justify-between gap-4 border-b-2 border-charcoal pb-2">
        <h1 className="text-2xl leading-tight">{form.name}</h1>
        <span className="text-xs text-ink-muted">restorationtools.org</span>
      </header>

      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:grid-cols-4">
        {form.fields.map((f) => (
          <div key={f} className="border-b border-ink-muted pb-4">
            <dt className="text-xs text-ink-muted">{f}</dt>
            <dd />
          </div>
        ))}
      </dl>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left text-xs">
          <thead>
            <tr>
              {form.columns.map((c) => (
                <th key={c} scope="col" className="border border-charcoal bg-bone p-1.5 font-semibold">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: form.rows }, (_, i) => (
              <tr key={i}>
                {form.columns.map((c) => (
                  <td key={c} className="h-7 border border-ink-muted" />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {form.notes && <p className="mt-3 text-xs text-ink-muted">{form.notes}</p>}
      <p className="mt-1 text-xs text-ink-muted">Notes:</p>
      <div className="mt-1 h-16 border border-ink-muted" />
    </div>
  );
}
