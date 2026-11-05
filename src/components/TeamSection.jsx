import { Link } from "react-router-dom";
import { ArrowUpRight, User } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { team } from "../data/team";

// Sección "Nuestro equipo": cards con arquitectura Double-Bezel y acceso al perfil /equipo/<slug>.
function TeamCard({ slug, name, role, photo, focus }) {
  return (
    <Link
      to={`/equipo/${slug}`}
      className="bezel-shell group flex h-full flex-col transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="bezel-core flex h-full flex-col overflow-hidden bg-surface-pure">
        <div className="relative aspect-square w-full overflow-hidden bg-cream/60">
          {photo ? (
            <div
              role="img"
              aria-label={name}
              className="h-full w-full bg-no-repeat transition-transform duration-[950ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
              style={{
                backgroundImage: `url(${photo})`,
                backgroundSize: `${focus?.zoom ?? 100}%`,
                backgroundPosition: focus?.pos ?? "50% 15%",
              }}
            />
          ) : (
            <span className="grid h-full w-full place-items-center bg-sage/15 text-sage-deep">
              <User size={56} weight="light" />
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-sage-deep">
              {role}
            </p>
            <h3 className="mt-2 text-xl leading-snug text-graphite">{name}</h3>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-cream/80 pt-4">
            <span className="text-sm font-medium text-brown/80 transition-colors group-hover:text-graphite">
              Ver perfil
            </span>
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center rounded-full border border-cream bg-cream/30 text-brown transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-sage/50 group-hover:bg-sage-deep group-hover:text-warm-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <ArrowUpRight size={14} weight="bold" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function TeamSection() {
  return (
    <section id="equipo" className="scroll-mt-20 bg-warm-white">
      <div className="container-page py-24 md:py-32">
        <div className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl leading-tight sm:text-4xl md:text-5xl">
              Nuestro equipo profesional
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brown/75">
              Especialistas que evalúan cada piel antes de indicar cualquier
              tratamiento, con un acompañamiento cercano en cada etapa.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 flex max-w-5xl flex-wrap justify-center gap-6">
          {team.map((member, i) => (
            <Reveal key={member.slug} delay={(i % 5) * 0.06} className="w-full md:w-[calc((100%-3rem)/3)]">
              <TeamCard {...member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
