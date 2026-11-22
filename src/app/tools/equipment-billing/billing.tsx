"use client";

import { useState } from "react";
import {
  daysOnSite,
  equipmentDays,
  money,
  type ConsumableLine,
  type EquipmentLine,
} from "@/lib/billing";

const EQUIPMENT_TYPES = [
  "Air mover",
  "LGR dehumidifier",
  "Desiccant dehumidifier",
  "Air scrubber",
  "Negative air machine",
  "Heater",
  "Hydroxyl or ozone unit",
];
const CONSUMABLES = ["Air scrubber pre-filter", "HEPA filter", "Carbon filter", "Dehumidifier filter", "Containment poly (roll)", "Zipper door"];

const input = "w-full min-w-0 rounded-xs border border-ink-muted bg-transparent px-2 py-2 text-sm";
const today = () => new Date().toISOString().slice(0, 10);
const n = (s: string) => {
  const v = parseFloat(s);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

export function EquipmentBilling() {
  const [nextId, setNextId] = useState(3);
  const [inclusive, setInclusive] = useState(true);
  const [equipment, setEquipment] = useState<EquipmentLine[]>([
    { id: 1, type: "Air mover", qty: 6, setDate: "", pickupDate: "", rate: 0 },
  ]);
  const [consumables, setConsumables] = useState<ConsumableLine[]>([
    { id: 2, item: "Air scrubber pre-filter", qty: 2, price: 0 },
  ]);
  const [copied, setCopied] = useState(false);

  const id = () => {
    setNextId((v) => v + 1);
    return nextId;
  };
  const updEq = (lineId: number, patch: Partial<EquipmentLine>) =>
    setEquipment((ls) => ls.map((l) => (l.id === lineId ? { ...l, ...patch } : l)));
  const updCo = (lineId: number, patch: Partial<ConsumableLine>) =>
    setConsumables((ls) => ls.map((l) => (l.id === lineId ? { ...l, ...patch } : l)));

  const eqRows = equipment.map((l) => {
    const days = daysOnSite(l.setDate, l.pickupDate, inclusive);
    const eqDays = equipmentDays(l, inclusive);
    return { ...l, days, eqDays, total: eqDays * l.rate };
  });
  const coRows = consumables.map((c) => ({ ...c, total: c.qty * c.price }));
  const totalEqDays = eqRows.reduce((s, r) => s + r.eqDays, 0);
  const grand = eqRows.reduce((s, r) => s + r.total, 0) + coRows.reduce((s, r) => s + r.total, 0);
  const anyRates = grand > 0;

  const csv = () => {
    const q = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const lines = [
      ["Section", "Item", "Qty", "Set date", "Pickup date", "Days", "Equipment days", "Rate", "Total"].map(q).join(","),
      ...eqRows.map((r) => ["Equipment", r.type, r.qty, r.setDate, r.pickupDate, r.days, r.eqDays, r.rate || "", r.total || ""].map(q).join(",")),
      ...coRows.map((r) => ["Consumable", r.item, r.qty, "", "", "", "", r.price || "", r.total || ""].map(q).join(",")),
    ];
    return lines.join("\n");
  };
  const text = () =>
    [
      "EQUIPMENT",
      ...eqRows.map((r) => `${r.qty} x ${r.type}, ${r.setDate} to ${r.pickupDate}: ${r.days} days, ${r.eqDays} equipment days${r.rate ? `, ${money(r.total)}` : ""}`),
      `Total equipment days: ${totalEqDays}`,
      "",
      "CONSUMABLES",
      ...coRows.map((r) => `${r.qty} x ${r.item}${r.price ? `, ${money(r.total)}` : ""}`),
      ...(anyRates ? ["", `Total: ${money(grand)}`] : []),
    ].join("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([csv()], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "equipment-billing.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mt-8 space-y-10">
      <datalist id="equipment-types">
        {EQUIPMENT_TYPES.map((t) => <option key={t} value={t} />)}
      </datalist>
      <datalist id="consumable-types">
        {CONSUMABLES.map((t) => <option key={t} value={t} />)}
      </datalist>

      <section aria-labelledby="eq-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="eq-heading" className="text-2xl">Equipment</h2>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={inclusive} onChange={(e) => setInclusive(e.target.checked)} />
            Count both the set day and the pickup day
          </label>
        </div>
        <div className="mt-3 overflow-x-auto border border-olive">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <thead className="bg-forest text-bone">
              <tr>
                {["Equipment", "Qty", "Set", "Picked up", "Days", "Equip. days", "Rate / day (optional)", "Total", ""].map((h) => (
                  <th key={h} scope="col" className="p-2 font-head text-xs font-semibold uppercase tracking-[0.15em]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {eqRows.map((r) => (
                <tr key={r.id} className="border-t border-olive/40 align-middle">
                  <td className="p-2"><input aria-label="Equipment type" list="equipment-types" className={input} value={r.type} onChange={(e) => updEq(r.id, { type: e.target.value })} /></td>
                  <td className="w-20 p-2"><input aria-label="Quantity" inputMode="numeric" className={input} value={r.qty || ""} onChange={(e) => updEq(r.id, { qty: n(e.target.value) })} /></td>
                  <td className="p-2"><input aria-label="Set date" type="date" className={input} value={r.setDate} onChange={(e) => updEq(r.id, { setDate: e.target.value })} /></td>
                  <td className="p-2"><input aria-label="Pickup date" type="date" className={input} value={r.pickupDate} onChange={(e) => updEq(r.id, { pickupDate: e.target.value })} /></td>
                  <td className="p-2 tabular-nums">{r.days}</td>
                  <td className="p-2 font-semibold tabular-nums">{r.eqDays}</td>
                  <td className="w-32 p-2"><input aria-label="Rate per unit per day" inputMode="decimal" className={input} value={r.rate || ""} onChange={(e) => updEq(r.id, { rate: n(e.target.value) })} /></td>
                  <td className="p-2 tabular-nums">{r.rate ? money(r.total) : "—"}</td>
                  <td className="p-2"><button type="button" className="text-sm underline" onClick={() => setEquipment((ls) => ls.filter((l) => l.id !== r.id))}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" className="mt-3 rounded-xs border border-ink-muted px-3 py-2 text-sm hover:border-charcoal" onClick={() => setEquipment((ls) => [...ls, { id: id(), type: "", qty: 1, setDate: ls.at(-1)?.setDate ?? today(), pickupDate: ls.at(-1)?.pickupDate ?? today(), rate: 0 }])}>
          Add equipment
        </button>
      </section>

      <section aria-labelledby="co-heading">
        <h2 id="co-heading" className="text-2xl">Consumables</h2>
        <div className="mt-3 overflow-x-auto border border-olive">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead className="bg-forest text-bone">
              <tr>
                {["Item", "Qty", "Price each (optional)", "Total", ""].map((h) => (
                  <th key={h} scope="col" className="p-2 font-head text-xs font-semibold uppercase tracking-[0.15em]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coRows.map((r) => (
                <tr key={r.id} className="border-t border-olive/40">
                  <td className="p-2"><input aria-label="Item" list="consumable-types" className={input} value={r.item} onChange={(e) => updCo(r.id, { item: e.target.value })} /></td>
                  <td className="w-20 p-2"><input aria-label="Quantity" inputMode="numeric" className={input} value={r.qty || ""} onChange={(e) => updCo(r.id, { qty: n(e.target.value) })} /></td>
                  <td className="w-36 p-2"><input aria-label="Price each" inputMode="decimal" className={input} value={r.price || ""} onChange={(e) => updCo(r.id, { price: n(e.target.value) })} /></td>
                  <td className="p-2 tabular-nums">{r.price ? money(r.total) : "—"}</td>
                  <td className="p-2"><button type="button" className="text-sm underline" onClick={() => setConsumables((ls) => ls.filter((l) => l.id !== r.id))}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" className="mt-3 rounded-xs border border-ink-muted px-3 py-2 text-sm hover:border-charcoal" onClick={() => setConsumables((ls) => [...ls, { id: id(), item: "", qty: 1, price: 0 }])}>
          Add consumable
        </button>
        <p className="mt-2 text-xs text-ink-muted">Filters and carbon used on a job are billable. Log every change.</p>
      </section>

      <section className="on-dark flex flex-wrap items-center justify-between gap-6 bg-forest p-6 text-bone" aria-live="polite">
        <dl className="flex flex-wrap gap-8">
          <div>
            <dt className="text-sm text-on-dark-muted">Total equipment days</dt>
            <dd className="text-3xl font-semibold">{totalEqDays}</dd>
          </div>
          {anyRates && (
            <div>
              <dt className="text-sm text-on-dark-muted">Total at your rates</dt>
              <dd className="text-3xl font-semibold">{money(grand)}</dd>
            </div>
          )}
        </dl>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={copy} className="rounded-xs border border-bone px-4 py-2.5 text-sm font-semibold hover:bg-bone hover:text-charcoal">
            {copied ? "Copied" : "Copy as text"}
          </button>
          <button type="button" onClick={download} className="rounded-xs border border-bone px-4 py-2.5 text-sm font-semibold hover:bg-bone hover:text-charcoal">
            Download CSV
          </button>
        </div>
      </section>
    </div>
  );
}
