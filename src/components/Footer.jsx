import { Link } from "react-router-dom";
import { InstagramLogo, WhatsappLogo, MapPinLine, ArrowUpRight } from "@phosphor-icons/react";
import { site, waLink } from "../data/site";
import "@fontsource/whisper";

const nav = [
  { to: "/nosotros", label: "Nosotros" },
  { to: "/tratamientos", label: "Tratamientos" },
  { to: "/tecnologia", label: "Tecnología" },
  { to: "/experiencia", label: "Experiencia" },
  { to: "/ubicacion", label: "Ubicación" },
  { to: "/contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-cream bg-warm-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          {/* Logo de marca compuesto en tipografía (script + sans espaciada) */}
          <Link to="/" aria-label="Dermafisherton · Inicio" className="inline-block transition-opacity hover:opacity-85">
            <span
              className="block text-[3.6rem] leading-none text-[#c68095] md:text-[4.2rem]"
              style={{ fontFamily: "'Whisper', cursive" }}
            >
              Derma
            </span>
            <span className="mt-1 block pl-12 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#c68095]">
              Fisherton
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-[0.96rem] leading-relaxed text-brown/72">
            Cuidado dermatológico y estética con criterio profesional y
            resultados naturales, en Fisherton.
          </p>
          <div className="mt-7 flex gap-2.5">
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="grid h-11 w-11 place-items-center rounded-full border border-cream bg-cream/25 text-brown transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-sage-deep/50 hover:bg-sage/15 hover:text-graphite active:scale-95"
            >
              <WhatsappLogo size={20} weight="light" />
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-cream bg-cream/25 text-brown transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-sage-deep/50 hover:bg-sage/15 hover:text-graphite active:scale-95"
            >
              <InstagramLogo size={20} weight="light" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-taupe">
            Navegación
          </h4>
          <ul className="mt-5 space-y-3">
            {nav.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="inline-flex items-center gap-1 text-[0.96rem] text-brown/75 transition-colors duration-300 hover:text-graphite"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-taupe">
            Contacto y sede
          </h4>
          <ul className="mt-5 space-y-4 text-[0.95rem] text-brown/75">
            <li className="flex items-start gap-2.5">
              <MapPinLine size={20} weight="light" className="mt-0.5 shrink-0 text-sage-deep" />
              <span>{site.address}</span>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1 font-medium text-brown transition-colors hover:text-sage-deep"
              >
                {site.instagramHandle}
                <ArrowUpRight
                  size={13}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </li>
            <li className="border-t border-cream/80 pt-3">
              <ul className="space-y-2 tabular-nums">
                {site.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4 text-[0.92rem]">
                    <span>{h.day}</span>
                    <span className="text-brown/60">{h.value}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/80">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-taupe sm:flex-row">
          <p>© {new Date().getFullYear()} Dermafisherton. Todos los derechos reservados.</p>
          <p>Los resultados pueden variar según cada paciente y evaluación profesional.</p>
        </div>
      </div>
    </footer>
  );
}
