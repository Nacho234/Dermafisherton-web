// Cálculo de disponibilidad: funciones puras sobre el estado (sin efectos).
import { parseISO, todayISO, addDays, weekdayIdx, toMinutes, fromMinutes } from "./dates";

export const ACTIVE_STATUSES = ["pendiente", "confirmado"]; // ocupan el horario

export const getVisitType = (st, id) => st.visitTypes.find((v) => v.id === id);
export const getSpecialist = (st, id) => st.specialists.find((s) => s.id === id);

// Horarios disponibles ("HH:MM") de un especialista en una fecha
export function getSlots(st, specialistId, dateISO, visitTypeId, excludeId = null) {
  const sp = getSpecialist(st, specialistId);
  if (!sp || !sp.active) return [];
  if (st.settings.closedDates.some((c) => c.date === dateISO)) return [];
  if (sp.timeOff.some((t) => dateISO >= t.from && dateISO <= t.to)) return [];

  const dur = getVisitType(st, visitTypeId)?.durationMin ?? 30;
  const ranges = sp.weekly[weekdayIdx(parseISO(dateISO))] || [];
  const busy = st.appointments
    .filter(
      (a) =>
        a.specialistId === specialistId &&
        a.date === dateISO &&
        ACTIVE_STATUSES.includes(a.status) &&
        a.id !== excludeId
    )
    .map((a) => [toMinutes(a.time), toMinutes(a.time) + a.durationMin]);

  const [y, mo, d] = dateISO.split("-").map(Number);
  const minTs = Date.now() + st.settings.minAdvanceHours * 3600 * 1000;
  const out = [];
  for (const [from, to] of ranges) {
    for (let t = toMinutes(from); t + dur <= toMinutes(to); t += sp.slotMinutes) {
      if (new Date(y, mo - 1, d, Math.floor(t / 60), t % 60).getTime() < minTs) continue;
      if (busy.some(([a, b]) => t < b && t + dur > a)) continue;
      out.push(fromMinutes(t));
    }
  }
  return out;
}

// ¿Se puede reservar ese día? (dentro de la ventana y no cerrado)
export function inBookingWindow(st, iso) {
  const t = todayISO();
  return iso >= t && iso <= addDays(t, st.settings.maxDaysAhead);
}

export function dayHasSlots(st, specialistId, iso, visitTypeId) {
  return inBookingWindow(st, iso) && getSlots(st, specialistId, iso, visitTypeId).length > 0;
}

// Próximo turno libre de un especialista
export function nextAvailable(st, specialistId, visitTypeId) {
  const t = todayISO();
  for (let i = 0; i <= st.settings.maxDaysAhead; i++) {
    const iso = addDays(t, i);
    const slots = getSlots(st, specialistId, iso, visitTypeId);
    if (slots.length) return { date: iso, time: slots[0] };
  }
  return null;
}
