// Estructura editable de tratamientos. Los servicios son orientativos:
// no se afirma disponibilidad. Ajustar según lo confirmado por la clínica.

export const featured = [
  {
    slug: "dermatologia-clinica",
    title: "Dermatología clínica",
    blurb: "Evaluación y seguimiento de la salud de tu piel con criterio médico.",
    seed: "derma-consult-skin",
  },
  {
    slug: "estetica-facial",
    title: "Estética facial",
    blurb: "Protocolos faciales indicados según las necesidades de tu piel.",
    seed: "facial-skincare-calm",
  },
  {
    slug: "depilacion-laser",
    title: "Depilación láser",
    blurb: "Tratamiento por zonas, planificado de forma personalizada.",
    seed: "laser-clinic-soft",
  },
  {
    slug: "peelings-manchas",
    title: "Peelings y manchas",
    blurb: "Mejora de textura, luminosidad y tratamiento de manchas.",
    seed: "peeling-glow-face",
  },
  {
    slug: "armonizacion-facial",
    title: "Botox y armonización facial",
    blurb: "Resultados naturales, con evaluación previa y equilibrio.",
    seed: "aesthetic-natural-face",
  },
  {
    slug: "corporales",
    title: "Tratamientos corporales",
    blurb: "Abordajes corporales según objetivos y evaluación profesional.",
    seed: "body-treatment-spa",
  },
];

export const categories = [
  {
    slug: "dermatologia-clinica",
    title: "Dermatología clínica",
    intro: "El cuidado de la salud de la piel, con diagnóstico y seguimiento.",
    seed: "derma-clinic-consult",
    services: [
      { name: "Acné", benefit: "Abordaje según tipo y evolución." },
      { name: "Rosácea", benefit: "Control de brotes y cuidado de la barrera." },
      { name: "Manchas", benefit: "Evaluación del origen antes de indicar." },
      { name: "Control de lunares", benefit: "Seguimiento profesional." },
      { name: "Cuidado general de la piel", benefit: "Rutina indicada para vos." },
    ],
  },
  {
    slug: "estetica-facial",
    title: "Estética facial",
    intro: "Procedimientos faciales orientados a resultados naturales.",
    seed: "facial-aesthetic-soft",
    services: [
      { name: "Botox", benefit: "Expresión natural, sin sobrecargar." },
      { name: "Skinbooster", benefit: "Hidratación profunda de la piel." },
      { name: "Bioestimulación", benefit: "Estímulo gradual y progresivo." },
      { name: "Rellenos", benefit: "Volumen equilibrado, según evaluación." },
      { name: "Armonización facial", benefit: "Proporción y armonía del rostro." },
    ],
  },
  {
    slug: "peelings-manchas",
    title: "Peelings y manchas",
    intro: "Renovación de la piel y mejora de la luminosidad.",
    seed: "peeling-skin-glow",
    services: [
      { name: "Peelings químicos", benefit: "Renovación controlada de la piel." },
      { name: "Tratamientos despigmentantes", benefit: "Trabajo sobre manchas." },
      { name: "Mejora de textura", benefit: "Piel más uniforme al tacto." },
      { name: "Luminosidad", benefit: "Aspecto más saludable y fresco." },
    ],
  },
  {
    slug: "depilacion-laser",
    title: "Depilación láser",
    intro: "Planificada por zonas, con protocolos personalizados.",
    seed: "laser-hair-clinic",
    services: [
      { name: "Rostro", benefit: "Zonas delicadas con cuidado." },
      { name: "Piernas", benefit: "Sesiones planificadas." },
      { name: "Axilas", benefit: "Tratamiento por etapas." },
      { name: "Cavado", benefit: "Protocolo según la piel." },
      { name: "Zonas corporales", benefit: "Plan adaptado a cada persona." },
    ],
  },
  {
    slug: "corporales",
    title: "Tratamientos corporales",
    intro: "Abordajes del cuerpo según objetivos evaluados.",
    seed: "body-contour-spa",
    services: [
      { name: "Modelado corporal", benefit: "Trabajo sobre el contorno." },
      { name: "Celulitis", benefit: "Mejora del aspecto de la piel." },
      { name: "Flacidez", benefit: "Estímulo de firmeza." },
      { name: "Reducción localizada", benefit: "Zonas específicas evaluadas." },
    ],
  },
];
