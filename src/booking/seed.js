// Datos de EJEMPLO para la demo (los horarios y turnos son ficticios: la clínica
// los edita desde el panel). Se crean la primera vez que se abre el sitio.
import { team } from "../data/team";
import { toISO, addDays, todayISO, parseISO } from "./dates";
import { getSlots } from "./availability";

export const VERSION = 1;

export const visitTypes = [
  { id: "primera-consulta", title: "Primera consulta", durationMin: 30, blurb: "Evaluación inicial de tu piel y de tus objetivos." },
  { id: "control", title: "Control o seguimiento", durationMin: 20, blurb: "Revisión de un tratamiento o plan en curso." },
  { id: "tratamiento", title: "Consulta por un tratamiento", durationMin: 45, blurb: "Evaluación e indicación de un procedimiento específico." },
];

// Horarios semanales de ejemplo (0 = lunes … 6 = domingo)
const weeklyBySlug = {
  "clara-bernardini": { 0: [["09:00", "13:00"]], 2: [["09:00", "13:00"]], 4: [["09:00", "13:00"]], 1: [["14:00", "18:00"]], 3: [["14:00", "18:00"]] },
  "pablo-martinez-francesio": { 1: [["09:00", "13:00"]], 3: [["09:00", "13:00"]] },
  "lucia-trossero": { 0: [["15:00", "19:00"]], 1: [["15:00", "19:00"]], 2: [["15:00", "19:00"]], 3: [["15:00", "19:00"]], 4: [["15:00", "19:00"]], 5: [["09:00", "13:00"]] },
  "patricia-suarez": { 2: [["09:00", "13:00"]], 4: [["14:00", "18:00"]] },
  "marina-berniche": { 0: [["10:00", "14:00"]], 3: [["10:00", "14:00"]] },
};

function buildSpecialists() {
  return team.map((m) => ({
    id: m.slug,
    name: m.name,
    role: m.role,
    active: true,
    slotMinutes: 30,
    weekly: weeklyBySlug[m.slug] || {},
    timeOff: [],
  }));
}

const uid = () => Math.random().toString(36).slice(2, 10);
export const makeCode = () => "DF-" + Math.random().toString(36).slice(2, 7).toUpperCase();

export function buildSeed() {
  const st = {
    version: VERSION,
    specialists: buildSpecialists(),
    visitTypes,
    settings: { minAdvanceHours: 12, maxDaysAhead: 60, closedDates: [] },
    appointments: [],
  };

  const mk = (specialistId, visitTypeId, date, time, status, name, phone, interest = "", notes = "") => ({
    id: uid(),
    code: makeCode(),
    specialistId,
    visitTypeId,
    date,
    time,
    durationMin: visitTypes.find((v) => v.id === visitTypeId).durationMin,
    status,
    patient: { name, phone, email: "", interest, notes },
    createdAt: Date.now() - Math.floor(Math.random() * 3e5) - 3e6,
    source: "demo",
  });

  // Turnos de ejemplo en los próximos días, usando horarios realmente disponibles
  const demo = [
    ["clara-bernardini", "primera-consulta", 0, 0, "pendiente", "Valentina Rossi", "341 555 0101", "Manchas", "Quiero revisar unas manchas en la cara."],
    ["clara-bernardini", "control", 0, 2, "confirmado", "Martín Gómez", "341 555 0102"],
    ["lucia-trossero", "tratamiento", 1, 1, "pendiente", "Camila Ledesma", "341 555 0103", "Radiesse"],
    ["lucia-trossero", "primera-consulta", 2, 0, "confirmado", "Julieta Ferrari", "341 555 0104", "Evaluación general"],
    ["pablo-martinez-francesio", "primera-consulta", 3, 0, "pendiente", "Nicolás Peralta", "341 555 0105"],
    ["patricia-suarez", "tratamiento", 4, 0, "confirmado", "Sofía Aguirre", "341 555 0106", "Mesoterapia"],
  ];
  const used = [];
  for (const [spec, vt, dayOffset, pick, status, name, phone, interest, notes] of demo) {
    // primer día >= hoy+dayOffset en el que el especialista tenga horarios
    for (let i = dayOffset; i < dayOffset + 14; i++) {
      const date = addDays(todayISO(), i);
      const slots = getSlots(st, spec, date, vt);
      if (slots.length > pick) {
        const a = mk(spec, vt, date, slots[pick], status, name, phone, interest, notes);
        st.appointments.push(a);
        used.push(a);
        break;
      }
    }
  }
  // Un turno pasado (completado) y uno cancelado, para que el historial no esté vacío
  const past = toISO(new Date(Date.now() - 2 * 86400000));
  st.appointments.push(mk("clara-bernardini", "primera-consulta", past, "10:00", "completado", "Lucía Benítez", "341 555 0107"));
  st.appointments.push(mk("lucia-trossero", "control", addDays(todayISO(), 5), "16:00", "cancelado", "Agustina Díaz", "341 555 0108"));
  void parseISO;
  return st;
}
