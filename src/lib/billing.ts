// Equipment-day and consumable tallies for invoices. No pricing data:
// rates are whatever the user enters from their own agreement.

export interface EquipmentLine {
  id: number;
  type: string;
  qty: number;
  setDate: string; // yyyy-mm-dd
  pickupDate: string;
  rate: number; // per unit per day, optional (0 = none)
}

export interface ConsumableLine {
  id: number;
  item: string;
  qty: number;
  price: number; // per item, optional
}

const DAY_MS = 24 * 60 * 60 * 1000;

function parseDate(s: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const t = Date.UTC(Number(s.slice(0, 4)), Number(s.slice(5, 7)) - 1, Number(s.slice(8, 10)));
  return Number.isFinite(t) ? t : null;
}

// Days on site. inclusive=true counts both the set day and the pickup day.
export function daysOnSite(setDate: string, pickupDate: string, inclusive: boolean): number {
  const a = parseDate(setDate);
  const b = parseDate(pickupDate);
  if (a === null || b === null || b < a) return 0;
  return Math.round((b - a) / DAY_MS) + (inclusive ? 1 : 0);
}

export function equipmentDays(line: EquipmentLine, inclusive: boolean): number {
  return Math.max(0, Math.floor(line.qty)) * daysOnSite(line.setDate, line.pickupDate, inclusive);
}

export const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
