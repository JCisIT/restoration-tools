import Link from "next/link";
import { ALL_TOOLS } from "@/lib/links";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-3xl leading-tight">That page isn&apos;t here</h1>
      <p className="mt-3 max-w-2xl text-ink-muted">The link may be old or mistyped. Try one of the tools instead.</p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {ALL_TOOLS.map((t) => (
          <li key={t.href}>
            <Link href={t.href} className="block border border-ink-muted p-3 font-semibold underline hover:bg-bone">
              {t.name}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <Link href="/" className="underline">Back to the homepage</Link>
      </p>
    </div>
  );
}
