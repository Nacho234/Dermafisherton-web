import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { monthGrid, monthLabel, WEEKDAY_HEADERS, parseISO, todayISO, formatLong } from "../../booking/dates";

// Calendario mensual (lunes primero). Se usa en la reserva del paciente y en el panel.
// - isEnabled(iso): días que se pueden elegir
// - badges: { "YYYY-MM-DD": n } muestra un contador (panel)
// - allowPast: permite navegar a meses anteriores (panel)
export default function Calendar({ value, onChange, isEnabled = () => true, badges, allowPast = false, className = "" }) {
  const today = todayISO();
  const base = parseISO(value || today);
  const [view, setView] = useState({ y: base.getFullYear(), m: base.getMonth() });
  const cells = monthGrid(view.y, view.m);
  const now = parseISO(today);
  const atMinMonth = !allowPast && view.y === now.getFullYear() && view.m === now.getMonth();

  const go = (delta) =>
    setView(({ y, m }) => {
      const d = new Date(y, m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-xl text-graphite" aria-live="polite">
          {monthLabel(view.y, view.m)}
        </h3>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={atMinMonth}
            aria-label="Mes anterior"
            className="grid h-9 w-9 place-items-center rounded-full border border-cream bg-surface-pure text-brown transition-colors hover:border-sage/50 hover:bg-sage/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CaretLeft size={15} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Mes siguiente"
            className="grid h-9 w-9 place-items-center rounded-full border border-cream bg-surface-pure text-brown transition-colors hover:border-sage/50 hover:bg-sage/10"
          >
            <CaretRight size={15} weight="bold" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAY_HEADERS.map((d, i) => (
          <span key={i} className="pb-1 text-[0.7rem] font-semibold uppercase tracking-wider text-taupe">
            {d}
          </span>
        ))}
        {cells.map((iso, i) => {
          if (!iso) return <span key={i} />;
          const enabled = isEnabled(iso);
          const selected = iso === value;
          const isToday = iso === today;
          const n = badges?.[iso];
          return (
            <button
              key={iso}
              type="button"
              disabled={!enabled}
              aria-label={formatLong(iso) + (n ? `, ${n} turnos` : "")}
              aria-pressed={selected}
              onClick={() => onChange?.(iso)}
              className={`relative grid h-10 place-items-center rounded-xl text-[0.92rem] tabular-nums transition-colors duration-200 md:h-11 ${
                selected
                  ? "bg-sage-deep font-semibold text-white shadow-ambient"
                  : enabled
                    ? "text-graphite hover:bg-sage/15"
                    : "cursor-not-allowed text-brown/30"
              } ${isToday && !selected ? "ring-1 ring-sage-deep/60" : ""}`}
            >
              {Number(iso.slice(8))}
              {n ? (
                <span
                  className={`absolute bottom-0.5 right-1 text-[0.6rem] font-bold ${
                    selected ? "text-white/90" : "text-sage-deep"
                  }`}
                >
                  {n}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
