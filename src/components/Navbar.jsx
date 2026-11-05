import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import Button from "./Button";
import { tratamientosMenu, serviciosMenu } from "../data/menu";
import { waLink } from "../data/site";

// Ítems con `menu` despliegan una lista al pasar el cursor (desktop).
const links = [
  { to: "/", label: "Inicio", end: true },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/tratamientos", label: "Tratamientos", menu: tratamientosMenu, cols: 2 },
  { label: "Servicios", menu: serviciosMenu, cols: 1 },
  { to: "/tecnologia", label: "Tecnología" },
  { to: "/experiencia", label: "Experiencia" },
  { to: "/ubicacion", label: "Ubicación" },
  { to: "/contacto", label: "Contacto" },
];

// Panel desplegable del navbar (desktop) con arquitectura Double-Bezel.
function DropdownPanel({ items, cols, onNavigate }) {
  return (
    <div className="rounded-[1.5rem] border border-brown/10 bg-cream/45 p-1.5 shadow-lift backdrop-blur-xl">
      <div
        className={`rounded-[calc(1.5rem-0.375rem)] border border-white/80 bg-warm-white/95 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ${
          cols === 2 ? "grid w-[28rem] grid-cols-2 gap-1" : "w-60 space-y-0.5"
        }`}
      >
        {items.map((name) => (
          <a
            key={name}
            href={waLink(`Hola, quisiera consultar por ${name}.`)}
            target="_blank"
            rel="noreferrer"
            onClick={onNavigate}
            className="group/item flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-[0.88rem] font-medium text-brown/75 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-sage/14 hover:text-graphite"
          >
            <span>{name}</span>
            <ArrowUpRight
              size={13}
              weight="bold"
              className="shrink-0 text-sage-deep opacity-0 -translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/item:opacity-100 group-hover/item:translate-x-0"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

function Wordmark({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Dermafisherton · Inicio"
      className="inline-flex items-center transition-opacity duration-300 hover:opacity-85"
    >
      <img src="/brand/logo.webp" alt="Dermafisherton" className="h-9 w-auto md:h-11" />
    </Link>
  );
}

// Hamburger arquitectónico de 2 líneas que rota fluido hacia una 'X'.
function HamburgerToggle({ open, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={open}
      className="relative grid h-11 w-11 place-items-center rounded-full border border-brown/12 bg-warm-white text-graphite shadow-ambient transition-colors duration-300 hover:bg-cream/35 lg:hidden"
    >
      <span className="relative block h-3.5 w-5" aria-hidden>
        <span
          className={`absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5 rotate-0"
          }`}
        />
        <span
          className={`absolute right-0 h-[1.5px] rounded-full bg-current transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "top-1/2 w-5 -translate-y-1/2 -rotate-45" : "bottom-0.5 w-3.5 rotate-0"
          }`}
        />
      </span>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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

  // Cierra menús con tecla Escape (accesibilidad WCAG / UI-UX Pro Max).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Con el menú mobile abierto, bloquea el scroll de la página de fondo.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Navegación principal"
        className={`w-full border-b transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled
            ? "border-brown/10 bg-warm-white/90 shadow-soft backdrop-blur-xl"
            : "border-brown/[0.06] bg-warm-white/95 backdrop-blur-md"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[76px]">
          <Wordmark />

          {/* Desktop links — single line, ≤80px tall, animated active pill */}
          <ul className="hidden items-center gap-1.5 xl:gap-2 lg:flex">
            {links.map((l) => {
              const caret = l.menu && (
                <CaretDown
                  size={11}
                  weight="bold"
                  className={`transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    openMenu === l.label ? "rotate-180 text-sage-deep" : "opacity-70"
                  }`}
                />
              );
              return (
                <li
                  key={l.label}
                  className="relative"
                  onMouseEnter={l.menu ? () => setOpenMenu(l.label) : undefined}
                  onMouseLeave={l.menu ? () => setOpenMenu(null) : undefined}
                >
                  {l.to ? (
                    <NavLink
                      to={l.to}
                      end={l.end}
                      aria-haspopup={l.menu ? "menu" : undefined}
                      aria-expanded={l.menu ? openMenu === l.label : undefined}
                      onFocus={l.menu ? () => setOpenMenu(l.label) : undefined}
                      className={({ isActive }) =>
                        `relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-graphite"
                            : "text-brown/68 hover:bg-cream/35 hover:text-graphite"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <motion.span
                              layoutId="nav-active-pill"
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 32,
                              }}
                              className="absolute inset-0 -z-10 rounded-full border border-sage/35 bg-sage/16 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"
                            />
                          )}
                          <span>{l.label}</span>
                          {caret}
                        </>
                      )}
                    </NavLink>
                  ) : (
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={openMenu === l.label}
                      onClick={() =>
                        setOpenMenu((prev) => (prev === l.label ? null : l.label))
                      }
                      onFocus={() => setOpenMenu(l.label)}
                      className="relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.92rem] font-medium text-brown/68 transition-colors duration-300 hover:bg-cream/35 hover:text-graphite"
                    >
                      <span>{l.label}</span>
                      {caret}
                    </button>
                  )}

                  {/* Desplegable en hover con AnimatePresence suave */}
                  <AnimatePresence>
                    {l.menu && openMenu === l.label && (
                      <motion.div
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
                        className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                      >
                        <DropdownPanel
                          items={l.menu}
                          cols={l.cols}
                          onNavigate={() => setOpenMenu(null)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <Button to="/contacto" variant="primary" size="md" arrow>
              Reservar turno
            </Button>
          </div>

          {/* Mobile toggle */}
          <HamburgerToggle open={open} onClick={() => setOpen((v) => !v)} />
        </div>
      </nav>

      {/* Menú mobile — panel con revelación escalonada */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="max-h-[calc(100dvh-4rem)] w-full overflow-y-auto overscroll-contain border-b border-brown/10 bg-warm-white/96 shadow-lift backdrop-blur-2xl lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {links
                .filter((l) => l.to)
                .map((l, idx) => (
                  <motion.li
                    key={l.to}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.32,
                      delay: idx * 0.035,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                  >
                    <NavLink
                      to={l.to}
                      end={l.end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-2xl px-4 py-3 text-lg font-medium transition-colors ${
                          isActive
                            ? "border border-sage/30 bg-sage/15 text-graphite"
                            : "text-graphite hover:bg-cream/35"
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.li>
                ))}
            </ul>

            {/* Listas de tratamientos y servicios (mobile) */}
            <div className="container-page border-t border-cream/80 py-2">
              {[
                { label: "Tratamientos directos", items: tratamientosMenu },
                { label: "Servicios frecuentes", items: serviciosMenu },
              ].map((g) => (
                <div key={g.label}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu(openMenu === g.label ? null : g.label)
                    }
                    aria-expanded={openMenu === g.label}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                      openMenu === g.label
                        ? "bg-sage/15 text-sage-deep"
                        : "text-brown/85 hover:bg-cream/35"
                    }`}
                  >
                    {g.label}
                    <CaretDown
                      size={16}
                      weight="bold"
                      className={`transition-transform duration-300 ${
                        openMenu === g.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    aria-hidden={openMenu !== g.label}
                    className={`grid transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      openMenu === g.label
                        ? "grid-rows-[1fr] opacity-100"
                        : "pointer-events-none grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="grid grid-cols-2 gap-1 pb-2 pt-1">
                        {g.items.map((name) => (
                          <li key={name}>
                            <a
                              href={waLink(`Hola, quisiera consultar por ${name}.`)}
                              target="_blank"
                              rel="noreferrer"
                              tabIndex={openMenu === g.label ? 0 : -1}
                              onClick={() => setOpen(false)}
                              className="block rounded-xl px-3.5 py-2 text-[0.9rem] text-brown/80 transition-colors hover:bg-cream/40 hover:text-graphite"
                            >
                              {name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="container-page pb-5 pt-2">
              <Button
                to="/contacto"
                variant="primary"
                size="lg"
                arrow
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
