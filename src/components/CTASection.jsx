import { WhatsappLogo } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import Button from "./Button";
import { waLink } from "../data/site";
import ctaVideo from "../assets/cta-bg.mp4";
import ctaPoster from "../assets/cta-bg-poster.webp";

// Reusable closing CTA. Single WhatsApp intent ("Consultar por WhatsApp").
// Fondo: video de la clínica difuminado + velado oscuro para legibilidad.
export default function CTASection({
  title = "Empezá con una evaluación personalizada",
  text = "Contanos qué querés mejorar y te orientamos sobre el tratamiento más adecuado para tu piel.",
  message = "Hola, quisiera empezar con una evaluación personalizada.",
}) {
  return (
    <section className="container-page py-20 md:py-28">
      <Reveal className="relative overflow-hidden rounded-3xl bg-brown px-7 py-16 text-center md:px-12 md:py-24">
        {/* Video de fondo, nítido (sin blur) */}
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src={ctaVideo}
          poster={ctaPoster}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
        {/* Velado cálido para que el texto y el botón se lean */}
        <div aria-hidden className="absolute inset-0 bg-brown/45" />
        {/* soft sage glow, tinted not neon */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sage/25 blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl leading-tight text-warm-white sm:text-4xl md:text-[2.75rem]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-warm-white/70">
            {text}
          </p>
          <div className="mt-9 flex justify-center">
            <Button
              href={waLink(message)}
              target="_blank"
              rel="noreferrer"
              variant="sage"
              size="lg"
            >
              <WhatsappLogo size={20} weight="fill" />
              Consultar por WhatsApp
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
