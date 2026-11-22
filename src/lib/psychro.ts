// Psychrometric helpers for drying documentation.
// Saturation vapor pressure uses the Magnus approximation (Alduchov & Eskridge
// coefficients), accurate to well under 1% across normal drying conditions.

const STD_PRESSURE_PA = 101325;

export const fToC = (f: number) => ((f - 32) * 5) / 9;
export const cToF = (c: number) => (c * 9) / 5 + 32;

export function saturationPressurePa(tempC: number): number {
  return 610.94 * Math.exp((17.625 * tempC) / (tempC + 243.04));
}

// Barometric pressure at an elevation (standard atmosphere).
export function pressureAtElevationPa(elevationFt: number): number {
  const meters = elevationFt * 0.3048;
  return STD_PRESSURE_PA * Math.pow(1 - 2.25577e-5 * meters, 5.25588);
}

export interface Reading {
  tempF: number;
  rh: number; // percent, 0-100
}

export interface PsychroResult {
  gpp: number; // grains of moisture per pound of dry air
  dewPointF: number;
}

export function psychro({ tempF, rh }: Reading, elevationFt = 0): PsychroResult | null {
  if (!Number.isFinite(tempF) || !Number.isFinite(rh) || rh <= 0 || rh > 100) return null;
  const tc = fToC(tempF);
  const pw = (rh / 100) * saturationPressurePa(tc);
  const p = pressureAtElevationPa(Math.max(0, elevationFt));
  if (pw >= p) return null;
  const humidityRatio = (0.62198 * pw) / (p - pw);
  const gamma = Math.log(rh / 100) + (17.625 * tc) / (243.04 + tc);
  const dewC = (243.04 * gamma) / (17.625 - gamma);
  return { gpp: humidityRatio * 7000, dewPointF: cToF(dewC) };
}
