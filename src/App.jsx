import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";
import Button from "./components/Button";

import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Tratamientos from "./pages/Tratamientos";
import Tecnologia from "./pages/Tecnologia";
import Experiencia from "./pages/Experiencia";
import Ubicacion from "./pages/Ubicacion";
import Contacto from "./pages/Contacto";
import Profesional from "./pages/Profesional";
import Panel from "./pages/Panel";

function NotFound() {
  return (
    <section className="container-page flex min-h-[72dvh] flex-col items-center justify-center py-28 text-center">
      <span className="eyebrow">Página no encontrada</span>
      <h1 className="mt-4 text-4xl sm:text-5xl">
        No encontramos esta sección
      </h1>
      <p className="mt-4 max-w-md text-brown/75">
        Puede que el enlace haya cambiado. Volvé al inicio o explorá nuestros
        tratamientos disponibles.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/" variant="primary" size="md" arrow>
          Volver al inicio
        </Button>
        <Button to="/tratamientos" variant="outline" size="md">
          Ver tratamientos
        </Button>
      </div>
    </section>
  );
}

export default function App() {
  const location = useLocation();
  const reduce = useReducedMotion();

  // Panel de turnos: pantalla propia, sin la navegación pública del sitio
  if (location.pathname.startsWith("/panel")) {
    return (
      <>
        <ScrollToTop />
        <Panel />
      </>
    );
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-graphite focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-warm-white focus:shadow-lift"
      >
        Saltar al contenido principal
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.26, ease: [0.32, 0.72, 0, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/tratamientos" element={<Tratamientos />} />
              <Route path="/tecnologia" element={<Tecnologia />} />
              <Route path="/experiencia" element={<Experiencia />} />
              <Route path="/ubicacion" element={<Ubicacion />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/equipo/:slug" element={<Profesional />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
