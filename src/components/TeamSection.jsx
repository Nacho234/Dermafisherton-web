import { User } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { team } from "../data/team";

// Sección "Nuestro equipo": cards con foto circular, nombre, especialidad y
// bio breve. Los datos se editan en src/data/team.js.
function TeamCard({ name, role, bio, photo }) {
  return (
    <article className="group flex h-full flex-col items-center rounded-3xl border border-cream bg-warm-white p-8 text-center shadow-soft transition-all duration-500 ease-out hover:-translate-y-2 hover:border-sage/40 hover:shadow-lift">
      {photo ? (
        <span className="overflow-hidden rounded-full border-4 border-cream transition-colors duration-500 group-hover:border-sage/50">
          <img
            src={photo}
            alt={name}
            width={144}
            height={144}
            loading="lazy"
            className="h-36 w-36 rounded-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
          />
        </span>
      ) : (
        <span className="grid h-36 w-36 place-items-center rounded-full border-4 border-cream bg-sage/15 text-sage-deep transition-colors duration-500 group-hover:border-sage/50">
          <User size={56} weight="light" />
        </span>
      )}
      <h3 className="mt-6 text-2xl text-graphite">{name}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-sage-deep">
        {role}
      </p>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-brown/70">{bio}</p>
    </article>
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

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={`${member.name}-${i}`} delay={(i % 3) * 0.08}>
              <TeamCard {...member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
