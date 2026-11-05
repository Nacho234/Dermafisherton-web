import { ArrowUpRight, Stethoscope, ShieldCheck, Leaf } from "@phosphor-icons/react";
import TabletFrame from "../components/TabletFrame";
import Button from "../components/Button";
import WaveEdge from "../components/WaveEdge";
import Reveal from "../components/Reveal";
import EditorialImage from "../components/EditorialImage";
import CTASection from "../components/CTASection";
import BeforeAfter from "../components/BeforeAfter";
import { beforeAfter } from "../data/beforeAfter";
import { categories } from "../data/treatments";
import { clips } from "../data/clips";
import { waLink } from "../data/site";

const heroPoints = [
  { icon: Stethoscope, text: "Siempre con una evaluación previa" },
  { icon: ShieldCheck, text: "Seguridad en cada procedimiento" },
  { icon: Leaf, text: "Naturalidad y resultados armónicos" },
];

const clipBySlug = Object.fromEntries(clips.map((c) => [c.slug, c]));
const heroClip = clipBySlug["hifu-facial"];
const categoryClips = {
  "dermatologia-clinica": clipBySlug["crio-radiofrecuencia"],
  "peelings-manchas": clipBySlug["laser-harmony"],
  "depilacion-laser": clipBySlug["hifu-corporal"],
};

function ServiceCard({ name, benefit, category }) {
  return (
    <a
      href={waLink(`Hola, quisiera consultar por ${name} (${category}).`)}
      target="_blank"
      rel="noreferrer"
      className="bezel-shell group block h-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="bezel-core flex h-full flex-col justify-between bg-surface-pure p-6">
        <div>
          <h4 className="text-xl text-graphite">{name}</h4>
          <p className="mt-2 text-[0.93rem] leading-relaxed text-brown/68">
            {benefit}
          </p>
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-cream/70 pt-4">
          <span className="text-sm font-semibold text-sage-deep transition-colors group-hover:text-brown">
            Consultar tratamiento
          </span>
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-full border border-cream bg-cream/30 text-brown transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-sage/50 group-hover:bg-sage-deep group-hover:text-warm-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <ArrowUpRight size={13} weight="bold" />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function Tratamientos() {
  return (
    <>
      {/* Hero: mismo lenguaje que Home / Ubicación / Tecnología. El reel vertical va
          dentro de un iPad mini (más superficie que un teléfono: el video se ve grande y nítido). */}
      <section className="hero-bg relative overflow-hidden pt-24 md:pt-28">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-warm-white to-transparent"
        />
        <div className="container-page relative grid items-center gap-12 pb-20 md:grid-cols-12 md:gap-10 md:pb-24">
          <div className="md:col-span-6">
            <Reveal>
              <h1 className="pb-1 text-[2.45rem] leading-[1.08] sm:text-5xl md:text-[3.45rem]">
                Tratamientos dermatológicos y estéticos{" "}
                <em className="font-normal italic text-brown">personalizados</em>
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-brown/75">
                Cada procedimiento se indica según una evaluación previa,
                buscando seguridad, naturalidad y resultados armónicos.
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
                <Button href={`#${categories[0].slug}`} variant="sage" size="md" arrow>
                  Ver tratamientos
                </Button>
                <Button to="/contacto" variant="outline" size="md">
                  Reservar turno
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Reel dentro del iPad mini + anillo tenue detrás */}
          <div className="relative md:col-span-6">
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              className="pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square h-[104%] -translate-x-1/2 -translate-y-1/2 md:block"
            >
              <circle cx="50" cy="50" r="49" fill="none" stroke="#7d9174" strokeOpacity="0.32" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
            <Reveal y={26} className="relative flex flex-col items-center gap-4">
              <TabletFrame className="w-[82%] max-w-[24rem] md:h-[min(72dvh,640px)] md:w-auto md:max-w-none">
                <video
                  src={heroClip.video}
                  poster={heroClip.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="HIFU facial en Dermafisherton"
                  className="h-full w-full object-cover"
                />
              </TabletFrame>
              <a
                href={waLink(`Hola, quisiera consultar por ${heroClip.title}.`)}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2.5 rounded-full border border-brown/15 bg-white/90 py-1.5 pl-4 pr-1.5 text-xs font-semibold text-graphite shadow-ambient backdrop-blur transition-colors duration-300 hover:bg-white"
              >
                <span>
                  {heroClip.title}
                  <span className="font-normal text-brown/70"> · {heroClip.tag}</span>
                </span>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brown/[0.07] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={12} weight="bold" />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
        <WaveEdge />
      </section>

      {/* Category index — scroll-snap pills */}
      <nav
        aria-label="Categorías de tratamientos"
        className="sticky top-16 z-30 border-y border-cream/90 bg-warm-white/90 backdrop-blur-xl md:top-[76px]"
      >
        <div className="container-page flex gap-2 overflow-x-auto py-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="whitespace-nowrap rounded-full border border-cream bg-cream/25 px-4 py-2 text-sm font-medium text-brown/80 transition-all duration-300 hover:border-sage-deep/50 hover:bg-sage/15 hover:text-graphite"
            >
              {c.title}
            </a>
          ))}
        </div>
      </nav>

      {categories.map((cat, idx) => (
        <section
          key={cat.slug}
          id={cat.slug}
          className={`scroll-mt-36 ${idx > 0 ? "border-t border-cream/80" : ""}`}
        >
          <div className="container-page py-20 md:py-28">
            <div className="grid gap-10 md:grid-cols-12 md:gap-14">
              {/* Category intro (sticky on desktop) */}
              <div className="md:col-span-4">
                <div className="md:sticky md:top-36">
                  <Reveal>
                    <h2 className="text-3xl leading-tight sm:text-4xl">
                      {cat.title}
                    </h2>
                    <p className="mt-4 max-w-sm text-[1.02rem] leading-relaxed text-brown/75">
                      {cat.intro}
                    </p>
                  </Reveal>
                  <Reveal delay={0.1}>
                    {beforeAfter[cat.slug] ? (
                      <BeforeAfter
                        pairs={beforeAfter[cat.slug]}
                        className="mt-7"
                      />
                    ) : categoryClips[cat.slug] ? (
                      <div className="bezel-shell mt-7">
                        <video
                          src={categoryClips[cat.slug].video}
                          poster={categoryClips[cat.slug].poster}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          aria-label={cat.title}
                          className="bezel-core block aspect-[4/3] w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="bezel-shell mt-7">
                        <EditorialImage
                          seed={cat.seed}
                          w={700}
                          h={520}
                          alt={cat.title}
                          rounded="bezel-core"
                          className="aspect-[4/3] w-full"
                        />
                      </div>
                    )}
                  </Reveal>
                </div>
              </div>

              {/* Services grid */}
              <div className="md:col-span-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  {cat.services.map((s, i) => (
                    <Reveal key={s.name} delay={(i % 2) * 0.08}>
                      <ServiceCard {...s} category={cat.title} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Nota informativa */}
      <section className="border-t border-cream/80">
        <div className="container-page py-16 text-center md:py-20">
          <Reveal className="mx-auto max-w-2xl">
            <p className="text-sm italic text-taupe">
              Los servicios listados son orientativos y su indicación depende de
              una evaluación profesional previa. No representan una promesa de
              resultados.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="No todos los tratamientos son para todas las pieles"
        text="Agendá una evaluación para recibir una recomendación personalizada."
        message="Hola, quisiera una evaluación para saber qué tratamiento es adecuado para mi piel."
      />
    </>
  );
}
