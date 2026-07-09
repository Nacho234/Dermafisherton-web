import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  MapPinLine,
  Clock,
  WhatsappLogo,
  InstagramLogo,
  NavigationArrow,
} from "@phosphor-icons/react";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { MapPanel } from "./Home";
import { site, waLink } from "../data/site";
import sucursal from "../assets/sucursal.webp";
import sedeExterior from "../assets/sede-exterior.webp";
import reelUbicacion from "../assets/reel-ubicacion.mp4";
import reelUbicacionPoster from "../assets/reel-ubicacion-poster.webp";

const REEL_URL = "https://www.instagram.com/reel/DYmoODlgpqs/";

// Card del reel de la sede: reproduce muteado y el clic abre Instagram.
function ReelCard({ className = "" }) {
  return (
    <a
      href={REEL_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Ver el reel de la nueva sede en Instagram"
      className={`group relative block overflow-hidden rounded-3xl border border-warm-white/25 shadow-lift transition-transform duration-500 ease-out hover:scale-[1.02] ${className}`}
    >
      <video
        src={reelUbicacion}
        poster={reelUbicacionPoster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="pointer-events-none h-full w-full object-cover"
      />
      <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-graphite/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-graphite/80">
        <InstagramLogo size={15} weight="fill" /> Ver en Instagram
      </span>
    </a>
  );
}

export default function Ubicacion() {
  // Parallax: la foto de la sede se mueve más lento que el scroll.
  const heroRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <>
      {/* Hero a lo ancho completo con parallax: foto de la sede + texto adelante */}
      <section className="relative bg-warm-white pt-16 md:pt-20">
        <div
          ref={heroRef}
          className="relative h-[58vh] min-h-[380px] w-full overflow-hidden md:h-[78vh]"
        >
          <motion.img
            src={sucursal}
            alt="Sede de Dermafisherton en Schweitzer 8883, Fisherton"
            style={reduce ? undefined : { y }}
            className="absolute inset-x-0 top-[-8%] h-[116%] w-full object-cover object-center"
          />
          {/* velado para que el texto se lea sobre la imagen */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-brown/90 via-brown/55 to-brown/10"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="container-page flex w-full items-center justify-between gap-10">
              <div className="max-w-xl text-warm-white">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-warm-white/80">
                  Ubicación
                </span>
                <h1 className="mt-4 text-[2.2rem] leading-[1.05] text-warm-white drop-shadow-sm sm:text-5xl md:text-[3.4rem]">
                  Estamos en Fisherton
                </h1>
                <p className="mt-5 max-w-md text-base leading-relaxed text-warm-white/90 sm:text-lg">
                  Un espacio cómodo, privado y accesible para cuidar tu piel con
                  atención profesional.
                </p>
              </div>

              {/* Reel de la nueva sede (desktop): clic abre Instagram */}
              <ReelCard className="hidden aspect-[9/16] h-[80%] max-h-[560px] shrink-0 md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Reel de la nueva sede (mobile, bajo el hero) */}
      <section className="container-page pt-10 md:hidden">
        <ReelCard className="mx-auto aspect-[9/16] w-56" />
      </section>

      <section className="container-page py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          {/* Info */}
          <div className="md:col-span-5">
            <div className="space-y-8">
              <Reveal>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sage/20 text-sage-deep">
                    <MapPinLine size={22} weight="light" />
                  </span>
                  <div>
                    <h3 className="text-lg text-graphite">Dirección</h3>
                    <p className="mt-1 text-brown/75">{site.address}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sage/20 text-sage-deep">
                    <Clock size={22} weight="light" />
                  </span>
                  <div className="w-full">
                    <h3 className="text-lg text-graphite">Horarios</h3>
                    <ul className="mt-2 space-y-2">
                      {site.hours.map((h) => (
                        <li
                          key={h.day}
                          className="flex justify-between gap-4 border-b border-cream pb-2 text-[0.98rem] text-brown/75"
                        >
                          <span>{h.day}</span>
                          <span className="text-brown/55">{h.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-brown transition-colors hover:text-sage-deep"
                  >
                    <WhatsappLogo size={20} className="text-sage-deep" /> WhatsApp
                  </a>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-brown transition-colors hover:text-sage-deep"
                  >
                    <InstagramLogo size={20} className="text-sage-deep" />{" "}
                    {site.instagramHandle}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button href={site.mapsLink} target="_blank" rel="noreferrer" variant="primary" size="md">
                    <NavigationArrow size={18} weight="fill" /> Abrir en Google Maps
                  </Button>
                  <Button to="/contacto" variant="outline" size="md">
                    Reservar turno
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Map */}
          <Reveal className="md:col-span-7" y={24}>
            <MapPanel />
          </Reveal>
        </div>
      </section>

      {/* Nuestra sede — vista exterior del edificio como fondo */}
      <section className="relative overflow-hidden">
        <img
          src={sedeExterior}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-brown/60" aria-hidden />
        <div className="container-page relative z-10 py-24 text-center md:py-36">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-warm-white/75">
              Nuestra sede
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl leading-tight text-warm-white sm:text-4xl md:text-5xl">
              Schweitzer 8883 · Portero 4
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-3 text-lg text-warm-white/80">
              Schweitzer y A. Condarco, Fisherton — Rosario
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex justify-center">
              <Button
                href={site.mapsLink}
                target="_blank"
                rel="noreferrer"
                variant="sage"
                size="md"
              >
                <NavigationArrow size={18} weight="fill" /> Cómo llegar
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WhatsApp band */}
      <section className="border-t border-cream bg-cream-soft/40">
        <div className="container-page flex flex-col items-center justify-between gap-6 py-14 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl text-graphite sm:text-3xl">
              ¿Querés coordinar tu visita?
            </h2>
            <p className="mt-2 text-brown/70">
              La forma más rápida de coordinar tu turno es por WhatsApp.
            </p>
          </div>
          <Button
            href={waLink("Hola, quisiera coordinar una visita.")}
            target="_blank"
            rel="noreferrer"
            variant="sage"
            size="lg"
          >
            <WhatsappLogo size={20} weight="fill" /> Consultar por WhatsApp
          </Button>
        </div>
      </section>
    </>
  );
}
