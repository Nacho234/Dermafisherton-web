import { useState } from "react";
import { Trash, Plus, ArrowCounterClockwise, DownloadSimple } from "@phosphor-icons/react";
import { useBooking, bookingApi } from "../../booking/store";
import { formatLong, downloadFile, cap1 } from "../../booking/dates";

const inputBase =
  "min-h-[44px] rounded-2xl border border-cream bg-surface-pure px-4 py-2.5 text-[0.92rem] text-brown placeholder:text-taupe/70 focus:border-sage-deep focus:outline-none focus:ring-4 focus:ring-sage/20";

export default function SettingsTab() {
  const st = useBooking();
  const [d, setD] = useState({ date: "", reason: "" });
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-3xl border border-cream bg-surface-pure p-6 shadow-ambient">
        <h2 className="font-display text-2xl text-graphite">Reglas de reserva</h2>
        <div className="mt-5 grid gap-5">
          <label className="block text-sm font-medium text-graphite">
            Anticipación mínima (horas)
            <input
              type="number"
              min={0}
              max={240}
              value={st.settings.minAdvanceHours}
              onChange={(e) => bookingApi.updateSettings({ minAdvanceHours: Math.max(0, Number(e.target.value) || 0) })}
              className={`${inputBase} mt-2 block w-40 tabular-nums`}
            />
            <span className="mt-1.5 block text-xs font-normal text-brown/65">No se pueden pedir turnos con menos anticipación que esta.</span>
          </label>
          <label className="block text-sm font-medium text-graphite">
            Cuántos días hacia adelante se puede reservar
            <input
              type="number"
              min={7}
              max={365}
              value={st.settings.maxDaysAhead}
              onChange={(e) => bookingApi.updateSettings({ maxDaysAhead: Math.max(7, Number(e.target.value) || 7) })}
              className={`${inputBase} mt-2 block w-40 tabular-nums`}
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-cream bg-surface-pure p-6 shadow-ambient">
        <h2 className="font-display text-2xl text-graphite">Días cerrados</h2>
        <p className="mt-1 text-sm text-brown/70">Feriados o días en los que la clínica no atiende: nadie puede reservar esos días.</p>
        <div className="mt-4 flex flex-wrap items-end gap-2">
          <label className="text-xs font-semibold text-taupe">
            Fecha
            <input type="date" value={d.date} onChange={(e) => setD({ ...d, date: e.target.value })} className={`${inputBase} mt-1 block`} />
          </label>
          <label className="min-w-[9rem] flex-1 text-xs font-semibold text-taupe">
            Motivo
            <input value={d.reason} onChange={(e) => setD({ ...d, reason: e.target.value })} placeholder="Feriado" className={`${inputBase} mt-1 block w-full`} />
          </label>
          <button
            type="button"
            disabled={!d.date}
            onClick={() => {
              bookingApi.addClosedDate(d.date, d.reason || "Cerrado");
              setD({ date: "", reason: "" });
            }}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-graphite px-5 text-sm font-semibold text-warm-white hover:bg-brown disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Plus size={14} weight="bold" /> Agregar
          </button>
        </div>
        {st.settings.closedDates.length === 0 ? (
          <p className="mt-4 text-sm text-brown/55">No hay días cerrados cargados.</p>
        ) : (
          <ul className="mt-4 divide-y divide-cream/70">
            {st.settings.closedDates.map((c) => (
              <li key={c.date} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <span className="text-graphite">
                  <span>{cap1(formatLong(c.date))}</span> <span className="text-brown/65">· {c.reason}</span>
                </span>
                <button type="button" aria-label="Quitar día cerrado" onClick={() => bookingApi.removeClosedDate(c.date)} className="grid h-8 w-8 place-items-center rounded-full text-brown/60 hover:bg-red-50 hover:text-red-600">
                  <Trash size={15} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-3xl border border-cream bg-surface-pure p-6 shadow-ambient lg:col-span-2">
        <h2 className="font-display text-2xl text-graphite">Datos de la demo</h2>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-brown/70">
          En esta versión los turnos se guardan solo en este navegador (modo demostración). Más adelante se conectan a una base de datos
          para que el panel muestre los turnos de todos los pacientes en tiempo real.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => downloadFile("datos-turnos.json", JSON.stringify(st, null, 2), "application/json")}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-cream bg-surface-pure px-5 text-sm font-semibold text-brown hover:border-sage/50 hover:bg-sage/10"
          >
            <DownloadSimple size={16} weight="bold" /> Exportar todo (JSON)
          </button>
          {confirmReset ? (
            <span className="inline-flex items-center gap-2 text-sm text-brown">
              ¿Borrar todo y volver a los datos de ejemplo?
              <button type="button" onClick={() => { bookingApi.resetDemo(); setConfirmReset(false); }} className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100">Sí, restablecer</button>
              <button type="button" onClick={() => setConfirmReset(false)} className="rounded-full border border-cream px-4 py-2 text-sm font-semibold text-brown hover:bg-cream/40">No</button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 text-sm font-semibold text-red-700 hover:bg-red-100"
            >
              <ArrowCounterClockwise size={16} weight="bold" /> Restablecer datos de ejemplo
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
