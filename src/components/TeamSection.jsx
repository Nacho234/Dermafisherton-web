import { Link } from "react-router-dom";
import { ArrowRight, User } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { team } from "../data/team";

// Sección "Nuestro equipo": cards en fila (una al lado de la otra), con foto,
// nombre y especialidad. Cada card lleva al perfil /equipo/<slug>.
function TeamCard({ slug, name, role, photo, focus }) {
  return (
    <Link
      to={`/equipo/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cream bg-warm-white shadow-soft transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-sage/40 hover:shadow-lift"
    >
      <div className="aspect-square w-full overflow-hidden bg-cream">
        {photo ? (
          <div
            role="img"
            aria-label={name}
            className="h-full w-full bg-no-repeat transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
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
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug text-graphite">{name}</h3>
        <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-sage-deep">
          {role}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brown">
          Ver perfil
          <ArrowRight
            size={15}
            weight="bold"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}

export default function TeamSection() {
  return (
    <section className="bg-warm-white">
      <div className="container-page py-20 md:py-28">
        <div className="text-center">
          <Reveal>
            <span className="eyebrow">Conocé a nuestros especialistas</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl md:text-5xl">
              Nuestro equipo
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brown/75">
              Profesionales que evalúan cada piel antes de indicar cualquier
              tratamiento, con un acompañamiento cercano en cada etapa.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.slug} delay={(i % 5) * 0.06}>
              <TeamCard {...member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
