// ---------------------------------------------------------------------------
// Equipo / especialistas. Fotos en src/assets/team/ (cuadradas, se recortan
// en la card). Datos tomados de los perfiles de Instagram de cada profesional.
// `slug` define la URL del perfil: /equipo/<slug>
// `details` son puntos verificables (no inventar matrículas ni credenciales).
// ---------------------------------------------------------------------------
import clara from "../assets/team/clara.webp";
import pablo from "../assets/team/pablo.webp";
import lucia from "../assets/team/lucia.webp";
import patricia from "../assets/team/patricia.webp";
import marina from "../assets/team/marina.webp";

export const team = [
  {
    slug: "clara-bernardini",
    name: "Dra. Clara Bernardini",
    role: "Dermatología",
    photo: clara,
    bio: "Médica dermatóloga, dedicada a la salud y el cuidado de la piel.",
    bioLong:
      "Médica dermatóloga. Acompaña a cada paciente con una evaluación profesional previa, priorizando la salud de la piel y resultados naturales.",
    details: [
      "Atiende en El Bosque Centro Médico (Grupo Gamma)",
      "Consultorios Génova, Fisherton — Dermafisherton",
    ],
  },
  {
    slug: "pablo-martinez-francesio",
    name: "Dr. Pablo Martínez Francesio",
    role: "Cirugía plástica",
    photo: pablo,
    bio: "Cirujano plástico. Cirugías estéticas y reparadoras.",
    bioLong:
      "Cirujano plástico. Director del Centro de Cirugía Plástica y Láser, con foco en procedimientos estéticos y reparadores.",
    details: [
      "Director del Centro de Cirugía Plástica y Láser",
      "Cirugías estéticas y reparadoras",
    ],
  },
  {
    slug: "lucia-trossero",
    name: "Dra. Lucía Trossero",
    role: "Medicina estética",
    photo: lucia,
    bio: "Medicina estética, nutrición y medicina ortomolecular.",
    bioLong:
      "Ciencia aplicada a tu piel: medicina estética, nutrición y medicina ortomolecular. Docente, con doctorado en Ciencias Biológicas.",
    details: [
      "Medicina estética, nutrición y ortomolecular",
      "Docente",
      "Doctorado en Ciencias Biológicas",
    ],
  },
  {
    slug: "patricia-suarez",
    name: "Patricia Suarez",
    role: "Bioquímica · Medicina regenerativa",
    photo: patricia,
    bio: "Especialista en plasma rico en plaquetas y regeneración cutánea.",
    bioLong:
      "Especialista en plasma rico en plaquetas y regeneración cutánea basada en evidencia. Miembro del Comité de Bioquímica Regenerativa.",
    details: [
      "Plasma rico en plaquetas (PRP)",
      "Regeneración cutánea basada en evidencia",
      "Miembro del Comité de Bioquímica Regenerativa",
    ],
  },
  {
    slug: "marina-berniche",
    name: "Dra. Marina Berniche",
    role: "Oftalmología",
    photo: marina,
    bio: "Médica oftalmóloga dedicada al cuidado de la salud visual.",
    bioLong:
      "Médica oftalmóloga dedicada al cuidado de la salud visual, con más de 20 años de experiencia.",
    details: [
      "Más de 20 años de experiencia",
      "Cuidado integral de la salud visual",
    ],
  },
];

export function getMember(slug) {
  return team.find((m) => m.slug === slug);
}
