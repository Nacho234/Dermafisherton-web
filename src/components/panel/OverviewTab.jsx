import { useState } from "react";
import { Bell, CalendarCheck, CalendarDots, Hourglass } from "@phosphor-icons/react";
import { useBooking } from "../../booking/store";
import { addDays, todayISO, formatLong, cap1 } from "../../booking/dates";
import { ApptCard, EmptyState, sortAppts } from "./parts";
import { RescheduleModal } from "./Modals";

function Stat({ icon: Icon, label, value, tone }) {
  return (
    <div className="rounded-3xl border border-cream bg-surface-pure p-4 shadow-ambient sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-taupe sm:text-xs sm:tracking-[0.14em]">{label}</span>
        <span className={`grid h-9 w-9 place-items-center rounded-full ${tone}`}>
          <Icon size={18} weight="light" />
        </span>
      </div>
      <p className="mt-3 font-display text-4xl tabular-nums text-graphite">{value}</p>
    </div>
  );
}

export default function OverviewTab() {
  const st = useBooking();
  const [resched, setResched] = useState(null);
  const today = todayISO();
  const week = addDays(today, 7);

  const pending = sortAppts(st.appointments.filter((a) => a.status === "pendiente"));
  const todays = sortAppts(st.appointments.filter((a) => a.date === today && (a.status === "pendiente" || a.status === "confirmado")));
  const next7 = st.appointments.filter((a) => a.date >= today && a.date <= week && (a.status === "pendiente" || a.status === "confirmado")).length;
  const confirmed = st.appointments.filter((a) => a.status === "confirmado" && a.date >= today).length;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat icon={Hourglass} label="Por confirmar" value={pending.length} tone="bg-[#f6e9c8] text-[#7a5a1a]" />
        <Stat icon={CalendarCheck} label="Hoy" value={todays.length} tone="bg-sage/20 text-sage-deep" />
        <Stat icon={CalendarDots} label="Próximos 7 días" value={next7} tone="bg-sage/20 text-sage-deep" />
        <Stat icon={Bell} label="Confirmados" value={confirmed} tone="bg-cream text-brown" />
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-graphite">Solicitudes por confirmar</h2>
        <p className="mt-1 text-sm text-brown/70">Los pacientes piden un horario desde el sitio; confirmalo o reprogramalo desde acá.</p>
        <div className="mt-5 grid gap-4">
          {pending.length === 0 ? (
            <EmptyState title="Todo al día" text="No hay solicitudes pendientes de confirmación." />
          ) : (
            pending.map((a) => <ApptCard key={a.id} a={a} showDate onReschedule={setResched} />)
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-graphite">Agenda de hoy</h2>
        <p className="mt-1 text-sm text-brown/70">{cap1(formatLong(today))}</p>
        <div className="mt-5 grid gap-4">
          {todays.length === 0 ? (
            <EmptyState title="Sin turnos hoy" text="Cuando haya turnos para hoy los vas a ver acá." />
          ) : (
            todays.map((a) => <ApptCard key={a.id} a={a} onReschedule={setResched} />)
          )}
        </div>
      </section>

      {resched && <RescheduleModal appt={resched} onClose={() => setResched(null)} />}
    </div>
  );
}
