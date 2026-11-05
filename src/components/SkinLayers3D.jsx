import { useEffect, useRef, useState } from "react";
import { Sun, Lightning, Waveform } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

// "Hasta dónde llega cada tecnología": corte de la piel en 3D (CSS 3D, sin librerías).
// Tres capas apiladas en perspectiva. Al elegir una tecnología (o al llegar a su
// tarjeta con el scroll) las capas se separan y se ilumina la que trabaja.
// Esquema ILUSTRATIVO: las profundidades son aproximadas, no a escala.

const SIZE = 210; // lado de cada capa (px)
const GAP = 58; // separación vertical entre capas (px)

const TEXTURES = {
  dots: "radial-gradient(rgba(150,100,70,0.24) 1px, transparent 1.6px) 0 0 / 9px 9px",
  fibers:
    "repeating-linear-gradient(35deg, rgba(150,95,70,0.17) 0 2px, transparent 2px 9px), repeating-linear-gradient(-35deg, rgba(255,255,255,0.3) 0 1px, transparent 1px 12px)",
  cells:
    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.6) 0 6px, rgba(190,150,90,0.2) 7px 8.5px, transparent 9.5px) 0 0 / 24px 24px",
};

const LAYERS = [
  { id: "epi", name: "Epidermis", note: "Capa externa", t: 6, top: "#f5dfcc", side: "#d8b79e", texture: "dots" },
  { id: "der", name: "Dermis", note: "Colágeno y elastina", t: 22, top: "#efcbb2", side: "#cda187", texture: "fibers" },
  { id: "hip", name: "Hipodermis", note: "Tejido profundo", t: 30, top: "#f4e7c9", side: "#d4be8d", texture: "cells" },
];

const TECHS = [
  {
    id: "ipl",
    icon: Sun,
    short: "Luz pulsada",
    name: "Luz pulsada y láser",
    depth: "Capas superficiales",
    layers: [0],
    text: "Unificación del tono y tratamiento de manchas y rojeces, trabajando en las capas más superficiales de la piel.",
    equipo: "Plataforma Láser Harmony e IPL",
  },
  {
    id: "rf",
    icon: Lightning,
    short: "Radiofrecuencia",
    name: "Radiofrecuencia",
    depth: "Dermis",
    layers: [1],
    text: "Calor controlado que estimula el colágeno y la elastina para mejorar la firmeza, la textura y la flacidez.",
    equipo: "Venus Legacy y UNYQUE",
  },
  {
    id: "hifu",
    icon: Waveform,
    short: "HIFU",
    name: "HIFU",
    depth: "Capas profundas",
    layers: [1, 2],
    text: "Ultrasonido focalizado de alta intensidad para un tensado profundo y de contorno, sin cirugía.",
    equipo: "HIFU facial y corporal",
  },
];

// Capa con espesor: la tapa lleva la textura y debajo se apilan caras más oscuras
function Slab({ layer, z, lit, dimmed }) {
  const faces = Math.ceil(layer.t / 2);
  return (
    <div
      className="absolute left-1/2 top-1/2 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
      style={{
        width: SIZE,
        height: SIZE,
        marginLeft: -SIZE / 2,
        marginTop: -SIZE / 2,
        transform: `translateZ(${z}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {Array.from({ length: faces }).map((_, k) => (
        <span
          key={k}
          className="absolute inset-0 rounded-[16px]"
          style={{ background: layer.side, transform: `translateZ(${-(k + 1) * 2}px)` }}
        />
      ))}
      <span
        className="absolute inset-0 rounded-[16px] transition-[box-shadow] duration-700"
        style={{
          background: `${layer.texture ? TEXTURES[layer.texture] + "," : ""} ${layer.top}`,
          boxShadow: lit
            ? "0 0 0 2px rgba(111,133,102,0.95), 0 0 44px 8px rgba(125,145,116,0.5)"
            : "inset 0 0 0 1px rgba(255,255,255,0.55)",
        }}
      />
      {/* velo para atenuar las capas que no trabajan */}
      <span
        className="absolute inset-0 rounded-[16px] bg-[#f5ece0] transition-opacity duration-700"
        style={{ opacity: dimmed ? 0.5 : 0 }}
      />
      {/* punto de acción sobre la capa iluminada */}
      <span
        className="absolute left-[38%] top-[38%] h-14 w-14 rounded-full transition-opacity duration-700"
        style={{
          opacity: lit ? 1 : 0,
          background: "radial-gradient(circle, rgba(255,255,255,0.95) 0 14%, rgba(125,145,116,0.55) 15% 42%, rgba(125,145,116,0) 70%)",
        }}
      />
    </div>
  );
}

function Stage({ active }) {
  const litSet = TECHS[active].layers;
  return (
    <div aria-hidden className="relative mx-auto h-[250px] w-full max-w-[520px] sm:h-[350px]">
      <div className="absolute inset-0 origin-center scale-[0.7] [perspective:1300px] sm:scale-100">
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", transform: "translateY(8%) rotateX(58deg) rotateZ(-38deg)" }}
        >
          {LAYERS.map((layer, i) => (
            <Slab
              key={layer.id}
              layer={layer}
              z={(2 - i) * GAP}
              lit={litSet.includes(i)}
              dimmed={!litSet.includes(i)}
            />
          ))}
        </div>

        {/* Etiquetas: siguen a cada capa cuando se mueve (la proyección sube ~0,85 px por px de altura) */}
        {LAYERS.map((layer, i) => {
          const on = litSet.includes(i);
          return (
            <div
              key={layer.id}
              className="absolute left-1/2 flex items-center gap-2 transition-[top,color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{ top: `calc(58% - ${(2 - i) * GAP * 0.848}px)`, marginLeft: SIZE * 0.72, transform: "translateY(-50%)" }}
            >
              <span className={`h-px w-7 transition-colors duration-700 ${on ? "bg-sage-deep" : "bg-brown/30"}`} />
              <span className="whitespace-nowrap">
                <span className={`block text-[0.82rem] font-semibold leading-tight transition-colors duration-700 ${on ? "text-sage-deep" : "text-brown/70"}`}>
                  {layer.name}
                </span>
                <span className="hidden text-[0.68rem] leading-tight text-brown/55 sm:block">{layer.note}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SkinLayers3D() {
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  // En pantallas grandes, la tarjeta que cruza el centro de la ventana pasa a ser la activa
  useEffect(() => {
    const ul = listRef.current;
    if (!ul) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.tech));
        }),
      { rootMargin: "-42% 0px -42% 0px" }
    );
    ul.querySelectorAll("[data-tech]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative bg-warm-white">
      <div className="container-page py-24 md:py-32">
        <SectionHeader
          title={
            <>
              Hasta dónde llega <em className="font-normal italic text-brown">cada tecnología</em>
            </>
          }
          intro="Cada equipo trabaja a una profundidad distinta de la piel. Por eso la tecnología se indica según lo que evalúa el profesional."
        />

        <div className="mt-12 grid items-start gap-8 md:mt-16 md:grid-cols-12 md:gap-12">
          {/* Escenario 3D */}
          <div className="md:sticky md:top-28 md:col-span-6">
            {/* Selector (solo mobile: en desktop se elige con el scroll o tocando la tarjeta) */}
            <div className="mb-4 flex flex-wrap gap-2 md:hidden" role="tablist" aria-label="Tecnología">
              {TECHS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                    active === i
                      ? "border-sage-deep bg-sage-deep text-white"
                      : "border-cream bg-surface-pure text-brown hover:border-sage/50"
                  }`}
                >
                  <t.icon size={16} weight={active === i ? "fill" : "light"} />
                  {t.short}
                </button>
              ))}
            </div>
            <Reveal y={26}>
              <Stage active={active} />
            </Reveal>
            <p className="mt-2 text-center text-xs text-brown/60">
              Esquema ilustrativo: las capas no están a escala.
            </p>
          </div>

          {/* Tecnologías */}
          <ul ref={listRef} className="grid gap-4 md:col-span-6 md:gap-20 md:py-10">
            {TECHS.map((t, i) => {
              const on = active === i;
              return (
                <li key={t.id} data-tech={i} className={on ? "block" : "hidden md:block"}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={`w-full rounded-[1.6rem] border p-6 text-left transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:p-7 ${
                      on ? "border-sage/40 bg-surface-pure shadow-soft" : "border-transparent hover:border-cream"
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                          on ? "border-sage-deep bg-sage-deep text-white" : "border-cream bg-surface-pure text-sage-deep"
                        }`}
                      >
                        <t.icon size={22} weight={on ? "fill" : "light"} />
                      </span>
                      <span>
                        <span className="block font-display text-2xl leading-tight text-graphite">{t.name}</span>
                        <span className="mt-0.5 block text-xs font-semibold uppercase tracking-[0.14em] text-taupe">
                          {t.depth}
                        </span>
                      </span>
                    </span>
                    <span className="mt-4 block text-[0.98rem] leading-relaxed text-brown/75">{t.text}</span>
                    <span className="mt-3 block text-sm font-medium text-sage-deep">{t.equipo}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
