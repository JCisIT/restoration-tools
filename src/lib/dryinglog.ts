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

// Several jobs, one active at a time.
export interface JobEntry {
  id: number;
  job: DryingJob;
}

export interface Store {
  version: 2;
  jobs: JobEntry[];
  activeId: number;
  nextJobId: number;
}

export const newStore = (first: DryingJob = EMPTY_JOB): Store => ({
  version: 2,
  jobs: [{ id: 1, job: first }],
  activeId: 1,
  nextJobId: 2,
});

// Loads the multi-job store. A log saved by the earlier single-job version
// (legacyRaw) is carried over as the first job.
export function parseStore(raw: string | null, legacyRaw: string | null = null): Store {
  if (raw) {
    try {
      const s = JSON.parse(raw);
      if (s?.version === 2 && Array.isArray(s.jobs) && s.jobs.length > 0) {
        const jobs: JobEntry[] = s.jobs
          .filter((e: JobEntry) => Number.isFinite(e?.id) && e?.job)
          .map((e: JobEntry) => ({ id: e.id, job: parseJob(JSON.stringify(e.job)) }));
        if (jobs.length > 0) {
          const activeId = jobs.some((e) => e.id === s.activeId) ? s.activeId : jobs[0].id;
          const maxId = Math.max(...jobs.map((e) => e.id));
          return { version: 2, jobs, activeId, nextJobId: Math.max(Number(s.nextJobId) || 0, maxId + 1) };
        }
      }
    } catch {
      // fall through to a fresh store
    }
  }
  return newStore(parseJob(legacyRaw));
}

export function jobLabel(entry: JobEntry, index: number): string {
  return entry.job.name.trim() || `Untitled job ${index + 1}`;
}
