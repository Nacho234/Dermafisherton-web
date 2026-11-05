import { useState } from "react";
import { DownloadSimple, MagnifyingGlass } from "@phosphor-icons/react";
import { useBooking } from "../../booking/store";
import { getSpecialist, getVisitType } from "../../booking/availability";
import { downloadFile } from "../../booking/dates";
import { ApptCard, EmptyState, STATUS } from "./parts";
import { RescheduleModal } from "./Modals";

const fieldBase =
  "min-h-[44px] rounded-2xl border border-cream bg-surface-pure px-4 py-2.5 text-[0.92rem] text-brown placeholder:text-taupe/70 focus:border-sage-deep focus:outline-none focus:ring-4 focus:ring-sage/20";

const csvCell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export default function AppointmentsTab() {
  const st = useBooking();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [spec, setSpec] = useState("");
  const [resched, setResched] = useState(null);

  const list = st.appointments
    .filter((a) => (!status || a.status === status) && (!spec || a.specialistId === spec))
    .filter((a) => {
      if (!q.trim()) return true;
      const n = q.trim().toLowerCase();
      return (
        a.patient.name.toLowerCase().includes(n) ||
        a.patient.phone.replace(/\s/g, "").includes(n.replace(/\s/g, "")) ||
        a.code.toLowerCase().includes(n)
      );
    })
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));

  const exportCsv = () => {
    const head = ["Código", "Fecha", "Hora", "Duración (min)", "Estado", "Especialista", "Motivo", "Paciente", "Teléfono", "Email", "Tratamiento de interés", "Nota"];
    const rows = list.map((a) => [
      a.code, a.date, a.time, a.durationMin, STATUS[a.status].label,
      getSpecialist(st, a.specialistId)?.name, getVisitType(st, a.visitTypeId)?.title,
      a.patient.name, a.patient.phone, a.patient.email, a.patient.interest, a.patient.notes,
    ]);
    downloadFile("turnos-dermafisherton.csv", "﻿" + [head, ...rows].map((r) => r.map(csvCell).join(",")).join("\n"), "text/csv");
  };

  return (
    <div>
      <div className="flex flex-wrap items-end gap-3">
        <div className="relative min-w-[14rem] flex-1">
          <MagnifyingGlass size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-taupe" />
          <input
            aria-label="Buscar turno"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, teléfono o código"
            className={`${fieldBase} w-full pl-10`}
          />
        </div>
        <select aria-label="Estado" value={status} onChange={(e) => setStatus(e.target.value)} className={fieldBase}>
          <option value="">Todos los estados</option>
          {Object.entries(STATUS).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
        <select aria-label="Especialista" value={spec} onChange={(e) => setSpec(e.target.value)} className={fieldBase}>
          <option value="">Todos los especialistas</option>
          {st.specialists.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={exportCsv}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-cream bg-surface-pure px-5 text-sm font-semibold text-brown transition-colors hover:border-sage/50 hover:bg-sage/10"
        >
          <DownloadSimple size={16} weight="bold" /> Exportar CSV
        </button>
      </div>

      <p className="mt-4 text-sm text-brown/70">{list.length} {list.length === 1 ? "resultado" : "resultados"}</p>
      <div className="mt-4 grid gap-4">
        {list.length === 0 ? (
          <EmptyState title="Sin resultados" text="Probá con otros filtros o con otra búsqueda." />
        ) : (
          list.map((a) => <ApptCard key={a.id} a={a} showDate onReschedule={setResched} />)
        )}
      </div>
      {resched && <RescheduleModal appt={resched} onClose={() => setResched(null)} />}
    </div>
  );
}
