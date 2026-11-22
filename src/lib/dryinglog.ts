// Daily drying log: data model and status rules. Stored only in the browser.

export interface Point {
  id: number;
  room: string;
  material: string;
  dryGoal: number | null;
}

export interface Visit {
  id: number;
  date: string; // yyyy-mm-dd
  tempF: number | null; // affected-area air
  rh: number | null;
  readings: Record<number, number | null>; // point id -> reading
}

export interface DryingJob {
  version: 1;
  name: string;
  meter: string;
  points: Point[];
  visits: Visit[];
  nextId: number;
}

export const EMPTY_JOB: DryingJob = { version: 1, name: "", meter: "", points: [], visits: [], nextId: 1 };

export type Status = "none" | "dry" | "drying" | "stalled";

export const STATUS_LABEL: Record<Status, string> = {
  none: "No readings",
  dry: "Dry",
  drying: "Drying",
  stalled: "Not dropping",
};

// Readings for one point, oldest visit first, skipping blanks.
export function history(job: DryingJob, pointId: number): number[] {
  return [...job.visits]
    .sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id)
    .map((v) => v.readings[pointId])
    .filter((r): r is number => typeof r === "number" && Number.isFinite(r));
}

// Dry: latest reading is at or below the goal.
// Stalled: latest reading is not lower than the one before it.
export function pointStatus(job: DryingJob, point: Point): Status {
  const h = history(job, point.id);
  if (h.length === 0) return "none";
  const latest = h[h.length - 1];
  if (point.dryGoal !== null && latest <= point.dryGoal) return "dry";
  if (h.length >= 2 && latest >= h[h.length - 2]) return "stalled";
  return "drying";
}

export function summary(job: DryingJob): Record<Status, number> {
  const out: Record<Status, number> = { none: 0, dry: 0, drying: 0, stalled: 0 };
  for (const p of job.points) out[pointStatus(job, p)] += 1;
  return out;
}

// Accepts only well-formed saved data; anything else starts a fresh job.
export function parseJob(raw: string | null): DryingJob {
  if (!raw) return EMPTY_JOB;
  try {
    const j = JSON.parse(raw);
    if (j?.version !== 1 || !Array.isArray(j.points) || !Array.isArray(j.visits)) return EMPTY_JOB;
    return {
      version: 1,
      name: String(j.name ?? ""),
      meter: String(j.meter ?? ""),
      points: j.points,
      visits: j.visits,
      nextId: Number.isFinite(j.nextId) ? j.nextId : 1,
    };
  } catch {
    return EMPTY_JOB;
  }
}
