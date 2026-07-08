import Reveal from "./Reveal";
import EditorialImage from "./EditorialImage";

// Shared hero for interior pages. Asymmetric split, calm and airy.
export default function PageHero({ eyebrow, title, subtitle, seed, imageAlt }) {
  return (
    <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32">
      <div className="container-page grid items-center gap-10 pb-16 md:grid-cols-12 md:gap-14 md:pb-24">
        <div className="md:col-span-6 lg:col-span-6">
          {eyebrow && (
            <Reveal>
              <span className="eyebrow">{eyebrow}</span>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-[2.4rem] leading-[1.05] sm:text-5xl md:text-[3.4rem]">
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-brown/75">
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>

        <div className="md:col-span-6 lg:col-span-6">
          <Reveal delay={0.1} y={28}>
            <EditorialImage
              seed={seed}
              w={1000}
              h={800}
              alt={imageAlt}
              priority
              className="aspect-[5/4] w-full"
            />
          </Reveal>
        </div>
      </div>

      {/* soft sage wash at the base of the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-cream-soft/60"
      />
    </section>
  );
}
