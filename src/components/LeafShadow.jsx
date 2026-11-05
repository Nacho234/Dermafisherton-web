// Sombra de una rama proyectada en la pared (luz filtrada por una planta):
// hojas en forma de lente, muy tenues y desenfocadas. Estática, solo en pantallas
// medianas o más. Ocupa el ancho de la ventana (no del contenedor) y se ancla arriba a un costado.
const LEAVES = [
  { l: 6, t: 70, r: -32, w: 150, h: 64 },
  { l: 34, t: 46, r: -48, w: 140, h: 58 },
  { l: 20, t: 26, r: 12, w: 132, h: 56 },
  { l: 56, t: 22, r: -62, w: 124, h: 52 },
  { l: 44, t: 2, r: 4, w: 116, h: 48 },
  { l: 72, t: 0, r: -74, w: 100, h: 44 },
];

export default function LeafShadow({ side = "right", className = "" }) {
  const right = side === "right";
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden w-screen -translate-x-1/2 overflow-hidden md:block ${className}`}>
      <div
        className={`absolute top-6 h-[24rem] w-[26rem] ${right ? "-right-14" : "-left-14 -scale-x-100"}`}
        style={{ transform: right ? "rotate(8deg)" : undefined }}
      >
        {/* tallo */}
        <span className="absolute left-[8%] top-[78%] h-[2px] w-[88%] origin-left -rotate-[34deg] rounded-full bg-[rgba(55,75,48,0.07)] blur-[1.5px]" />
        {LEAVES.map(({ l, t, r, w, h }, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              left: `${l}%`,
              top: `${t}%`,
              width: w,
              height: h,
              transform: `rotate(${r}deg)`,
              borderRadius: "100% 0 100% 0",
              background: "linear-gradient(135deg, rgba(55,75,48,0.1), rgba(55,75,48,0.035))",
              filter: "blur(2.5px)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
