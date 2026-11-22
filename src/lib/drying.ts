// Initial drying equipment estimates based on the commonly published
// simple-method factors from the water damage restoration standard.
//
// TODO(verify before launch): confirm DEHU_FACTORS against the current IICRC
// "Initial Dehumidification Recommendation Factors and Formulas" worksheet.
// The air mover ranges were cross-checked against published summaries.

export type DamageClass = 1 | 2 | 3 | 4;
export type DehuType = "lgr" | "conventional" | "desiccant";

// Refrigerant types: cubic feet / factor = pints per day (AHAM) needed.
// Desiccant: factor is air changes per hour; cubic feet * ACH / 60 = CFM.
export const DEHU_FACTORS: Record<DehuType, Record<DamageClass, number | null>> = {
  conventional: { 1: 100, 2: 40, 3: 30, 4: null },
  lgr: { 1: 100, 2: 50, 3: 40, 4: 40 },
  desiccant: { 1: 1, 2: 2, 3: 3, 4: 2 },
};

export const AIR_MOVER_RULES = {
  perRoom: 1,
  floorSqFt: { min: 50, max: 70 }, // wet floor + lower walls up to ~2 ft
  upperSqFt: { min: 100, max: 150 }, // wet wall/ceiling area above ~2 ft
  perInset: 1, // each wall inset/offset greater than 18 in
};

export interface DehuInput {
  cubicFeet: number;
  damageClass: DamageClass;
  type: DehuType;
  unitCapacity: number; // pints/day for refrigerant, CFM for desiccant
}

export interface DehuResult {
  supported: boolean;
  required: number; // pints/day or CFM
  unit: "pints/day" | "CFM";
  units: number;
}

export function calcDehumidifiers(input: DehuInput): DehuResult {
  const factor = DEHU_FACTORS[input.type][input.damageClass];
  const unit = input.type === "desiccant" ? "CFM" : "pints/day";
  if (factor === null || input.cubicFeet <= 0) {
    return { supported: factor !== null, required: 0, unit, units: 0 };
  }
  const required =
    input.type === "desiccant"
      ? (input.cubicFeet * factor) / 60
      : input.cubicFeet / factor;
  const units = input.unitCapacity > 0 ? Math.ceil(required / input.unitCapacity) : 0;
  return { supported: true, required, unit, units };
}

export interface RoomInput {
  wetFloorSqFt: number;
  wetUpperSqFt: number;
  insets: number;
}

export interface AirMoverResult {
  min: number;
  max: number;
}

export function calcAirMovers(room: RoomInput): AirMoverResult {
  const r = AIR_MOVER_RULES;
  const floor = Math.max(0, room.wetFloorSqFt);
  const upper = Math.max(0, room.wetUpperSqFt);
  const insets = Math.max(0, Math.floor(room.insets)) * r.perInset;
  // Fewest units uses the largest coverage per unit; most units the smallest.
  const min = r.perRoom + Math.ceil(floor / r.floorSqFt.max) + Math.ceil(upper / r.upperSqFt.max) + insets;
  const max = r.perRoom + Math.ceil(floor / r.floorSqFt.min) + Math.ceil(upper / r.upperSqFt.min) + insets;
  return { min, max };
}
