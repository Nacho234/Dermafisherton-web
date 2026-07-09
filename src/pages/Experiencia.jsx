import { useState } from "react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import FAQAccordion from "../components/FAQAccordion";
import CTASection from "../components/CTASection";
import { faqs } from "../data/content";
import experienciaClip from "../assets/experiencia-clip.mp4";
import experienciaClipPoster from "../assets/experiencia-clip-poster.webp";

const steps = [
  { n: "01", title: "Nos contás qué querés mejorar", text: "Escuchamos tus inquietudes y objetivos para tu piel." },
  { n: "02", title: "Evaluamos tu piel y antecedentes", text: "Una evaluación profesional es el punto de partida de todo." },
  { n: "03", title: "Te explicamos las opciones", text: "Con claridad y sin apuros, repasamos las alternativas posibles." },
  { n: "04", title: "Definimos un plan personalizado", text: "Elegimos juntos el tratamiento más adecuado para vos." },
  { n: "05", title: "Realizamos el tratamiento", text: "Con protocolos seguros y acompañamiento en cada paso." },
  { n: "06", title: "Indicamos cuidados y seguimiento", text: "Te acompañamos después para sostener los resultados." },
];

// Acordeón de imágenes (solo PC). Reemplazar `src` por las fotos reales.
const galleryImages = [
  {
    src: "/experiencia/consulta.png",
    alt: "Consulta profesional en Dermafisherton",
    label: "Consulta",
    title: "Escuchamos y evaluamos tu piel",
  },
  {
    src: "/experiencia/tratamiento.png",
    alt: "Tratamiento estético en Dermafisherton",
    label: "Tratamiento",
    title: "Realizamos el tratamiento indicado",
  },
  {
    src: "/experiencia/seguimiento.png",
    alt: "Seguimiento y control en Dermafisherton",
    label: "Seguimiento",
    title: "Te acompañamos en el seguimiento",
  },
];

// Los paneles se despliegan según dónde esté el mouse.
function ImageAccordion() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex h-full gap-3">
      {galleryImages.map((img, i) => {
        const on = active === i;
        return (
          <div
            key={i}
            onMouseEnter={() => setActive(i)}
            className={`relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-out ${
              on ? "flex-[4]" : "flex-[1]"
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/10 to-transparent" />

            {/* Inactivo: texto vertical */}
            <span
              style={{ transitionDelay: on ? "0ms" : "350ms" }}
              className={`pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-6 transition-opacity duration-300 ${
                on ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="rotate-180 text-sm font-semibold uppercase tracking-[0.18em] text-white [writing-mode:vertical-rl]">
                {img.label}
              </span>
            </span>

            {/* Activo: texto horizontal abajo (distinto del vertical) */}
            <span
              style={{ transitionDelay: on ? "350ms" : "0ms" }}
              className={`pointer-events-none absolute inset-x-0 bottom-0 p-6 transition-opacity duration-300 ${
                on ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                {img.label}
              </span>
              <span className="mt-1.5 block max-w-[16rem] font-display text-2xl leading-tight text-white">
                {img.title}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function Experiencia() {
  return (
    <>
      <PageHero
        eyebrow="Experiencia"
        title="Una experiencia pensada para acompañarte desde la primera consulta"
        subtitle="Desde la evaluación inicial hasta el seguimiento posterior, cada paso cuida tu piel con claridad, seguridad y cercanía."
        video={experienciaClip}
        videoPoster={experienciaClipPoster}
        imageAlt="Atención personalizada en Dermafisherton"
      />

      {/* Timeline (izquierda) + acordeón de imágenes (derecha, solo PC) */}
      <section className="container-page py-20 md:py-28">
        <SectionHeader title="Paso a paso, cómo es atenderte con nosotros" />
        <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-14">
          <ol className="md:col-span-6 lg:col-span-7">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={(i % 3) * 0.06} className="group relative flex gap-6 pb-10 last:pb-0 md:gap-10">
                {/* rail */}
                <div className="relative flex flex-col items-center">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-cream bg-warm-white font-display text-xl text-sage-deep shadow-soft">
                    {s.n}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="mt-2 w-px flex-1 bg-cream" aria-hidden />
                  )}
                </div>
                <div className="pt-2.5">
                  <h3 className="text-2xl text-graphite">{s.title}</h3>
                  <p className="mt-2 max-w-lg text-[1rem] leading-relaxed text-brown/70">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          {/* Acordeón de imágenes — solo PC (toma el alto de la columna izquierda) */}
          <div className="hidden md:col-span-6 md:block lg:col-span-5">
            <ImageAccordion />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-cream bg-cream-soft/40">
        <div className="container-page py-20 md:py-28">
          <SectionHeader
            eyebrow="Preguntas frecuentes"
            title="Todo lo que quizás te estás preguntando"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CTASection
        title="Una experiencia personalizada desde la primera consulta"
        text="Escribinos y coordinamos tu evaluación inicial cuando te quede cómodo."
        message="Hola, quisiera coordinar una primera consulta."
      />
    </>
  );
}
