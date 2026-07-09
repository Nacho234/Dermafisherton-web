import { ArrowUpRight } from "@phosphor-icons/react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import EditorialImage from "../components/EditorialImage";
import CTASection from "../components/CTASection";
import TreatmentClips from "../components/TreatmentClips";
import BeforeAfter from "../components/BeforeAfter";
import { beforeAfter } from "../data/beforeAfter";
import { categories } from "../data/treatments";
import { waLink } from "../data/site";

function ServiceCard({ name, benefit, category }) {
  return (
    <div className="group flex flex-col justify-between rounded-3xl border border-cream bg-warm-white p-6 transition-shadow duration-500 hover:shadow-soft">
      <div>
        <h4 className="text-xl text-graphite">{name}</h4>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-brown/65">
          {benefit}
        </p>
      </div>
      <a
        href={waLink(`Hola, quisiera consultar por ${name} (${category}).`)}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep transition-colors hover:text-brown"
      >
        Consultar tratamiento
        <ArrowUpRight
          size={15}
          weight="bold"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </div>
  );
}

export default function Tratamientos() {
  return (
    <>
      <PageHero
        eyebrow="Tratamientos"
        title="Tratamientos dermatológicos y estéticos personalizados"
        subtitle="Cada procedimiento se indica según una evaluación previa, buscando seguridad, naturalidad y resultados armónicos."
        seed="treatment-room-calm"
        imageAlt="Sala de tratamientos de Dermafisherton"
      />

      {/* Category index — scroll-snap pills */}
      <nav aria-label="Categorías de tratamientos" className="sticky top-[68px] z-30 border-y border-cream bg-warm-white/85 backdrop-blur-md md:top-[76px]">
        <div className="container-page flex gap-2 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="whitespace-nowrap rounded-full border border-taupe/25 px-4 py-2 text-sm text-brown/75 transition-colors hover:border-brown hover:text-brown"
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
          className={`scroll-mt-32 ${idx % 2 === 1 ? "bg-cream-soft/40" : ""}`}
        >
          <div className="container-page py-16 md:py-24">
            <div className="grid gap-10 md:grid-cols-12 md:gap-14">
              {/* Category intro (sticky on desktop) */}
              <div className="md:col-span-4">
                <div className="md:sticky md:top-40">
                  <Reveal>
                    <span className="eyebrow">{`0${idx + 1}`}</span>
                    <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
                      {cat.title}
                    </h2>
                    <p className="mt-5 max-w-sm text-[1.02rem] leading-relaxed text-brown/75">
                      {cat.intro}
                    </p>
                  </Reveal>
                  <Reveal delay={0.1}>
                    {beforeAfter[cat.slug] ? (
                      <BeforeAfter
                        pairs={beforeAfter[cat.slug]}
                        className="mt-7"
                      />
                    ) : (
                      <EditorialImage
                        seed={cat.seed}
                        w={700}
                        h={520}
                        alt={cat.title}
                        className="mt-7 aspect-[4/3] w-full"
                      />
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

      {/* Tratamientos en acción — clips reales de la clínica */}
      <TreatmentClips />

      {/* Page-specific note + CTA */}
      <section className="border-t border-cream">
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
