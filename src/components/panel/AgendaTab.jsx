import { useMemo, useState } from "react";
import { Plus } from "@phosphor-icons/react";
import Calendar from "../booking/Calendar";
import { useBooking } from "../../booking/store";
import { todayISO, formatLong, cap1 } from "../../booking/dates";
import { ApptCard, EmptyState, sortAppts } from "./parts";
import { RescheduleModal, NewAppointmentModal } from "./Modals";

const fieldBase =
  "min-h-[44px] rounded-2xl border border-cream bg-surface-pure px-4 py-2.5 text-[0.92rem] text-brown focus:border-sage-deep focus:outline-none focus:ring-4 focus:ring-sage/20";

export default function AgendaTab() {
  const st = useBooking();
  const [date, setDate] = useState(todayISO());
  const [spec, setSpec] = useState("");
  const [resched, setResched] = useState(null);
  const [creating, setCreating] = useState(false);

  const live = st.appointments.filter(
    (a) => (a.status === "pendiente" || a.status === "confirmado") && (!spec || a.specialistId === spec)
  );
  const badges = useMemo(() => {
    const m = {};
    live.forEach((a) => (m[a.date] = (m[a.date] || 0) + 1));
    return m;
  }, [live]);

  const day = sortAppts(st.appointments.filter((a) => a.date === date && (!spec || a.specialistId === spec)));

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="rounded-3xl border border-cream bg-surface-pure p-5 shadow-ambient lg:sticky lg:top-24">
          <Calendar value={date} onChange={setDate} allowPast badges={badges} />
          <label htmlFor="ag-spec" className="mb-2 mt-5 block text-sm font-medium text-graphite">Especialista</label>
          <select id="ag-spec" value={spec} onChange={(e) => setSpec(e.target.value)} className={`${fieldBase} w-full`}>
            <option value="">Todos</option>
            {st.specialists.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <p className="mt-4 text-xs leading-relaxed text-brown/65">El número en cada día es la cantidad de turnos pendientes o confirmados.</p>
        </div>
      </div>

      <div className="lg:col-span-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl text-graphite">{cap1(formatLong(date))}</h2>
            <p className="text-sm text-brown/70">{day.length} {day.length === 1 ? "turno" : "turnos"}</p>
          </div>
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-full bg-graphite px-5 py-3 text-sm font-semibold text-warm-white transition-colors hover:bg-brown"
          >
            <Plus size={16} weight="bold" /> Nuevo turno
          </button>
        </div>
        <div className="mt-5 grid gap-4">
          {day.length === 0 ? (
            <EmptyState title="Día libre" text="No hay turnos cargados para esta fecha." />
          ) : (
            day.map((a) => <ApptCard key={a.id} a={a} onReschedule={setResched} />)
          )}
        </div>
      </div>

      {resched && <RescheduleModal appt={resched} onClose={() => setResched(null)} />}
      {creating && <NewAppointmentModal defaultSpecialistId={spec || undefined} onClose={() => setCreating(false)} />}
    </div>
  );
}
