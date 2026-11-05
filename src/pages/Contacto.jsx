import { Link } from "react-router-dom";
import { WhatsappLogo, InstagramLogo, MapPinLine, ArrowUpRight } from "@phosphor-icons/react";
import Reveal from "../components/Reveal";
import ContactForm from "../components/ContactForm";
import BookingTutorial from "../components/BookingTutorial";
import BookingFlow from "../components/booking/BookingFlow";
import SectionHeader from "../components/SectionHeader";
import { site, waLink } from "../data/site";

const options = [
  {
    icon: WhatsappLogo,
    title: "WhatsApp",
    text: "La forma más rápida de coordinar tu turno.",
    href: waLink("Hola, quisiera reservar un turno."),
    cta: "Escribir",
    external: true,
  },
  {
    icon: InstagramLogo,
    title: "Instagram",
    text: "Seguinos para conocer novedades y tratamientos.",
    href: site.instagram,
    cta: site.instagramHandle,
    external: true,
  },
  {
    icon: MapPinLine,
    title: "Ubicación",
    text: "Encontranos en Fisherton.",
    href: "/ubicacion",
    cta: "Ver cómo llegar",
    external: false,
  },
];

export default function Contacto() {
  return (
    <>
      {/* Hero editorial */}
      <section className="bg-warm-white pt-24 md:pt-32">
        <div className="container-page pb-6 text-center">
          <Reveal>
            <span className="inline-flex items-center text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brown/75">
              Contacto · Turnos
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mx-auto mt-5 max-w-3xl text-[2.5rem] leading-[1.06] sm:text-5xl md:text-6xl">
              Reservá tu consulta
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-brown/75">
              Elegí tu especialista, el día y el horario. La clínica confirma tu
              turno y te avisa.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sistema de turnos */}
      <section id="reservar" className="container-page pb-8 pt-10 md:pt-14">
        <BookingFlow />
      </section>

      {/* Alternativa: escribirnos directamente */}
      <section className="container-page pt-16 md:pt-24">
        <SectionHeader
          title="¿Preferís escribirnos?"
          intro="También podés consultarnos directo por WhatsApp o dejarnos tu mensaje, y coordinamos con vos."
          align="center"
          className="mx-auto"
        />
      </section>

      {/* Opciones + formulario */}
      <section className="container-page py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Opciones */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              {options.map((o, i) => {
                const Icon = o.icon;
                const inner = (
                  <div className="bezel-shell group transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:shadow-soft">
                    <div className="bezel-core flex items-center gap-4 bg-surface-pure p-5 sm:p-6">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-sage/30 bg-sage/18 text-sage-deep">
                        <Icon size={24} weight="light" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-lg text-graphite">{o.title}</h2>
                        <p className="text-[0.9rem] leading-snug text-brown/68">
                          {o.text}
                        </p>
                      </div>
                      <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-sage-deep transition-colors group-hover:text-brown">
                        <span className="hidden sm:inline">{o.cta}</span>
                        <span
                          aria-hidden
                          className="grid h-7 w-7 place-items-center rounded-full border border-cream bg-cream/30 text-brown transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-sage/50 group-hover:bg-sage-deep group-hover:text-warm-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                          <ArrowUpRight size={13} weight="bold" />
                        </span>
                      </span>
                    </div>
                  </div>
                );
                return (
                  <Reveal key={o.title} delay={i * 0.08}>
                    {o.external ? (
                      <a href={o.href} target="_blank" rel="noreferrer" className="block">
                        {inner}
                      </a>
                    ) : (
                      <Link to={o.href} className="block">
                        {inner}
                      </Link>
                    )}
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.2}>
              <div className="bezel-shell mt-7">
                <p className="bezel-core bg-surface-pure p-6 text-[0.95rem] leading-relaxed text-brown/72">
                  Cada consulta parte de una evaluación profesional. Te
                  respondemos para coordinar el mejor momento para tu piel.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-7">
            <Reveal y={26}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tutorial en video: cómo reservar paso a paso */}
      <section className="container-page pb-20 md:pb-28">
        <BookingTutorial />
      </section>
    </>
  );
}
