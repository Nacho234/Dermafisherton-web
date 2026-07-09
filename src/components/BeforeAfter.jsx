import { useRef, useState } from "react";
import { ArrowsLeftRight } from "@phosphor-icons/react";

// Comparador antes/después con manija deslizable (mouse y touch).
// `pairs`: [{ label, alt, before, after }] — con más de un par se muestran
// pestañas para cambiar de comparativa.
export default function BeforeAfter({ pairs, className = "" }) {
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState(50); // % visible de la foto "antes"
  const frameRef = useRef(null);
  const dragging = useRef(false);
  const pair = pairs[idx];

  const setFromClientX = (clientX) => {
    const r = frameRef.current?.getBoundingClientRect();
    if (!r) return;
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(94, Math.max(6, pct)));
  };

  return (
    <div className={className}>
      {/* Pestañas cuando hay más de una comparativa */}
      {pairs.length > 1 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {pairs.map((p, i) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setIdx(i);
                setPos(50);
              }}
              aria-pressed={i === idx}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                i === idx
                  ? "border-transparent bg-sage-deep text-warm-white"
                  : "border-taupe/25 text-brown/70 hover:border-brown hover:text-brown"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      <div
        ref={frameRef}
        role="slider"
        aria-label={`Comparar antes y después: ${pair.alt}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(6, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(94, p + 5));
        }}
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-cream bg-cream shadow-soft"
        style={{ touchAction: "pan-y" }}
      >
        {/* Después (fondo) */}
        <img
          src={pair.after}
          alt={pair.alt}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Antes (recortada según la posición de la manija) */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src={pair.before}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Divisor + manija */}
        <div
          aria-hidden
          className="absolute inset-y-0 w-px -translate-x-1/2 bg-warm-white/90"
          style={{ left: `${pos}%` }}
        />
        <div
          aria-hidden
          className="absolute top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-warm-white text-brown shadow-lift"
          style={{ left: `${pos}%` }}
        >
          <ArrowsLeftRight size={16} weight="bold" />
        </div>

        {/* Etiquetas */}
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-graphite/60 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          Antes
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-graphite/60 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          Después
        </span>
      </div>
    </div>
  );
}
