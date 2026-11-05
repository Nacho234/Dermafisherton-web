import { useEffect, useRef, useState } from "react";
import {
  ChatCircleDots,
  Stethoscope,
  ListChecks,
  ClipboardText,
  Sparkle,
  CalendarCheck,
} from "@phosphor-icons/react";
import PageHero from "../components/PageHero";
import BookingTutorial from "../components/BookingTutorial";
import LeafShadow from "../components/LeafShadow";
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

const stepIcons = [ChatCircleDots, Stethoscope, ListChecks, ClipboardText, Sparkle, CalendarCheck];
// Qué panel del acordeón corresponde a cada paso (consulta / tratamiento / seguimiento)
const panelFor = [0, 0, 0, 0, 1, 2];

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

// Controlado: el paso del timeline cambia la foto; el hover también puede cambiarla.
// Timeline con progreso: el paso que cruza el centro de la pantalla se activa,
// la línea verde se llena hasta él y los pasos anteriores quedan completos.
function StepsTimeline({ active, onActive }) {
  const olRef = useRef(null);
  const [geom, setGeom] = useState({ height: 1, centers: [] });

  // Mide el centro de cada círculo para alinear la línea de progreso
  useEffect(() => {
    const ol = olRef.current;
    if (!ol) return;
    const measure = () => {
      const centers = [...ol.querySelectorAll("[data-step]")].map((li) => {
        const card = li.querySelector("[data-card]");
        const dot = li.querySelector("[data-dot]");
        const cs = getComputedStyle(card);
        return li.offsetTop + parseFloat(cs.borderTopWidth) + parseFloat(cs.paddingTop) + dot.offsetHeight / 2;
      });
      if (!centers.length) return;
      setGeom({ height: Math.max(1, centers[centers.length - 1] - centers[0]), centers });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ol);
    return () => ro.disconnect();
  }, []);

  // Paso activo = el que cruza una franja fina en el centro del viewport
  useEffect(() => {
    const ol = olRef.current;
    if (!ol) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) onActive(Number(e.target.dataset.step));
        }),
      { rootMargin: "-46% 0px -46% 0px" }
    );
    ol.querySelectorAll("[data-step]").forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, [onActive]);

  const first = geom.centers[0] ?? 0;
  const ratio = geom.height ? ((geom.centers[active] ?? first) - first) / geom.height : 0;

  return (
    <ol ref={olRef} className="relative md:col-span-6 lg:col-span-7">
      {/* Línea de progreso */}
      <span
        aria-hidden
        className="absolute left-[43px] w-[2px] bg-cream md:left-[47px]"
        style={{ top: first, height: geom.height }}
      />
      <span
        aria-hidden
        className="absolute left-[43px] w-[2px] origin-top bg-sage-deep transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:left-[47px]"
        style={{ top: first, height: geom.height, transform: `scaleY(${ratio})` }}
      />
      {steps.map((s, i) => {
        const Icon = stepIcons[i];
        const on = i === active;
        const done = i <= active;
        return (
          <li key={s.n} data-step={i} aria-current={on ? "step" : undefined} className="relative pb-3 last:pb-0">
            <Reveal
              delay={(i % 3) * 0.06}
              className={`flex gap-5 rounded-[1.6rem] border p-4 transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:gap-7 md:p-5 ${
                on ? "border-sage/40 bg-surface-pure shadow-soft" : "border-transparent"
              }`}
              data-card
            >
              <span
                data-dot
                className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border shadow-ambient transition-[background-color,border-color,color,box-shadow] duration-500 ${
                  done ? "border-sage-deep bg-sage-deep text-white" : "border-cream bg-surface-pure text-sage-deep"
                } ${on ? "ring-4 ring-sage/25" : ""}`}
              >
                <Icon size={24} weight={done ? "fill" : "light"} />
              </span>
              <div className={`pt-1 transition-opacity duration-500 ${i > active ? "opacity-70" : "opacity-100"}`}>
                <span className="font-display text-sm italic tabular-nums text-taupe">{s.n}</span>
                <h3 className="text-2xl leading-tight text-graphite">{s.title}</h3>
                <p className="mt-2 max-w-lg text-[1rem] leading-relaxed text-brown/72">{s.text}</p>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

function ImageAccordion({ active, onChange: setActive }) {
  return (
    <div className="bezel-shell h-full">
      <div className="bezel-core flex h-full gap-2.5 overflow-hidden bg-surface-pure p-1.5">
        {galleryImages.map((img, i) => {
          const on = active === i;
          return (
            <button
              key={i}
              type="button"
              aria-expanded={on}
              aria-label={`${img.label}: ${img.title}`}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`relative cursor-pointer overflow-hidden rounded-[1.35rem] text-left transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                on ? "flex-[4]" : "flex-[1]"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/15 to-transparent"
              />

              {/* Inactivo: texto vertical */}
              <span
                style={{ transitionDelay: on ? "0ms" : "300ms" }}
                className={`pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-6 transition-opacity duration-300 ${
                  on ? "opacity-0" : "opacity-100"
                }`}
              >
                <span className="rotate-180 text-xs font-semibold uppercase tracking-[0.2em] text-white [writing-mode:vertical-rl]">
                  {img.label}
                </span>
              </span>

              {/* Activo: texto horizontal abajo */}
              <span
                style={{ transitionDelay: on ? "300ms" : "0ms" }}
                className={`pointer-events-none absolute inset-x-0 bottom-0 p-6 transition-opacity duration-300 ${
                  on ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/75">
                  {img.label}
                </span>
                <span className="mt-1.5 block max-w-[16rem] font-display text-2xl leading-tight text-white">
                  {img.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ExperienciaSteps() {
  const [step, setStep] = useState(0);
  const [panel, setPanel] = useState(0);
  // Cuando cambia el paso, el acordeón pasa a la etapa que corresponde
  useEffect(() => setPanel(panelFor[step]), [step]);

  return (
    <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-14">
      <StepsTimeline active={step} onActive={setStep} />

      {/* Acordeón de imágenes: fijo mientras se recorre el timeline (solo PC) */}
      <div className="hidden md:col-span-6 md:block lg:col-span-5">
        <div className="md:sticky md:top-28 md:h-[34rem]">
          <ImageAccordion active={panel} onChange={setPanel} />
        </div>
      </div>
    </div>
  );
}

export default function Experiencia() {
  return (
    <>
      {/* Timeline (izquierda) + acordeón de imágenes (derecha, solo PC) */}
      <section className="relative overflow-hidden bg-warm-white">
        {/* Luz verde suave + arcos tenues (mismo lenguaje que el resto del sitio) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(42%_34%_at_88%_8%,rgba(125,145,116,0.14),transparent_70%),radial-gradient(40%_30%_at_4%_62%,rgba(233,214,186,0.5),transparent_70%)]"
        />
        {["-left-[24rem] top-20", "-right-[24rem] top-[40%]"].map((pos) => (
          <svg
            key={pos}
            aria-hidden
            viewBox="0 0 100 100"
            className={`pointer-events-none absolute hidden h-[40rem] w-[40rem] md:block ${pos}`}
          >
            <circle cx="50" cy="50" r="49" fill="none" stroke="#7d9174" strokeOpacity="0.28" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
        ))}

        <LeafShadow side="left" />
        <div className="container-page relative py-24 md:py-32">
          <SectionHeader
            title={
              <>
                Paso a paso, cómo es{" "}
                <em className="font-normal italic text-brown">atenderte con nosotros</em>
              </>
            }
          />
          <ExperienciaSteps />

          {/* Demostración visual: cómo se reserva el turno */}
          <BookingTutorial
            className="mt-20 md:mt-28"
            title="Así de simple es reservar tu turno"
            intro="Dos formas de coordinar tu primera consulta: reservando online o escribiéndonos por WhatsApp. Elegí cuál querés ver."
          />
        </div>
      </section>

      <PageHero
        eyebrow="Experiencia"
        title="Una experiencia pensada para acompañarte desde la primera consulta"
        subtitle="Desde la evaluación inicial hasta el seguimiento posterior, cada paso cuida tu piel con claridad, seguridad y cercanía."
        video={experienciaClip}
        videoPoster={experienciaClipPoster}
        imageAlt="Atención personalizada en Dermafisherton"
        topClassName="pt-0"
      />

      {/* FAQ */}
      <section className="border-t border-cream/80 bg-warm-white">
        <div className="container-page py-24 md:py-32">
          <SectionHeader
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
