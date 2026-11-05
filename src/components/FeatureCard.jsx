import Reveal from "./Reveal";

// Tarjeta de pilar/valor (ícono + título + texto) con vida al interactuar:
// se eleva, el ícono se llena de verde, entra una luz suave en la esquina,
// un ícono grande aparece de fondo y crece una línea inferior.
// layout "column": ícono arriba. layout "row": ícono a la izquierda.
export default function FeatureCard({ icon: Icon, title, text, layout = "column", delay = 0 }) {
  const row = layout === "row";
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group bezel-shell h-full transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 hover:shadow-lift">
        <div
          className={`bezel-core relative flex h-full overflow-hidden bg-surface-pure p-8 ${
            row ? "gap-5" : "flex-col"
          }`}
        >
          {/* Luz verde suave en la esquina */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-sage/25 opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          />
          {/* Ícono grande de fondo */}
          <Icon
            aria-hidden
            size={160}
            weight="thin"
            className="pointer-events-none absolute -bottom-10 -right-6 text-sage-deep/[0.07] transition-[transform,color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1 group-hover:scale-110 group-hover:text-sage-deep/[0.12]"
          />

          <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-sage/30 bg-sage/18 text-sage-deep transition-colors duration-500 group-hover:border-sage-deep group-hover:bg-sage-deep group-hover:text-white">
            <Icon size={24} weight="light" />
          </span>
          <div className="relative">
            <h3 className={`text-2xl text-graphite ${row ? "" : "mt-6"}`}>{title}</h3>
            <p className={`text-[0.98rem] leading-relaxed text-brown/72 ${row ? "mt-2.5" : "mt-3"}`}>
              {text}
            </p>
          </div>

          {/* Línea inferior que crece al hover */}
          <span
            aria-hidden
            className="absolute inset-x-8 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-sage-deep transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100"
          />
        </div>
      </div>
    </Reveal>
  );
}
