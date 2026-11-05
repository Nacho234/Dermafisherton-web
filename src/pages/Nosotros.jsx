import { Eye, HandHeart, TreeEvergreen, Leaf, Sparkle, Stethoscope } from "@phosphor-icons/react";
import Button from "../components/Button";
import WaveEdge from "../components/WaveEdge";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import EditorialImage from "../components/EditorialImage";
import CTASection from "../components/CTASection";
import FeatureCard from "../components/FeatureCard";
import LeafShadow from "../components/LeafShadow";
import TeamSection from "../components/TeamSection";
import salaEspera from "../assets/sala-espera.webp";

const espacioTags = [
  { Icon: Leaf, t: "Natural" },
  { Icon: HandHeart, t: "Cercano" },
  { Icon: Sparkle, t: "Cuidado" },
];

const heroPoints = [
  { icon: Stethoscope, text: "Evaluación profesional antes de indicar" },
  { icon: Leaf, text: "Tratamientos según tu piel y tus objetivos" },
  { icon: HandHeart, text: "Acompañamiento cercano en cada etapa" },
];

const philosophy = [
  {
    icon: Eye,
    title: "Evaluar antes de indicar",
    text: "Cada piel es distinta. Por eso priorizamos la consulta y el diagnóstico previo.",
  },
  {
    icon: HandHeart,
    title: "Acompañar sin exagerar",
    text: "Buscamos resultados armónicos, naturales y coherentes con cada persona.",
  },
  {
    icon: TreeEvergreen,
    title: "Cuidar a largo plazo",
    text: "No pensamos solo en el tratamiento puntual, sino en la salud y calidad de la piel.",
  },
];

export default function Nosotros() {
  return (
    <>
      {/* Hero: mismo lenguaje que Home / Tecnología / Tratamientos / Ubicación.
          La foto va en un marco en arco (como los arcos de las paredes) con un anillo y un arco desplazado detrás. */}
      <section className="hero-bg relative overflow-hidden pt-24 md:pt-28">
        <div className="container-page relative grid items-center gap-12 pb-20 md:grid-cols-12 md:gap-10 md:pb-28">
          <div className="md:col-span-6">
            <Reveal>
              <span className="eyebrow">Nosotros</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 pb-1 text-[2.45rem] leading-[1.08] sm:text-5xl md:text-[3.45rem]">
                Cuidado dermatológico con una mirada{" "}
                <em className="font-normal italic text-brown">personalizada</em>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-brown/75">
                En Dermafisherton acompañamos a cada paciente con tratamientos
                indicados según su piel, sus objetivos y una evaluación profesional.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
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
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="#equipo" variant="sage" size="md" arrow>
                  Conocé al equipo
                </Button>
                <Button to="/contacto" variant="outline" size="md">
                  Reservar turno
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="relative md:col-span-6">
            {/* Anillo tenue */}
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              className="pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square h-[112%] -translate-x-1/2 -translate-y-1/2 md:block"
            >
              <circle cx="50" cy="50" r="49" fill="none" stroke="#7d9174" strokeOpacity="0.32" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
            <Reveal y={26} className="relative mx-auto w-[78%] max-w-[26rem] md:w-[72%]">
              {/* Arco desplazado detrás, solo contorno */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 translate-x-5 translate-y-4 rounded-t-full rounded-b-[2.4rem] border border-sage/45"
              />
              <div className="relative rounded-t-full rounded-b-[2.4rem] border border-white/70 bg-white/45 p-2 shadow-soft">
                <div className="aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] bg-cream">
                  <img
                    src="/nosotros/consulta.png"
                    alt="Consulta profesional en Dermafisherton, Fisherton"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "66% 40%" }}
                    loading="eager"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <WaveEdge />
      </section>

      {/* Historia / concepto — editorial split */}
      <section className="container-page py-24 md:py-32">
        <LeafShadow />
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="bezel-shell group md:col-span-5" y={26}>
            <div className="bezel-core relative overflow-hidden bg-cream">
              <EditorialImage
                src={salaEspera}
                w={800}
                h={950}
                alt="Sala de espera de Dermafisherton con vista al atardecer"
                scrim={false}
                rounded="rounded-none"
                className="aspect-[4/5] w-full transition-transform duration-[950ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
              />

              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/35 to-graphite/25"
              />

              {/* Texto centrado */}
              <div className="pointer-events-none absolute inset-x-0 top-0 bottom-16 flex flex-col items-center justify-center px-8 text-center">
                <p className="font-display text-3xl leading-tight text-white sm:text-4xl">
                  Un ambiente cálido, pensado para vos
                </p>
              </div>

              {/* Franja frosted-glass abajo con íconos finos */}
              <div className="absolute inset-x-0 bottom-0 border-t border-white/20 bg-white/12 backdrop-blur-md">
                <div className="flex items-center justify-center gap-4 px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/95">
                  {espacioTags.map(({ Icon, t }, i) => (
                    <span
                      key={t}
                      className={`inline-flex items-center gap-1.5 ${
                        i > 0 ? "border-l border-white/25 pl-4" : ""
                      }`}
                    >
                      <Icon size={15} weight="light" className="text-sage" aria-hidden />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
          <div className="md:col-span-7">
            <SectionHeader title="Un espacio pensado para cuidar tu piel" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-brown/75">
                Dermafisherton nace como un espacio de dermatología y estética en
                Fisherton, orientado a brindar atención profesional, personalizada
                y cercana. Nuestro enfoque combina conocimiento dermatológico,
                tecnología estética y una mirada natural de la belleza.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Filosofía — 3 cards Double-Bezel */}
      <section className="border-y border-cream/80 bg-warm-white">
        <div className="container-page py-24 md:py-32">
          <SectionHeader
            eyebrow="Filosofía"
            title="Cómo entendemos el cuidado de la piel"
            align="center"
            className="mx-auto"
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {philosophy.map((p, i) => (
              <FeatureCard key={p.title} icon={p.icon} title={p.title} text={p.text} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro equipo (datos en src/data/team.js) */}
      <TeamSection />

      {/* Sección de equipo original (preservada sin renderizar) */}
      {false && (
        <section className="container-page py-20 md:py-28">
          <SectionHeader title="El equipo profesional" />
        </section>
      )}

      <CTASection
        title="Conocé qué necesita tu piel"
        text="Agendá una evaluación y definamos juntos el mejor plan para tu piel."
        message="Hola, quisiera reservar una consulta de evaluación."
      />
    </>
  );
}
