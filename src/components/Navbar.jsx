import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretDown, List, X } from "@phosphor-icons/react";
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

// Panel desplegable del navbar (desktop).
function DropdownPanel({ items, cols, onNavigate }) {
  return (
    <div
      className={`rounded-2xl border border-graphite/10 bg-warm-white p-2.5 shadow-lift ${
        cols === 2 ? "grid w-[26rem] grid-cols-2 gap-x-1" : "w-56"
      }`}
    >
      {items.map((name) => (
        <a
          key={name}
          href={waLink(`Hola, quisiera consultar por ${name}.`)}
          target="_blank"
          rel="noreferrer"
          onClick={onNavigate}
          className="block rounded-lg px-3.5 py-2 text-[0.9rem] text-brown/75 transition-colors hover:bg-sage/10 hover:text-brown"
        >
          {name}
        </a>
      ))}
    </div>
  );
}

function Wordmark({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Dermafisherton — Inicio"
      className="inline-flex items-center"
    >
      <img src="/brand/logo.webp" alt="Dermafisherton" className="h-9 w-auto md:h-11" />
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // label del desplegable activo
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

  // Con el menú mobile abierto, bloquea el scroll de la página de fondo
  // (el scroll pasa a ser interno del panel).
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`w-full border-b bg-warm-white/95 backdrop-blur-md transition-shadow duration-500 ${
          scrolled
            ? "border-graphite/10 shadow-soft"
            : "border-graphite/[0.06]"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
          <Wordmark />

          {/* Desktop links — one line, ≤80px tall */}
          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((l) => {
              const linkCls = ({ isActive }) =>
                `relative inline-flex items-center gap-1 text-[0.95rem] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-sage-deep after:transition-all after:duration-300 ${
                  isActive
                    ? "text-brown after:w-full"
                    : "text-brown/65 hover:text-brown after:w-0 hover:after:w-full"
                }`;
              const caret = l.menu && (
                <CaretDown
                  size={12}
                  weight="bold"
                  className={`transition-transform duration-300 ${
                    openMenu === l.label ? "rotate-180" : ""
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
                      className={linkCls}
                    >
                      {l.label}
                      {caret}
                    </NavLink>
                  ) : (
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={openMenu === l.label}
                      onFocus={() => setOpenMenu(l.label)}
                      className={linkCls({ isActive: false })}
                    >
                      {l.label}
                      {caret}
                    </button>
                  )}

                  {/* Desplegable en hover (montaje condicional: al cerrar se
                      desmonta al instante, sin dejar nodos que tapen clicks) */}
                  {l.menu && openMenu === l.label && (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                    >
                      <DropdownPanel
                        items={l.menu}
                        cols={l.cols}
                        onNavigate={() => setOpenMenu(null)}
                      />
                    </motion.div>
                  )}
                </li>
              );
            })}
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
        </div>
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
            className="w-full max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-graphite/10 bg-warm-white/98 shadow-soft backdrop-blur-xl lg:hidden"
          >
            <ul className="container-page flex flex-col py-3">
              {links
                .filter((l) => l.to)
                .map((l) => (
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

            {/* Listas de tratamientos y servicios (mobile): cerradas por
                defecto, se despliegan con un toque en cada sección. */}
            <div className="container-page pb-2">
              {[
                { label: "Tratamientos", items: tratamientosMenu },
                { label: "Servicios", items: serviciosMenu },
              ].map((g) => (
                <div key={g.label}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu(openMenu === g.label ? null : g.label)
                    }
                    aria-expanded={openMenu === g.label}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-lg transition-colors ${
                      openMenu === g.label
                        ? "bg-sage/15 text-sage-deep"
                        : "text-graphite hover:bg-black/[0.03]"
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
                  {/* Colapso por CSS (grid-rows): apertura y cierre suaves sin
                      desmontar, y sin capturar toques cuando está cerrado. */}
                  <div
                    aria-hidden={openMenu !== g.label}
                    className={`grid transition-all duration-300 ease-out ${
                      openMenu === g.label
                        ? "grid-rows-[1fr] opacity-100"
                        : "pointer-events-none grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="grid grid-cols-2 pb-2">
                        {g.items.map((name) => (
                          <li key={name}>
                            <a
                              href={waLink(`Hola, quisiera consultar por ${name}.`)}
                              target="_blank"
                              rel="noreferrer"
                              tabIndex={openMenu === g.label ? 0 : -1}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-4 py-2 text-[0.95rem] text-brown/80 transition-colors hover:bg-black/[0.03]"
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
            <div className="container-page pb-4">
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
