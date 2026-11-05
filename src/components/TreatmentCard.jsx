import { ArrowUpRight } from "@phosphor-icons/react";
import EditorialImage from "./EditorialImage";
import { waLink } from "../data/site";

// Card de tratamiento con Double-Bezel y botón cápsula de vidrio al pie.
export default function TreatmentCard({ title, blurb, seed, src }) {
  return (
    <article className="bezel-shell group h-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-lift">
      <div className="bezel-core relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden bg-cream">
        {/* Foto de fondo */}
        <div className="absolute inset-0">
          <EditorialImage
            src={src}
            seed={seed}
            w={760}
            h={950}
            alt={`${title} · Dermafisherton`}
            rounded="rounded-none"
            scrim={false}
            className="h-full w-full transition-transform duration-[950ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
          />
        </div>

        {/* Degradado cálido multicapa para legibilidad editorial */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/92 via-graphite/38 to-transparent transition-opacity duration-500 group-hover:from-graphite/96"
        />

        {/* Contenido inferior */}
        <div className="relative flex flex-col p-6 sm:p-7">
          <h3 className="text-[1.6rem] leading-[1.12] text-white">{title}</h3>
          <p className="mt-2 line-clamp-3 text-[0.92rem] leading-relaxed text-white/82">
            {blurb}
          </p>
          <div className="mt-5 pt-1">
            <a
              href={waLink(`Hola, quisiera consultar por ${title}.`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/12 py-1.5 pl-4 pr-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/45 hover:bg-white/22 active:scale-[0.98]"
            >
              <span>Consultar</span>
              <span
                aria-hidden
                className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <ArrowUpRight weight="bold" size={13} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
