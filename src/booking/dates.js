// Utilidades de fechas (calendario lunes-primero, formato es-AR). Las fechas se
// manejan como strings "YYYY-MM-DD" y las horas como "HH:MM" (hora local).
export const pad = (n) => String(n).padStart(2, "0");
export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const parseISO = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};
export const todayISO = () => toISO(new Date());
export const addDays = (iso, n) => {
  const d = parseISO(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
};
// 0 = lunes … 6 = domingo
export const weekdayIdx = (d) => (d.getDay() + 6) % 7;

export const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
export const DAYS_LONG = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
export const DAYS_SHORT = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
export const WEEKDAY_HEADERS = ["L", "M", "M", "J", "V", "S", "D"];

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const monthLabel = (year, month) => `${cap(MONTHS[month])} ${year}`;

// Celdas de un mes: null para relleno, "YYYY-MM-DD" para días reales
export function monthGrid(year, month) {
  const lead = weekdayIdx(new Date(year, month, 1));
  const days = new Date(year, month + 1, 0).getDate();
  const cells = Array(lead).fill(null);
  for (let d = 1; d <= days; d++) cells.push(toISO(new Date(year, month, d)));
  while (cells.length % 7) cells.push(null);
  return cells;
}

export function formatLong(iso) {
  const d = parseISO(iso);
  return `${DAYS_LONG[weekdayIdx(d)]} ${d.getDate()} de ${MONTHS[d.getMonth()]}`;
}
// Primera letra en mayúscula ("jueves 5 de noviembre" -> "Jueves 5 de noviembre")
export const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export function formatShort(iso) {
  const d = parseISO(iso);
  return `${DAYS_SHORT[weekdayIdx(d)]} ${d.getDate()}/${pad(d.getMonth() + 1)}`;
}

export const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
export const fromMinutes = (min) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;

// Teléfono argentino -> formato wa.me (mejor esfuerzo): 341 555 5555 -> 5493415555555
export function waPhone(raw) {
  let d = String(raw || "").replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("54")) return d;
  d = d.replace(/^0/, "");
  return "549" + d;
}

// Archivo .ics para "agregar al calendario"
export function buildICS({ title, date, time, durationMin, location, description }) {
  const start = parseISO(date);
  const [h, m] = time.split(":").map(Number);
  start.setHours(h, m, 0, 0);
  const end = new Date(start.getTime() + durationMin * 60000);
  const fmt = (d) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const esc = (s) => String(s || "").replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dermafisherton//Turnos//ES",
    "BEGIN:VEVENT",
    `UID:${Date.now()}-${Math.random().toString(36).slice(2)}@dermafisherton`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${esc(title)}`,
    `LOCATION:${esc(location)}`,
    `DESCRIPTION:${esc(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadFile(filename, content, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([content], { type: `${type};charset=utf-8` }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
