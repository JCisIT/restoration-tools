"use client";

import { useState } from "react";
import { CopyResult } from "../../copy-result";
import { planMoldJob } from "@/lib/mold";

const input = "w-full rounded-xs border border-ink-muted bg-transparent px-2 py-2 text-sm";

export function MoldPlanner() {
  const [area, setArea] = useState("40");
  const [heavy, setHeavy] = useState(false);
  const [hvac, setHvac] = useState(false);

  const n = parseFloat(area);
  const plan = planMoldJob({ areaSqFt: Number.isFinite(n) && n > 0 ? n : 0, heavyOrSpreadRisk: heavy, hvacInvolved: hvac });

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[18rem_1fr]">
      <div className="space-y-4">
        <label className="block text-xs">
          <span className="mb-1 block text-ink-muted">Visible mold area (sq ft)</span>
          <input className={input} inputMode="decimal" value={area} onChange={(e) => setArea(e.target.value)} />
        </label>
        <label className="flex gap-2 text-sm">
          <input type="checkbox" className="mt-1" checked={heavy} onChange={(e) => setHeavy(e.target.checked)} />
          <span>Heavy growth, or the work is likely to spread spores through the building</span>
        </label>
        <label className="flex gap-2 text-sm">
          <input type="checkbox" className="mt-1" checked={hvac} onChange={(e) => setHvac(e.target.checked)} />
          <span>Mold is in or near the HVAC system</span>
        </label>
      </div>

      <div aria-live="polite">
        <div className="on-dark bg-forest p-5 text-bone">
          <p className="text-sm text-on-dark-muted">Job size</p>
          <p className="font-head text-2xl font-semibold uppercase tracking-wide">{plan.tierLabel}</p>
          {plan.bumped && <p className="mt-1 text-sm">Planned at the full level because of heavy growth or spread risk.</p>}
        </div>
        <div className="grid gap-px border border-t-0 border-olive bg-olive md:grid-cols-2">
          {[
            { title: "PPE", data: plan.ppe },
            { title: "Containment", data: plan.containment },
          ].map(({ title, data }) => (
            <section key={title} className="bg-white p-5">
              <h2 className="text-xs tracking-[0.26em] text-olive">{title}</h2>
              <p className="mt-1 font-head text-xl font-semibold uppercase tracking-wide">{data.level}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {data.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 bg-olive" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <ul className="mt-4 space-y-2 text-sm">
          {plan.notes.map((note) => (
            <li key={note} className="border-l-2 border-charcoal pl-3">{note}</li>
          ))}
        </ul>
        <div className="max-w-xs">
          <CopyResult
            onDark={false}
            lines={[
              `Mold job plan: ${plan.tierLabel}${plan.bumped ? " (planned at full level)" : ""}`,
              `PPE, ${plan.ppe.level}: ${plan.ppe.items.join("; ")}`,
              `Containment, ${plan.containment.level}: ${plan.containment.items.join("; ")}`,
              ...plan.notes,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
