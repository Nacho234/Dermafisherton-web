import { Cpu, ShieldCheck, UserFocus, HeartHalf } from "@phosphor-icons/react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import EditorialImage from "../components/EditorialImage";
import SectionHeader from "../components/SectionHeader";
import CTASection from "../components/CTASection";

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

export default function Tecnologia() {
  return (
    <>
      <PageHero
        eyebrow="Tecnología"
        title="Tecnología estética al servicio de tu piel"
        subtitle="Combinamos evaluación profesional, protocolos actualizados y equipamiento adecuado para ofrecer tratamientos seguros y personalizados."
        seed="aesthetic-technology-soft"
        imageAlt="Equipamiento estético de Dermafisherton"
      />

      {/* 4 principle blocks — bento with rhythm */}
      <section className="container-page py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-2">
          {blocks.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={(i % 2) * 0.08}>
                <div className="flex h-full gap-5 rounded-3xl border border-cream bg-warm-white p-8 shadow-soft">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sage/20 text-sage-deep">
                    <Icon size={24} weight="light" />
                  </span>
                  <div>
                    <h3 className="text-2xl text-graphite">{b.title}</h3>
                    <p className="mt-2.5 text-[0.98rem] leading-relaxed text-brown/70">
                      {b.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Editorial band with editable placeholders */}
      <section className="bg-brown text-warm-white">
        <div className="container-page grid items-center gap-12 py-20 md:grid-cols-12 md:gap-16 md:py-28">
          <Reveal className="md:col-span-6" y={26}>
            <EditorialImage
              seed="clinic-device-detail"
              w={1000}
              h={900}
              alt="Detalle de aparatología en Dermafisherton"
              grayscale={false}
              className="aspect-[10/9] w-full"
            />
          </Reveal>
          <div className="md:col-span-6">
            <h2 className="text-3xl leading-tight text-warm-white sm:text-4xl">
              Equipamiento y protocolos
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-warm-white/75">
              La aparatología específica y los protocolos utilizados se definen
              según cada tratamiento y evaluación. Completá esta sección con la
              información real de la clínica.
            </p>
            <ul className="mt-8 space-y-4">
              {["[Nombre de aparatología]", "[Tecnología utilizada]", "[Protocolo específico]"].map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b border-warm-white/15 pb-4 text-warm-white/80"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                    {item}
                  </li>
                )
              )}
            </ul>
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
