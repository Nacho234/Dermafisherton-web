import Reveal from "./Reveal";
import ctaVideo from "../assets/cta-bg.mp4";
import ctaPoster from "../assets/cta-bg-poster.webp";

// Banda de cierre reutilizable en marco Double-Bezel con video de la clínica de fondo.
// Sin botón propio: la conversión queda en el flotante de WhatsApp.
export default function CTASection({
  title = "Empezá con una evaluación personalizada",
  text = "Contanos qué querés mejorar y te orientamos sobre el tratamiento más adecuado para tu piel.",
  // eslint-disable-next-line no-unused-vars
  message,
}) {
  return (
    <section className="container-page py-24 md:py-32">
      <Reveal className="bezel-shell">
        <div className="bezel-core relative overflow-hidden bg-espresso px-7 py-20 text-center md:px-14 md:py-28">
          {/* Video de fondo, nítido */}
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
          {/* Velado cálido multicapa para legibilidad editorial */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-espresso/60 via-espresso/45 to-espresso/70"
          />
          {/* Luz ambiental salvia suave */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sage/25 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl leading-[1.08] text-warm-white sm:text-4xl md:text-[3rem]">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1.06rem] leading-relaxed text-warm-white/80">
              {text}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
