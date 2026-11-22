"use client";

import { useEffect, useState } from "react";
import {
  EMPTY_JOB,
  STATUS_LABEL,
  history,
  jobLabel,
  newStore,
  parseStore,
  pointStatus,
  summary,
  type DryingJob,
  type Point,
  type Status,
  type Store,
  type Visit,
} from "@/lib/dryinglog";
import { psychro } from "@/lib/psychro";

const KEY = "rt-drying-log-v2";
const LEGACY_KEY = "rt-drying-log-v1"; // single-job version, carried over once

const input = "w-full min-w-0 rounded-xs border border-ink-muted bg-transparent px-2 py-1.5 text-sm";
const toNum = (s: string): number | null => {
  if (s.trim() === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
};
const show = (n: number | null | undefined) => (n === null || n === undefined ? "" : String(n));

const CHIP: Record<Status, string> = {
  none: "border border-ink-muted text-ink-muted",
  dry: "bg-olive text-white",
  drying: "bg-bone text-charcoal",
  stalled: "bg-charcoal text-bone",
};

function load(): Store {
  try {
    return parseStore(window.localStorage.getItem(KEY), window.localStorage.getItem(LEGACY_KEY));
  } catch {
    return newStore(); // storage blocked: work without saving
  }
}

export function DryingLog() {
  const [store, setStore] = useState<Store>(load);
  const [saveFailed, setSaveFailed] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(store));
    } catch {
      queueMicrotask(() => setSaveFailed(true));
    }
  }, [store]);

  const job = (store.jobs.find((e) => e.id === store.activeId) ?? store.jobs[0]).job;
  const setJob = (fn: (j: DryingJob) => DryingJob) =>
    setStore((s) => ({ ...s, jobs: s.jobs.map((e) => (e.id === s.activeId ? { ...e, job: fn(e.job) } : e)) }));
  const newJob = () =>
    setStore((s) => ({
      ...s,
      jobs: [...s.jobs, { id: s.nextJobId, job: EMPTY_JOB }],
      activeId: s.nextJobId,
      nextJobId: s.nextJobId + 1,
    }));

  const visits = [...job.visits].sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id);
  const counts = summary(job);

  const updPoint = (id: number, patch: Partial<Point>) =>
    setJob((j) => ({ ...j, points: j.points.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));
  const updVisit = (id: number, patch: Partial<Visit>) =>
    setJob((j) => ({ ...j, visits: j.visits.map((v) => (v.id === id ? { ...v, ...patch } : v)) }));
  const setReading = (visitId: number, pointId: number, value: number | null) =>
    setJob((j) => ({
      ...j,
      visits: j.visits.map((v) => (v.id === visitId ? { ...v, readings: { ...v.readings, [pointId]: value } } : v)),
    }));

  const addPoint = () =>
    setJob((j) => ({
      ...j,
      nextId: j.nextId + 1,
      points: [...j.points, { id: j.nextId, room: j.points.at(-1)?.room ?? "", material: "", dryGoal: null }],
    }));
  const addVisit = () => {
    const date = new Date().toLocaleDateString("en-CA"); // local yyyy-mm-dd
    setJob((j) => ({ ...j, nextId: j.nextId + 1, visits: [...j.visits, { id: j.nextId, date, tempF: null, rh: null, readings: {} }] }));
  };
  const deleteJob = () => {
    if (!window.confirm("Delete this job and all its readings from this device?")) return;
    setStore((s) => {
      const jobs = s.jobs.filter((e) => e.id !== s.activeId);
      if (jobs.length === 0) return { ...newStore(), jobs: [{ id: s.nextJobId, job: EMPTY_JOB }], activeId: s.nextJobId, nextJobId: s.nextJobId + 1 };
      return { ...s, jobs, activeId: jobs[jobs.length - 1].id };
    });
  };

  function downloadCsv() {
    const q = (v: string | number | null) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = [
      ["Job", job.name].map(q).join(","),
      ["Meter", job.meter].map(q).join(","),
      ["Room", "Material / location", "Dry goal", ...visits.map((v) => v.date), "Status"].map(q).join(","),
      ["Air temp F", "", "", ...visits.map((v) => v.tempF), ""].map(q).join(","),
      ["Air RH %", "", "", ...visits.map((v) => v.rh), ""].map(q).join(","),
      ...job.points.map((p) =>
        [p.room, p.material, p.dryGoal, ...visits.map((v) => v.readings[p.id] ?? null), STATUS_LABEL[pointStatus(job, p)]].map(q).join(","),
      ),
    ];
    const url = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "drying-log.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const empty = job.points.length === 0;
  const allDry = !empty && counts.dry === job.points.length;

  return (
    <div className="print-form mt-8 space-y-6">
      {saveFailed && (
        <p role="alert" className="border border-charcoal bg-bone p-3 text-sm">
          This browser is blocking storage, so the log will not be saved when you leave. Download the CSV before closing.
        </p>
      )}

      <div className="no-print flex flex-wrap items-end gap-3">
        <label className="min-w-48 flex-1 text-xs sm:max-w-sm">
          <span className="mb-1 block text-ink-muted">Job</span>
          <select className={input} value={store.activeId} onChange={(e) => setStore((s) => ({ ...s, activeId: Number(e.target.value) }))}>
            {store.jobs.map((e, i) => (
              <option key={e.id} value={e.id}>{jobLabel(e, i)}</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={newJob} className="rounded-xs border border-ink-muted px-4 py-2 text-sm hover:border-charcoal">New job</button>
        <span className="text-xs text-ink-muted">{store.jobs.length} saved on this device</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs">
          <span className="mb-1 block text-ink-muted">Job name or claim number</span>
          <input className={input} value={job.name} onChange={(e) => setJob((j) => ({ ...j, name: e.target.value }))} />
        </label>
        <label className="text-xs">
          <span className="mb-1 block text-ink-muted">Meter (make and model)</span>
          <input className={input} value={job.meter} onChange={(e) => setJob((j) => ({ ...j, meter: e.target.value }))} />
        </label>
      </div>

      {!empty && (
        <dl className="on-dark flex flex-wrap gap-x-10 gap-y-3 bg-forest p-5 text-bone" aria-live="polite">
          {(["dry", "drying", "stalled"] as const).map((s) => (
            <div key={s}>
              <dt className="text-sm text-on-dark-muted">{STATUS_LABEL[s]}</dt>
              <dd className="text-3xl font-semibold">{counts[s]}</dd>
            </div>
          ))}
          <div className="self-center text-sm">
            {allDry
              ? "Every monitored spot is at or below its dry goal."
              : counts.stalled > 0
                ? "Check equipment and airflow on spots that are not dropping."
                : "Keep logging each visit until every spot reaches its goal."}
          </div>
        </dl>
      )}

      {empty ? (
        <p className="border border-olive p-5 text-sm">
          Start by adding the first spot you are monitoring, such as &quot;Kitchen, drywall behind sink&quot;.
        </p>
      ) : (
        <div className="overflow-x-auto border border-olive">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-bone align-bottom">
              <tr>
                <th scope="col" className="min-w-32 p-2 font-semibold">Room</th>
                <th scope="col" className="min-w-44 p-2 font-semibold">Material / location</th>
                <th scope="col" className="w-20 p-2 font-semibold">Dry goal</th>
                {visits.map((v) => {
                  const air = v.tempF !== null && v.rh !== null ? psychro({ tempF: v.tempF, rh: v.rh }) : null;
                  return (
                    <th key={v.id} scope="col" className="min-w-36 border-l border-olive p-2 font-normal">
                      <input aria-label="Visit date" type="date" className={input} value={v.date} onChange={(e) => updVisit(v.id, { date: e.target.value })} />
                      <span className="mt-1 flex gap-1">
                        <input aria-label="Air temperature, degrees F" placeholder="°F" inputMode="decimal" className={input} value={show(v.tempF)} onChange={(e) => updVisit(v.id, { tempF: toNum(e.target.value) })} />
                        <input aria-label="Relative humidity, percent" placeholder="RH%" inputMode="decimal" className={input} value={show(v.rh)} onChange={(e) => updVisit(v.id, { rh: toNum(e.target.value) })} />
                      </span>
                      <span className="mt-1 flex items-center justify-between text-xs text-ink-muted">
                        <span>{air ? `${Math.round(air.gpp)} GPP` : "GPP —"}</span>
                        <button type="button" className="no-print underline" onClick={() => setJob((j) => ({ ...j, visits: j.visits.filter((x) => x.id !== v.id) }))}>
                          Remove
                        </button>
                      </span>
                    </th>
                  );
                })}
                <th scope="col" className="min-w-28 border-l border-olive p-2 font-semibold">Status</th>
                <th scope="col" className="no-print p-2"><span className="sr-only">Remove</span></th>
              </tr>
            </thead>
            <tbody>
              {job.points.map((p) => {
                const status = pointStatus(job, p);
                const h = history(job, p.id);
                return (
                  <tr key={p.id} className="border-t border-olive/40">
                    <td className="p-2"><input aria-label="Room" className={input} value={p.room} onChange={(e) => updPoint(p.id, { room: e.target.value })} /></td>
                    <td className="p-2"><input aria-label="Material or location" className={input} value={p.material} onChange={(e) => updPoint(p.id, { material: e.target.value })} /></td>
                    <td className="p-2"><input aria-label="Dry goal" inputMode="decimal" className={input} value={show(p.dryGoal)} onChange={(e) => updPoint(p.id, { dryGoal: toNum(e.target.value) })} /></td>
                    {visits.map((v) => (
                      <td key={v.id} className="border-l border-olive/40 p-2">
                        <input aria-label={`Reading on ${v.date}`} inputMode="decimal" className={input} value={show(v.readings[p.id])} onChange={(e) => setReading(v.id, p.id, toNum(e.target.value))} />
                      </td>
                    ))}
                    <td className="border-l border-olive/40 p-2">
                      <span className={`inline-block rounded-xs px-2 py-1 text-xs font-semibold ${CHIP[status]}`}>{STATUS_LABEL[status]}</span>
                      {h.length >= 2 && <span className="mt-1 block text-xs text-ink-muted">{h[0]} to {h[h.length - 1]}</span>}
                    </td>
                    <td className="no-print p-2">
                      <button type="button" className="text-sm underline" onClick={() => setJob((j) => ({ ...j, points: j.points.filter((x) => x.id !== p.id) }))}>
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="no-print flex flex-wrap gap-3">
        <button type="button" onClick={addPoint} className="rounded-xs bg-charcoal px-4 py-2.5 text-sm font-semibold text-bone hover:bg-forest">Add a spot</button>
        <button type="button" onClick={addVisit} disabled={empty} className="rounded-xs bg-charcoal px-4 py-2.5 text-sm font-semibold text-bone hover:bg-forest disabled:opacity-40">Add a visit</button>
        <button type="button" onClick={() => window.print()} disabled={empty} className="rounded-xs border border-ink-muted px-4 py-2.5 text-sm hover:border-charcoal disabled:opacity-40">Print report</button>
        <button type="button" onClick={downloadCsv} disabled={empty} className="rounded-xs border border-ink-muted px-4 py-2.5 text-sm hover:border-charcoal disabled:opacity-40">Download CSV</button>
        <button type="button" onClick={deleteJob} className="ml-auto rounded-xs px-4 py-2.5 text-sm underline">Delete this job</button>
      </div>

      <p className="text-xs text-ink-muted">
        &quot;Dry&quot; means the latest reading is at or below the goal you entered. &quot;Not dropping&quot; means the
        latest reading is the same as or higher than the one before. Use the same meter for every visit.
      </p>
    </div>
  );
}
