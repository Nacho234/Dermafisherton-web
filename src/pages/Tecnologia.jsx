import {
  Cpu,
  ShieldCheck,
  UserFocus,
  HeartHalf,
  Sparkle,
  Drop,
  Leaf,
  FirstAid,
  Heart,
  CheckCircle,
  FlowerLotus,
  HandHeart,
  Stethoscope,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import EditorialImage from "../components/EditorialImage";
import FeatureCard from "../components/FeatureCard";
import WaveEdge from "../components/WaveEdge";
import SkinLayers3D from "../components/SkinLayers3D";
import CTASection from "../components/CTASection";

// Íconos apoyados sobre el anillo detrás de la profesional (estáticos: solo entran al cargar).
// Ángulos en grados sobre el anillo; se evita el arco inferior, donde está el torso.
const orbit = [
  { icon: Sparkle, deg: -90 },
  { icon: UserFocus, deg: -54 },
  { icon: Drop, deg: -126 },
  { icon: Heart, deg: -18 },
  { icon: ShieldCheck, deg: -162 },
  { icon: HandHeart, deg: 18 },
  { icon: Leaf, deg: 162 },
];
const RING_CX = 50; // % del ancho
const RING_CY = 46; // % del alto
const RING_R = 46; // % del ancho
const ASPECT = 1.25; // alto / ancho del contenedor (4:5)

function ProfessionalOrbit() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[28rem] md:max-w-none">
      {/* Luz verde suave y anillo */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[46%] h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(125,145,116,0.22),transparent)]"
      />
      <svg aria-hidden viewBox="0 0 100 100" className="pointer-events-none absolute left-1/2 top-[46%] w-[92%] -translate-x-1/2 -translate-y-1/2">
        <circle cx="50" cy="50" r="49" fill="none" stroke="#7d9174" strokeOpacity="0.35" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Foto: el fondo blanco se funde con el champagne (multiply) */}
      <Reveal y={26} className="absolute inset-0 mix-blend-multiply">
        <img
          src="/tecnologia/profesional.png"
          alt="Profesional de Dermafisherton"
          className="h-full w-full object-contain object-bottom"
          loading="eager"
        />
      </Reveal>

      {/* Íconos sobre el anillo */}
      {orbit.map(({ icon: Icon, deg }, i) => {
        const rad = (deg * Math.PI) / 180;
        const left = RING_CX + RING_R * Math.cos(rad);
        const top = RING_CY + (RING_R / ASPECT) * Math.sin(rad);
        return (
          <motion.span
            key={i}
            aria-hidden
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.09, type: "spring", stiffness: 180, damping: 16 }}
            style={{ left: `${left}%`, top: `${top}%` }}
            className="absolute z-10 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-sage/35 bg-surface-pure text-sage-deep shadow-soft md:h-12 md:w-12"
          >
            <Icon size={21} weight="light" />
          </motion.span>
        );
      })}
    </div>
  );
}

const heroPoints = [
  { icon: Stethoscope, text: "Siempre a partir de una evaluación profesional" },
  { icon: Cpu, text: "Equipamiento adecuado para cada indicación" },
  { icon: ShieldCheck, text: "Protocolos actualizados y seguros" },
];

const blocks = [
  {
    icon: Cpu,
    title: "Tecnología aplicada con criterio",
    text: "Utilizamos el equipamiento adecuado para cada indicación, siempre a partir de una evaluación profesional.",
  },
  {
    icon: ShieldCheck,
    title: "Protocolos seguros",
    text: "Trabajamos con protocolos actualizados que priorizan la seguridad y el cuidado de la piel.",
  },
  {
    icon: UserFocus,
    title: "Tratamientos personalizados",
    text: "La tecnología acompaña un plan pensado para cada persona, no al revés.",
  },
  {
    icon: HeartHalf,
    title: "Acompañamiento posterior",
    text: "Indicamos cuidados y seguimiento para sostener los resultados en el tiempo.",
  },
];

// Aparatología real de la clínica (documentada en tratamientos y reels).
const equipment = [
  {
    name: "HIFU facial y corporal",
    detail: "Ultrasonido focalizado de alta intensidad para tensado profundo y contorno sin cirugía.",
  },
  {
    name: "Plataforma Láser Harmony y Luz Pulsada (IPL)",
    detail: "Unificación del tono, tratamiento de manchas, rojeces y estímulo de luminosidad.",
  },
  {
    name: "UNYQUE · Crio-radiofrecuencia y tensado",
    detail: "Combinación térmica controlada para estimular colágeno, elastina y firmeza tisular.",
  },
  {
    name: "Venus Legacy",
    detail: "Radiofrecuencia multipolar para mejorar flacidez, textura y remodelación corporal.",
  },
];

export default function Tecnologia() {
  return (
    <>
      {/* Hero: mismo lenguaje que el Home (champagne, foto fundida, anillo) */}
      <section className="hero-bg relative overflow-hidden pt-24 md:pt-28">
        {/* Fundido inferior hacia el color base de la página */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-warm-white to-transparent"
        />
        <div className="container-page relative grid items-center gap-12 pb-20 md:grid-cols-12 md:gap-10 md:pb-28">
          <div className="md:col-span-6">
            <Reveal>
              <h1 className="pb-1 text-[2.45rem] leading-[1.08] sm:text-5xl md:text-[3.45rem]">
                Tecnología estética al servicio de{" "}
                <em className="font-normal italic text-brown">tu piel</em>
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-brown/75">
                Combinamos evaluación profesional, protocolos actualizados y
                equipamiento adecuado para ofrecer tratamientos seguros y
                personalizados.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <ul className="mt-8 space-y-4">
                {heroPoints.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-sage/60 bg-white/70 text-sage-deep shadow-[0_2px_8px_-2px_rgba(58,48,42,0.12)]">
                      <Icon size={19} weight="light" />
                    </span>
                    <span className="text-[0.98rem] text-graphite">{text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button to="/tratamientos" variant="sage" size="md" arrow>
                  Ver tratamientos
                </Button>
                <Button to="/contacto" variant="outline" size="md">
                  Reservar turno
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-6">
            <ProfessionalOrbit />
          </div>
        </div>
        <WaveEdge />
      </section>

      {/* 4 pilares en Double-Bezel */}
      <section className="bg-warm-white">
        <div className="container-page py-24 md:py-32">
          <div className="grid gap-6 md:grid-cols-2">
            {blocks.map((b, i) => (
              <FeatureCard
                key={b.title}
                icon={b.icon}
                title={b.title}
                text={b.text}
                layout="row"
                delay={(i % 2) * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Corte de la piel en 3D: hasta dónde llega cada tecnología */}
      <SkinLayers3D />

      {/* Equipamiento real de la clínica */}
      <section className="border-t border-cream/80 bg-warm-white">
        <div className="container-page grid items-start gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-32">
          <Reveal className="bezel-shell md:sticky md:top-28 md:col-span-6" y={26}>
            <EditorialImage
              src="/tecnologia/maquinas.png"
              w={1535}
              h={1024}
              alt="Aparatología estética de Dermafisherton"
              grayscale={false}
              scrim={false}
              rounded="bezel-core"
              className="aspect-[3/2] w-full"
            />
          </Reveal>
          <div className="md:col-span-6">
            <h2 className="text-3xl leading-tight text-graphite sm:text-4xl md:text-[2.75rem]">
              Equipamiento y protocolos médicos
            </h2>
            <p className="mt-5 max-w-[50ch] text-lg leading-relaxed text-brown/75">
              Seleccionamos cada plataforma según el diagnóstico de tu piel y el
              objetivo terapéutico, priorizando seguridad, confort y naturalidad.
            </p>
            <div className="mt-8 grid gap-3.5">
              {equipment.map((item, i) => (
                <Reveal key={item.name} delay={(i % 4) * 0.06}>
                <div
                  className="group rounded-2xl border border-cream bg-surface-pure p-4 shadow-ambient transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-sage/45 hover:shadow-soft"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle
                      size={18}
                      weight="light"
                      className="shrink-0 text-sage-deep transition-transform duration-500 group-hover:scale-110"
                    />
                    <h3 className="font-sans text-[0.98rem] font-semibold text-graphite">
                      {item.name}
                    </h3>
                  </div>
                  <p className="mt-1.5 pl-7 text-sm leading-relaxed text-brown/70">
                    {item.detail}
                  </p>
                </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Tratamientos seguros, indicados para vos"
        text="Consultanos y te explicamos qué tecnología y protocolo se adecúan a tu piel."
        message="Hola, quisiera consultar sobre los tratamientos y la tecnología disponible."
      />
    </>
  );
}
