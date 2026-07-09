import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Stethoscope,
  HandHeart,
  Sparkle,
  MapPinLine,
  ArrowRight,
  ArrowUpRight,
  Drop,
  Sun,
  Check,
  ShieldCheck,
  SealCheck,
  Leaf,
  Star,
} from "@phosphor-icons/react";

import Reveal from "../components/Reveal";
import Button from "../components/Button";
import EditorialImage from "../components/EditorialImage";
import SectionHeader from "../components/SectionHeader";
import TreatmentCard from "../components/TreatmentCard";
import TestimonialCard from "../components/TestimonialCard";
import CTASection from "../components/CTASection";

import { featured } from "../data/treatments";
import { testimonials, differentiators, process } from "../data/content";
import { site, waLink } from "../data/site";

const heroPortrait = "/hero/hero-portrait.webp";

const icons = { Stethoscope, HandHeart, Sparkle, MapPinLine };

// Destacados del hero (card liquid glass, bajo los botones).
const heroHighlights = [
  { icon: Sparkle, text: "Armonización facial" },
  { icon: Drop, text: "Skinbooster" },
  { icon: Sun, text: "Peelings y manchas" },
];

/* --------- Card "liquid glass" con destacados del hero ------------------- */
function HeroHighlightsCard({ className = "", compact = false }) {
  const radius = compact ? "rounded-2xl" : "rounded-[1.75rem]";
  const topRadius = compact ? "rounded-t-2xl" : "rounded-t-[1.75rem]";
  const rowPad = compact ? "gap-2.5 px-2.5 py-2" : "gap-3 px-3.5 py-3";
  const iconBox = compact ? "h-7 w-7" : "h-9 w-9";
  const iconSize = compact ? 14 : 18;
  const textSize = compact ? "text-xs" : "text-[0.95rem]";
  return (
    <div
      className={`relative w-full max-w-sm overflow-hidden ${radius} border border-white/60 bg-white/25 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_24px_60px_-24px_rgba(75,63,56,0.35)] backdrop-blur-xl ${className}`}
    >
      {/* reflejo superior tipo vidrio */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-1/2 ${topRadius} bg-gradient-to-b from-white/45 to-transparent`}
      />
      <ul className="relative divide-y divide-white/40">
        {heroHighlights.map((h) => {
          const Icon = h.icon;
          return (
            <li key={h.text} className={`flex items-center ${rowPad}`}>
              <span
                className={`grid ${iconBox} shrink-0 place-items-center rounded-full border border-white/60 bg-white/40 text-sage-deep`}
              >
                <Icon size={iconSize} weight="light" />
              </span>
              <span className={`${textSize} font-medium text-graphite`}>
                {h.text}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------- Hero ---------------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-warm-white">
      <div className="container-page relative grid items-center gap-12 pt-28 pb-0 md:min-h-[calc(100dvh-76px)] md:grid-cols-12 md:items-start md:gap-10 md:pt-[6.5rem] md:pb-20">
        {/* DESKTOP: panel de imagen de altura contenida, ocupando todo el ancho
            del container y centrado verticalmente. Acomodá con objectPosition. */}
        <div className="pointer-events-none absolute inset-x-0 top-[5.5rem] bottom-0 hidden overflow-hidden rounded-3xl md:block">
          <img
            src={heroPortrait}
            alt="Cuidado profesional de la piel en Dermafisherton, Fisherton"
            className="h-full w-full rounded-3xl object-cover"
            style={{
              objectPosition: "50% center",
              transform: "scale(0.9)",
              transformOrigin: "100% 100%",
            }}
          />
        </div>

        {/* IZQUIERDA: texto */}
        <div className="relative z-10 md:col-span-6 lg:col-span-6">
          <Reveal>
            <span className="eyebrow">Dermatología · Estética · Fisherton</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-5 text-[2.5rem] leading-[1.03] sm:text-[3.25rem] md:text-[3.75rem]">
              Dermatología y estética avanzada en Fisherton
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-brown/75">
              Tratamientos personalizados para cuidar tu piel con criterio
              profesional, tecnología y resultados naturales.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/contacto" variant="primary" size="lg">
                Reservar turno
              </Button>
              <Button to="/tratamientos" variant="outline" size="lg">
                Ver tratamientos
              </Button>
            </div>
          </Reveal>

          {/* Card liquid glass con destacados (bajo los botones, solo PC) */}
          <Reveal delay={0.26} className="hidden md:block">
            <HeroHighlightsCard className="mt-8" />
          </Reveal>
        </div>

        {/* MOBILE: imagen apilada full-bleed (en desktop se usa el fondo) */}
        <div className="-mx-6 md:hidden">
          <Reveal delay={0.15} y={30} className="relative">
            <EditorialImage
              src={heroPortrait}
              w={1400}
              h={788}
              alt="Cuidado profesional de la piel en Dermafisherton, Fisherton"
              priority
              scrim={false}
              objectPosition="50% center"
              rounded="rounded-none"
              className="aspect-[4/5] w-full"
            />
            {/* Card liquid glass dentro de la imagen, abajo a la izquierda */}
            <Reveal
              delay={0.45}
              className="absolute bottom-4 left-4 z-10 w-[58%] max-w-[12.5rem]"
            >
              <HeroHighlightsCard compact />
            </Reveal>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Carrusel de cualidades (bajo el hero) ---------------- */
const qualities = [
  { e: "✨", t: "Resultados naturales" },
  { e: "🌿", t: "Criterio dermatológico" },
  { e: "🤍", t: "Atención personalizada" },
  { e: "🔬", t: "Tecnología estética" },
  { e: "💧", t: "Cuidado de la piel" },
  { e: "⚕️", t: "Evaluación profesional" },
  { e: "📍", t: "En Fisherton" },
  { e: "🕊️", t: "Acompañamiento cercano" },
];

function QualitiesMarquee() {
  const reduce = useReducedMotion();
  const track = [...qualities, ...qualities];
  return (
    <section className="border-y border-graphite/[0.07] bg-warm-white">
      <div className="relative overflow-hidden py-5 md:py-6">
        {/* fundidos en los bordes */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-warm-white to-transparent md:w-24" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-warm-white to-transparent md:w-24" />
        <motion.ul
          className="flex w-max items-center gap-10 whitespace-nowrap md:gap-14"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 42, ease: "linear", repeat: Infinity }}
        >
          {track.map((q, i) => (
            <li key={i} className="flex items-center gap-2.5">
              <span className="text-base md:text-lg" aria-hidden>{q.e}</span>
              <span className="text-[0.95rem] font-medium text-brown md:text-base">{q.t}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* --------------------------- Diferenciales ------------------------------ */
// 3 círculos con imagen adentro. Poné la imagen real en `img`
// (ej. "/circulos/dermatologia.webp" dentro de public/circulos/); si queda
// vacío usa un placeholder.
const circleHighlights = [
  {
    title: "Dermatología clínica",
    text: "Diagnóstico y cuidado de la salud de tu piel.",
    img: "/circulos/1.webp",
    to: "/tratamientos#dermatologia-clinica",
    seed: "circle-dermatologia",
  },
  {
    title: "Estética facial",
    text: "Tratamientos faciales indicados según tu piel.",
    img: "/circulos/2.webp",
    to: "/tratamientos#estetica-facial",
    seed: "circle-estetica",
  },
  {
    title: "Tecnología estética",
    text: "Protocolos y aparatología modernos y seguros.",
    img: "/circulos/3.webp",
    to: "/tecnologia",
    seed: "circle-tecnologia",
  },
];

function Differentiators() {
  return (
    <section className="border-y border-cream bg-cream-soft/40">
      <div className="mx-auto max-w-[1360px] px-4 py-20 md:px-10 md:py-28">
        {/* Encabezado de la sección */}
        <Reveal className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          {/* eyebrow entre líneas */}
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-sage-deep/40 md:w-12" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-sage-deep">
              Especialidades
            </span>
            <span className="h-px w-8 bg-sage-deep/40 md:w-12" />
          </div>
          {/* título */}
          <h2 className="mt-5 text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
            Nuestras especialidades
          </h2>
          {/* texto */}
          <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-brown/75">
            Tres áreas de atención pensadas para lo que tu piel necesita. Elegí
            una y conocé los tratamientos.
          </p>
        </Reveal>

        <div className="mx-auto grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-10">
          {circleHighlights.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="group relative aspect-square w-full overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/[0.04]">
                {/* 1 · foto de la card */}
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                {/* 2 · card dentro de la card: panel blanco con top curvo (swoosh) */}
                <div className="absolute inset-x-0 bottom-0">
                  <svg
                    viewBox="0 0 100 26"
                    preserveAspectRatio="none"
                    className="block h-14 w-full md:h-16"
                    aria-hidden
                  >
                    <path
                      d="M0,26 L0,4 L32,4 C42,4 42,16 52,16 L100,16 L100,26 Z"
                      fill="#ffffff"
                    />
                  </svg>
                  <div className="-mt-px bg-white px-6 pb-6">
                    <h3 className="font-display text-xl text-graphite md:text-2xl">
                      {c.title}
                    </h3>
                    {c.text && (
                      // Colapsa en PC (solo título) y se despliega al hover.
                      <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="max-w-[26ch] pt-1 text-sm leading-snug text-brown/65 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                            {c.text}
                          </p>
                          <Link
                            to={c.to}
                            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep transition-all duration-300 hover:gap-2.5 hover:text-brown md:opacity-0 md:group-hover:opacity-100"
                          >
                            Más información
                            <ArrowRight size={16} weight="bold" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------- Enfoque editorial (bajo las cards) --------------- */
function Enfoque() {
  const puntos = [
    "Evaluación previa y diagnóstico",
    "Plan indicado según tu piel y tus objetivos",
    "Acompañamiento y seguimiento posterior",
  ];
  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Texto */}
        <div>
          <Reveal>
            <span className="eyebrow">Nuestro criterio</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-3xl leading-[1.1] sm:text-4xl md:text-[2.75rem]">
              Tratamientos indicados, no de catálogo
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-brown/75">
              No aplicamos protocolos genéricos. Cada plan se define después de
              evaluar tu piel, tus antecedentes y lo que querés mejorar, buscando
              seguridad y resultados coherentes con vos.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="mt-8 space-y-3.5">
              {puntos.map((t) => (
                <li key={t} className="flex items-center gap-3 text-brown/85">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage/20 text-sage-deep">
                    <Check size={14} weight="bold" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9">
              <Button to="/nosotros" variant="outline" size="md">
                Conocé nuestro enfoque
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Imagen con contenido encima (etiqueta + título + CTA) */}
        <Reveal y={26} className="group relative overflow-hidden rounded-3xl">
          <EditorialImage
            src="/enfoque/enfoque.webp"
            w={1000}
            h={1250}
            alt="Piel sana y natural — Dermafisherton"
            scrim={false}
            rounded="rounded-none"
            className="aspect-[4/5] w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Scrim para legibilidad */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/25 to-transparent" />

          {/* Contenido sobre la imagen */}
          <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
            <span className="eyebrow !text-white/80">Piel sana</span>
            <h3 className="mt-2 max-w-xs text-2xl leading-tight text-white sm:text-3xl">
              Resultados que se ven naturales
            </h3>
            <Button
              to="/contacto"
              variant="sage"
              size="md"
              className="mt-5"
            >
              Reservar evaluación
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------- Foto del equipo en una sola card (bajo "Nuestro criterio") ------ */
const MOSAIC_SRC = "/mosaico/equipo.png"; // 1672×941 → 16:9

// Sellos monocromáticos bajo la imagen del equipo.
const mosaicBadges = [
  { Icon: ShieldCheck, label: "Seguridad médica" },
  { Icon: SealCheck, label: "Profesionales certificados" },
  { Icon: HandHeart, label: "Atención cercana" },
  { Icon: Leaf, label: "Resultados naturales" },
];

function MosaicBento() {
  const reduce = useReducedMotion();
  return (
    <section className="container-page py-20 md:py-28">
      <Reveal className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center md:mb-16">
        <span className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-sage-deep/50" />
          <span className="eyebrow">Nuestro espacio</span>
          <span className="h-px w-8 bg-sage-deep/50" />
        </span>
        <h2 className="text-3xl leading-[1.08] sm:text-4xl md:text-[2.75rem]">
          Un espacio pensado en cada{" "}
          <span className="text-sage-deep">detalle</span>
        </h2>
        <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-brown/75">
          Cuidamos el entorno con la misma atención con la que definimos cada
          tratamiento.
        </p>
      </Reveal>
      <motion.div
        className="group relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-cream ring-1 ring-cream/70 shadow-[0_24px_60px_-30px_rgba(75,63,56,0.55)] sm:rounded-3xl"
        initial={reduce ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={MOSAIC_SRC}
          alt="Equipo profesional de Dermafisherton"
          width={1672}
          height={941}
          loading="lazy"
          className="block h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Capa gris sobre toda la imagen + refuerzo arriba/abajo */}
        <span className="pointer-events-none absolute inset-0 bg-graphite/50" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-graphite/40 via-transparent to-graphite/50" />

        {/* Texto arriba (centrado) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 p-6 text-center sm:p-8 md:p-10">
          <span className="eyebrow !text-white/80">Nuestro equipo</span>
        </div>

        {/* Texto abajo (centrado) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-center sm:p-8 md:p-10">
          <h3 className="mx-auto max-w-2xl text-2xl leading-tight text-white sm:text-3xl md:text-4xl">
            Profesionales dedicados a cuidar tu piel
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
            Un equipo médico y estético que trabaja en conjunto, con criterio y
            cercanía en cada consulta.
          </p>
        </div>
      </motion.div>

      {/* Símbolos / sellos monocromáticos debajo de la imagen */}
      <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-start justify-center gap-x-10 gap-y-8 sm:mt-12 sm:gap-x-16">
        {mosaicBadges.map(({ Icon, label }, i) => (
          <Reveal key={label} delay={i * 0.08} className="w-28">
            <motion.div
              className="group/badge flex cursor-default flex-col items-center text-center"
              whileHover={reduce ? undefined : { scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <motion.span
                className="text-graphite transition-colors duration-300 group-hover/badge:text-sage-deep"
                animate={reduce ? undefined : { y: [0, -12, 0] }}
                transition={{
                  duration: 0.55,
                  times: [0, 0.5, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 7,
                  delay: i * 0.15,
                }}
              >
                <Icon size={34} weight="thin" />
              </motion.span>
              <span className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-brown/70">
                {label}
              </span>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -- Drag-to-scroll con mouse (el táctil ya arrastra nativamente) -------- */
function useDragScroll() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e) => {
      if (e.pointerType !== "mouse") return; // táctil = scroll nativo
      down = true;
      startX = e.pageX;
      startLeft = el.scrollLeft;
      el.classList.add("cursor-grabbing");
    };
    const onMove = (e) => {
      if (!down) return;
      e.preventDefault();
      el.scrollLeft = startLeft - (e.pageX - startX);
    };
    const onUp = () => {
      down = false;
      el.classList.remove("cursor-grabbing");
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);
  return ref;
}

/* ------------------------ Tratamientos destacados ----------------------- */
function Featured() {
  const trackRef = useDragScroll();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      if (!el.clientWidth) return;
      setActive(Math.round(el.scrollLeft / el.clientWidth));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [trackRef]);

  const goTo = (i) => {
    const el = trackRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="container-page py-20 md:py-28">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="Tratamientos"
          title="Una selección cuidada de tratamientos"
          intro="Cada procedimiento se indica según una evaluación previa, buscando seguridad, naturalidad y resultados armónicos."
        />
        <Reveal delay={0.1}>
          <Link
            to="/tratamientos"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brown"
          >
            Ver todos
            <ArrowRight
              size={16}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>

      {/* Mobile: carrusel de a una card (drag/swipe con snap). sm+: grilla. */}
      <div
        ref={trackRef}
        className="mt-12 -mx-6 flex cursor-grab snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain py-3 select-none [scrollbar-width:none] sm:mx-0 sm:grid sm:cursor-auto sm:snap-none sm:select-auto sm:grid-cols-2 sm:gap-6 sm:overflow-x-visible sm:overflow-y-visible sm:py-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
      >
        {featured.map((t, i) => (
          <Reveal
            key={t.slug}
            delay={(i % 3) * 0.08}
            y={0}
            className="w-full shrink-0 snap-center px-6 sm:w-auto sm:px-0"
          >
            <TreatmentCard {...t} />
          </Reveal>
        ))}
      </div>

      {/* Puntitos (solo mobile) */}
      <div className="mt-6 flex justify-center gap-2 sm:hidden">
        {featured.map((t, i) => (
          <button
            key={t.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir al tratamiento ${i + 1}`}
            aria-current={active === i}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === i ? "w-6 bg-sage-deep" : "w-2 bg-brown/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* --------------------------- Enfoque (editorial) ------------------------ */
function Approach() {
  return (
    <section className="bg-brown text-warm-white">
      <div className="container-page grid items-center gap-12 py-20 md:grid-cols-12 md:gap-16 md:py-28">
        <Reveal className="md:col-span-6" y={28}>
          <EditorialImage
            seed="natural-skin-result-calm"
            w={1000}
            h={1000}
            alt="Resultados naturales, indicados según cada piel"
            grayscale={false}
            className="aspect-square w-full"
          />
        </Reveal>
        <div className="md:col-span-6">
          <SectionHeader
            title="Resultados naturales, indicados según tu piel"
            className="[&_h2]:text-warm-white"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-warm-white/75">
              En Dermafisherton cada tratamiento comienza con una evaluación
              profesional. La prioridad no es transformar tu rostro, sino
              acompañar lo que tu piel necesita con seguridad, equilibrio y
              naturalidad.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8">
              <Button to="/nosotros" variant="sage" size="md">
                Conocé nuestro enfoque
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Proceso ---------------------------------- */
function Process() {
  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeader
        eyebrow="Cómo trabajamos"
        title="Un proceso claro, de principio a fin"
        align="center"
        className="mx-auto"
      />
      <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {process.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.1}>
            <div className="relative">
              <span className="font-display text-6xl text-sage/60 md:text-7xl">
                {p.n}
              </span>
              <h3 className="mt-3 text-2xl text-graphite">{p.title}</h3>
              <p className="mt-3 max-w-xs text-[0.98rem] leading-relaxed text-brown/70">
                {p.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- Mini Nosotros ------------------------------ */
function AboutTeaser() {
  return (
    <section className="border-t border-cream bg-cream-soft/40">
      <div className="container-page grid items-center gap-12 py-20 md:grid-cols-12 md:gap-16 md:py-28">
        <div className="md:col-span-7">
          <h2 className="text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
            Un espacio dermatológico y estético en Fisherton
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brown/75">
            Dermafisherton combina atención profesional, estética avanzada y un
            acompañamiento cercano para cuidar tu piel de forma personalizada.
          </p>
          <div className="mt-8">
            <Button to="/nosotros" variant="outline" size="md">
              Conocer más
            </Button>
          </div>
        </div>
        <Reveal className="md:col-span-5" y={28}>
          <EditorialImage
            seed="clinic-interior-fisherton"
            w={800}
            h={900}
            alt="Interior de la clínica Dermafisherton en Fisherton"
            className="aspect-[4/5] w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------- Testimonios ------------------------------- */
const testimonialVariants = {
  enter: (d) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (d) => ({ opacity: 0, x: d > 0 ? -48 : 48 }),
};

function Testimonials() {
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState([0, 0]);
  const n = testimonials.length;

  const paginate = (d) => setState(([prev]) => [(prev + d + n) % n, d]);
  const goTo = (idx) => setState(([prev]) => [idx, idx >= prev ? 1 : -1]);

  // Autoplay suave (pausado si el usuario prefiere menos movimiento)
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setState(([prev]) => [(prev + 1) % n, 1]), 6500);
    return () => clearInterval(id);
  }, [reduce, n]);

  const t = testimonials[index];

  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeader
        title="Lo que cuentan nuestras pacientes"
        align="center"
        className="mx-auto"
      />

      {/* Desktop: grilla de 3 cards */}
      <div className="mt-14 hidden gap-6 md:grid md:grid-cols-3">
        {testimonials.map((item, idx) => (
          <Reveal key={item.quote} delay={idx * 0.1}>
            <figure className="flex h-full flex-col rounded-3xl border border-cream bg-warm-white p-8 shadow-soft">
              <div className="flex gap-1 text-sage-deep">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={16} weight="fill" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-xl leading-snug text-graphite">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-cream pt-5">
                <span className="block font-semibold text-brown">{item.name}</span>
                <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-taupe">
                  {item.detail}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      {/* Mobile: carrusel destacado (drag + puntitos) */}
      <div className="mx-auto mt-12 max-w-xl md:hidden">
        <div className="overflow-hidden px-2">
          <AnimatePresence custom={dir} mode="wait" initial={false}>
            <motion.figure
              key={index}
              custom={dir}
              variants={reduce ? undefined : testimonialVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(e, info) => {
                if (info.offset.x < -60) paginate(1);
                else if (info.offset.x > 60) paginate(-1);
              }}
              className="flex cursor-grab flex-col items-center text-center active:cursor-grabbing"
            >
              <div className="flex gap-1 text-sage-deep">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={18} weight="fill" />
                ))}
              </div>
              <blockquote className="mt-7 max-w-2xl font-display text-2xl leading-snug text-graphite sm:text-3xl md:text-[2.1rem]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <span className="block font-semibold text-brown">{t.name}</span>
                <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-taupe">
                  {t.detail}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Puntitos */}
        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((item, idx) => (
            <button
              key={item.quote}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Testimonio ${idx + 1}`}
              aria-current={index === idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === idx ? "w-6 bg-sage-deep" : "w-2 bg-brown/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Ubicación resumida --------------------------- */
function LocationTeaser() {
  return (
    <section className="border-t border-cream bg-cream-soft/40">
      <div className="container-page grid gap-10 py-20 md:grid-cols-12 md:gap-14 md:py-24">
        <div className="md:col-span-5">
          <h2 className="text-3xl leading-tight sm:text-4xl">Estamos en Fisherton</h2>
          <ul className="mt-8 space-y-5 text-brown/80">
            <li className="flex items-start gap-3">
              <MapPinLine size={22} className="mt-0.5 shrink-0 text-sage-deep" />
              <span>{site.address}</span>
            </li>
            {site.hours.map((h) => (
              <li key={h.day} className="flex justify-between border-b border-cream pb-3 text-[0.98rem]">
                <span>{h.day}</span>
                <span className="text-brown/55">{h.value}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={site.mapsLink} target="_blank" rel="noreferrer" variant="primary" size="md">
              Cómo llegar
            </Button>
            <Button href={waLink("Hola, quisiera pedir un turno.")} target="_blank" rel="noreferrer" variant="outline" size="md">
              Pedir turno
            </Button>
          </div>
        </div>
        <Reveal className="md:col-span-7" y={24}>
          <MapPanel />
        </Reveal>
      </div>
    </section>
  );
}

export function MapPanel() {
  return site.mapsEmbed ? (
    <iframe
      title="Ubicación de Dermafisherton en Fisherton"
      src={site.mapsEmbed}
      loading="lazy"
      className="aspect-[16/10] w-full rounded-3xl border border-cream"
    />
  ) : (
    <div className="img-scrim relative grid aspect-[16/10] w-full place-items-center overflow-hidden rounded-3xl border border-cream bg-cream">
      <img
        src="https://picsum.photos/seed/fisherton-map-soft/1000/640?grayscale"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <span className="relative z-10 flex items-center gap-2 rounded-full bg-warm-white/90 px-4 py-2 text-sm font-medium text-brown shadow-soft backdrop-blur">
        <MapPinLine size={18} className="text-sage-deep" /> Mapa a integrar
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <QualitiesMarquee />
      <Differentiators />
      <Enfoque />
      <MosaicBento />
      <Featured />
      <Testimonials />
      <CTASection />
      <LocationTeaser />
    </>
  );
}
