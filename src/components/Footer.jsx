import { Link } from "react-router-dom";
import { InstagramLogo, WhatsappLogo, MapPinLine } from "@phosphor-icons/react";
import { site, waLink } from "../data/site";
import logoCursiva from "../assets/logo-cursiva.webp";

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
    <footer className="border-t border-cream bg-cream-soft/50">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link to="/" aria-label="Dermafisherton — Inicio" className="inline-block">
            <img
              src={logoCursiva}
              alt="Derma Fisherton"
              className="h-20 w-auto md:h-24"
            />
          </Link>
          <p className="mt-5 max-w-sm text-[0.98rem] leading-relaxed text-brown/70">
            Cuidado dermatológico y estética con criterio profesional y
            resultados naturales, en Fisherton.
          </p>
          <div className="mt-7 flex gap-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="grid h-11 w-11 place-items-center rounded-full border border-taupe/30 text-brown transition-colors hover:border-brown hover:bg-warm-white"
            >
              <WhatsappLogo size={20} />
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-taupe/30 text-brown transition-colors hover:border-brown hover:bg-warm-white"
            >
              <InstagramLogo size={20} />
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-taupe">
            Secciones
          </h4>
          <ul className="mt-5 space-y-3">
            {nav.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-[0.98rem] text-brown/75 transition-colors hover:text-brown"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-taupe">
            Contacto
          </h4>
          <ul className="mt-5 space-y-4 text-[0.98rem] text-brown/75">
            <li className="flex items-start gap-2.5">
              <MapPinLine size={20} className="mt-0.5 shrink-0 text-sage-deep" />
              <span>{site.address}</span>
            </li>
            <li>
              <a href={site.instagram} className="hover:text-brown">
                {site.instagramHandle}
              </a>
            </li>
            {site.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-brown/55">{h.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-taupe sm:flex-row">
          <p>© {new Date().getFullYear()} Dermafisherton. Todos los derechos reservados.</p>
          <p>Los resultados pueden variar según cada paciente y evaluación profesional.</p>
        </div>
      </div>
    </footer>
  );
}
