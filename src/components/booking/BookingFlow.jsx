import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CheckCircle,
  Check,
  CalendarPlus,
  WhatsappLogo,
  ArrowRight,
  ArrowLeft,
  Clock,
  UserCircle,
  Stethoscope,
  CalendarBlank,
  CircleNotch,
} from "@phosphor-icons/react";
import { team } from "../../data/team";
import { featured } from "../../data/treatments";
import { site, waLink } from "../../data/site";
import { useBooking, bookingApi } from "../../booking/store";
import { getVisitType, getSpecialist, nextAvailable } from "../../booking/availability";
import { buildICS, downloadFile, formatLong, formatShort } from "../../booking/dates";
import SlotPicker from "./SlotPicker";

const STEPS = ["Especialista", "Motivo", "Fecha y hora", "Tus datos"];

const fieldBase =
  "min-h-[48px] w-full rounded-2xl border bg-surface-pure px-4 py-3.5 text-base text-brown placeholder:text-taupe/70 " +
  "transition-all duration-300 focus:outline-none focus:border-sage-deep focus:ring-4 focus:ring-sage/20";

export const photoOf = (id) => team.find((t) => t.slug === id);

function Avatar({ id, size = 56 }) {
  const m = photoOf(id);
  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden rounded-full border border-cream bg-cream/40"
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
        <UserCircle size={size * 0.6} weight="light" className="text-taupe" />
      )}
    </span>
  );
}

function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-graphite">
      {children}
      {required && <span className="ml-1 text-sage-deep">*</span>}
    </label>
  );
}

export default function BookingFlow() {
  const st = useBooking();
  const reduce = useReducedMotion();
  const headingRef = useRef(null);

  const [step, setStep] = useState(0); // 0..3, 4 = confirmación
  const [specialistId, setSpecialistId] = useState(null);
  const [visitTypeId, setVisitTypeId] = useState("primera-consulta");
  const [slot, setSlot] = useState(null); // { date, time }
  const [patient, setPatient] = useState({ name: "", phone: "", email: "", interest: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [done, setDone] = useState(null);

  // Al cambiar de paso, el foco va al título (accesibilidad) sin saltar la pantalla
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const specialist = specialistId ? getSpecialist(st, specialistId) : null;
  const visitType = getVisitType(st, visitTypeId);
  const activeSpecialists = st.specialists.filter((s) => s.active);

  const setP = (k) => (e) => {
    setPatient((p) => ({ ...p, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!patient.name.trim()) e.name = "Contanos tu nombre.";
    if (!patient.phone.trim()) e.phone = "Dejanos un teléfono de contacto.";
    else if (patient.phone.replace(/\D/g, "").length < 6) e.phone = "Ingresá un teléfono válido.";
    if (patient.email.trim() && !/^\S+@\S+\.\S+$/.test(patient.email.trim())) e.email = "Revisá el email.";
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById("bk-" + Object.keys(e)[0])?.focus();
      return;
    }
    setSending(true);
    setFormError("");
    // pequeña pausa para que se sienta el envío (en el futuro: llamada al backend)
    setTimeout(() => {
      const res = bookingApi.createAppointment({
        specialistId,
        visitTypeId,
        date: slot.date,
        time: slot.time,
        patient: {
          name: patient.name.trim(),
          phone: patient.phone.trim(),
          email: patient.email.trim(),
          interest: patient.interest,
          notes: patient.notes.trim(),
        },
      });
      setSending(false);
      if (!res.ok) {
        setFormError(res.error);
        setSlot(null);
        setStep(2);
        return;
      }
      setDone(res.appointment);
      setStep(4);
    }, 700);
  };

  const reset = () => {
    setStep(0);
    setSpecialistId(null);
    setVisitTypeId("primera-consulta");
    setSlot(null);
    setPatient({ name: "", phone: "", email: "", interest: "", notes: "" });
    setErrors({});
    setDone(null);
    setFormError("");
  };

  const goTo = (i) => {
    if (i < step) setStep(i);
  };

  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, x: 18 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -18 },
        transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
      };

  // ---------------------------------------------------------- confirmación
  if (step === 4 && done) {
    const sp = getSpecialist(st, done.specialistId);
    const vt = getVisitType(st, done.visitTypeId);
    const ics = () =>
      downloadFile(
        `turno-dermafisherton-${done.date}.ics`,
        buildICS({
          title: "Turno en Dermafisherton (pendiente de confirmación)",
          date: done.date,
          time: done.time,
          durationMin: done.durationMin,
          location: site.address,
          description: `${vt.title} con ${sp?.name}. Código ${done.code}. La clínica confirma el turno.`,
        }),
        "text/calendar"
      );
    const wa = waLink(
      `Hola, soy ${done.patient.name}. Acabo de solicitar un turno en la web (código ${done.code}) con ${sp?.name} para el ${formatLong(
        done.date
      )} a las ${done.time}.`
    );
    return (
      <motion.div {...(reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } })} className="bezel-shell" role="status">
        <div className="bezel-core bg-surface-pure px-6 py-12 md:px-12 md:py-16">
          <div className="mx-auto flex max-w-xl flex-col items-center text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-sage/30 bg-sage/20 text-sage-deep">
              <CheckCircle size={34} weight="light" />
            </span>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="mt-6 font-display text-3xl text-graphite outline-none md:text-4xl"
            >
              Recibimos tu solicitud
            </h2>
            <p className="mt-3 leading-relaxed text-brown/75">
              Tu turno queda <strong className="font-semibold text-graphite">pendiente de confirmación</strong>. La
              clínica lo revisa y te avisa para confirmarlo.
            </p>

            <div className="mt-8 w-full rounded-3xl border border-cream bg-cream/25 p-6 text-left">
              <div className="flex items-center gap-4">
                <Avatar id={done.specialistId} size={52} />
                <div>
                  <p className="font-display text-xl text-graphite">{sp?.name}</p>
                  <p className="text-sm text-brown/70">{sp?.role}</p>
                </div>
              </div>
              <dl className="mt-5 grid gap-3 text-[0.95rem] sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-taupe">Día</dt>
                  <dd className="mt-0.5 text-graphite">{formatLong(done.date).replace(/^./, (c) => c.toUpperCase())}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-taupe">Hora</dt>
                  <dd className="mt-0.5 tabular-nums text-graphite">{done.time} hs</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-taupe">Motivo</dt>
                  <dd className="mt-0.5 text-graphite">{vt.title}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-taupe">Código de referencia</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums tracking-wider text-graphite">{done.code}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={ics}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brown/20 bg-white px-6 py-3.5 text-[0.95rem] font-medium text-brown transition-colors hover:border-brown/50 hover:bg-cream/30"
              >
                <CalendarPlus size={18} /> Agregar a mi calendario
              </button>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sage-deep px-6 py-3.5 text-[0.95rem] font-medium text-warm-white transition-colors hover:bg-[#6e8265]"
              >
                <WhatsappLogo size={18} weight="fill" /> Avisar por WhatsApp
              </a>
            </div>
            <button
              type="button"
              onClick={reset}
              className="mt-6 text-sm font-semibold text-sage-deep underline-offset-4 hover:underline"
            >
              Reservar otro turno
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ---------------------------------------------------------------- pasos
  return (
    <div className="bezel-shell">
      <div className="bezel-core bg-surface-pure p-6 md:p-10">
        {/* Indicador de pasos */}
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-3" aria-label="Pasos para reservar">
          {STEPS.map((label, i) => {
            const isDone = i < step;
            const on = i === step;
            return (
              <li key={label} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  disabled={!isDone}
                  aria-current={on ? "step" : undefined}
                  className="group flex items-center gap-2.5 disabled:cursor-default"
                >
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full border text-sm font-semibold transition-colors duration-300 ${
                      isDone
                        ? "border-sage-deep bg-sage-deep text-white"
                        : on
                          ? "border-sage-deep bg-sage/15 text-sage-deep ring-4 ring-sage/20"
                          : "border-cream bg-surface-pure text-taupe"
                    }`}
                  >
                    {isDone ? <Check size={14} weight="bold" /> : i + 1}
                  </span>
                  <span
                    className={`text-sm font-medium transition-colors ${
                      on ? "text-graphite" : isDone ? "text-brown group-hover:text-graphite" : "text-brown/50"
                    } ${on ? "" : "hidden sm:inline"}`}
                  >
                    {label}
                  </span>
                </button>
                {i < STEPS.length - 1 && <span aria-hidden className="mx-1 hidden h-px w-6 bg-cream sm:block md:w-10" />}
              </li>
            );
          })}
        </ol>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={step} {...anim}>
                {/* ------------------------------ 1. especialista */}
                {step === 0 && (
                  <section>
                    <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl text-graphite outline-none md:text-3xl">
                      ¿Con quién querés atenderte?
                    </h2>
                    <p className="mt-2 text-brown/75">Elegí al especialista. Te mostramos su próximo turno libre.</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {activeSpecialists.map((s) => {
                        const next = nextAvailable(st, s.id, visitTypeId);
                        const selected = specialistId === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            disabled={!next}
                            aria-pressed={selected}
                            onClick={() => {
                              setSpecialistId(s.id);
                              setSlot(null);
                              setStep(1);
                            }}
                            className={`group flex items-center gap-4 rounded-3xl border p-4 text-left transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-55 ${
                              selected
                                ? "border-sage-deep bg-sage/10"
                                : "border-cream bg-surface-pure hover:-translate-y-0.5 hover:border-sage/50 hover:shadow-soft"
                            }`}
                          >
                            <Avatar id={s.id} />
                            <span className="min-w-0 flex-1">
                              <span className="block font-display text-lg leading-tight text-graphite">{s.name}</span>
                              <span className="block text-sm text-brown/70">{s.role}</span>
                              <span className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-sage-deep">
                                <Clock size={13} weight="bold" />
                                {next ? `Próximo: ${formatShort(next.date)} · ${next.time}` : "Sin turnos disponibles"}
                              </span>
                            </span>
                            <ArrowRight
                              size={16}
                              weight="bold"
                              className="shrink-0 text-taupe transition-transform duration-300 group-hover:translate-x-0.5"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* ------------------------------ 2. motivo */}
                {step === 1 && (
                  <section>
                    <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl text-graphite outline-none md:text-3xl">
                      ¿Qué tipo de consulta necesitás?
                    </h2>
                    <p className="mt-2 text-brown/75">La duración del turno depende del motivo.</p>
                    <div className="mt-6 grid gap-3" role="radiogroup" aria-label="Tipo de consulta">
                      {st.visitTypes.map((v) => {
                        const selected = visitTypeId === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => {
                              setVisitTypeId(v.id);
                              setSlot(null);
                            }}
                            className={`flex items-center gap-4 rounded-3xl border p-5 text-left transition-all duration-300 ${
                              selected
                                ? "border-sage-deep bg-sage/10"
                                : "border-cream bg-surface-pure hover:border-sage/50 hover:shadow-soft"
                            }`}
                          >
                            <span
                              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                                selected ? "border-sage-deep" : "border-taupe/50"
                              }`}
                            >
                              {selected && <span className="h-2.5 w-2.5 rounded-full bg-sage-deep" />}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-display text-xl text-graphite">{v.title}</span>
                              <span className="block text-sm text-brown/70">{v.blurb}</span>
                            </span>
                            <span className="shrink-0 rounded-full border border-cream bg-cream/30 px-3 py-1 text-xs font-semibold tabular-nums text-brown">
                              {v.durationMin} min
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                      <button type="button" onClick={() => setStep(0)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brown hover:text-graphite">
                        <ArrowLeft size={14} weight="bold" /> Volver
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 rounded-full bg-graphite px-7 py-3.5 font-medium text-warm-white transition-colors hover:bg-brown"
                      >
                        Continuar <ArrowRight size={16} weight="bold" />
                      </button>
                    </div>
                  </section>
                )}

                {/* ------------------------------ 3. fecha y hora */}
                {step === 2 && (
                  <section>
                    <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl text-graphite outline-none md:text-3xl">
                      Elegí el día y el horario
                    </h2>
                    <p className="mt-2 text-brown/75">
                      Los días en gris no tienen turnos disponibles para {specialist?.name}.
                    </p>
                    {formError && (
                      <p role="alert" className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {formError}
                      </p>
                    )}
                    <div className="mt-6">
                      <SlotPicker specialistId={specialistId} visitTypeId={visitTypeId} value={slot} onChange={setSlot} />
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                      <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brown hover:text-graphite">
                        <ArrowLeft size={14} weight="bold" /> Volver
                      </button>
                      <button
                        type="button"
                        disabled={!slot?.time}
                        onClick={() => {
                          setFormError("");
                          setStep(3);
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-graphite px-7 py-3.5 font-medium text-warm-white transition-colors hover:bg-brown disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        Continuar <ArrowRight size={16} weight="bold" />
                      </button>
                    </div>
                  </section>
                )}

                {/* ------------------------------ 4. datos */}
                {step === 3 && (
                  <section>
                    <h2 ref={headingRef} tabIndex={-1} className="font-display text-2xl text-graphite outline-none md:text-3xl">
                      Tus datos de contacto
                    </h2>
                    <p className="mt-2 text-brown/75">Los usamos solo para confirmar tu turno.</p>
                    <form onSubmit={submit} noValidate className="mt-6">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="bk-name" required>Nombre y apellido</Label>
                          <input
                            id="bk-name"
                            value={patient.name}
                            onChange={setP("name")}
                            autoComplete="name"
                            aria-invalid={!!errors.name}
                            className={`${fieldBase} ${errors.name ? "border-red-400" : "border-cream"}`}
                            placeholder="Tu nombre completo"
                          />
                          {errors.name && <p role="alert" className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
                        </div>
                        <div>
                          <Label htmlFor="bk-phone" required>Teléfono</Label>
                          <input
                            id="bk-phone"
                            type="tel"
                            inputMode="tel"
                            value={patient.phone}
                            onChange={setP("phone")}
                            autoComplete="tel"
                            aria-invalid={!!errors.phone}
                            className={`${fieldBase} tabular-nums ${errors.phone ? "border-red-400" : "border-cream"}`}
                            placeholder="Ej. 341 555 5555"
                          />
                          {errors.phone && <p role="alert" className="mt-1.5 text-sm text-red-600">{errors.phone}</p>}
                        </div>
                      </div>
                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="bk-email">Email (opcional)</Label>
                          <input
                            id="bk-email"
                            type="email"
                            value={patient.email}
                            onChange={setP("email")}
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                            className={`${fieldBase} ${errors.email ? "border-red-400" : "border-cream"}`}
                            placeholder="tu@email.com"
                          />
                          {errors.email && <p role="alert" className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
                        </div>
                        <div>
                          <Label htmlFor="bk-interest">Tratamiento de interés (opcional)</Label>
                          <select id="bk-interest" value={patient.interest} onChange={setP("interest")} className={`${fieldBase} border-cream`}>
                            <option value="">Seleccionar</option>
                            {featured.map((t) => (
                              <option key={t.slug} value={t.title}>{t.title}</option>
                            ))}
                            <option value="Evaluación general">Evaluación general</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-5">
                        <Label htmlFor="bk-notes">Algo que quieras contarnos (opcional)</Label>
                        <textarea
                          id="bk-notes"
                          rows={3}
                          value={patient.notes}
                          onChange={setP("notes")}
                          className={`${fieldBase} resize-none border-cream`}
                          placeholder="Contanos qué querés mejorar o consultar."
                        />
                      </div>

                      <div className="mt-8 flex items-center justify-between gap-4">
                        <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brown hover:text-graphite">
                          <ArrowLeft size={14} weight="bold" /> Volver
                        </button>
                        <button
                          type="submit"
                          disabled={sending}
                          className="inline-flex items-center gap-2.5 rounded-full bg-graphite px-7 py-3.5 font-medium text-warm-white transition-colors hover:bg-brown disabled:opacity-70"
                        >
                          {sending ? (
                            <>
                              <CircleNotch size={18} className="animate-spin" /> Enviando…
                            </>
                          ) : (
                            <>
                              Solicitar turno <ArrowRight size={16} weight="bold" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </section>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Resumen del turno */}
          <aside className="lg:col-span-4" aria-label="Resumen de tu turno">
            <div className="rounded-3xl border border-cream bg-cream/25 p-6 lg:sticky lg:top-28">
              <h3 className="font-display text-xl text-graphite">Tu turno</h3>
              <ul className="mt-5 space-y-4 text-[0.95rem]">
                <li className="flex items-start gap-3">
                  <Stethoscope size={19} weight="light" className="mt-0.5 shrink-0 text-sage-deep" />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-taupe">Especialista</span>
                    <span className="text-graphite">{specialist ? specialist.name : <em className="not-italic text-brown/50">Sin elegir</em>}</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <UserCircle size={19} weight="light" className="mt-0.5 shrink-0 text-sage-deep" />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-taupe">Motivo</span>
                    <span className="text-graphite">
                      {step >= 1 ? `${visitType.title} · ${visitType.durationMin} min` : <em className="not-italic text-brown/50">Sin elegir</em>}
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CalendarBlank size={19} weight="light" className="mt-0.5 shrink-0 text-sage-deep" />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-taupe">Fecha y hora</span>
                    <span className="text-graphite">
                      {slot?.time ? (
                        <>
                          {formatLong(slot.date).replace(/^./, (c) => c.toUpperCase())}
                          <br />
                          <span className="tabular-nums">{slot.time} hs</span>
                        </>
                      ) : (
                        <em className="not-italic text-brown/50">Sin elegir</em>
                      )}
                    </span>
                  </span>
                </li>
              </ul>
              <p className="mt-6 border-t border-cream pt-4 text-xs leading-relaxed text-brown/65">
                El turno queda pendiente hasta que la clínica lo confirme. Te avisamos por teléfono o WhatsApp.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
