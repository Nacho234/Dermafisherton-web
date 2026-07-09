import { ArrowUpRight } from "@phosphor-icons/react";
import EditorialImage from "./EditorialImage";
import { waLink } from "../data/site";

// Card de tratamiento: la foto ocupa toda la card y el texto va encima,
// con un degradado inferior que garantiza la legibilidad (estilo overlay).
export default function TreatmentCard({ title, blurb, seed, src }) {
  return (
    <article className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl shadow-soft transition-shadow duration-500 hover:shadow-lift">
      {/* Foto de fondo */}
      <div className="absolute inset-0">
        <EditorialImage
          src={src}
          seed={seed}
          w={760}
          h={950}
          alt={`${title} — Dermafisherton`}
          rounded="rounded-none"
          scrim={false}
          className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
      </div>

      {/* Degradado para legibilidad del texto */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/30 to-transparent transition-opacity duration-500 group-hover:from-graphite/95" />

      {/* Contenido */}
      <div className="relative p-6 sm:p-7">
        <h3 className="text-2xl leading-tight text-white">{title}</h3>
        <p className="mt-2.5 text-[0.95rem] leading-relaxed text-white/80">
          {blurb}
        </p>
        <a
          href={waLink(`Hola, quisiera consultar por ${title}.`)}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-sage"
        >
          Consultar
          <ArrowUpRight
            weight="bold"
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            size={16}
          />
        </a>
      </div>
    </article>
  );
}
