"use client";

import { useState } from "react";
import type { Comparison, DiffRow, Estimate, LineItem } from "@/lib/estimate";

interface Side {
  prepared_by: string | null;
  totals: Estimate["totals"];
  notes: string[];
}

interface Result {
  a: Side;
  b: Side;
  comparison: Comparison;
}

const money = (n: number | null | undefined) =>
  n == null ? "—" : n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const LABEL: Record<DiffRow["kind"], string> = {
  only_a: "Only in yours",
  only_b: "Only in theirs",
  changed: "Different amount",
  same: "Same",
};

function Line({ item }: { item: LineItem | null }) {
  if (!item) return <span className="opacity-40">—</span>;
  return (
    <div>
      <div>{item.description}</div>
      <div className="text-xs opacity-70">
        {[
          item.area,
          item.quantity != null ? `${item.quantity} ${item.unit ?? ""}`.trim() : null,
          item.unit_price != null ? `@ ${money(item.unit_price)}` : null,
          item.page != null ? `p. ${item.page}` : null,
        ]
          .filter(Boolean)
          .join(" · ")}
      </div>
    </div>
  );
}

export function EstimateCompare() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [showSame, setShowSame] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch("/api/estimate-compare", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        setError(body?.error ?? "Something went wrong. Try again.");
      } else {
        setResult(body as Result);
      }
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  const rows = result?.comparison.rows.filter((r) => showSame || r.kind !== "same") ?? [];
  const notes = result ? [...result.a.notes.map((n) => `Yours: ${n}`), ...result.b.notes.map((n) => `Theirs: ${n}`)] : [];

  return (
    <div className="mt-8">
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="text-sm">
          <span className="mb-1 block font-medium">Your estimate (PDF)</span>
          <input type="file" name="a" accept="application/pdf" required className="w-full text-sm" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium">Other estimate (PDF)</span>
          <input type="file" name="b" accept="application/pdf" required className="w-full text-sm" />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="rounded bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
        >
          {busy ? "Comparing…" : "Compare"}
        </button>
      </form>

      {busy && <p className="mt-4 text-sm opacity-70">Reading both estimates. Long estimates can take a few minutes.</p>}
      {error && (
        <p role="alert" className="mt-4 rounded border border-red-500/50 p-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-8 space-y-6">
          <dl className="grid gap-4 sm:grid-cols-4">
            {[
              ["Only in yours", result.comparison.onlyATotal],
              ["Only in theirs", result.comparison.onlyBTotal],
              ["Different amounts (net)", result.comparison.changedDelta],
              ["Line item difference", result.comparison.lineItemDelta],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-black/10 p-4 dark:border-white/15">
                <dt className="text-xs opacity-70">{label}</dt>
                <dd className="mt-1 text-lg font-semibold">{money(value as number)}</dd>
              </div>
            ))}
          </dl>

          <p className="text-sm opacity-80">
            Stated replacement cost: yours {money(result.a.totals.replacement_cost_value)}, theirs{" "}
            {money(result.b.totals.replacement_cost_value)}. Line item figures exclude overhead, profit, and tax.
          </p>

          {notes.length > 0 && (
            <ul className="list-disc space-y-1 rounded border border-amber-500/50 p-3 pl-7 text-sm">
              {notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={showSame} onChange={(e) => setShowSame(e.target.checked)} />
            Show matching lines
          </label>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-black/20 text-xs uppercase opacity-70 dark:border-white/25">
                  <th className="py-2 pr-3 font-medium">Status</th>
                  <th className="py-2 pr-3 font-medium">Yours</th>
                  <th className="py-2 pr-3 text-right font-medium">Total</th>
                  <th className="py-2 pr-3 font-medium">Theirs</th>
                  <th className="py-2 pr-3 text-right font-medium">Total</th>
                  <th className="py-2 text-right font-medium">Difference</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-black/10 align-top dark:border-white/10">
                    <td className="py-2 pr-3 whitespace-nowrap">{LABEL[row.kind]}</td>
                    <td className="py-2 pr-3"><Line item={row.a} /></td>
                    <td className="py-2 pr-3 text-right tabular-nums">{money(row.a?.total)}</td>
                    <td className="py-2 pr-3"><Line item={row.b} /></td>
                    <td className="py-2 pr-3 text-right tabular-nums">{money(row.b?.total)}</td>
                    <td className="py-2 text-right tabular-nums">{money(row.delta)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length === 0 && <p className="py-4 text-sm opacity-70">No differences found.</p>}
          </div>

          <p className="text-xs opacity-70">
            Automated comparison of two documents. Check every line against the source PDFs before sending anything
            to a carrier or customer. This tool does not interpret insurance coverage.
          </p>
        </div>
      )}
    </div>
  );
}
