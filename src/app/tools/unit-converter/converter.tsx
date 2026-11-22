"use client";

import { useState } from "react";
import { GROUPS, convert, formatResult, type UnitGroup } from "@/lib/convert";

const input = "w-full rounded-xs border border-ink-muted bg-transparent px-2 py-2 text-sm";

const START: Record<string, { unit: string; value: string }> = {
  pressure: { unit: "inwc", value: "0.02" },
  temperature: { unit: "f", value: "72" },
  airflow: { unit: "cfm", value: "500" },
  area: { unit: "sqft", value: "100" },
  volume: { unit: "ppd", value: "130" },
  moisture: { unit: "gpp", value: "55" },
};

function Group({ group }: { group: UnitGroup }) {
  // The box typed in last is the source; every other box shows the conversion.
  const [source, setSource] = useState(START[group.key]);
  const n = source.value.trim() === "" ? NaN : Number(source.value);

  return (
    <section className="border border-olive p-4">
      <h2 className="text-base">{group.name}</h2>
      <div className="mt-3 grid gap-3">
        {group.units.map((u) => {
          const isSource = u.key === source.unit;
          const result = isSource ? null : convert(group, source.unit, u.key, n);
          return (
            <label key={u.key} className="text-xs">
              <span className="mb-1 block text-ink-muted">{u.label}</span>
              <input
                className={input}
                inputMode="decimal"
                value={isSource ? source.value : result === null ? "" : formatResult(result).replace(/,/g, "")}
                onChange={(e) => setSource({ unit: u.key, value: e.target.value })}
              />
            </label>
          );
        })}
      </div>
    </section>
  );
}

export function UnitConverter() {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {GROUPS.map((g) => (
        <Group key={g.key} group={g} />
      ))}
    </div>
  );
}
