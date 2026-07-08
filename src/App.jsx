import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";

import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Tratamientos from "./pages/Tratamientos";
import Tecnologia from "./pages/Tecnologia";
import Experiencia from "./pages/Experiencia";
import Ubicacion from "./pages/Ubicacion";
import Contacto from "./pages/Contacto";
import Profesional from "./pages/Profesional";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/tratamientos" element={<Tratamientos />} />
          <Route path="/tecnologia" element={<Tecnologia />} />
          <Route path="/experiencia" element={<Experiencia />} />
          <Route path="/ubicacion" element={<Ubicacion />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/equipo/:slug" element={<Profesional />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
