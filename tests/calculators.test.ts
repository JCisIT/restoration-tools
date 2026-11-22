import assert from "node:assert/strict";
import { test } from "node:test";
import { calcAirChanges } from "../src/lib/airchange";
import { daysOnSite, equipmentDays } from "../src/lib/billing";
import { calcDemo } from "../src/lib/demo";
import { calcAirMovers, calcDehumidifiers, DEHU_FACTORS } from "../src/lib/drying";
import { EMPTY_JOB, parseJob, pointStatus, summary, type DryingJob } from "../src/lib/dryinglog";
import { buildComparison, type Estimate } from "../src/lib/estimate";
import { psychro } from "../src/lib/psychro";

test("dehumidifier factors match the IICRC worksheet", () => {
  assert.deepEqual(DEHU_FACTORS.conventional, { 1: 100, 2: 40, 3: 30, 4: null });
  assert.deepEqual(DEHU_FACTORS.lgr, { 1: 100, 2: 50, 3: 40, 4: 40 });
  assert.deepEqual(DEHU_FACTORS.desiccant, { 1: 1, 2: 2, 3: 3, 4: 3 });
});

test("dehumidifier sizing", () => {
  // 12,000 cu ft, Class 2 LGR -> 240 pints/day; 130-pint units -> 2
  const d = calcDehumidifiers({ cubicFeet: 12000, damageClass: 2, type: "lgr", unitCapacity: 130 });
  assert.equal(d.required, 240);
  assert.equal(d.units, 2);
  assert.equal(calcDehumidifiers({ cubicFeet: 12000, damageClass: 4, type: "conventional", unitCapacity: 70 }).supported, false);
  assert.equal(calcDehumidifiers({ cubicFeet: 12000, damageClass: 3, type: "desiccant", unitCapacity: 600 }).required, 600);
});

test("air mover ranges", () => {
  assert.deepEqual(calcAirMovers({ wetFloorSqFt: 200, wetUpperSqFt: 300, insets: 1 }), { min: 7, max: 9 });
  assert.deepEqual(calcAirMovers({ wetFloorSqFt: 0, wetUpperSqFt: 0, insets: 0 }), { min: 1, max: 1 });
});

test("psychrometrics match chart values", () => {
  const a = psychro({ tempF: 70, rh: 50 })!; // chart: ~55 gpp, dew point ~50.5 F
  assert.ok(Math.abs(a.gpp - 55) < 1.5);
  assert.ok(Math.abs(a.dewPointF - 50.5) < 1);
  const b = psychro({ tempF: 90, rh: 80 })!; // chart: ~173 gpp, dew point ~83 F
  assert.ok(Math.abs(b.gpp - 173) < 4);
  assert.ok(psychro({ tempF: 70, rh: 50 }, 5000)!.gpp > a.gpp);
  assert.equal(psychro({ tempF: 70, rh: 0 }), null);
});

test("air changes", () => {
  assert.deepEqual(calcAirChanges({ cubicFeet: 12000, ach: 4, unitCfm: 500 }), { cfmNeeded: 800, units: 2, achDelivered: 5 });
  assert.equal(calcAirChanges({ cubicFeet: 0, ach: 4, unitCfm: 500 }).units, 0);
});

test("demo quantities", () => {
  const d = calcDemo({ wallLf: 40, sides: 2, cutHeightFt: 2, exteriorLf: 15, sheet: "4x8", thickness: "1/2", wastePct: 10 });
  assert.deepEqual(d, { drywallSf: 160, sheets: 6, baseboardLf: 80, insulationSf: 30, debrisLb: 256 });
});

test("equipment days", () => {
  assert.equal(daysOnSite("2026-11-01", "2026-11-04", true), 4);
  assert.equal(daysOnSite("2026-11-01", "2026-11-04", false), 3);
  assert.equal(daysOnSite("2026-11-04", "2026-11-01", true), 0);
  assert.equal(daysOnSite("2026-03-07", "2026-03-09", false), 2); // across a clock change
  assert.equal(daysOnSite("", "", true), 0);
  assert.equal(equipmentDays({ id: 1, type: "x", qty: 3, setDate: "2026-11-01", pickupDate: "2026-11-04", rate: 0 }, true), 12);
});

test("estimate comparison does the dollar math and ignores bad pairings", () => {
  const li = (description: string, total: number) => ({ area: "Kitchen", description, quantity: 1, unit: "EA", unit_price: total, total, page: 1 });
  const totals = { line_item_total: null, overhead: null, profit: null, sales_tax: null, replacement_cost_value: null, depreciation: null, actual_cash_value: null };
  const a: Estimate = { prepared_by: "A", line_items: [li("drywall", 500), li("paint", 300), li("baseboard", 120.1)], totals, notes: [] };
  const b: Estimate = { prepared_by: "B", line_items: [li("drywall", 400), li("paint", 300), li("dumpster", 80)], totals, notes: [] };
  const c = buildComparison(a, b, {
    matches: [{ a_index: 0, b_index: 0 }, { a_index: 1, b_index: 1 }, { a_index: 2, b_index: 1 }, { a_index: 9, b_index: 0 }],
  });
  assert.equal(c.onlyATotal, 120.1);
  assert.equal(c.onlyBTotal, 80);
  assert.equal(c.changedDelta, 100);
  assert.equal(c.lineItemDelta, 140.1);
});

test("drying log status", () => {
  const job: DryingJob = {
    ...EMPTY_JOB,
    points: [
      { id: 1, room: "Kitchen", material: "Drywall", dryGoal: 12 },
      { id: 2, room: "Kitchen", material: "Subfloor", dryGoal: 14 },
      { id: 3, room: "Hall", material: "Baseboard", dryGoal: 12 },
      { id: 4, room: "Hall", material: "Plate", dryGoal: null },
    ],
    visits: [
      { id: 11, date: "2026-11-02", tempF: 75, rh: 50, readings: { 1: 18, 2: 22, 3: 11, 4: null } },
      { id: 10, date: "2026-11-01", tempF: 78, rh: 60, readings: { 1: 25, 2: 22, 3: 20, 4: null } },
    ],
  };
  assert.equal(pointStatus(job, job.points[0]), "drying"); // 25 -> 18, goal 12
  assert.equal(pointStatus(job, job.points[1]), "stalled"); // 22 -> 22
  assert.equal(pointStatus(job, job.points[2]), "dry"); // 20 -> 11, goal 12
  assert.equal(pointStatus(job, job.points[3]), "none");
  assert.deepEqual(summary(job), { none: 1, dry: 1, drying: 1, stalled: 1 });
});

test("saved drying logs that are malformed start fresh", () => {
  assert.equal(parseJob(null), EMPTY_JOB);
  assert.equal(parseJob("{not json"), EMPTY_JOB);
  assert.equal(parseJob('{"version":2}'), EMPTY_JOB);
  assert.equal(parseJob('{"version":1,"name":"A","points":[],"visits":[],"nextId":4}').nextId, 4);
});
