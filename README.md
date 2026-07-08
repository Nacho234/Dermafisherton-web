# Dermafisherton

Sitio web premium multipágina para una clínica de dermatología y estética en Fisherton.
Diseño minimalista, editorial y médico-cálido. React + Vite + Tailwind v4 + Motion.

## Correr localmente

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de producción en /dist
npm run preview  # sirve el build
```

## Estructura

```
src/
  components/   Navbar, Footer, Button, PageHero, SectionHeader,
                TreatmentCard, TestimonialCard, FAQAccordion, CTASection,
                WhatsAppFloatingButton, EditorialImage, Reveal, ContactForm
  data/         site.js (contacto/horarios), treatments.js, content.js (faqs, testimonios)
  pages/        Home, Nosotros, Tratamientos, Tecnologia, Experiencia, Ubicacion, Contacto
  index.css     tokens de diseño (@theme), fuentes self-hosted, utilidades
```

## Qué editar antes de publicar (placeholders)

Todo lo sensible es placeholder editable. Buscá los `[ ... ]`:

- **`src/data/site.js`** — número de WhatsApp, Instagram, dirección exacta, horarios, embed de Google Maps.
- **`src/pages/Nosotros.jsx`** — nombre de la dermatóloga, especialidad, matrícula, descripción.
- **`src/pages/Tecnologia.jsx`** — aparatología y protocolos específicos.
- **Fotos** — hoy usan placeholders (`EditorialImage` con Picsum en escala de grises bajo un velo cálido). Reemplazá por fotografía real del consultorio, tratamientos y equipo.

## Notas de diseño

- Paleta cálida con **un solo acento** (verde salvia). Serif *Cormorant Garamond* + sans *Manrope*.
- Animaciones suaves con `prefers-reduced-motion` respetado.
- Comunicación responsable: sin promesas médicas, resultados presentados como variables.

## Deploy

SPA con rewrites listos para **Vercel** (`vercel.json`) y **Netlify** (`public/_redirects`).
