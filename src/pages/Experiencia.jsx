import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import FAQAccordion from "../components/FAQAccordion";
import CTASection from "../components/CTASection";
import { faqs } from "../data/content";
import experienciaClip from "../assets/experiencia-clip.mp4";
import experienciaClipPoster from "../assets/experiencia-clip-poster.webp";

const steps = [
  { n: "01", title: "Nos contás qué querés mejorar", text: "Escuchamos tus inquietudes y objetivos para tu piel." },
  { n: "02", title: "Evaluamos tu piel y antecedentes", text: "Una evaluación profesional es el punto de partida de todo." },
  { n: "03", title: "Te explicamos las opciones", text: "Con claridad y sin apuros, repasamos las alternativas posibles." },
  { n: "04", title: "Definimos un plan personalizado", text: "Elegimos juntos el tratamiento más adecuado para vos." },
  { n: "05", title: "Realizamos el tratamiento", text: "Con protocolos seguros y acompañamiento en cada paso." },
  { n: "06", title: "Indicamos cuidados y seguimiento", text: "Te acompañamos después para sostener los resultados." },
];

export default function Experiencia() {
  return (
    <>
      <PageHero
        eyebrow="Experiencia"
        title="Una experiencia pensada para acompañarte desde la primera consulta"
        subtitle="Desde la evaluación inicial hasta el seguimiento posterior, cada paso cuida tu piel con claridad, seguridad y cercanía."
        video={experienciaClip}
        videoPoster={experienciaClipPoster}
        imageAlt="Atención personalizada en Dermafisherton"
      />

      {/* Timeline */}
      <section className="container-page py-20 md:py-28">
        <SectionHeader title="Paso a paso, cómo es atenderte con nosotros" />
        <ol className="mt-14 max-w-3xl">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={(i % 3) * 0.06} className="group relative flex gap-6 pb-10 last:pb-0 md:gap-10">
              {/* rail */}
              <div className="relative flex flex-col items-center">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-cream bg-warm-white font-display text-xl text-sage-deep shadow-soft">
                  {s.n}
                </span>
                {i < steps.length - 1 && (
                  <span className="mt-2 w-px flex-1 bg-cream" aria-hidden />
                )}
              </div>
              <div className="pt-2.5">
                <h3 className="text-2xl text-graphite">{s.title}</h3>
                <p className="mt-2 max-w-lg text-[1rem] leading-relaxed text-brown/70">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="border-t border-cream bg-cream-soft/40">
        <div className="container-page py-20 md:py-28">
          <SectionHeader
            eyebrow="Preguntas frecuentes"
            title="Todo lo que quizás te estás preguntando"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CTASection
        title="Una experiencia personalizada desde la primera consulta"
        text="Escribinos y coordinamos tu evaluación inicial cuando te quede cómodo."
        message="Hola, quisiera coordinar una primera consulta."
      />
    </>
  );
}
