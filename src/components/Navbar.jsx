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
      className="font-display text-2xl font-semibold tracking-tight text-graphite"
    >
      Derma<span className="text-sage-deep">fisherton</span>
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-cream/70 bg-warm-white/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="container-page flex h-[68px] items-center justify-between md:h-[76px]">
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
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="grid h-11 w-11 place-items-center rounded-full text-graphite lg:hidden"
          >
            <List size={26} />
          </button>
        </nav>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-warm-white lg:hidden"
          >
            <div className="container-page flex h-[68px] items-center justify-between">
              <Wordmark onClick={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="grid h-11 w-11 place-items-center rounded-full text-graphite"
              >
                <X size={26} />
              </button>
            </div>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
              }}
              className="container-page mt-8 flex flex-col gap-1"
            >
              {links.map((l) => (
                <motion.li
                  key={l.to}
                  variants={{
                    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={l.to}
                    end={l.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block border-b border-cream py-4 font-display text-3xl ${
                        isActive ? "text-sage-deep" : "text-graphite"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>

            <div className="container-page mt-8">
              <Button
                to="/contacto"
                variant="primary"
                size="lg"
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
