import { useEffect, useRef, useState } from "react";
import {
  Check,
  X,
  ArrowsClockwise,
  WhatsappLogo,
  Phone,
  EnvelopeSimple,
  Trash,
  CheckCircle,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";
import { team } from "../../data/team";
import { site } from "../../data/site";
import { bookingApi, useBooking } from "../../booking/store";
import { getSpecialist, getVisitType } from "../../booking/availability";
import { formatLong, formatShort, waPhone } from "../../booking/dates";

export const STATUS = {
  pendiente: { label: "Pendiente", cls: "bg-[#f6e9c8] text-[#7a5a1a]" },
  confirmado: { label: "Confirmado", cls: "bg-sage/25 text-[#4b6143]" },
  cancelado: { label: "Cancelado", cls: "bg-red-100 text-red-700" },
  completado: { label: "Completado", cls: "bg-cream text-brown" },
};

export function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.pendiente;
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${s.cls}`}>{s.label}</span>
  );
}

export function SpecialistAvatar({ id, size = 36 }) {
  const m = team.find((t) => t.slug === id);
  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden rounded-full border border-cream bg-cream/40 text-xs font-semibold text-taupe"
      style={{ width: size, height: size }}
    >
      {m ? (
        <img
          src={m.photo}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: m.focus?.pos || "50% 20%", transform: `scale(${(m.focus?.zoom || 100) / 100})` }}
        />
      ) : (
        "?"
      )}
    </span>
  );
}

// Ventana modal simple: Escape o clic afuera la cierra
export function Modal({ open, onClose, title, children, wide = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    ref.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-graphite/45 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`bezel-shell my-8 w-full outline-none ${wide ? "max-w-3xl" : "max-w-lg"}`}
      >
        <div className="bezel-core bg-surface-pure p-6 md:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <h2 className="font-display text-2xl text-graphite">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream text-brown transition-colors hover:bg-cream/40"
            >
              <X size={16} weight="bold" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

// Botón de acción chico del panel
export function ActBtn({ onClick, icon: Icon, children, tone = "default", title }) {
  const tones = {
    default: "border-cream bg-surface-pure text-brown hover:border-sage/50 hover:bg-sage/10",
    primary: "border-sage-deep bg-sage-deep text-white hover:bg-[#6e8265]",
    danger: "border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[0.82rem] font-semibold transition-colors ${tones[tone]}`}
    >
      {Icon && <Icon size={15} weight="bold" />}
      {children}
    </button>
  );
}

// Tarjeta de un turno con sus acciones
export function ApptCard({ a, onReschedule, showDate = false }) {
  const st = useBooking();
  const sp = getSpecialist(st, a.specialistId);
  const vt = getVisitType(st, a.visitTypeId);
  const [confirming, setConfirming] = useState(null); // "cancel" | "delete"

  const waMsg = (() => {
    const when = `${formatLong(a.date)} a las ${a.time} hs`;
    if (a.status === "cancelado")
      return `Hola ${a.patient.name}, te escribimos de Dermafisherton. Lamentablemente tuvimos que cancelar tu turno del ${when}. Si querés, coordinamos otro horario.`;
    if (a.status === "confirmado")
      return `Hola ${a.patient.name}, te confirmamos tu turno en Dermafisherton con ${sp?.name} el ${when}. Dirección: ${site.address}. ¡Te esperamos!`;
    return `Hola ${a.patient.name}, te escribimos de Dermafisherton por tu solicitud de turno con ${sp?.name} para el ${when}.`;
  })();
  const waHref = `https://wa.me/${waPhone(a.patient.phone)}?text=${encodeURIComponent(waMsg)}`;

  const past = a.status === "completado" || a.status === "cancelado";

  return (
    <article className={`rounded-3xl border border-cream bg-surface-pure p-5 shadow-ambient ${past ? "opacity-85" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <div className="shrink-0 text-center">
            <p className="font-display text-2xl leading-none tabular-nums text-graphite">{a.time}</p>
            <p className="mt-1 text-xs tabular-nums text-taupe">{a.durationMin} min</p>
          </div>
          <div className="min-w-0">
            <p className="font-display text-xl leading-tight text-graphite">{a.patient.name}</p>
            <p className="mt-0.5 text-sm text-brown/75">
              {showDate && <span className="font-medium text-graphite">{formatShort(a.date)} · </span>}
              {vt?.title}
              {a.patient.interest ? ` · ${a.patient.interest}` : ""}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.82rem] text-brown/80">
              <span className="inline-flex items-center gap-1.5">
                <SpecialistAvatar id={a.specialistId} size={22} /> {sp?.name}
              </span>
              <a href={`tel:${a.patient.phone}`} className="inline-flex items-center gap-1.5 tabular-nums hover:text-graphite">
                <Phone size={14} /> {a.patient.phone}
              </a>
              {a.patient.email && (
                <a href={`mailto:${a.patient.email}`} className="inline-flex items-center gap-1.5 hover:text-graphite">
                  <EnvelopeSimple size={14} /> {a.patient.email}
                </a>
              )}
              <span className="tabular-nums text-taupe">{a.code}</span>
            </div>
            {a.patient.notes && (
              <p className="mt-2.5 max-w-xl rounded-xl bg-cream/30 px-3 py-2 text-[0.85rem] leading-relaxed text-brown/80">
                “{a.patient.notes}”
              </p>
            )}
          </div>
        </div>
        <StatusBadge status={a.status} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-cream/70 pt-4">
        {a.status === "pendiente" && (
          <ActBtn tone="primary" icon={Check} onClick={() => bookingApi.setStatus(a.id, "confirmado")}>
            Confirmar
          </ActBtn>
        )}
        {a.status === "confirmado" && (
          <ActBtn tone="primary" icon={CheckCircle} onClick={() => bookingApi.setStatus(a.id, "completado")}>
            Marcar atendido
          </ActBtn>
        )}
        {(a.status === "pendiente" || a.status === "confirmado" || a.status === "cancelado") && (
          <ActBtn icon={ArrowsClockwise} onClick={() => onReschedule(a)}>
            Reprogramar
          </ActBtn>
        )}
        {a.status === "cancelado" && (
          <ActBtn icon={ArrowCounterClockwise} onClick={() => bookingApi.setStatus(a.id, "pendiente")}>
            Reactivar
          </ActBtn>
        )}
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-cream bg-surface-pure px-3.5 py-2 text-[0.82rem] font-semibold text-brown transition-colors hover:border-sage/50 hover:bg-sage/10"
        >
          <WhatsappLogo size={15} weight="fill" className="text-sage-deep" /> Escribir
        </a>

        <span className="ml-auto flex items-center gap-2">
          {confirming ? (
            <>
              <span className="text-[0.82rem] text-brown/80">
                {confirming === "cancel" ? "¿Cancelar el turno?" : "¿Eliminar definitivamente?"}
              </span>
              <ActBtn
                tone="danger"
                onClick={() => {
                  if (confirming === "cancel") bookingApi.setStatus(a.id, "cancelado");
                  else bookingApi.removeAppointment(a.id);
                  setConfirming(null);
                }}
              >
                Sí
              </ActBtn>
              <ActBtn onClick={() => setConfirming(null)}>No</ActBtn>
            </>
          ) : (
            <>
              {(a.status === "pendiente" || a.status === "confirmado") && (
                <ActBtn tone="danger" icon={X} onClick={() => setConfirming("cancel")}>
                  Cancelar
                </ActBtn>
              )}
              {(a.status === "cancelado" || a.status === "completado") && (
                <ActBtn tone="danger" icon={Trash} onClick={() => setConfirming("delete")}>
                  Eliminar
                </ActBtn>
              )}
            </>
          )}
        </span>
      </div>
    </article>
  );
}

export function EmptyState({ title, text }) {
  return (
    <div className="rounded-3xl border border-dashed border-cream bg-cream/20 px-6 py-10 text-center">
      <p className="font-display text-xl text-graphite">{title}</p>
      {text && <p className="mx-auto mt-1.5 max-w-sm text-sm text-brown/70">{text}</p>}
    </div>
  );
}

export const sortAppts = (list) =>
  [...list].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
