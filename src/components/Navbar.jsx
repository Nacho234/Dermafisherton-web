import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import Button from "./Button";

const links = [
  { to: "/", label: "Inicio", end: true },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/tratamientos", label: "Tratamientos" },
  { to: "/tecnologia", label: "Tecnología" },
  { to: "/experiencia", label: "Experiencia" },
  { to: "/ubicacion", label: "Ubicación" },
  { to: "/contacto", label: "Contacto" },
];

function Wordmark({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Dermafisherton — Inicio"
      className="inline-flex items-center"
    >
      <img src="/brand/logo.webp" alt="Dermafisherton" className="h-8 w-auto md:h-9" />
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú al pasar a desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 md:pt-4">
      <nav
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-[1.25rem] border pl-5 pr-3 transition-all duration-500 md:h-16 md:pl-7 md:pr-4 ${
          scrolled
            ? "border-graphite/10 bg-warm-white/85 shadow-lift backdrop-blur-xl"
            : "border-graphite/[0.06] bg-warm-white/65 shadow-soft backdrop-blur-md"
        }`}
      >
          <Wordmark />

          {/* Desktop links — one line, ≤80px tall */}
          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `relative text-sm transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-sage-deep after:transition-all after:duration-300 ${
                      isActive
                        ? "text-brown after:w-full"
                        : "text-brown/65 hover:text-brown after:w-0 hover:after:w-full"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button to="/contacto" variant="primary" size="md">
              Reservar turno
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full text-graphite lg:hidden"
          >
            {open ? <X size={24} /> : <List size={26} />}
          </button>
      </nav>

      {/* Menú mobile — panel flotante debajo del navbar (mismo estilo) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-[1.25rem] border border-graphite/10 bg-warm-white/95 p-3 shadow-lift backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-lg transition-colors ${
                        isActive
                          ? "bg-sage/15 text-sage-deep"
                          : "text-graphite hover:bg-black/[0.03]"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-2 px-1 pb-1">
              <Button
                to="/contacto"
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Reservar turno
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
