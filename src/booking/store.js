// Almacén de turnos. HOY guarda en localStorage (modo demo, sin backend).
// Toda la lectura/escritura pasa por este archivo: para conectar Supabase u otro
// backend, se reemplaza la persistencia (load/persist) y las acciones, y la UI no cambia.
import { useSyncExternalStore } from "react";
import { buildSeed, makeCode, VERSION } from "./seed";
import { getSlots, getVisitType, ACTIVE_STATUSES } from "./availability";

const KEY = "dermafisherton.booking.v1";
const listeners = new Set();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.version === VERSION) return parsed;
    }
  } catch {
    /* sin storage: sigue en memoria */
  }
  return buildSeed();
}

let state = load();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* sin storage */
  }
}
function commit(next) {
  state = next;
  persist();
  listeners.forEach((l) => l());
}

// Sincroniza entre pestañas (por ejemplo, paciente en una y panel en otra)
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      state = load();
      listeners.forEach((l) => l());
    }
  });
}

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
export const getState = () => state;
export const useBooking = () => useSyncExternalStore(subscribe, getState, getState);

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-3);

// ---------------------------- acciones ----------------------------
export const bookingApi = {
  /** Crea un turno. Verifica que el horario siga libre. */
  createAppointment({ specialistId, visitTypeId, date, time, patient, status = "pendiente", source = "web" }) {
    const slots = getSlots(state, specialistId, date, visitTypeId);
    if (!slots.includes(time)) return { ok: false, error: "Ese horario ya no está disponible. Elegí otro." };
    const appt = {
      id: uid(),
      code: makeCode(),
      specialistId,
      visitTypeId,
      date,
      time,
      durationMin: getVisitType(state, visitTypeId).durationMin,
      status,
      patient,
      createdAt: Date.now(),
      source,
    };
    commit({ ...state, appointments: [...state.appointments, appt] });
    return { ok: true, appointment: appt };
  },

  setStatus(id, status) {
    commit({
      ...state,
      appointments: state.appointments.map((a) => (a.id === id ? { ...a, status } : a)),
    });
  },

  reschedule(id, { specialistId, date, time }) {
    const cur = state.appointments.find((a) => a.id === id);
    if (!cur) return { ok: false, error: "No se encontró el turno." };
    const spec = specialistId || cur.specialistId;
    if (!getSlots(state, spec, date, cur.visitTypeId, id).includes(time))
      return { ok: false, error: "Ese horario no está disponible." };
    commit({
      ...state,
      appointments: state.appointments.map((a) =>
        a.id === id ? { ...a, specialistId: spec, date, time, status: a.status === "cancelado" ? "pendiente" : a.status } : a
      ),
    });
    return { ok: true };
  },

  removeAppointment(id) {
    commit({ ...state, appointments: state.appointments.filter((a) => a.id !== id) });
  },

  updateSpecialist(id, patch) {
    commit({
      ...state,
      specialists: state.specialists.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });
  },
  setWeekly(id, weekday, ranges) {
    commit({
      ...state,
      specialists: state.specialists.map((s) =>
        s.id === id ? { ...s, weekly: { ...s.weekly, [weekday]: ranges } } : s
      ),
    });
  },
  addTimeOff(id, item) {
    commit({
      ...state,
      specialists: state.specialists.map((s) =>
        s.id === id ? { ...s, timeOff: [...s.timeOff, { ...item, id: uid() }] } : s
      ),
    });
  },
  removeTimeOff(id, offId) {
    commit({
      ...state,
      specialists: state.specialists.map((s) =>
        s.id === id ? { ...s, timeOff: s.timeOff.filter((t) => t.id !== offId) } : s
      ),
    });
  },

  updateSettings(patch) {
    commit({ ...state, settings: { ...state.settings, ...patch } });
  },
  addClosedDate(date, reason) {
    if (state.settings.closedDates.some((c) => c.date === date)) return;
    commit({
      ...state,
      settings: {
        ...state.settings,
        closedDates: [...state.settings.closedDates, { date, reason }].sort((a, b) => a.date.localeCompare(b.date)),
      },
    });
  },
  removeClosedDate(date) {
    commit({
      ...state,
      settings: { ...state.settings, closedDates: state.settings.closedDates.filter((c) => c.date !== date) },
    });
  },

  resetDemo() {
    commit(buildSeed());
  },
};

export { ACTIVE_STATUSES };
