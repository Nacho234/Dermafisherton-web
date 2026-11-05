import { useState } from "react";
import { Modal } from "./parts";
import SlotPicker from "../booking/SlotPicker";
import { useBooking, bookingApi } from "../../booking/store";
import { formatLong } from "../../booking/dates";

const fieldBase =
  "min-h-[46px] w-full rounded-2xl border border-cream bg-surface-pure px-4 py-3 text-[0.95rem] text-brown placeholder:text-taupe/70 " +
  "transition-all duration-300 focus:border-sage-deep focus:outline-none focus:ring-4 focus:ring-sage/20";

// Reprogramar un turno existente
export function RescheduleModal({ appt, onClose }) {
  const st = useBooking();
  const [specialistId, setSpecialistId] = useState(appt.specialistId);
  const [slot, setSlot] = useState(null);
  const [error, setError] = useState("");
  const active = st.specialists.filter((s) => s.active);

  const save = () => {
    const res = bookingApi.reschedule(appt.id, { specialistId, date: slot.date, time: slot.time });
    if (!res.ok) return setError(res.error);
    onClose();
  };

  return (
    <Modal open onClose={onClose} title="Reprogramar turno" wide>
      <p className="mb-4 text-[0.95rem] text-brown/75">
        {appt.patient.name} · actualmente {formatLong(appt.date)} a las {appt.time} hs.
      </p>
      <label htmlFor="rs-spec" className="mb-2 block text-sm font-medium text-graphite">Especialista</label>
      <select
        id="rs-spec"
        value={specialistId}
        onChange={(e) => {
          setSpecialistId(e.target.value);
          setSlot(null);
        }}
        className={`${fieldBase} mb-6 sm:max-w-sm`}
      >
        {active.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      <SlotPicker
        key={specialistId}
        specialistId={specialistId}
        visitTypeId={appt.visitTypeId}
        value={slot}
        onChange={setSlot}
        excludeId={appt.id}
      />
      {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-7 flex justify-end gap-3">
        <button type="button" onClick={onClose} className="rounded-full border border-cream px-6 py-3 text-sm font-semibold text-brown hover:bg-cream/40">
          Cancelar
        </button>
        <button
          type="button"
          disabled={!slot?.time}
          onClick={save}
          className="rounded-full bg-graphite px-6 py-3 text-sm font-semibold text-warm-white hover:bg-brown disabled:cursor-not-allowed disabled:opacity-45"
        >
          Guardar cambio
        </button>
      </div>
    </Modal>
  );
}

// Cargar un turno a mano (por ejemplo, el paciente llamó por teléfono)
export function NewAppointmentModal({ onClose, defaultSpecialistId }) {
  const st = useBooking();
  const active = st.specialists.filter((s) => s.active);
  const [specialistId, setSpecialistId] = useState(defaultSpecialistId || active[0]?.id);
  const [visitTypeId, setVisitTypeId] = useState("primera-consulta");
  const [slot, setSlot] = useState(null);
  const [p, setP] = useState({ name: "", phone: "", notes: "" });
  const [error, setError] = useState("");

  const save = () => {
    if (!p.name.trim() || !p.phone.trim()) return setError("Completá nombre y teléfono del paciente.");
    const res = bookingApi.createAppointment({
      specialistId,
      visitTypeId,
      date: slot.date,
      time: slot.time,
      status: "confirmado",
      source: "panel",
      patient: { name: p.name.trim(), phone: p.phone.trim(), email: "", interest: "", notes: p.notes.trim() },
    });
    if (!res.ok) return setError(res.error);
    onClose();
  };

  return (
    <Modal open onClose={onClose} title="Nuevo turno" wide>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nw-spec" className="mb-2 block text-sm font-medium text-graphite">Especialista</label>
          <select
            id="nw-spec"
            value={specialistId}
            onChange={(e) => {
              setSpecialistId(e.target.value);
              setSlot(null);
            }}
            className={fieldBase}
          >
            {active.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="nw-vt" className="mb-2 block text-sm font-medium text-graphite">Motivo</label>
          <select
            id="nw-vt"
            value={visitTypeId}
            onChange={(e) => {
              setVisitTypeId(e.target.value);
              setSlot(null);
            }}
            className={fieldBase}
          >
            {st.visitTypes.map((v) => (
              <option key={v.id} value={v.id}>{v.title} ({v.durationMin} min)</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-6">
        <SlotPicker key={specialistId + visitTypeId} specialistId={specialistId} visitTypeId={visitTypeId} value={slot} onChange={setSlot} />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nw-name" className="mb-2 block text-sm font-medium text-graphite">Paciente</label>
          <input id="nw-name" value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} className={fieldBase} placeholder="Nombre y apellido" />
        </div>
        <div>
          <label htmlFor="nw-phone" className="mb-2 block text-sm font-medium text-graphite">Teléfono</label>
          <input id="nw-phone" value={p.phone} onChange={(e) => setP({ ...p, phone: e.target.value })} className={`${fieldBase} tabular-nums`} placeholder="341 555 5555" />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="nw-notes" className="mb-2 block text-sm font-medium text-graphite">Nota (opcional)</label>
        <input id="nw-notes" value={p.notes} onChange={(e) => setP({ ...p, notes: e.target.value })} className={fieldBase} placeholder="Ej. llamó por teléfono" />
      </div>
      {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-7 flex justify-end gap-3">
        <button type="button" onClick={onClose} className="rounded-full border border-cream px-6 py-3 text-sm font-semibold text-brown hover:bg-cream/40">
          Cancelar
        </button>
        <button
          type="button"
          disabled={!slot?.time}
          onClick={save}
          className="rounded-full bg-graphite px-6 py-3 text-sm font-semibold text-warm-white hover:bg-brown disabled:cursor-not-allowed disabled:opacity-45"
        >
          Crear turno confirmado
        </button>
      </div>
    </Modal>
  );
}
