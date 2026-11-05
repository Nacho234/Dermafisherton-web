import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Stethoscope,
  HandHeart,
  Sparkle,
  MapPinLine,
  ArrowRight,
  ArrowUpRight,
  Drop,
  Check,
  ShieldCheck,
  SealCheck,
  Leaf,
  Star,
  CaretDown,
  Cpu,
  Feather,
} from "@phosphor-icons/react";

import Reveal from "../components/Reveal";
import Button from "../components/Button";
import EditorialImage from "../components/EditorialImage";
import SectionHeader from "../components/SectionHeader";
import TreatmentCard from "../components/TreatmentCard";
import CTASection from "../components/CTASection";
import WaveEdge from "../components/WaveEdge";

import { featured } from "../data/treatments";
import {
  testimonials,
  faqs,
  faqCategories,
} from "../data/content";
import { site, waLink } from "../data/site";

const heroPortrait = "/hero/hero-portrait.webp";
// Solo bordes laterales difuminados. El tope NO se difumina: el retrato sube
// hasta quedar bajo el Navbar, que tapa el corte de la foto original.
const heroPortraitMask =
  "linear-gradient(to right, transparent 8%, #000 22%, #000 86%, transparent 100%)";

/* Titular con entrada palabra por palabra (máscara + stagger). Se lee como un
   único <h1>; las palabras son solo envoltorios visuales. */
const heroTitle = [
  { w: "Dermatología" },
  { w: "y" },
  { w: "estética" },
  { w: "avanzada" },
  { w: "en" },
  { w: "Fisherton", em: true },
];

function HeroTitle({ reduce }) {
  return (
    <h1 className="mt-5 pb-1 text-[2.6rem] leading-[1.06] sm:text-[3.35rem] md:text-[3.85rem]">
      {heroTitle.map(({ w, em }, i) => {
        const word = em ? (
          <em className="font-normal italic text-brown">{w}</em>
        ) : (
          w
        );
        return (
          <span key={w}>
            <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.08 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
            {i < heroTitle.length - 1 ? " " : null}
          </span>
        );
      })}
    </h1>
  );
}

/* ------------------------------- Hero ---------------------------------- */
function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Parallax leve del retrato (solo transform; se anula con reduced-motion)
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 56]);

  return (
    <section ref={sectionRef} className="hero-bg relative overflow-hidden">
      {/* Arcos dorados decorativos (solo PC): anillo detrás del retrato + curva inferior */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="pointer-events-none absolute left-[67%] top-1/2 hidden aspect-square h-[122%] -translate-x-1/2 -translate-y-1/2 md:block"
      >
        <defs>
          <linearGradient id="hero-gold-ring" x1="0" y1="0" x2="1" y2="0.7">
            <stop offset="0" stopColor="#d6b46c" stopOpacity="0" />
            <stop offset="0.55" stopColor="#d6b46c" stopOpacity="0" />
            <stop offset="0.8" stopColor="#d6b46c" stopOpacity="0.6" />
            <stop offset="1" stopColor="#b98f45" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="url(#hero-gold-ring)"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 300 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-[6%] left-0 hidden h-[16%] w-[26%] md:block"
      >
        <defs>
          <linearGradient id="hero-gold-sweep" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b98f45" stopOpacity="0.9" />
            <stop offset="1" stopColor="#d6b46c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 14 C 90 30, 170 78, 300 112"
          fill="none"
          stroke="url(#hero-gold-sweep)"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="container-page relative grid items-center gap-12 pt-24 pb-0 md:min-h-[calc(100dvh-76px)] md:grid-cols-12 md:items-center md:gap-10 md:pt-24 md:pb-20">
        {/* DESKTOP: retrato en estudio blanco puro integrado al fondo */}
        <div className="pointer-events-none absolute inset-x-0 top-0 bottom-0 hidden overflow-hidden md:block">
          <motion.div
            className="h-full w-full mix-blend-multiply"
            style={{
              y: portraitY,
              WebkitMaskImage: heroPortraitMask,
              maskImage: heroPortraitMask,
            }}
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={heroPortrait}
              alt="Cuidado profesional de la piel en Dermafisherton, Fisherton"
              className="h-full w-full object-cover"
              style={{
                objectPosition: "55% center",
                transform: "scale(0.92)",
                transformOrigin: "100% 100%",
              }}
            />
          </motion.div>
          {/* Fundido inferior: los hombros se disuelven en el fondo champagne */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f2e3d3] to-transparent"
          />
        </div>

        {/* IZQUIERDA: stack disciplinado (eyebrow + H1 + subtext + CTAs) */}
        <div className="relative z-10 md:col-span-6 md:pb-32 lg:col-span-6">
          <Reveal>
            <span className="inline-flex items-center text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brown/80">
              Dermatología · Estética · Fisherton
            </span>
          </Reveal>
          <HeroTitle reduce={reduce} />
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-brown/75">
              Tratamientos personalizados para cuidar tu piel con criterio
              profesional, tecnología y resultados naturales.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button to="/contacto" variant="gold" size="lg" arrow>
                Reservar turno
              </Button>
              <Button to="/tratamientos" variant="gold" size="lg" className="[--shine-delay:1.6s]">
                Ver tratamientos
              </Button>
            </div>
          </Reveal>

        </div>

        {/* MOBILE: retrato en marco Double-Bezel con cápsula superpuesta */}
        <div className="pb-6 md:hidden">
          <Reveal delay={0.15} y={24} className="relative">
            <div className="bezel-shell">
              <EditorialImage
                src={heroPortrait}
                w={1400}
                h={788}
                alt="Cuidado profesional de la piel en Dermafisherton, Fisherton"
                priority
                scrim={false}
                objectPosition="62% center"
                rounded="bezel-core"
                className="aspect-[4/5] w-full"
              />
            </div>
          </Reveal>
        </div>
      </div>
      <WaveEdge to="#f1e6d8" />
    </section>
  );
}

/* --------- Cinta editorial de cualidades (íconos finos Phosphor) -------- */
const qualities = [
  { Icon: Sparkle, t: "Resultados naturales" },
  { Icon: Stethoscope, t: "Criterio dermatológico" },
  { Icon: HandHeart, t: "Atención personalizada" },
  { Icon: Cpu, t: "Tecnología estética" },
  { Icon: Drop, t: "Salud y calidad de piel" },
  { Icon: ShieldCheck, t: "Evaluación médica previa" },
  { Icon: MapPinLine, t: "Sede en Fisherton" },
  { Icon: Feather, t: "Acompañamiento cercano" },
];

function QualitiesMarquee() {
  const reduce = useReducedMotion();
  const track = [...qualities, ...qualities];
  return (
    <section className="no-wall border-y border-[#e6d8c4] bg-[#f1e6d8]">
      <div className="marquee-viewport relative overflow-hidden py-5 md:py-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f1e6d8] to-transparent md:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f1e6d8] to-transparent md:w-28"
        />
        <ul
          className={`flex w-max items-center gap-10 whitespace-nowrap md:gap-14 ${
            reduce ? "" : "marquee-track"
          }`}
        >
          {track.map(({ Icon, t }, i) => (
            <li
              key={i}
              aria-hidden={i >= qualities.length ? true : undefined}
              className="flex items-center gap-3"
            >
              <span
                aria-hidden
                className="grid h-7 w-7 place-items-center rounded-full border border-sage/35 bg-sage/15 text-sage-deep"
              >
                <Icon size={15} weight="light" />
              </span>
              <span className="text-[0.93rem] font-medium tracking-[-0.005em] text-brown/85 md:text-[0.96rem]">
                {t}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------- Especialidades ----------------------------- */
const circleHighlights = [
  {
    title: "Dermatología clínica",
    text: "Diagnóstico y cuidado integral de la salud de tu piel.",
    img: "/circulos/1.webp",
    to: "/tratamientos#dermatologia-clinica",
  },
  {
    title: "Estética facial",
    text: "Procedimientos faciales indicados con equilibrio y naturalidad.",
    img: "/circulos/2.webp",
    to: "/tratamientos#estetica-facial",
  },
  {
    title: "Tecnología estética",
    text: "Protocolos y aparatología actualizados con respaldo médico.",
    img: "/circulos/3.webp",
    to: "/tecnologia",
  },
];

function Differentiators() {
  return (
    <section className="section-champagne relative overflow-hidden">
      {/* Arcos dorados laterales: repiten el anillo del hero (solo PC, muy tenues) */}
      {[
        "-left-[19rem] -top-24",
        "-right-[19rem] top-16",
      ].map((pos) => (
        <svg
          key={pos}
          aria-hidden
          viewBox="0 0 100 100"
          className={`pointer-events-none absolute hidden h-[38rem] w-[38rem] md:block ${pos}`}
        >
          <circle
            cx="50"
            cy="50"
            r="49"
            fill="none"
            stroke="#c9a35a"
            strokeOpacity="0.42"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ))}
      <div className="container-page relative py-24 md:py-32">
        {/* Encabezado: ornamento dorado + título con palabra en dorado cursiva */}
        <Reveal className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <div className="mx-auto mb-6 flex items-center justify-center gap-4" aria-hidden>
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#c9a35a]/70" />
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#c9a35a]/70 bg-white/70 text-[#a98338]">
              <Sparkle size={18} weight="light" />
            </span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#c9a35a]/70" />
          </div>
          <h2 className="pb-1 text-3xl leading-[1.12] sm:text-4xl md:text-[2.95rem]">
            Nuestras áreas de{" "}
            <em className="font-normal italic text-brown">atención</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-brown/75">
            Tres especialidades pensadas para lo que tu piel necesita. Explorá
            cada área y conocé los tratamientos disponibles.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-9">
          {circleHighlights.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.09}>
              <Link
                to={c.to}
                className="bezel-shell group block transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 hover:shadow-lift focus-visible:-translate-y-1.5 focus-visible:shadow-lift"
              >
                <div className="bezel-core relative aspect-[4/4.3] w-full overflow-hidden bg-cream">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[950ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
                  />

                  {/* Panel inferior con curva orgánica + insignia circular */}
                  <div className="absolute inset-x-0 bottom-0">
                    <svg
                      viewBox="0 0 100 26"
                      preserveAspectRatio="none"
                      className="block h-12 w-full md:h-14"
                      aria-hidden
                    >
                      <path
                        d="M0,26 L0,4 L32,4 C42,4 42,16 52,16 L100,16 L100,26 Z"
                        fill="#ffffff"
                      />
                    </svg>
                    <div className="-mt-px bg-surface-pure px-6 pb-6 pt-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-2xl text-graphite">
                          {c.title}
                        </h3>
                        <span
                          aria-hidden
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cream bg-cream/35 text-brown transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-sage/50 group-hover:bg-sage-deep group-hover:text-warm-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                          <ArrowUpRight size={14} weight="bold" />
                        </span>
                      </div>

                      <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="max-w-[30ch] pt-2 text-sm leading-relaxed text-brown/70 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                            {c.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------- Enfoque editorial (split 50/50) ------------------ */
function Enfoque() {
  const puntos = [
    "Evaluación previa y diagnóstico dermatológico",
    "Plan indicado según tu piel y tus objetivos",
    "Acompañamiento y seguimiento en cada etapa",
  ];
  return (
    <section className="warm-a">
    <div className="container-page py-24 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
        {/* Texto */}
        <div className="md:col-span-6">
          <Reveal>
            <span className="eyebrow">Nuestro criterio</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 pb-1 text-3xl leading-[1.12] sm:text-4xl md:text-[2.95rem]">
              Tratamientos indicados,{" "}
              <em className="font-normal italic text-brown">no de catálogo</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-brown/75">
              No aplicamos protocolos genéricos. Cada plan se define después de
              evaluar tu piel, tus antecedentes y lo que querés mejorar, buscando
              seguridad y resultados coherentes con vos.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="mt-8 space-y-3.5">
              {puntos.map((t) => (
                <li key={t} className="flex items-center gap-3.5 text-brown/85">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-sage/40 bg-sage/20 text-sage-deep">
                    <Check size={13} weight="bold" />
                  </span>
                  <span className="text-[0.98rem]">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9">
              <Button to="/nosotros" variant="outline" size="md" arrow>
                Conocé nuestro enfoque
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Video con Double-Bezel y contenido superpuesto */}
        <Reveal y={26} className="bezel-shell group md:col-span-6">
          <div className="bezel-core relative overflow-hidden bg-cream">
            <video
              src="/enfoque/enfoque.mp4"
              poster="/enfoque/enfoque.webp"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Piel sana y natural en Dermafisherton"
              className="aspect-[4/4.8] w-full object-cover transition-transform duration-[950ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
            />

            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#231F1D]/90 via-[#231F1D]/30 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <h3 className="max-w-xs text-2xl leading-tight text-white sm:text-3xl">
                Resultados que se ven naturales
              </h3>
              <Button
                to="/contacto"
                variant="sage"
                size="md"
                arrow
                className="mt-5"
              >
                Reservar evaluación
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
    </section>
  );
}

/* ------- Foto panorámica del equipo + sellos de confianza --------------- */
const MOSAIC_SRC = "/mosaico/equipo.png";

const mosaicBadges = [
  { Icon: ShieldCheck, label: "Seguridad médica" },
  { Icon: SealCheck, label: "Equipo certificado" },
  { Icon: HandHeart, label: "Atención cercana" },
  { Icon: Leaf, label: "Mirada natural" },
];

function MosaicBento() {
  const reduce = useReducedMotion();
  return (
    <section className="warm-b py-24 md:py-32">
      <div className="container-page">
        <Reveal className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center md:mb-16">
          <h2 className="pb-1 text-3xl leading-[1.08] sm:text-4xl md:text-[2.95rem]">
            Un espacio pensado en cada{" "}
            <em className="font-normal italic text-sage-deep">detalle</em>
          </h2>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-brown/75">
            Cuidamos el entorno y el acompañamiento humano con la misma
            dedicación con la que indicamos cada tratamiento.
          </p>
        </Reveal>

        <motion.div
          className="bezel-shell group mx-auto w-full max-w-5xl"
          initial={reduce ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bezel-core relative overflow-hidden bg-cream">
            <img
              src={MOSAIC_SRC}
              alt="Equipo profesional de Dermafisherton"
              width={1672}
              height={941}
              loading="lazy"
              className="block h-auto w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
            />

            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#231F1D]/80 from-0% via-[#231F1D]/25 via-40% to-transparent to-65%"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-center sm:p-9 md:p-12">
              <h3 className="mx-auto max-w-2xl text-2xl leading-tight text-white sm:text-3xl md:text-4xl">
                Profesionales dedicados a cuidar tu piel
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
                Un equipo médico y estético que trabaja en conjunto, con criterio y
                cercanía en cada consulta.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sellos editoriales en medallones Double-Bezel */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {mosaicBadges.map(({ Icon, label }, i) => (
            <Reveal key={label} delay={i * 0.07}>
              <div className="group/badge flex flex-col items-center px-2 py-2 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-[#c9a35a]/70 bg-white/70 text-[#a98338] shadow-[0_2px_8px_-2px_rgba(58,48,42,0.12)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/badge:-translate-y-0.5">
                  <Icon size={24} weight="light" />
                </span>
                <span className="mt-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-brown/75">
                  {label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
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
      if (e.pointerType !== "mouse") return;
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
    <section className="warm-a">
    <div className="container-page py-24 md:py-32">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="Tratamientos"
          title="Una selección cuidada de tratamientos"
          intro="Cada procedimiento se indica según una evaluación previa, buscando seguridad, naturalidad y resultados armónicos."
        />
        <Reveal delay={0.1}>
          <Button to="/tratamientos" variant="outline" size="md" arrow>
            Ver todos los tratamientos
          </Button>
        </Reveal>
      </div>

      {/* Mobile: carrusel con snap. sm+: grilla. */}
      <div
        ref={trackRef}
        className="mt-14 -mx-6 flex cursor-grab snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain py-3 select-none [scrollbar-width:none] sm:mx-0 sm:grid sm:cursor-auto sm:snap-none sm:select-auto sm:grid-cols-2 sm:gap-6 sm:overflow-x-visible sm:overflow-y-visible sm:py-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
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

      {/* Indicador mobile (touch target >= 44px con hit-area expandido) */}
      <div className="mt-4 flex flex-wrap justify-center sm:hidden">
        {featured.map((t, i) => (
          <button
            key={t.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir al tratamiento ${i + 1}`}
            aria-current={active === i}
            className="grid min-h-[44px] min-w-[28px] place-items-center px-1"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                active === i ? "w-6 bg-sage-deep" : "w-2 bg-brown/25"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
    </section>
  );
}

/* --------------------------------- FAQ --------------------------------- */
function FAQ() {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState(faqCategories[0].slug);
  const [open, setOpen] = useState(0);

  const items = faqs.filter((f) => f.cat === cat);

  const selectCat = (slug) => {
    setCat(slug);
    setOpen(0);
  };

  return (
    <section className="warm-b py-24 md:py-32">
      <div className="container-page grid gap-10 md:grid-cols-12 md:gap-14">
        {/* Columna izquierda */}
        <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
          <h2 className="font-display text-3xl leading-[1.08] text-graphite sm:text-4xl md:text-[2.75rem]">
            Respuestas a las dudas más frecuentes
          </h2>
          <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-brown/72">
            Todo lo que suele surgir antes de una consulta: cómo trabajamos, los
            turnos y qué esperar de cada tratamiento.
          </p>

          {/* Categorías con indicador fluido */}
          <div className="mt-8 flex flex-col gap-1.5 rounded-2xl border border-cream bg-cream/25 p-1.5">
            {faqCategories.map((c) => {
              const isSelected = cat === c.slug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => selectCat(c.slug)}
                  aria-pressed={isSelected}
                  className={`relative rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-300 ${
                    isSelected
                      ? "text-graphite"
                      : "text-brown/68 hover:text-graphite"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="home-faq-cat"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-xl border border-cream bg-surface-pure shadow-ambient"
                    />
                  )}
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Card de contacto en Double-Bezel */}
          <div className="bezel-shell mt-7">
            <div className="bezel-core bg-surface-pure p-6">
              <h3 className="font-display text-xl text-graphite">
                ¿Te quedan dudas?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brown/72">
                Escribinos y te orientamos para coordinar tu consulta o resolver
                cualquier pregunta.
              </p>
              <a
                href={waLink("Hola, tengo una consulta.")}
                target="_blank"
                rel="noreferrer"
                className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sage-deep transition-colors hover:text-brown"
              >
                Consultar por WhatsApp
                <ArrowRight
                  size={15}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Columna derecha: acordeón */}
        <div className="flex flex-col gap-3.5 md:col-span-8 md:mt-4 md:self-start">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-[1.5rem] border transition-all duration-300 ${
                  isOpen
                    ? "border-sage/50 bg-surface-pure shadow-soft"
                    : "border-cream bg-warm-white/70 hover:border-taupe/35 hover:bg-warm-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="font-display text-xl font-medium text-graphite md:text-[1.35rem]">
                    {item.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      isOpen
                        ? "rotate-180 border-sage/40 bg-sage/20 text-sage-deep"
                        : "border-cream bg-cream/30 text-brown"
                    }`}
                  >
                    <CaretDown size={14} weight="bold" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] px-6 pb-6 pr-12 leading-relaxed text-brown/75">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
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
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;

  const paginate = (d) => setState(([prev]) => [(prev + d + n) % n, d]);
  const goTo = (idx) => setState(([prev]) => [idx, idx >= prev ? 1 : -1]);

  // Autoplay solo en mobile (en desktop se ven las 3 cards) y con pausa
  // mientras la persona toca, arrastra, apunta o enfoca el carrusel.
  useEffect(() => {
    if (reduce || paused) return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const id = setInterval(() => setState(([prev]) => [(prev + 1) % n, 1]), 6500);
    return () => clearInterval(id);
  }, [reduce, paused, n]);

  const t = testimonials[index];

  return (
    <section className="warm-a py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          title="Lo que cuentan nuestras pacientes"
          align="center"
          className="mx-auto"
        />

        {/* Desktop: 3 cards en Double-Bezel */}
        <div className="mt-14 hidden gap-6 md:grid md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <Reveal key={item.quote} delay={idx * 0.1}>
              <div className="bezel-shell h-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
                <figure className="bezel-core flex h-full flex-col justify-between bg-surface-pure p-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 text-sage-deep">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} size={15} weight="fill" />
                        ))}
                      </div>
                      <span
                        aria-hidden
                        className="font-display text-4xl leading-none text-sage/60"
                      >
                        &ldquo;
                      </span>
                    </div>
                    <blockquote className="mt-5 font-display text-[1.38rem] leading-snug text-graphite">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </div>
                  <figcaption className="mt-7 border-t border-cream/80 pt-5">
                    <span className="block text-sm font-semibold text-graphite">
                      {item.name}
                    </span>
                    <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-taupe">
                      {item.detail}
                    </span>
                  </figcaption>
                </figure>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mobile: carrusel táctil en Double-Bezel */}
        <div
          className="mx-auto mt-12 max-w-xl md:hidden"
          onPointerDown={() => setPaused(true)}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="overflow-hidden px-1">
            <AnimatePresence custom={dir} mode="wait" initial={false}>
              <motion.div
                key={index}
                custom={dir}
                variants={reduce ? undefined : testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) paginate(1);
                  else if (info.offset.x > 60) paginate(-1);
                }}
                className="bezel-shell cursor-grab active:cursor-grabbing"
              >
                <figure className="bezel-core flex flex-col items-center bg-surface-pure px-6 py-10 text-center">
                  <div className="flex gap-1 text-sage-deep">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={17} weight="fill" />
                    ))}
                  </div>
                  <blockquote className="mt-6 max-w-lg font-display text-2xl leading-snug text-graphite">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-7 border-t border-cream/80 pt-5">
                    <span className="block text-sm font-semibold text-graphite">
                      {t.name}
                    </span>
                    <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-taupe">
                      {t.detail}
                    </span>
                  </figcaption>
                </figure>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex justify-center gap-1">
            {testimonials.map((item, idx) => (
              <button
                key={item.quote}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Testimonio ${idx + 1}`}
                aria-current={index === idx}
                className="grid min-h-[44px] min-w-[44px] place-items-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    index === idx ? "w-6 bg-sage-deep" : "w-2 bg-brown/25"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Ubicación resumida --------------------------- */
function LocationTeaser() {
  return (
    <section className="warm-c">
      <div className="container-page grid items-center gap-10 py-24 md:grid-cols-12 md:gap-14 md:py-28">
        <div className="md:col-span-5">
          <h2 className="text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
            Estamos en Fisherton
          </h2>
          <ul className="mt-8 space-y-4 text-brown/80">
            <li className="flex items-start gap-3 pb-2">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream bg-cream/30 text-sage-deep">
                <MapPinLine size={18} weight="light" />
              </span>
              <span className="pt-1.5">{site.address}</span>
            </li>
            {site.hours.map((h) => (
              <li
                key={h.day}
                className="flex justify-between border-b border-cream/80 pb-3 text-[0.95rem] tabular-nums"
              >
                <span>{h.day}</span>
                <span className="text-brown/60">{h.value}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={site.mapsLink}
              target="_blank"
              rel="noreferrer"
              variant="primary"
              size="md"
              arrow
            >
              Cómo llegar
            </Button>
            <Button
              href={waLink("Hola, quisiera pedir un turno.")}
              target="_blank"
              rel="noreferrer"
              variant="outline"
              size="md"
            >
              Consultar horarios
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
  return (
    <div className="bezel-shell">
      {site.mapsEmbed ? (
        <iframe
          title="Ubicación de Dermafisherton en Fisherton"
          src={site.mapsEmbed}
          loading="lazy"
          className="bezel-core block aspect-[16/10] w-full bg-cream"
        />
      ) : (
        <div className="bezel-core img-scrim relative grid aspect-[16/10] w-full place-items-center overflow-hidden bg-cream">
          <img
            src="https://picsum.photos/seed/fisherton-map-soft/1000/640?grayscale"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <span className="relative z-10 flex items-center gap-2 rounded-full bg-surface-pure/90 px-4 py-2 text-sm font-medium text-brown shadow-soft backdrop-blur">
            <MapPinLine size={18} className="text-sage-deep" /> Mapa de ubicación
          </span>
        </div>
      )}
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
      <FAQ />
      <Testimonials />
      <div className="warm-b">
        <CTASection />
      </div>
      <LocationTeaser />
    </>
  );
}
