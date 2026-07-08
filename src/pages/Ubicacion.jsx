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

export default function Ubicacion() {
  return (
    <>
      {/* Hero con la foto real de la sede, a tamaño natural (sin recortar) */}
      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32">
        <div className="container-page pb-16 md:pb-24">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow">Ubicación</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-[2.4rem] leading-[1.05] sm:text-5xl md:text-[3.4rem]">
                Estamos en Fisherton
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-brown/75">
                Un espacio cómodo, privado y accesible para cuidar tu piel con
                atención profesional.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.16} y={28} className="mt-10 md:mt-12">
            <img
              src={sucursal}
              alt="Sede de Dermafisherton en Schweitzer 8883, Fisherton"
              className="h-auto w-full rounded-3xl border border-cream"
            />
          </Reveal>
        </div>
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

      {/* Nuestra sede — foto real del edificio como fondo */}
      <section className="relative overflow-hidden">
        <img
          src={sucursal}
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
