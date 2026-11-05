import { useState } from "react";
import { Plus, Trash } from "@phosphor-icons/react";
import { useBooking, bookingApi } from "../../booking/store";
import { DAYS_LONG, formatShort } from "../../booking/dates";
import { SpecialistAvatar } from "./parts";

const inputBase =
  "min-h-[40px] rounded-xl border border-cream bg-surface-pure px-3 py-1.5 text-sm tabular-nums text-brown focus:border-sage-deep focus:outline-none focus:ring-4 focus:ring-sage/20";

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${checked ? "bg-sage-deep" : "bg-brown/25"}`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-300 ${checked ? "translate-x-[22px]" : "translate-x-0.5"}`}
      />
    </button>
  );
}

function TimeOffForm({ id }) {
  const [f, setF] = useState({ from: "", to: "", reason: "" });
  const ok = f.from && f.to && f.to >= f.from;
  return (
    <div className="mt-3 flex flex-wrap items-end gap-2">
      <label className="text-xs font-semibold text-taupe">
        Desde
        <input type="date" value={f.from} onChange={(e) => setF({ ...f, from: e.target.value })} className={`${inputBase} mt-1 block`} />
      </label>
      <label className="text-xs font-semibold text-taupe">
        Hasta
        <input type="date" value={f.to} onChange={(e) => setF({ ...f, to: e.target.value })} className={`${inputBase} mt-1 block`} />
      </label>
      <label className="min-w-[10rem] flex-1 text-xs font-semibold text-taupe">
        Motivo
        <input value={f.reason} onChange={(e) => setF({ ...f, reason: e.target.value })} placeholder="Vacaciones, congreso…" className={`${inputBase} mt-1 block w-full`} />
      </label>
      <button
        type="button"
        disabled={!ok}
        onClick={() => {
          bookingApi.addTimeOff(id, f);
          setF({ from: "", to: "", reason: "" });
        }}
        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-graphite px-4 text-sm font-semibold text-warm-white hover:bg-brown disabled:cursor-not-allowed disabled:opacity-45"
      >
        <Plus size={14} weight="bold" /> Agregar
      </button>
    </div>
  );
}

function SpecialistCard({ s }) {
  const setRanges = (wd, ranges) => bookingApi.setWeekly(s.id, wd, ranges);
  return (
    <article className="rounded-3xl border border-cream bg-surface-pure p-6 shadow-ambient">
      <header className="flex flex-wrap items-center gap-4">
        <SpecialistAvatar id={s.id} size={52} />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl leading-tight text-graphite">{s.name}</h3>
          <p className="text-sm text-brown/70">{s.role}</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-brown">
          Recibe turnos online
          <Switch checked={s.active} onChange={(v) => bookingApi.updateSpecialist(s.id, { active: v })} label={`Activar turnos de ${s.name}`} />
        </label>
      </header>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-brown">
        <label htmlFor={`slot-${s.id}`}>Un turno cada</label>
        <select
          id={`slot-${s.id}`}
          value={s.slotMinutes}
          onChange={(e) => bookingApi.updateSpecialist(s.id, { slotMinutes: Number(e.target.value) })}
          className={inputBase}
        >
          {[15, 20, 30, 45, 60].map((m) => (
            <option key={m} value={m}>{m} minutos</option>
          ))}
        </select>
      </div>

      <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-taupe">Horarios de atención</h4>
      <ul className="mt-3 divide-y divide-cream/70">
        {DAYS_LONG.map((day, wd) => {
          const ranges = s.weekly[wd] || [];
          return (
            <li key={wd} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
              <span className="w-24 shrink-0 text-sm font-medium capitalize text-graphite">{day}</span>
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                {ranges.length === 0 && <span className="text-sm text-brown/50">Sin atención</span>}
                {ranges.map(([from, to], i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 rounded-2xl border border-cream bg-cream/20 p-1.5">
                    <input
                      type="time"
                      aria-label={`${day}, desde`}
                      value={from}
                      onChange={(e) => setRanges(wd, ranges.map((r, k) => (k === i ? [e.target.value, r[1]] : r)))}
                      className={inputBase}
                    />
                    <span className="text-taupe">–</span>
                    <input
                      type="time"
                      aria-label={`${day}, hasta`}
                      value={to}
                      onChange={(e) => setRanges(wd, ranges.map((r, k) => (k === i ? [r[0], e.target.value] : r)))}
                      className={inputBase}
                    />
                    <button
                      type="button"
                      aria-label="Quitar franja"
                      onClick={() => setRanges(wd, ranges.filter((_, k) => k !== i))}
                      className="grid h-8 w-8 place-items-center rounded-full text-brown/60 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash size={15} />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => setRanges(wd, [...ranges, ranges.length ? ["14:00", "18:00"] : ["09:00", "13:00"]])}
                  className="inline-flex items-center gap-1 rounded-full border border-dashed border-sage/50 px-3 py-1.5 text-xs font-semibold text-sage-deep transition-colors hover:bg-sage/10"
                >
                  <Plus size={12} weight="bold" /> Franja
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-taupe">Ausencias (vacaciones, congresos)</h4>
      {s.timeOff.length === 0 ? (
        <p className="mt-2 text-sm text-brown/55">Sin ausencias cargadas.</p>
      ) : (
        <ul className="mt-3 flex flex-wrap gap-2">
          {s.timeOff.map((t) => (
            <li key={t.id} className="inline-flex items-center gap-2 rounded-full border border-cream bg-cream/25 py-1.5 pl-4 pr-1.5 text-sm text-brown">
              <span>
                {formatShort(t.from)}{t.to !== t.from ? ` al ${formatShort(t.to)}` : ""}
                {t.reason ? ` · ${t.reason}` : ""}
              </span>
              <button type="button" aria-label="Quitar ausencia" onClick={() => bookingApi.removeTimeOff(s.id, t.id)} className="grid h-7 w-7 place-items-center rounded-full text-brown/60 hover:bg-red-50 hover:text-red-600">
                <Trash size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <TimeOffForm id={s.id} />
    </article>
  );
}

export default function SpecialistsTab() {
  const st = useBooking();
  return (
    <div>
      <p className="max-w-2xl text-[0.95rem] leading-relaxed text-brown/75">
        Definí los días y horarios en los que atiende cada especialista. Los pacientes solo pueden pedir turnos dentro de estas franjas.
      </p>
      <div className="mt-6 grid gap-6">
        {st.specialists.map((s) => (
          <SpecialistCard key={s.id} s={s} />
        ))}
      </div>
    </div>
  );
}
