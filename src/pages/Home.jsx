import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  Stethoscope,
  HandHeart,
  Sparkle,
  MapPinLine,
  ArrowRight,
  ArrowUpRight,
  Drop,
  Sun,
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

/* --------------------------- Diferenciales ------------------------------ */
function Differentiators() {
  return (
    <section className="border-y border-cream bg-cream-soft/40">
      <div className="container-page grid gap-x-8 gap-y-12 py-16 md:grid-cols-2 md:py-24 lg:grid-cols-4">
        {differentiators.map((d, i) => {
          const Icon = icons[d.icon];
          return (
            <Reveal key={d.title} delay={i * 0.08}>
              <div className="flex h-full flex-col">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-warm-white text-sage-deep shadow-soft">
                  <Icon size={24} weight="light" />
                </span>
                <h3 className="mt-5 text-xl text-graphite">{d.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-brown/70">
                  {d.text}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------ Tratamientos destacados ----------------------- */
function Featured() {
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

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((t, i) => (
          <Reveal key={t.slug} delay={(i % 3) * 0.08}>
            <TreatmentCard {...t} />
          </Reveal>
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
function Testimonials() {
  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeader
        title="Lo que cuentan nuestras pacientes"
        align="center"
        className="mx-auto"
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.quote} delay={i * 0.1}>
            <TestimonialCard {...t} />
          </Reveal>
        ))}
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
      <Differentiators />
      <Featured />
      <Approach />
      <Process />
      <AboutTeaser />
      <Testimonials />
      <CTASection />
      <LocationTeaser />
    </>
  );
}
