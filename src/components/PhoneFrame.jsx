import { CellSignalFull, WifiHigh, BatteryFull } from "@phosphor-icons/react";

// Marco de iPhone (estilo titanio) para mostrar contenido como si fuera el
// display del teléfono en mirroring: Dynamic Island, barra de estado, botones
// laterales e indicador de inicio.
//
// Uso: el tamaño lo define el contenedor. Pasá una altura (h-full / h-[...]) o un
// ancho (w-...) en `className`; el ratio 9:19.5 hace el resto.
export default function PhoneFrame({ children, className = "", time = "9:41" }) {
  const sideBtn = "absolute w-[3px] bg-gradient-to-b from-[#55555a] to-[#2a2a2d]";

  return (
    <div
      className={`relative aspect-[9/19.5] drop-shadow-[0_18px_24px_rgba(35,31,29,0.3)] ${className}`}
    >
      {/* Botones laterales: acción, volumen +/-, encendido */}
      <span aria-hidden className={`${sideBtn} -left-[3px] top-[15%] h-[3.2%] rounded-l-sm`} />
      <span aria-hidden className={`${sideBtn} -left-[3px] top-[21%] h-[6.5%] rounded-l-sm`} />
      <span aria-hidden className={`${sideBtn} -left-[3px] top-[29%] h-[6.5%] rounded-l-sm`} />
      <span aria-hidden className={`${sideBtn} -right-[3px] top-[25%] h-[10%] rounded-r-sm`} />

      {/* Borde de titanio */}
      <div className="h-full w-full rounded-[2.9rem] bg-gradient-to-br from-[#6a6a70] via-[#2a2a2d] to-[#58585e] p-[2.5px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]">
        {/* Bisel negro */}
        <div className="h-full w-full rounded-[2.75rem] bg-black p-[6px]">
          {/* Pantalla */}
          <div className="relative h-full w-full overflow-hidden rounded-[2.35rem] bg-black">
            {children}

            {/* Reflejo sutil del vidrio */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/[0.10] via-transparent to-transparent"
            />

            {/* Barra de estado */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-[11%] pt-[4.2%] text-[0.62rem] font-semibold leading-none text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]"
            >
              <span className="tabular-nums">{time}</span>
              <span className="flex items-center gap-[0.22rem]">
                <CellSignalFull size={11} weight="fill" />
                <WifiHigh size={11} weight="bold" />
                <BatteryFull size={14} weight="fill" />
              </span>
            </div>

            {/* Dynamic Island */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[1.8%] z-30 h-[3.1%] w-[30%] -translate-x-1/2 rounded-full bg-black"
            />

            {/* Degradado inferior para que se lea el indicador de inicio */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[9%] bg-gradient-to-t from-black/40 to-transparent"
            />
            {/* Indicador de inicio */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-[1.6%] left-1/2 z-20 h-[0.55%] min-h-[4px] w-[36%] -translate-x-1/2 rounded-full bg-white/90"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
