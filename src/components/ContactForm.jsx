import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, WhatsappLogo, CircleNotch, CaretDown, ArrowUpRight } from "@phosphor-icons/react";
import { site } from "../data/site";
import { featured } from "../data/treatments";

const fieldBase =
  "min-h-[48px] w-full rounded-2xl border bg-surface-pure px-4 py-3.5 text-base text-brown placeholder:text-taupe/70 " +
  "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus:outline-none focus:border-sage-deep focus:ring-4 focus:ring-sage/20";

function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-graphite">
      {children}
      {required && <span className="ml-1 text-sage-deep">*</span>}
    </label>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState({
    nombre: "",
    telefono: "",
    tratamiento: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const setField = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!values.nombre.trim()) e.nombre = "Contanos tu nombre.";
    if (!values.telefono.trim()) e.telefono = "Dejanos un teléfono de contacto.";
    else if (values.telefono.replace(/\D/g, "").length < 6)
      e.telefono = "Ingresá un teléfono válido.";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = document.getElementById(Object.keys(e)[0]);
      first?.focus();
      return;
    }
    setStatus("loading");

    const text =
      `Hola, soy ${values.nombre}.` +
      (values.tratamiento ? ` Me interesa: ${values.tratamiento}.` : "") +
      (values.mensaje ? ` ${values.mensaje}` : "") +
      ` Mi teléfono: ${values.telefono}.`;

    setTimeout(() => {
      setStatus("success");
      window.open(
        `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener"
      );
    }, 650);
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        role="status"
        className="bezel-shell"
      >
        <div className="bezel-core flex flex-col items-center bg-surface-pure px-8 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-sage/30 bg-sage/20 text-sage-deep">
            <CheckCircle size={34} weight="light" />
          </span>
          <h3 className="mt-6 font-display text-3xl text-graphite">
            Gracias por escribirnos
          </h3>
          <p className="mt-3 max-w-sm leading-relaxed text-brown/75">
            Abrimos WhatsApp con tu consulta lista para enviar. Si no se abrió,
            escribinos directamente y coordinamos tu evaluación.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setValues({ nombre: "", telefono: "", tratamiento: "", mensaje: "" });
            }}
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep transition-colors hover:text-brown"
          >
            Enviar otra consulta
            <ArrowUpRight size={14} weight="bold" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bezel-shell">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bezel-core bg-surface-pure p-7 md:p-9"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="nombre" required>Nombre</Label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              value={values.nombre}
              onChange={setField("nombre")}
              aria-invalid={!!errors.nombre}
              aria-describedby={errors.nombre ? "nombre-error" : undefined}
              className={`${fieldBase} ${errors.nombre ? "border-red-400" : "border-cream"}`}
              placeholder="Tu nombre completo"
            />
            <AnimatePresence>
              {errors.nombre && (
                <motion.p
                  id="nombre-error"
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1.5 text-sm text-red-600"
                >
                  {errors.nombre}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <Label htmlFor="telefono" required>Teléfono</Label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.telefono}
              onChange={setField("telefono")}
              aria-invalid={!!errors.telefono}
              aria-describedby={errors.telefono ? "telefono-error" : undefined}
              className={`${fieldBase} tabular-nums ${errors.telefono ? "border-red-400" : "border-cream"}`}
              placeholder="Ej. 341 555 5555"
            />
            <AnimatePresence>
              {errors.telefono && (
                <motion.p
                  id="telefono-error"
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1.5 text-sm text-red-600"
                >
                  {errors.telefono}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-5">
          <Label htmlFor="tratamiento">Tratamiento de interés</Label>
          <div className="relative">
            <select
              id="tratamiento"
              name="tratamiento"
              value={values.tratamiento}
              onChange={setField("tratamiento")}
              className={`${fieldBase} appearance-none border-cream pr-11`}
            >
              <option value="">Seleccionar (opcional)</option>
              {featured.map((t) => (
                <option key={t.slug} value={t.title}>
                  {t.title}
                </option>
              ))}
              <option value="Evaluación general">Evaluación general</option>
            </select>
            <CaretDown
              size={16}
              weight="bold"
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-taupe"
            />
          </div>
        </div>

        <div className="mt-5">
          <Label htmlFor="mensaje">Mensaje</Label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            value={values.mensaje}
            onChange={setField("mensaje")}
            className={`${fieldBase} resize-none border-cream`}
            placeholder="Contanos qué querés mejorar o consultar."
          />
          <p className="mt-2 text-xs text-taupe">
            Al enviar, abrimos WhatsApp con tu consulta lista para coordinar.
          </p>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="group mt-7 flex w-full items-center justify-between rounded-full bg-graphite py-2.5 pl-7 pr-2.5 font-medium text-warm-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_32px_-14px_rgba(35,31,29,0.4)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-brown hover:shadow-lift active:scale-[0.98] disabled:opacity-70"
        >
          <span className="mx-auto flex items-center gap-2.5 pl-4">
            {status === "loading" ? (
              <>
                <CircleNotch size={19} className="animate-spin" />
                Preparando consulta…
              </>
            ) : (
              <>
                <WhatsappLogo size={19} weight="fill" />
                Enviar consulta por WhatsApp
              </>
            )}
          </span>
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-pure/14 text-warm-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <ArrowUpRight size={15} weight="bold" />
          </span>
        </button>
      </form>
    </div>
  );
}
