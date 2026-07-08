import { WhatsappLogo, InstagramLogo, MapPinLine, ArrowUpRight } from "@phosphor-icons/react";
import Reveal from "../components/Reveal";
import ContactForm from "../components/ContactForm";
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
      {/* Hero — editorial, no image (message is the design) */}
      <section className="bg-warm-white pt-28 md:pt-36">
        <div className="container-page pb-6 text-center">
          <Reveal>
            <span className="eyebrow">Contacto · Turnos</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mx-auto mt-5 max-w-3xl text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl">
              Reservá tu consulta
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brown/75">
              Contanos qué tratamiento te interesa o qué querés mejorar, y te
              orientamos para coordinar una evaluación.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Options + form */}
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Options */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              {options.map((o, i) => {
                const Icon = o.icon;
                const inner = (
                  <div className="group flex items-center gap-4 rounded-3xl border border-cream bg-warm-white p-6 transition-shadow duration-500 hover:shadow-soft">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sage/20 text-sage-deep">
                      <Icon size={24} weight="light" />
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg text-graphite">{o.title}</h3>
                      <p className="text-[0.92rem] text-brown/65">{o.text}</p>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-semibold text-sage-deep">
                      {o.cta}
                      <ArrowUpRight
                        size={15}
                        weight="bold"
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                );
                return (
                  <Reveal key={o.title} delay={i * 0.08}>
                    {o.external ? (
                      <a href={o.href} target="_blank" rel="noreferrer">{inner}</a>
                    ) : (
                      <a href={o.href}>{inner}</a>
                    )}
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.2}>
              <p className="mt-8 rounded-3xl border border-cream bg-white p-6 text-[0.95rem] leading-relaxed text-brown/70">
                Cada consulta parte de una evaluación profesional. Te
                respondemos para coordinar el mejor momento para tu piel.
              </p>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal y={26}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
