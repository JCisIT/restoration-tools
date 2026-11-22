"use client";

import { useState } from "react";
import {
  calcAirMovers,
  calcDehumidifiers,
  type DamageClass,
  type DehuType,
} from "@/lib/drying";

interface Room {
  id: number;
  name: string;
  length: string;
  width: string;
  height: string;
  wetFloor: string;
  wetUpper: string;
  insets: string;
}

const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

const newRoom = (id: number): Room => ({
  id,
  name: `Room ${id}`,
  length: "",
  width: "",
  height: "8",
  wetFloor: "",
  wetUpper: "",
  insets: "0",
});

const DEFAULT_CAPACITY: Record<DehuType, string> = { lgr: "130", conventional: "70", desiccant: "600" };

const input =
  "w-full rounded border border-black/20 bg-transparent px-2 py-1.5 text-sm dark:border-white/25";

export function DryingCalculator() {
  const [rooms, setRooms] = useState<Room[]>([newRoom(1)]);
  const [nextId, setNextId] = useState(2);
  const [damageClass, setDamageClass] = useState<DamageClass>(2);
  const [type, setType] = useState<DehuType>("lgr");
  const [capacity, setCapacity] = useState(DEFAULT_CAPACITY.lgr);

  const update = (id: number, patch: Partial<Room>) =>
    setRooms((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const cubicFeet = rooms.reduce((s, r) => s + num(r.length) * num(r.width) * num(r.height), 0);
  const dehu = calcDehumidifiers({ cubicFeet, damageClass, type, unitCapacity: num(capacity) });
  const movers = rooms.map((r) =>
    calcAirMovers({ wetFloorSqFt: num(r.wetFloor), wetUpperSqFt: num(r.wetUpper), insets: num(r.insets) }),
  );
  const moverMin = movers.reduce((s, m) => s + m.min, 0);
  const moverMax = movers.reduce((s, m) => s + m.max, 0);
  const range = (min: number, max: number) => (min === max ? `${min}` : `${min}–${max}`);

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_18rem]">
      <div className="space-y-6">
        <section className="grid gap-4 sm:grid-cols-3">
          <label className="text-sm">
            <span className="mb-1 block font-medium">Class of water intrusion</span>
            <select
              className={input}
              value={damageClass}
              onChange={(e) => setDamageClass(Number(e.target.value) as DamageClass)}
            >
              <option value={1}>Class 1 (least water)</option>
              <option value={2}>Class 2</option>
              <option value={3}>Class 3 (most water)</option>
              <option value={4}>Class 4 (bound water)</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Dehumidifier type</span>
            <select
              className={input}
              value={type}
              onChange={(e) => {
                const t = e.target.value as DehuType;
                setType(t);
                setCapacity(DEFAULT_CAPACITY[t]);
              }}
            >
              <option value="lgr">Low grain refrigerant (LGR)</option>
              <option value="conventional">Conventional refrigerant</option>
              <option value="desiccant">Desiccant</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">
              Unit capacity ({type === "desiccant" ? "CFM" : "pints/day, AHAM"})
            </span>
            <input className={input} inputMode="decimal" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
          </label>
        </section>

        {rooms.map((room, i) => (
          <section key={room.id} className="rounded-lg border border-black/10 p-4 dark:border-white/15">
            <div className="mb-3 flex items-center justify-between gap-3">
              <input
                className={`${input} max-w-xs font-medium`}
                aria-label="Room name"
                value={room.name}
                onChange={(e) => update(room.id, { name: e.target.value })}
              />
              {rooms.length > 1 && (
                <button
                  type="button"
                  className="text-sm underline opacity-70 hover:opacity-100"
                  onClick={() => setRooms((rs) => rs.filter((r) => r.id !== room.id))}
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {(
                [
                  ["length", "Length (ft)"],
                  ["width", "Width (ft)"],
                  ["height", "Ceiling height (ft)"],
                  ["wetFloor", "Wet floor area (sq ft)"],
                  ["wetUpper", "Wet wall/ceiling above 2 ft (sq ft)"],
                  ["insets", "Insets/offsets over 18 in"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="text-xs">
                  <span className="mb-1 block opacity-80">{label}</span>
                  <input
                    className={input}
                    inputMode="decimal"
                    value={room[key]}
                    onChange={(e) => update(room.id, { [key]: e.target.value })}
                  />
                </label>
              ))}
            </div>
            <p className="mt-3 text-sm">
              Air movers for this room: <strong>{range(movers[i].min, movers[i].max)}</strong>
            </p>
          </section>
        ))}

        <button
          type="button"
          className="rounded border border-black/20 px-3 py-1.5 text-sm hover:border-black/50 dark:border-white/25 dark:hover:border-white/60"
          onClick={() => {
            setRooms((rs) => [...rs, newRoom(nextId)]);
            setNextId((n) => n + 1);
          }}
        >
          Add room
        </button>
      </div>

      <aside className="h-fit rounded-lg border border-black/10 p-5 dark:border-white/15">
        <h2 className="font-medium">Initial equipment</h2>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="opacity-70">Affected volume</dt>
            <dd className="text-lg font-semibold">{Math.round(cubicFeet).toLocaleString()} cu ft</dd>
          </div>
          <div>
            <dt className="opacity-70">Dehumidification needed</dt>
            <dd className="text-lg font-semibold">
              {dehu.supported ? `${Math.ceil(dehu.required).toLocaleString()} ${dehu.unit}` : "Not recommended"}
            </dd>
            {!dehu.supported && (
              <p className="mt-1 text-xs opacity-70">
                Conventional refrigerant units are not recommended for Class 4. Choose LGR or desiccant.
              </p>
            )}
          </div>
          <div>
            <dt className="opacity-70">Dehumidifiers</dt>
            <dd className="text-lg font-semibold">{dehu.supported ? dehu.units : "—"}</dd>
          </div>
          <div>
            <dt className="opacity-70">Air movers</dt>
            <dd className="text-lg font-semibold">{range(moverMin, moverMax)}</dd>
          </div>
        </dl>
        <p className="mt-5 text-xs opacity-70">
          Initial estimate only, using commonly published industry factors. Not affiliated with or endorsed by any
          standards body.
        </p>
      </aside>
    </div>
  );
}
