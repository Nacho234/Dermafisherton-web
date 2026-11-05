// Borde ondulado en capas (papel cortado) para el pie de un héroe: dos ondas
// translúcidas con sombra y una última sólida del color de la sección siguiente
// (`to`), así el empalme no tiene corte. Decorativo y estático.
export default function WaveEdge({ to = "#f5ece0", className = "" }) {
  const shadow = { filter: "drop-shadow(0 -3px 6px rgba(110,85,60,0.08))" };
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-14 md:h-20 ${className}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0,66 C240,18 480,108 720,62 C960,16 1200,98 1440,50 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.5)" style={shadow} />
        <path d="M0,84 C260,46 500,116 760,80 C1000,46 1220,106 1440,74 L1440,120 L0,120 Z" fill="rgba(232,214,188,0.6)" style={shadow} />
        <path d="M0,102 C280,74 520,120 780,100 C1020,80 1240,116 1440,98 L1440,121 L0,121 Z" fill={to} />
      </svg>
    </div>
  );
}
