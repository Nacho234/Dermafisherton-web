import { ArrowUpRight } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { clips } from "../data/clips";
import { waLink } from "../data/site";

// Sección "Tratamientos en acción": clips reales de sesiones en la clínica,
// con el estilo overlay de las cards de tratamientos (degradado + texto).
// Los videos reproducen muteados, en loop y solo decorativos (aria-hidden).
function ClipCard({ title, tag, text, video, poster }) {
  return (
    <article className="group relative flex aspect-[9/16] flex-col justify-end overflow-hidden rounded-3xl shadow-soft transition-shadow duration-500 hover:shadow-lift">
      <video
        src={video}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />

      {/* Degradado para legibilidad del texto */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/25 to-transparent transition-opacity duration-500 group-hover:from-graphite/95" />

      {/* Contenido */}
      <div className="relative p-5 sm:p-6">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-sage">
          {tag}
        </span>
        <h3 className="mt-1.5 text-xl leading-tight text-white">{title}</h3>
        <p className="mt-2 text-[0.85rem] leading-relaxed text-white/80">
          {text}
        </p>
        <a
          href={waLink(`Hola, quisiera consultar por ${title}.`)}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-sage"
        >
          Consultar
          <ArrowUpRight
            weight="bold"
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </article>
  );
}

export default function TreatmentClips() {
  return (
    <section className="border-t border-cream bg-warm-white">
      <div className="container-page py-20 md:py-28">
        <SectionHeader
          eyebrow="Tecnología en acción"
          title="Nuestros tratamientos, en acción"
          intro="Clips reales de sesiones en la clínica: así se ven nuestros equipos y protocolos aplicados con criterio profesional."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {clips.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 5) * 0.06}>
              <ClipCard {...c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
