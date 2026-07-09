import { Eye, HandHeart, TreeEvergreen } from "@phosphor-icons/react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import EditorialImage from "../components/EditorialImage";
import CTASection from "../components/CTASection";
import TeamSection from "../components/TeamSection";
import salaEspera from "../assets/sala-espera.webp";

const espacioTags = [
  { e: "🌿", t: "Natural" },
  { e: "🤍", t: "Cercano" },
  { e: "✨", t: "Cuidado" },
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
      <PageHero
        eyebrow="Nosotros"
        title="Cuidado dermatológico con una mirada personalizada"
        subtitle="En Dermafisherton acompañamos a cada paciente con tratamientos indicados según su piel, sus objetivos y una evaluación profesional."
        src="/nosotros/consulta.png"
        scrim={false}
        imgClassName="aspect-[3/2] w-full"
        imageAlt="Consulta profesional en Dermafisherton, Fisherton"
      />

      {/* Historia / concepto — editorial split */}
      <section className="container-page py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="group relative overflow-hidden rounded-3xl md:col-span-5" y={26}>
            <EditorialImage
              src={salaEspera}
              w={800}
              h={950}
              alt="Sala de espera de Dermafisherton con vista al atardecer"
              scrim={false}
              rounded="rounded-none"
              className="aspect-[4/5] w-full"
            />

            {/* Opacidad gris */}
            <span className="pointer-events-none absolute inset-0 bg-graphite/45" />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/10 to-graphite/30" />

            {/* Texto centrado */}
            <div className="pointer-events-none absolute inset-x-0 top-0 bottom-16 flex flex-col items-center justify-center px-8 text-center">
              <span className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/70">
                El espacio
              </span>
              <p className="font-display text-3xl leading-tight text-white sm:text-4xl">
                Un ambiente cálido, pensado para vos
              </p>
            </div>

            {/* Franja glass abajo con los símbolos */}
            <div className="absolute inset-x-0 bottom-0 border-t border-white/20 bg-white/10 backdrop-blur-md">
              <div className="flex items-center justify-center gap-4 px-5 py-4 text-sm font-medium text-white/95">
                {espacioTags.map((tag, i) => (
                  <span
                    key={tag.t}
                    className={`inline-flex items-center gap-1.5 ${
                      i > 0 ? "border-l border-white/25 pl-4" : ""
                    }`}
                  >
                    <span aria-hidden>{tag.e}</span>
                    {tag.t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="md:col-span-7">
            <SectionHeader title="Un espacio pensado para cuidar tu piel" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-brown/75">
                Dermafisherton nace como un espacio de dermatología y estética en
                Fisherton, orientado a brindar atención profesional, personalizada
                y cercana. Nuestro enfoque combina conocimiento dermatológico,
                tecnología estética y una mirada natural de la belleza.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Filosofía — 3 blocks */}
      <section className="border-y border-cream bg-cream-soft/40">
        <div className="container-page py-20 md:py-28">
          <SectionHeader
            eyebrow="Filosofía"
            title="Cómo entendemos el cuidado de la piel"
            align="center"
            className="mx-auto"
          />
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {philosophy.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 0.1}>
                  <div className="flex h-full flex-col rounded-3xl bg-warm-white p-8 shadow-soft">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sage/20 text-sage-deep">
                      <Icon size={24} weight="light" />
                    </span>
                    <h3 className="mt-5 text-2xl text-graphite">{p.title}</h3>
                    <p className="mt-3 text-[0.98rem] leading-relaxed text-brown/70">
                      {p.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nuestro equipo — cards con foto circular (datos en src/data/team.js) */}
      <TeamSection />

      {/* Sección de equipo original (preservada sin renderizar): cambiar
          `false` por `true` para volver a mostrarla. */}
      {false && (
      <section className="container-page py-20 md:py-28">
        <SectionHeader title="El equipo profesional" />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1].map((i) => (
            <Reveal key={i} delay={i * 0.1}>
              <article className="overflow-hidden rounded-3xl border border-cream bg-warm-white">
                <EditorialImage
                  seed={`profesional-derma-${i}`}
                  w={720}
                  h={800}
                  alt="Profesional del equipo de Dermafisherton"
                  rounded="rounded-none"
                  className="aspect-[4/4] w-full"
                />
                <div className="p-7">
                  <h3 className="text-2xl text-graphite">Dra. [Nombre Apellido]</h3>
                  <p className="mt-1 text-sm font-medium text-sage-deep">
                    Dermatología / Medicina estética
                  </p>
                  <p className="mt-1 text-sm text-taupe">Matrícula: [Matrícula]</p>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-brown/70">
                    [Breve descripción del recorrido profesional, formación y
                    enfoque de atención. Texto editable.]
                  </p>
                </div>
              </article>
            </Reveal>
          ))}

          {/* Nota editable */}
          <Reveal delay={0.2}>
            <div className="flex h-full flex-col justify-center rounded-3xl border border-dashed border-taupe/40 bg-cream-soft/40 p-8">
              <p className="font-display text-2xl text-brown">
                Espacio para sumar más integrantes del equipo.
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-brown/60">
                Agregá aquí a cada profesional con su nombre, especialidad,
                matrícula y una breve presentación.
              </p>
            </div>
          </Reveal>
        </div>
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
