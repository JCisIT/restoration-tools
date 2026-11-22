"use client";

import Link from "next/link";
import { useState } from "react";
import { CopyResult } from "../../copy-result";
import { calcAirChanges } from "@/lib/airchange";

const input = "w-full rounded-xs border border-ink-muted bg-transparent px-2 py-2 text-sm";
const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export function AirScrubberCalculator() {
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("15");
  const [height, setHeight] = useState("8");
  const [ach, setAch] = useState("4");
  const [rated, setRated] = useState("500");
  const [derate, setDerate] = useState("25");

  const cubicFeet = num(length) * num(width) * num(height);
  const effective = num(rated) * (1 - Math.min(90, num(derate)) / 100);
  const r = calcAirChanges({ cubicFeet, ach: num(ach), unitCfm: effective });

  const fields: [string, string, (v: string) => void, string][] = [
    ["Length (ft)", length, setLength, ""],
    ["Width (ft)", width, setWidth, ""],
    ["Height (ft)", height, setHeight, ""],
    ["Target air changes per hour", ach, setAch, "Use the rate your protocol or hygienist specifies."],
    ["Unit rated CFM", rated, setRated, "From the unit's label or spec sheet."],
    ["Airflow loss (%)", derate, setDerate, "Loaded filters and ducting cut real airflow below the rating."],
  ];

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_18rem]">
      <div className="grid content-start gap-4 sm:grid-cols-3">
        {fields.map(([label, value, set, hint]) => (
          <label key={label} className="text-xs">
            <span className="mb-1 block text-ink-muted">{label}</span>
            <input className={input} inputMode="decimal" value={value} onChange={(e) => set(e.target.value)} />
            {hint && <span className="mt-1 block text-ink-muted">{hint}</span>}
          </label>
        ))}
      </div>

      <aside className="on-dark h-fit bg-forest p-6 text-bone" aria-live="polite">
        <h2 className="text-xs tracking-[0.26em]">Air scrubbers needed</h2>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="text-on-dark-muted">Volume</dt>
            <dd className="text-lg font-semibold">{Math.round(cubicFeet).toLocaleString()} cu ft</dd>
          </div>
          <div>
            <dt className="text-on-dark-muted">Airflow needed</dt>
            <dd className="text-lg font-semibold">{Math.ceil(r.cfmNeeded).toLocaleString()} CFM</dd>
          </div>
          <div>
            <dt className="text-on-dark-muted">Units at {Math.round(effective)} effective CFM</dt>
            <dd className="text-3xl font-semibold">{r.units}</dd>
          </div>
          <div>
            <dt className="text-on-dark-muted">Air changes delivered</dt>
            <dd className="text-lg font-semibold">{r.achDelivered ? r.achDelivered.toFixed(1) : "—"} per hour</dd>
          </div>
        </dl>
        <p className="mt-5 text-xs text-on-dark-muted">
          For negative pressure, exhaust outside and confirm with a manometer.{" "}
          <Link href="/equipment/air-scrubbers" className="underline">
            Air scrubber care guide
          </Link>
        </p>
        <CopyResult
          lines={[
            `Air scrubbers for ${Math.round(cubicFeet).toLocaleString()} cu ft at ${num(ach)} air changes per hour`,
            `Airflow needed: ${Math.ceil(r.cfmNeeded).toLocaleString()} CFM`,
            `Units: ${r.units} at ${Math.round(effective)} effective CFM each`,
            `Air changes delivered: ${r.achDelivered ? r.achDelivered.toFixed(1) : "n/a"} per hour`,
          ]}
        />
      </aside>
    </div>
  );
}
