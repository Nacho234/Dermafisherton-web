import Reveal from "./Reveal";
import EditorialImage from "./EditorialImage";

// Shared hero for interior pages. Asymmetric split, calm and airy,
// framed with the Double-Bezel machined enclosure.
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  seed,
  src,
  imageAlt,
  scrim = true,
  imgClassName = "aspect-[5/4] w-full",
  objectPosition = "center",
  video,
  videoPoster,
  imageOverlay,
  textSpan = "md:col-span-6 lg:col-span-6",
  mediaSpan = "md:col-span-6 lg:col-span-6",
  // espacio superior: por defecto despeja el Navbar fijo; en el medio de la página, pasar "pt-0"
  topClassName = "pt-24 md:pt-28",
}) {
  return (
    <section className={`relative overflow-hidden bg-warm-white ${topClassName}`}>
      <div className="container-page grid items-center gap-10 pb-16 md:grid-cols-12 md:gap-14 md:pb-24">
        <div className={textSpan}>
          {eyebrow && (
            <Reveal>
              <span className="inline-flex items-center text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brown/75">
                {eyebrow}
              </span>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-[2.45rem] leading-[1.06] sm:text-5xl md:text-[3.45rem]">
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-brown/75">
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>

        <div className={mediaSpan}>
          <Reveal delay={0.1} y={26} className="relative">
            <div className="bezel-shell mx-auto w-fit max-w-full">
              {video ? (
                <video
                  src={video}
                  poster={videoPoster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={imageAlt}
                  style={{ objectPosition }}
                  className={`bezel-core block object-cover ${imgClassName}`}
                />
              ) : (
                <EditorialImage
                  src={src}
                  seed={seed}
                  w={1000}
                  h={800}
                  alt={imageAlt}
                  priority
                  scrim={scrim}
                  rounded="bezel-core"
                  objectPosition={objectPosition}
                  className={imgClassName}
                />
              )}
            </div>
            {imageOverlay}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
