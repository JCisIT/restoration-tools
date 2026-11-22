// Air changes per hour (ACH) sizing for air scrubbers and negative air machines.

export interface AirChangeInput {
  cubicFeet: number;
  ach: number; // target air changes per hour
  unitCfm: number; // effective CFM per unit, after filters and ducting
}

export interface AirChangeResult {
  cfmNeeded: number;
  units: number;
  achDelivered: number; // with the rounded-up unit count
}

export function calcAirChanges({ cubicFeet, ach, unitCfm }: AirChangeInput): AirChangeResult {
  if (!(cubicFeet > 0) || !(ach > 0)) return { cfmNeeded: 0, units: 0, achDelivered: 0 };
  const cfmNeeded = (cubicFeet * ach) / 60;
  const units = unitCfm > 0 ? Math.ceil(cfmNeeded / unitCfm) : 0;
  const achDelivered = units > 0 ? (units * unitCfm * 60) / cubicFeet : 0;
  return { cfmNeeded, units, achDelivered };
}
