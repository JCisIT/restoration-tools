// Unit conversions techs look up on site. Each group converts through a base unit.

export interface Unit {
  key: string;
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

export interface UnitGroup {
  key: string;
  name: string;
  units: Unit[];
}

const linear = (key: string, label: string, factor: number): Unit => ({
  key,
  label,
  toBase: (v) => v * factor,
  fromBase: (v) => v / factor,
});

export const GROUPS: UnitGroup[] = [
  {
    key: "pressure",
    name: "Pressure",
    units: [linear("pa", "Pascals (Pa)", 1), linear("inwc", "Inches of water (in. w.c.)", 249.0889), linear("psi", "PSI", 6894.757)],
  },
  {
    key: "temperature",
    name: "Temperature",
    units: [
      { key: "f", label: "Fahrenheit (°F)", toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
      { key: "c", label: "Celsius (°C)", toBase: (v) => v, fromBase: (v) => v },
    ],
  },
  {
    key: "airflow",
    name: "Airflow",
    units: [linear("cfm", "CFM", 1), linear("m3h", "Cubic meters per hour", 1 / 1.699011), linear("ls", "Liters per second", 1 / 0.4719474)],
  },
  {
    key: "area",
    name: "Area",
    units: [linear("sqft", "Square feet", 1), linear("sqm", "Square meters", 10.76391), linear("sqyd", "Square yards", 9)],
  },
  {
    key: "volume",
    name: "Water removal",
    units: [linear("ppd", "Pints per day", 1), linear("lpd", "Liters per day", 2.113376), linear("gpd", "Gallons per day", 8)],
  },
  {
    key: "moisture",
    name: "Moisture in air",
    units: [linear("gpp", "Grains per pound (GPP)", 1), linear("gkg", "Grams per kilogram", 7)],
  },
];

export function convert(group: UnitGroup, from: string, to: string, value: number): number | null {
  const a = group.units.find((u) => u.key === from);
  const b = group.units.find((u) => u.key === to);
  if (!a || !b || !Number.isFinite(value)) return null;
  return b.fromBase(a.toBase(value));
}

// Trims to a sensible number of significant digits for display.
export function formatResult(n: number): string {
  if (n === 0) return "0";
  const abs = Math.abs(n);
  const digits = abs >= 100 ? 1 : abs >= 1 ? 2 : 4;
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}
