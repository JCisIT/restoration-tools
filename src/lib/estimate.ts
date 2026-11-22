import { z } from "zod";

// Structured form of one repair estimate, extracted from a PDF.
export const LineItemSchema = z.object({
  area: z.string().describe("Room or area the line belongs to, as printed. Empty string if none."),
  description: z.string().describe("Line item description, as printed."),
  quantity: z.number().nullable(),
  unit: z.string().nullable().describe("Unit of measure as printed, e.g. SF, LF, EA, HR."),
  unit_price: z.number().nullable(),
  total: z.number().nullable().describe("Line total before depreciation (replacement cost)."),
  page: z.number().nullable().describe("1-based page number where the line appears."),
});

export const EstimateSchema = z.object({
  prepared_by: z.string().nullable(),
  line_items: z.array(LineItemSchema),
  totals: z.object({
    line_item_total: z.number().nullable(),
    overhead: z.number().nullable(),
    profit: z.number().nullable(),
    sales_tax: z.number().nullable(),
    replacement_cost_value: z.number().nullable(),
    depreciation: z.number().nullable(),
    actual_cash_value: z.number().nullable(),
  }),
  notes: z.array(z.string()).describe("Anything unreadable, cut off, or ambiguous in the document."),
});

export const MatchSchema = z.object({
  matches: z.array(
    z.object({
      a_index: z.number().describe("0-based index into estimate A line_items."),
      b_index: z.number().describe("0-based index into estimate B line_items."),
    }),
  ),
});

export type LineItem = z.infer<typeof LineItemSchema>;
export type Estimate = z.infer<typeof EstimateSchema>;
export type Matches = z.infer<typeof MatchSchema>;

export interface DiffRow {
  kind: "only_a" | "only_b" | "changed" | "same";
  a: LineItem | null;
  b: LineItem | null;
  delta: number; // a.total - b.total, missing side counted as 0
}

export interface Comparison {
  rows: DiffRow[];
  onlyATotal: number;
  onlyBTotal: number;
  changedDelta: number;
  lineItemDelta: number;
}

const cents = (n: number) => Math.round(n * 100) / 100;

// All dollar math happens here, not in the model: the model only pairs lines.
export function buildComparison(a: Estimate, b: Estimate, matches: Matches): Comparison {
  const usedA = new Set<number>();
  const usedB = new Set<number>();
  const rows: DiffRow[] = [];

  for (const m of matches.matches) {
    const la = a.line_items[m.a_index];
    const lb = b.line_items[m.b_index];
    // Ignore out-of-range or duplicate pairings so a bad match can't double count.
    if (!la || !lb || usedA.has(m.a_index) || usedB.has(m.b_index)) continue;
    usedA.add(m.a_index);
    usedB.add(m.b_index);
    const delta = cents((la.total ?? 0) - (lb.total ?? 0));
    rows.push({ kind: Math.abs(delta) >= 0.01 ? "changed" : "same", a: la, b: lb, delta });
  }
  a.line_items.forEach((la, i) => {
    if (!usedA.has(i)) rows.push({ kind: "only_a", a: la, b: null, delta: cents(la.total ?? 0) });
  });
  b.line_items.forEach((lb, i) => {
    if (!usedB.has(i)) rows.push({ kind: "only_b", a: null, b: lb, delta: cents(-(lb.total ?? 0)) });
  });

  const sum = (kind: DiffRow["kind"]) =>
    cents(rows.filter((r) => r.kind === kind).reduce((s, r) => s + r.delta, 0));
  const onlyATotal = sum("only_a");
  const onlyBTotal = cents(-sum("only_b"));
  const changedDelta = sum("changed");

  const order = { only_a: 0, changed: 1, only_b: 2, same: 3 };
  rows.sort((x, y) => order[x.kind] - order[y.kind] || Math.abs(y.delta) - Math.abs(x.delta));

  return { rows, onlyATotal, onlyBTotal, changedDelta, lineItemDelta: cents(onlyATotal - onlyBTotal + changedDelta) };
}
