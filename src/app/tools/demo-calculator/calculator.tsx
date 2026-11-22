"use client";

import { useState } from "react";
import { CopyResult } from "../../copy-result";
import { calcDemo, type SheetSize, type Thickness } from "@/lib/demo";

const input = "w-full rounded-xs border border-ink-muted bg-transparent px-2 py-2 text-sm";
const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) && n > 0 ? n : 0;
};
const fmt = (n: number) => Math.round(n).toLocaleString();

export function DemoCalculator() {
  const [wallLf, setWallLf] = useState("40");
  const [sides, setSides] = useState("1");
  const [cut, setCut] = useState("2");
  const [exterior, setExterior] = useState("0");
  const [sheet, setSheet] = useState<SheetSize>("4x8");
  const [thickness, setThickness] = useState<Thickness>("1/2");
  const [waste, setWaste] = useState("10");

  const r = calcDemo({
    wallLf: num(wallLf),
    sides: Number(sides),
    cutHeightFt: num(cut),
    exteriorLf: num(exterior),
    sheet,
    thickness,
    wastePct: num(waste),
  });

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_18rem]">
      <div className="grid content-start gap-4 sm:grid-cols-2">
        <label className="text-xs">
          <span className="mb-1 block text-ink-muted">Affected wall length (linear ft)</span>
          <input className={input} inputMode="decimal" value={wallLf} onChange={(e) => setWallLf(e.target.value)} />
          <span className="mt-1 block text-ink-muted">Add up every wall that is wet, room by room.</span>
        </label>
        <label className="text-xs">
          <span className="mb-1 block text-ink-muted">Wall faces cut</span>
          <select className={input} value={sides} onChange={(e) => setSides(e.target.value)}>
            <option value="1">One side</option>
            <option value="2">Both sides (interior wall wet on both faces)</option>
          </select>
        </label>
        <fieldset className="text-xs">
          <legend className="mb-1 text-ink-muted">Flood-cut height (ft)</legend>
          <div className="flex gap-2">
            {["2", "4"].map((h) => (
              <button
                key={h}
                type="button"
                aria-pressed={cut === h}
                onClick={() => setCut(h)}
                className={`rounded-xs border px-3 py-2 text-sm ${cut === h ? "border-charcoal bg-charcoal text-bone" : "border-ink-muted"}`}
              >
                {h} ft
              </button>
            ))}
            <input aria-label="Custom cut height in feet" className={input} inputMode="decimal" value={cut} onChange={(e) => setCut(e.target.value)} />
          </div>
        </fieldset>
        <label className="text-xs">
          <span className="mb-1 block text-ink-muted">Of that, insulated exterior wall (linear ft)</span>
          <input className={input} inputMode="decimal" value={exterior} onChange={(e) => setExterior(e.target.value)} />
        </label>
        <label className="text-xs">
          <span className="mb-1 block text-ink-muted">Sheet size</span>
          <select className={input} value={sheet} onChange={(e) => setSheet(e.target.value as SheetSize)}>
            <option value="4x8">4 x 8 (32 sq ft)</option>
            <option value="4x12">4 x 12 (48 sq ft)</option>
          </select>
        </label>
        <label className="text-xs">
          <span className="mb-1 block text-ink-muted">Board thickness</span>
          <select className={input} value={thickness} onChange={(e) => setThickness(e.target.value as Thickness)}>
            <option value="1/2">1/2 in.</option>
            <option value="5/8">5/8 in.</option>
          </select>
        </label>
        <label className="text-xs">
          <span className="mb-1 block text-ink-muted">Waste allowance (%)</span>
          <input className={input} inputMode="decimal" value={waste} onChange={(e) => setWaste(e.target.value)} />
        </label>
      </div>

      <aside className="on-dark h-fit bg-forest p-6 text-bone" aria-live="polite">
        <h2 className="text-xs tracking-[0.26em]">Quantities</h2>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="text-on-dark-muted">Drywall removed</dt>
            <dd className="text-lg font-semibold">{fmt(r.drywallSf)} sq ft</dd>
          </div>
          <div>
            <dt className="text-on-dark-muted">Sheets to hang ({sheet}, with waste)</dt>
            <dd className="text-3xl font-semibold">{r.sheets}</dd>
          </div>
          <div>
            <dt className="text-on-dark-muted">Baseboard</dt>
            <dd className="text-lg font-semibold">{fmt(r.baseboardLf)} linear ft</dd>
          </div>
          <div>
            <dt className="text-on-dark-muted">Insulation</dt>
            <dd className="text-lg font-semibold">{fmt(r.insulationSf)} sq ft</dd>
          </div>
          <div>
            <dt className="text-on-dark-muted">Drywall debris (dry weight)</dt>
            <dd className="text-lg font-semibold">~{fmt(r.debrisLb)} lb</dd>
          </div>
        </dl>
        <p className="mt-5 text-xs text-on-dark-muted">
          Wet board weighs much more than dry. Doors, openings and cabinets are not deducted.
        </p>
        <CopyResult
          lines={[
            `Flood cut: ${num(wallLf)} linear ft at ${num(cut)} ft, ${sides === "2" ? "both sides" : "one side"}`,
            `Drywall removed: ${fmt(r.drywallSf)} sq ft`,
            `Sheets to hang: ${r.sheets} (${sheet}, ${thickness} in., with waste)`,
            `Baseboard: ${fmt(r.baseboardLf)} linear ft`,
            `Insulation: ${fmt(r.insulationSf)} sq ft`,
            `Drywall debris: about ${fmt(r.debrisLb)} lb dry`,
          ]}
        />
      </aside>
    </div>
  );
}
