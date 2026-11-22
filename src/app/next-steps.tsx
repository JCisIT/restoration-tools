import Link from "next/link";

export interface Step {
  href: string;
  label: string;
  note: string;
}

// Links from one tool or guide to the ones that naturally follow it.
export function NextSteps({ steps, title = "Next steps" }: { steps: Step[]; title?: string }) {
  if (steps.length === 0) return null;
  return (
    <section aria-label={title} className="no-print mt-12 border-t border-olive pt-6">
      <h2 className="text-lg">{title}</h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s) => (
          <li key={s.href}>
            <Link href={s.href} className="flex h-full flex-col gap-1 border border-ink-muted p-4 hover:border-charcoal hover:bg-bone">
              <span className="font-semibold underline">{s.label}</span>
              <span className="text-sm text-ink-muted">{s.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
