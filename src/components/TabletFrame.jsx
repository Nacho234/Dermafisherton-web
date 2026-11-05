import { WifiHigh, BatteryFull } from "@phosphor-icons/react";

// Marco de iPad mini (aluminio claro, bordes parejos, cámara frontal e indicador de
// inicio) para mostrar contenido a mayor tamaño que en un teléfono.
// El tamaño lo define el contenedor (altura o ancho en `className`); la proporción
// (744 x 1133, iPad mini) hace el resto. `landscape` lo gira.
export default function TabletFrame({ children, className = "", landscape = false, time = "9:41" }) {
  return (
    <div
      className={`relative drop-shadow-[0_18px_24px_rgba(35,31,29,0.3)] ${
        landscape ? "aspect-[1133/744]" : "aspect-[744/1133]"
      } ${className}`}
    >
      {/* Borde de aluminio */}
      <div className="h-full w-full rounded-[2.1rem] bg-gradient-to-br from-[#d9d5cf] via-[#b9b4ad] to-[#cfcac3] p-[2.5px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]">
        {/* Bisel negro */}
        <div className="h-full w-full rounded-[2rem] bg-black p-[3.5%]">
          {/* Pantalla */}
          <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] bg-black">
            {children}

            {/* Reflejo sutil del vidrio */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/[0.09] via-transparent to-transparent"
            />

            {/* Barra de estado */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-[6%] pt-[2.4%] text-[0.62rem] font-semibold leading-none text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]"
            >
              <span className="tabular-nums">{time}</span>
              <span className="flex items-center gap-1">
                <WifiHigh size={11} weight="bold" />
                <BatteryFull size={14} weight="fill" />
              </span>
            </div>

            {/* Degradado inferior + indicador de inicio */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[7%] bg-gradient-to-t from-black/40 to-transparent"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-[1.4%] left-1/2 z-20 h-[0.5%] min-h-[4px] w-[26%] -translate-x-1/2 rounded-full bg-white/90"
            />
          </div>
        </div>
      </div>

      {/* Cámara frontal (en el bisel superior) */}
      <span
        aria-hidden
        className={`pointer-events-none absolute z-30 h-[0.9%] w-[0.9%] min-h-[5px] min-w-[5px] rounded-full bg-[#2a2a2e] ring-1 ring-black/60 ${
          landscape ? "left-[1.6%] top-1/2 -translate-y-1/2" : "left-1/2 top-[1.5%] -translate-x-1/2"
        }`}
      />
    </div>
  );
}
