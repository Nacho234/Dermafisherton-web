import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, WhatsappLogo, CircleNotch } from "@phosphor-icons/react";
import { site } from "../data/site";
import { featured } from "../data/treatments";

const fieldBase =
  "w-full rounded-2xl border bg-warm-white px-4 py-3.5 text-brown placeholder:text-taupe/60 " +
  "transition-colors duration-200 focus:outline-none focus:border-sage-deep";

function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-brown">
      {children}
      {required && <span className="ml-0.5 text-sage-deep">*</span>}
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

    // Simulamos el envío y abrimos WhatsApp con el mensaje prellenado.
    setTimeout(() => {
      setStatus("success");
      window.open(
        `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener"
      );
    }, 700);
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        role="status"
        className="flex flex-col items-center rounded-3xl border border-cream bg-cream-soft/50 px-8 py-14 text-center"
      >
        <span className="grid h-16 w-16 place-items-center rounded-full bg-sage/25 text-sage-deep">
          <CheckCircle size={34} weight="light" />
        </span>
        <h3 className="mt-6 font-display text-2xl text-graphite">
          ¡Gracias por escribirnos!
        </h3>
        <p className="mt-3 max-w-sm text-brown/70">
          Abrimos WhatsApp con tu consulta lista para enviar. Si no se abrió,
          escribinos directamente y coordinamos tu evaluación.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setValues({ nombre: "", telefono: "", tratamiento: "", mensaje: "" });
          }}
          className="mt-6 text-sm font-semibold text-sage-deep hover:text-brown"
        >
          Enviar otra consulta
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-cream bg-warm-white p-7 shadow-soft md:p-9"
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
            placeholder="Tu nombre"
          />
          <AnimatePresence>
            {errors.nombre && (
              <motion.p
                id="nombre-error"
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1.5 text-sm text-red-500"
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
            className={`${fieldBase} ${errors.telefono ? "border-red-400" : "border-cream"}`}
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
                className="mt-1.5 text-sm text-red-500"
              >
                {errors.telefono}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="tratamiento">Tratamiento de interés</Label>
        <select
          id="tratamiento"
          name="tratamiento"
          value={values.tratamiento}
          onChange={setField("tratamiento")}
          className={`${fieldBase} border-cream appearance-none`}
        >
          <option value="">Seleccionar (opcional)</option>
          {featured.map((t) => (
            <option key={t.slug} value={t.title}>
              {t.title}
            </option>
          ))}
          <option value="Otra consulta">Otra consulta</option>
        </select>
      </div>

      <div className="mt-5">
        <Label htmlFor="mensaje">Mensaje</Label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          value={values.mensaje}
          onChange={setField("mensaje")}
          className={`${fieldBase} border-cream resize-none`}
          placeholder="Contanos qué querés mejorar o consultar."
        />
        <p className="mt-2 text-xs text-taupe">
          Al enviar, abrimos WhatsApp con tu consulta lista para coordinar.
        </p>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-graphite px-8 py-4 font-medium text-warm-white shadow-soft transition-all duration-300 hover:bg-brown hover:shadow-lift active:translate-y-px disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <CircleNotch size={20} className="animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            <WhatsappLogo size={20} weight="fill" />
            Enviar consulta
          </>
        )}
      </button>
    </form>
  );
}
