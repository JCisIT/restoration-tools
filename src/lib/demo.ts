// Flood-cut demo and rebuild quantities.

export const SHEETS = { "4x8": 32, "4x12": 48 } as const;
export type SheetSize = keyof typeof SHEETS;

// Approximate dry weight of gypsum board, lb per sq ft. Wet board is much heavier.
export const BOARD_WEIGHT = { "1/2": 1.6, "5/8": 2.2 } as const;
export type Thickness = keyof typeof BOARD_WEIGHT;

export interface DemoInput {
  wallLf: number; // affected wall length, linear feet
  sides: number; // wall faces cut: 1, or 2 for interior walls wet on both sides
  cutHeightFt: number;
  exteriorLf: number; // part of the affected length that is insulated exterior wall
  sheet: SheetSize;
  thickness: Thickness;
  wastePct: number;
}

export interface DemoResult {
  drywallSf: number;
  sheets: number;
  baseboardLf: number;
  insulationSf: number;
  debrisLb: number;
}

export function calcDemo(i: DemoInput): DemoResult {
  const lf = Math.max(0, i.wallLf);
  const sides = Math.max(1, Math.min(2, Math.round(i.sides)));
  const h = Math.max(0, i.cutHeightFt);
  const drywallSf = lf * sides * h;
  const waste = 1 + Math.max(0, i.wastePct) / 100;
  return {
    drywallSf,
    sheets: drywallSf > 0 ? Math.ceil((drywallSf * waste) / SHEETS[i.sheet]) : 0,
    baseboardLf: lf * sides,
    insulationSf: Math.min(Math.max(0, i.exteriorLf), lf) * h,
    debrisLb: drywallSf * BOARD_WEIGHT[i.thickness],
  };
}
