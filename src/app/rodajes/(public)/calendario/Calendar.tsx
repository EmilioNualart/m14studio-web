"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Shoot, ShootEstado } from "@/lib/rodajes";

const ESTADO_BG: Record<ShootEstado, string> = {
  "Pre-producción": "bg-yellow-400/40 hover:bg-yellow-400/60 text-yellow-50",
  Confirmado: "bg-emerald-400/40 hover:bg-emerald-400/60 text-emerald-50",
  "En rodaje": "bg-red-400/40 hover:bg-red-400/60 text-red-50",
  "Post-producción": "bg-blue-400/40 hover:bg-blue-400/60 text-blue-50",
  Wrap: "bg-white/10 hover:bg-white/20 text-white/70",
};

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

type Cell = { date: Date; inMonth: boolean; iso: string };

function buildMonthGrid(year: number, month: number): Cell[] {
  // month: 0-11
  const first = new Date(Date.UTC(year, month, 1));
  // getUTCDay: 0 dom, 1 lun, ..., 6 sáb. Queremos lunes como inicio.
  const startWeekday = (first.getUTCDay() + 6) % 7;
  const start = new Date(first);
  start.setUTCDate(first.getUTCDate() - startWeekday);

  const cells: Cell[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    cells.push({
      date: d,
      inMonth: d.getUTCMonth() === month,
      iso: d.toISOString().slice(0, 10),
    });
  }
  return cells;
}

function shootCoversDate(shoot: Shoot, iso: string): boolean {
  if (!shoot.fecha_inicio) return false;
  const fin = shoot.fecha_fin ?? shoot.fecha_inicio;
  return iso >= shoot.fecha_inicio && iso <= fin;
}

export default function Calendar({ shoots }: { shoots: Shoot[] }) {
  const today = new Date();
  const [year, setYear] = useState(today.getUTCFullYear());
  const [month, setMonth] = useState(today.getUTCMonth());

  const cells = useMemo(() => buildMonthGrid(year, month), [year, month]);
  const todayISO = today.toISOString().slice(0, 10);

  const shootsByDay = useMemo(() => {
    const map = new Map<string, Shoot[]>();
    for (const c of cells) {
      map.set(
        c.iso,
        shoots.filter((s) => shootCoversDate(s, c.iso)),
      );
    }
    return map;
  }, [cells, shoots]);

  function nav(delta: number) {
    let m = month + delta;
    let y = year;
    if (m < 0) {
      m = 11;
      y--;
    } else if (m > 11) {
      m = 0;
      y++;
    }
    setMonth(m);
    setYear(y);
  }

  function hoy() {
    setYear(today.getUTCFullYear());
    setMonth(today.getUTCMonth());
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light">
          {MESES[month]} <span className="text-white/40">{year}</span>
        </h2>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider">
          <button
            onClick={() => nav(-1)}
            className="px-3 py-1.5 border border-white/15 hover:border-white/40 rounded-sm transition"
          >
            ←
          </button>
          <button
            onClick={hoy}
            className="px-3 py-1.5 border border-white/15 hover:border-white/40 rounded-sm transition"
          >
            Hoy
          </button>
          <button
            onClick={() => nav(1)}
            className="px-3 py-1.5 border border-white/15 hover:border-white/40 rounded-sm transition"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-[10px] uppercase tracking-wider text-white/40 border-b border-white/10 pb-2 mb-2">
        {DIAS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-white/5 border border-white/10">
        {cells.map((c) => {
          const dayShoots = shootsByDay.get(c.iso) ?? [];
          const isToday = c.iso === todayISO;
          return (
            <div
              key={c.iso}
              className={`min-h-[110px] bg-black p-1.5 ${
                c.inMonth ? "" : "opacity-30"
              }`}
            >
              <div
                className={`text-xs mb-1 ${
                  isToday
                    ? "text-white font-semibold"
                    : "text-white/60"
                }`}
              >
                {c.date.getUTCDate()}
              </div>
              <div className="space-y-1">
                {dayShoots.slice(0, 3).map((s) => (
                  <Link
                    key={s.id}
                    href={`/rodajes/${s.slug}`}
                    className={`block truncate text-[11px] px-1.5 py-0.5 rounded-sm transition ${ESTADO_BG[s.estado]}`}
                    title={`${s.nombre} · ${s.estado}`}
                  >
                    {s.nombre}
                  </Link>
                ))}
                {dayShoots.length > 3 && (
                  <div className="text-[10px] text-white/40 px-1">
                    +{dayShoots.length - 3} más
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] uppercase tracking-wider text-white/50 mt-4">
        {(Object.keys(ESTADO_BG) as ShootEstado[]).map((e) => (
          <div key={e} className="flex items-center gap-1.5">
            <span
              className={`inline-block w-3 h-3 rounded-sm ${ESTADO_BG[e].split(" ")[0]}`}
            />
            {e}
          </div>
        ))}
      </div>
    </div>
  );
}
