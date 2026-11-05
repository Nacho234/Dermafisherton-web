import { useId, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowsLeftRight } from "@phosphor-icons/react";

// Comparador antes/después con manija deslizable (mouse y touch) en marco Double-Bezel.
export default function BeforeAfter({ pairs, className = "" }) {
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState(50);
  const frameRef = useRef(null);
  const dragging = useRef(false);
  const tabGroupId = useId();
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
        <div className="mb-3.5 inline-flex flex-wrap gap-1.5 rounded-full border border-cream bg-cream/35 p-1">
          {pairs.map((p, i) => {
            const active = i === idx;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setIdx(i);
                  setPos(50);
                }}
                aria-pressed={active}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                  active ? "text-warm-white" : "text-brown/70 hover:text-graphite"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId={`ba-tab-${tabGroupId}`}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full bg-sage-deep shadow-ambient"
                  />
                )}
                {p.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="bezel-shell">
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
          className="bezel-core group relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden bg-cream"
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

          {/* Divisor + manija con halo */}
          <div
            aria-hidden
            className="absolute inset-y-0 w-[1.5px] -translate-x-1/2 bg-surface-pure/90 shadow-[0_0_12px_rgba(35,31,29,0.35)]"
            style={{ left: `${pos}%` }}
          />
          <div
            aria-hidden
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white/25 p-1 backdrop-blur-md transition-transform duration-300 group-hover:scale-105"
            style={{ left: `${pos}%` }}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-pure text-graphite shadow-lift">
              <ArrowsLeftRight size={15} weight="bold" />
            </span>
          </div>

          {/* Etiquetas */}
          <span className="pointer-events-none absolute left-3.5 top-3.5 rounded-full border border-white/20 bg-graphite/65 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
            Antes
          </span>
          <span className="pointer-events-none absolute right-3.5 top-3.5 rounded-full border border-white/20 bg-graphite/65 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
            Después
          </span>
        </div>
      </div>
    </div>
  );
}
