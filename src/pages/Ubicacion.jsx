import {
  MapPinLine,
  Clock,
  WhatsappLogo,
  InstagramLogo,
  NavigationArrow,
  ArrowUpRight,
} from "@phosphor-icons/react";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import { useId } from "react";
import PhoneFrame from "../components/PhoneFrame";
import WaveEdge from "../components/WaveEdge";
import { MapPanel } from "./Home";
import { site, waLink } from "../data/site";
import sedeExterior from "../assets/sede-exterior.webp";
import reelUbicacion from "../assets/reel-ubicacion.mp4";
import reelUbicacionPoster from "../assets/reel-ubicacion-poster.webp";

const REEL_URL = "https://www.instagram.com/reel/DYmoODlgpqs/";

// Ícono de Google Maps con sus colores originales (marca de terceros: se usa
// solo para ilustrar la notificación; sin recolorear).
function GoogleMapsIcon({ className = "" }) {
  // id único por instancia: hay un teléfono en desktop y otro (oculto) en mobile
  const clipId = `gm-pin-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`rounded-[0.65rem] bg-white shadow-[0_1px_3px_rgba(58,48,42,0.25)] ${className}`}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M12 3.1c-3.3 0-6 2.6-6 5.9 0 4.5 6 11.9 6 11.9s6-7.4 6-11.9c0-3.3-2.7-5.9-6-5.9z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="24" height="24" fill="#EA4335" />
        <path d="M0 9.4 8.6 9.4 12 15.6 7.4 24H0z" fill="#4285F4" />
        <path d="M12 15.6 8.6 9.4 7.4 24 16.6 24z" fill="#34A853" />
        <path d="M15.4 9.4H24V24H16.6L12 15.6z" fill="#FBBC04" />
      </g>
      <circle cx="12" cy="9" r="2.2" fill="#fff" />
    </svg>
  );
}

// Ícono de Instagram con los colores originales de la app (degradado + glifo blanco).
function InstagramAppIcon({ className = "" }) {
  return (
    <span
      aria-hidden
      className={`grid place-items-center rounded-[0.5rem] text-white ${className}`}
      style={{
        background:
          "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)",
      }}
    >
      <InstagramLogo size={14} weight="bold" />
    </span>
  );
}

// Banner de notificación estilo iOS DENTRO de la pantalla del teléfono. Es temporal,
// como una notificación real: baja desde arriba (debajo de la Dynamic Island), se
// queda ~3 s y se va sola deslizándose hacia arriba. Una sola vez, sin loop (ver
// `.notif-pop` en index.css). Con "reducir movimiento" no se muestra.
// Decorativo: la dirección ya está escrita en la página.
function PhoneNotification() {
  return (
    <div
      aria-hidden
      className="notif-pop pointer-events-none absolute inset-x-[4%] top-[6.8%] z-40 rounded-[1.1rem] border border-white/50 bg-white/80 px-2.5 py-2 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.55)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-2">
        <GoogleMapsIcon className="h-7 w-7 shrink-0 !rounded-[0.5rem]" />
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex items-center justify-between text-[0.52rem] font-semibold uppercase tracking-wide text-brown/60">
            <span>Google Maps</span>
            <span className="normal-case">ahora</span>
          </div>
          <p className="text-[0.7rem] font-semibold text-graphite">Schweitzer 8883</p>
          <p className="text-[0.62rem] text-brown/75">Fisherton, Rosario</p>
        </div>
      </div>
    </div>
  );
}

export default function Ubicacion() {
  return (
    <>
      {/* Hero con el reel de la nueva sede */}
      <section className="hero-bg relative overflow-hidden pt-24 md:pt-[76px]">
        {/* Fundido inferior: el hero termina exactamente en el color base de la página */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-warm-white to-transparent"
        />
        {/* ---- Mobile ---- */}
        <div className="md:hidden">
          <div className="container-page pb-8">
            <h1 className="pb-1 text-[2.35rem] leading-[1.1]">
              Estamos en <em className="font-normal italic text-brown">Fisherton</em>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-brown/75">
              Un espacio cómodo, privado y accesible para cuidar tu piel con
              atención profesional.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                href={site.mapsLink}
                target="_blank"
                rel="noreferrer"
                variant="sage"
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
                Pedir turno
              </Button>
            </div>
          </div>
          <div className="container-page pb-10">
            <a
              href={REEL_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Ver el reel de la nueva sede en Instagram"
              className="group mx-auto flex w-[82%] max-w-[20rem] flex-col items-center gap-5"
            >
              <PhoneFrame className="w-full">
                <video
                  src={reelUbicacion}
                  poster={reelUbicacionPoster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                />
                <PhoneNotification />
              </PhoneFrame>
              <span className="flex items-center gap-2 whitespace-nowrap rounded-full border border-brown/15 bg-white/90 py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-graphite shadow-ambient">
                <InstagramAppIcon className="h-6 w-6" />
                <span>Ver en Instagram</span>
              </span>
            </a>
          </div>
        </div>

        {/* ---- Desktop ---- */}
        <div className="group relative hidden h-[88dvh] min-h-[620px] max-h-[900px] w-full md:block">
          {/* Anillo dorado detrás del iPhone (mismo lenguaje que el hero del Home) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,#000_66%,transparent_100%)]">
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            className="pointer-events-none absolute left-[74%] top-1/2 aspect-square h-[125%] -translate-x-1/2 -translate-y-1/2"
          >
            <defs>
              <linearGradient id="ubi-gold-ring" x1="0" y1="0" x2="1" y2="0.7">
                <stop offset="0" stopColor="#d6b46c" stopOpacity="0" />
                <stop offset="0.5" stopColor="#d6b46c" stopOpacity="0.1" />
                <stop offset="0.8" stopColor="#d6b46c" stopOpacity="0.65" />
                <stop offset="1" stopColor="#b98f45" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="49"
              fill="none"
              stroke="url(#ubi-gold-ring)"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          </div>

          {/* iPhone en mirroring con el reel + botón debajo */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-end pr-[7%]">
            <div className="flex h-full flex-col items-center gap-3 py-5">
              <div className="min-h-0 flex-1">
                <div className="relative aspect-[9/19.5] h-full">
                <PhoneFrame className="h-full w-full">
                  <video
                    src={reelUbicacion}
                    poster={reelUbicacionPoster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  />
                  <PhoneNotification />
                </PhoneFrame>
                </div>
              </div>
              <span className="flex items-center gap-2 whitespace-nowrap rounded-full border border-brown/15 bg-white/90 py-1.5 pl-1.5 pr-2.5 text-xs font-semibold text-graphite shadow-ambient backdrop-blur transition-colors duration-300 group-hover:bg-white">
                <InstagramAppIcon className="h-6 w-6" />
                <span>Ver en Instagram</span>
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brown/[0.07]">
                  <ArrowUpRight size={11} weight="bold" />
                </span>
              </span>
            </div>
          </div>

          {/* Toda el área abre el reel en Instagram */}
          <a
            href={REEL_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Ver el reel de la nueva sede en Instagram"
            className="absolute inset-0 z-10 block"
          />

          {/* Texto del hero */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
            <div className="container-page">
              <div className="max-w-xl">
                <h1 className="pb-1 text-[3.5rem] font-display leading-[1.1]">
                  Estamos en <em className="font-normal italic text-brown">Fisherton</em>
                </h1>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-brown/75">
                  Un espacio cómodo, privado y accesible para cuidar tu piel con
                  atención profesional.
                </p>

                {/* Dirección y horario, con el aro dorado del hero */}
                <ul className="mt-8 space-y-4">
                  <li className="flex items-center gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-sage/60 bg-white/70 text-sage-deep shadow-[0_2px_8px_-2px_rgba(58,48,42,0.12)]">
                      <MapPinLine size={19} weight="light" />
                    </span>
                    <span className="text-[0.98rem] text-graphite">{site.address}</span>
                  </li>
                  <li className="flex items-center gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-sage/60 bg-white/70 text-sage-deep shadow-[0_2px_8px_-2px_rgba(58,48,42,0.12)]">
                      <Clock size={19} weight="light" />
                    </span>
                    <span className="text-[0.98rem] text-graphite">
                      {site.hours[0].day}{" "}
                      <span className="text-brown/75">{site.hours[0].value}</span>
                    </span>
                  </li>
                </ul>

                {/* Acciones (el contenedor padre ignora el puntero, así que se reactiva acá) */}
                <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    href={site.mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    variant="sage"
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
                    Pedir turno
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WaveEdge />
      </section>

      <section className="container-page py-24 md:py-32">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          {/* Info */}
          <div className="md:col-span-5">
            <div className="space-y-8">
              <Reveal>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-sage/30 bg-sage/18 text-sage-deep">
                    <MapPinLine size={22} weight="light" />
                  </span>
                  <div>
                    <h2 className="text-xl text-graphite">Dirección</h2>
                    <p className="mt-1 text-brown/75">{site.address}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-sage/30 bg-sage/18 text-sage-deep">
                    <Clock size={22} weight="light" />
                  </span>
                  <div className="w-full">
                    <h2 className="text-xl text-graphite">Horarios</h2>
                    <ul className="mt-2.5 space-y-2 tabular-nums">
                      {site.hours.map((h) => (
                        <li
                          key={h.day}
                          className="flex justify-between gap-4 border-b border-cream/80 pb-2.5 text-[0.96rem] text-brown/75"
                        >
                          <span>{h.day}</span>
                          <span className="text-brown/60">{h.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-cream bg-cream/25 px-4 py-2 text-sm font-medium text-brown transition-colors hover:border-sage-deep/50 hover:text-graphite"
                  >
                    <WhatsappLogo size={18} weight="light" className="text-sage-deep" /> WhatsApp
                  </a>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-cream bg-cream/25 px-4 py-2 text-sm font-medium text-brown transition-colors hover:border-sage-deep/50 hover:text-graphite"
                  >
                    <InstagramLogo size={18} weight="light" className="text-sage-deep" />{" "}
                    {site.instagramHandle}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button
                    href={site.mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    variant="primary"
                    size="md"
                    arrow
                  >
                    Abrir en Google Maps
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

      {/* Nuestra sede — vista exterior del edificio en marco Double-Bezel */}
      <section className="container-page pb-24 md:pb-32">
        <Reveal className="bezel-shell">
          <div className="bezel-core relative overflow-hidden bg-brown px-7 py-20 text-center md:px-14 md:py-28">
            <img
              src={sedeExterior}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-graphite/55 via-brown/55 to-graphite/65"
              aria-hidden
            />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-3xl leading-tight text-warm-white sm:text-4xl md:text-5xl">
                Schweitzer 8883 · Portero 4
              </h2>
              <p className="mt-3 text-lg text-warm-white/85">
                Schweitzer y A. Condarco, Fisherton · Rosario
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  href={site.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  variant="sage"
                  size="md"
                  arrow
                >
                  Cómo llegar
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* WhatsApp band */}
      <section className="border-t border-cream/80 bg-warm-white">
        <div className="container-page flex flex-col items-center justify-between gap-6 py-16 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl text-graphite sm:text-3xl">
              ¿Querés coordinar tu visita?
            </h2>
            <p className="mt-2 text-brown/72">
              La forma más rápida de coordinar tu turno es por WhatsApp.
            </p>
          </div>
          <Button
            href={waLink("Hola, quisiera coordinar una visita.")}
            target="_blank"
            rel="noreferrer"
            variant="sage"
            size="lg"
            arrow
          >
            Consultar por WhatsApp
          </Button>
        </div>
      </section>
    </>
  );
}
