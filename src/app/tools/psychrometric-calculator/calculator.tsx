"use client";

import { useState } from "react";
import { psychro } from "@/lib/psychro";

interface Row {
  key: string;
  label: string;
  hint: string;
  temp: string;
  rh: string;
}

const INITIAL: Row[] = [
  { key: "unaffected", label: "Unaffected area or outside", hint: "Your baseline", temp: "72", rh: "45" },
  { key: "affected", label: "Affected area", hint: "Room being dried", temp: "78", rh: "60" },
  { key: "outlet", label: "Dehumidifier outlet", hint: "Air leaving the unit", temp: "92", rh: "25" },
];

const input = "w-full rounded-xs border border-ink-muted bg-transparent px-2 py-2 text-sm";
const num = (s: string) => (s.trim() === "" ? NaN : Number(s));
const fmt = (n: number | undefined, digits = 0) => (n === undefined ? "—" : n.toFixed(digits));

export function PsychroCalculator() {
  const [rows, setRows] = useState(INITIAL);
  const [elevation, setElevation] = useState("0");

  const update = (key: string, patch: Partial<Row>) =>
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));

  const elev = Math.max(0, num(elevation) || 0);
  const results = Object.fromEntries(
    rows.map((r) => [r.key, psychro({ tempF: num(r.temp), rh: num(r.rh) }, elev) ?? undefined]),
  );
  const affected = results.affected?.gpp;
  const unaffected = results.unaffected?.gpp;
  const outlet = results.outlet?.gpp;
  const depression = affected !== undefined && outlet !== undefined ? affected - outlet : undefined;
  const aboveBaseline = affected !== undefined && unaffected !== undefined ? affected - unaffected : undefined;

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_18rem]">
      <div className="space-y-4">
        {rows.map((r) => (
          <section key={r.key} className="grid gap-3 border border-olive p-4 sm:grid-cols-[1fr_7rem_7rem_8rem] sm:items-end">
            <div>
              <h2 className="text-base leading-tight">{r.label}</h2>
              <p className="text-xs text-ink-muted">{r.hint}</p>
            </div>
            <label className="text-xs">
              <span className="mb-1 block text-ink-muted">Temp (°F)</span>
              <input className={input} inputMode="decimal" value={r.temp} onChange={(e) => update(r.key, { temp: e.target.value })} />
            </label>
            <label className="text-xs">
              <span className="mb-1 block text-ink-muted">RH (%)</span>
              <input className={input} inputMode="decimal" value={r.rh} onChange={(e) => update(r.key, { rh: e.target.value })} />
            </label>
            <p className="text-sm" aria-live="polite">
              <strong className="text-lg">{fmt(results[r.key]?.gpp)}</strong> GPP
              <span className="block text-xs text-ink-muted">Dew point {fmt(results[r.key]?.dewPointF)}°F</span>
            </p>
          </section>
        ))}
        <label className="block max-w-[14rem] text-xs">
          <span className="mb-1 block text-ink-muted">Elevation (ft), optional</span>
          <input className={input} inputMode="decimal" value={elevation} onChange={(e) => setElevation(e.target.value)} />
        </label>
      </div>

      <aside className="on-dark h-fit bg-forest p-6 text-bone">
        <h2 className="text-xs tracking-[0.26em]">Drying check</h2>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="text-on-dark-muted">Affected area above baseline</dt>
            <dd className="text-lg font-semibold">{fmt(aboveBaseline)} GPP</dd>
            <p className="mt-1 text-xs text-on-dark-muted">The gap should shrink each day as the space dries.</p>
          </div>
          <div>
            <dt className="text-on-dark-muted">Dehumidifier grain depression</dt>
            <dd className="text-lg font-semibold">{fmt(depression)} GPP</dd>
            <p className="mt-1 text-xs text-on-dark-muted">
              Affected-area GPP minus outlet GPP. A small or shrinking number can mean a dirty filter or coil, or a
              space that is nearly dry. Compare with the unit&apos;s spec.
            </p>
          </div>
        </dl>
        <p className="mt-5 text-xs text-on-dark-muted">
          Calculated with the Magnus approximation at sea-level pressure unless an elevation is entered.
        </p>
      </aside>
    </div>
  );
}
