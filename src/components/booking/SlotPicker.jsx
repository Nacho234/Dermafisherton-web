import { useBooking } from "../../booking/store";
import { getSlots, inBookingWindow, nextAvailable } from "../../booking/availability";
import { formatLong, formatShort, toMinutes } from "../../booking/dates";
import Calendar from "./Calendar";

// Calendario + horarios disponibles de un especialista.
// value = { date, time } | null  ·  onChange({ date, time })
export default function SlotPicker({ specialistId, visitTypeId, value, onChange, excludeId = null }) {
  const st = useBooking();
  const date = value?.date || null;
  const slots = date ? getSlots(st, specialistId, date, visitTypeId, excludeId) : [];
  const morning = slots.filter((t) => toMinutes(t) < 13 * 60);
  const afternoon = slots.filter((t) => toMinutes(t) >= 13 * 60);
  const next = nextAvailable(st, specialistId, visitTypeId);

  const enabled = (iso) =>
    inBookingWindow(st, iso) && getSlots(st, specialistId, iso, visitTypeId, excludeId).length > 0;

  const Chip = ({ t }) => (
    <button
      key={t}
      type="button"
      onClick={() => onChange({ date, time: t })}
      aria-pressed={value?.time === t}
      className={`rounded-full border px-4 py-2 text-sm font-medium tabular-nums transition-all duration-200 ${
        value?.time === t
          ? "border-sage-deep bg-sage-deep text-white shadow-ambient"
          : "border-cream bg-surface-pure text-graphite hover:border-sage/60 hover:bg-sage/10"
      }`}
    >
      {t}
    </button>
  );

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-10">
      <Calendar
        value={date}
        onChange={(iso) => onChange({ date: iso, time: null })}
        isEnabled={enabled}
      />
      <div>
        <h3 className="font-display text-xl text-graphite">
          {date ? formatLong(date).replace(/^./, (c) => c.toUpperCase()) : "Horarios disponibles"}
        </h3>
        {!date && (
          <div className="mt-4 rounded-2xl border border-dashed border-cream bg-cream/20 p-5 text-[0.95rem] leading-relaxed text-brown/75">
            Elegí un día en el calendario para ver los horarios.
            {next && (
              <button
                type="button"
                onClick={() => onChange({ date: next.date, time: null })}
                className="mt-3 block text-sm font-semibold text-sage-deep underline-offset-4 hover:underline"
              >
                Próximo turno disponible: {formatShort(next.date)} · {next.time}
              </button>
            )}
            {!next && <p className="mt-3 font-medium text-graphite">Por ahora no hay turnos disponibles para este especialista.</p>}
          </div>
        )}
        {date && slots.length === 0 && (
          <p className="mt-4 text-[0.95rem] text-brown/75">No quedan horarios para este día. Probá con otro.</p>
        )}
        {date && morning.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-taupe">Mañana</p>
            <div className="flex flex-wrap gap-2">{morning.map((t) => <Chip key={t} t={t} />)}</div>
          </div>
        )}
        {date && afternoon.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-taupe">Tarde</p>
            <div className="flex flex-wrap gap-2">{afternoon.map((t) => <Chip key={t} t={t} />)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
