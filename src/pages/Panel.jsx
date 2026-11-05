import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, CalendarDots, ListChecks, UsersThree, GearSix, SignOut, LockKey, ArrowUpRight } from "@phosphor-icons/react";
import { useBooking } from "../booking/store";
import OverviewTab from "../components/panel/OverviewTab";
import AgendaTab from "../components/panel/AgendaTab";
import AppointmentsTab from "../components/panel/AppointmentsTab";
import SpecialistsTab from "../components/panel/SpecialistsTab";
import SettingsTab from "../components/panel/SettingsTab";

// Acceso de DEMOSTRACIÓN: un PIN guardado en el front no es seguridad real.
// Con el backend (Supabase) se reemplaza por login de usuarios del equipo.
const PIN = import.meta.env.VITE_PANEL_PIN || "demo";
const AUTH_KEY = "dermafisherton.panel.auth";

const fieldBase =
  "min-h-[48px] w-full rounded-2xl border border-cream bg-surface-pure px-4 py-3 text-base text-brown focus:border-sage-deep focus:outline-none focus:ring-4 focus:ring-sage/20";

function Login({ onOk }) {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (pin.trim() === PIN) {
      try {
        sessionStorage.setItem(AUTH_KEY, "1");
      } catch {
        /* sin storage */
      }
      onOk();
    } else setErr("PIN incorrecto.");
  };
  return (
    <div className="grid min-h-dvh place-items-center bg-warm-white px-4">
      <form onSubmit={submit} className="bezel-shell w-full max-w-sm">
        <div className="bezel-core bg-surface-pure p-8 text-center">
          <img src="/brand/logo.webp" alt="Dermafisherton" className="mx-auto h-10 w-auto" />
          <span className="mx-auto mt-6 grid h-12 w-12 place-items-center rounded-full border border-sage/30 bg-sage/20 text-sage-deep">
            <LockKey size={22} weight="light" />
          </span>
          <h1 className="mt-4 font-display text-2xl text-graphite">Panel de turnos</h1>
          <p className="mt-1.5 text-sm text-brown/70">Ingresá el PIN para continuar.</p>
          <input
            type="password"
            inputMode="text"
            autoComplete="off"
            aria-label="PIN"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setErr("");
            }}
            className={`${fieldBase} mt-5 text-center tracking-widest`}
            placeholder="PIN"
          />
          {err && <p role="alert" className="mt-2 text-sm text-red-600">{err}</p>}
          <button type="submit" className="mt-5 w-full rounded-full bg-graphite py-3.5 font-medium text-warm-white transition-colors hover:bg-brown">
            Entrar
          </button>
          <p className="mt-5 rounded-xl bg-cream/30 px-3 py-2 text-xs leading-relaxed text-brown/70">
            Versión de demostración. PIN de prueba: <strong className="font-semibold text-graphite">{PIN}</strong>
          </p>
          <Link to="/" className="mt-4 inline-block text-sm font-semibold text-sage-deep underline-offset-4 hover:underline">
            Volver al sitio
          </Link>
        </div>
      </form>
    </div>
  );
}

const TABS = [
  { id: "inicio", label: "Inicio", icon: Bell, Comp: OverviewTab },
  { id: "agenda", label: "Agenda", icon: CalendarDots, Comp: AgendaTab },
  { id: "turnos", label: "Turnos", icon: ListChecks, Comp: AppointmentsTab },
  { id: "equipo", label: "Especialistas", icon: UsersThree, Comp: SpecialistsTab },
  { id: "ajustes", label: "Ajustes", icon: GearSix, Comp: SettingsTab },
];

export default function Panel() {
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [tab, setTab] = useState("inicio");
  const st = useBooking();

  if (!authed) return <Login onOk={() => setAuthed(true)} />;

  const pending = st.appointments.filter((a) => a.status === "pendiente").length;
  const Current = TABS.find((t) => t.id === tab).Comp;

  const logout = () => {
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      /* sin storage */
    }
    setAuthed(false);
  };

  return (
    <div className="min-h-dvh bg-warm-white">
      <header className="sticky top-0 z-40 border-b border-cream bg-warm-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 md:px-6">
          <Link to="/" className="shrink-0" aria-label="Ir al sitio">
            <img src="/brand/logo.webp" alt="Dermafisherton" className="h-9 w-auto" />
          </Link>
          <span className="rounded-full border border-cream bg-cream/40 px-3 py-1 text-xs font-semibold text-brown">Panel de turnos · demo</span>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-1.5 rounded-full border border-cream bg-surface-pure px-4 py-2 text-sm font-semibold text-brown transition-colors hover:border-sage/50 hover:bg-sage/10"
            >
              Ver reserva del paciente <ArrowUpRight size={13} weight="bold" />
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full border border-cream bg-surface-pure px-4 py-2 text-sm font-semibold text-brown transition-colors hover:bg-cream/40"
            >
              <SignOut size={15} /> Salir
            </button>
          </div>
        </div>
        <nav aria-label="Secciones del panel" className="mx-auto max-w-6xl overflow-x-auto px-4 pb-3 [scrollbar-width:none] md:px-6 [&::-webkit-scrollbar]:hidden">
          <ul className="flex gap-1.5">
            {TABS.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => setTab(id)}
                  aria-current={tab === id ? "page" : undefined}
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                    tab === id ? "bg-sage/20 text-graphite" : "text-brown/70 hover:bg-cream/50 hover:text-graphite"
                  }`}
                >
                  <Icon size={17} weight={tab === id ? "fill" : "light"} />
                  {label}
                  {id === "inicio" && pending > 0 && (
                    <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-[#7a5a1a] px-1.5 text-[0.68rem] font-bold text-white">{pending}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <Current />
      </main>
    </div>
  );
}
