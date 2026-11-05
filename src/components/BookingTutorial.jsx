import { useEffect, useRef, useState } from "react";
import { Calendar, WhatsappLogo } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

// Videos tutoriales cortos: las dos formas de pedir un turno (demostración con el
// sitio real). Reutilizable: se usa en Contacto y en Experiencia.
const VIDEOS = [
  {
    id: "online",
    label: "Reservá online",
    icon: Calendar,
    src: "/tutorial/reservar-online.mp4",
    poster: "/tutorial/reservar-online-poster.jpg",
    aria: "Video tutorial: cómo reservar un turno online, eligiendo especialista, día y horario",
  },
  {
    id: "whatsapp",
    label: "Escribinos por WhatsApp",
    icon: WhatsappLogo,
    src: "/tutorial/reservar-whatsapp.mp4",
    poster: "/tutorial/reservar-whatsapp-poster.jpg",
    aria: "Video tutorial: cómo pedir un turno escribiendo por WhatsApp",
  },
];

export default function BookingTutorial({
  title = "Cómo reservar tu turno, paso a paso",
  intro = "Hay dos formas de pedir tu turno. Elegí cuál querés ver.",
  className = "",
}) {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false); // solo reproduce solo después de elegir una pestaña
  const ref = useRef(null);
  const v = VIDEOS[active];

  useEffect(() => {
    if (touched) ref.current?.play().catch(() => {});
  }, [active, touched]);

  return (
    <div className={className}>
      <SectionHeader title={title} intro={intro} align="center" className="mx-auto" />

      <div className="mt-8 flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Forma de pedir el turno">
        {VIDEOS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => {
              setTouched(true);
              setActive(i);
            }}
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[0.95rem] font-medium transition-colors duration-300 ${
              active === i
                ? "border-sage-deep bg-sage-deep text-white shadow-ambient"
                : "border-cream bg-surface-pure text-brown hover:border-sage/50 hover:bg-sage/10"
            }`}
          >
            <t.icon size={18} weight={active === i ? "fill" : "light"} />
            {t.label}
          </button>
        ))}
      </div>

      <Reveal y={26}>
        <div className="bezel-shell mx-auto mt-8 max-w-4xl">
          <video
            key={v.id}
            ref={ref}
            src={v.src}
            poster={v.poster}
            controls
            playsInline
            preload="metadata"
            aria-label={v.aria}
            className="bezel-core block aspect-video w-full bg-cream object-cover"
          />
        </div>
      </Reveal>
    </div>
  );
}
