import type { Metadata } from "next";
import Link from "next/link";
import { FORMS } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Printable job forms",
  description: "Free printable restoration forms: daily moisture log, equipment checklist and containment pressure log.",
};

export default function Forms() {
  return (
    <div>
      <p className="font-head text-xs font-semibold uppercase tracking-[0.26em] text-olive">Forms</p>
      <h1 className="mt-2 text-3xl leading-tight md:text-4xl">Printable job forms</h1>
      <p className="mt-3 max-w-2xl text-ink-muted">
        Clean, blank forms for the truck. Open one and print it, or save it as a PDF from the print dialog.
      </p>
      <ul className="mt-8 grid gap-px border border-olive bg-olive md:grid-cols-3">
        {FORMS.map((f) => (
          <li key={f.slug} className="bg-white">
            <Link href={`/forms/${f.slug}`} className="flex h-full flex-col gap-2 p-5 hover:bg-bone">
              <span className="font-head text-lg font-semibold uppercase tracking-wide">{f.name}</span>
              <span className="text-sm text-ink-muted">{f.summary}</span>
              <span className="mt-auto pt-2 text-sm font-semibold underline">Open and print</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
