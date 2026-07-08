import { ArrowUpRight } from "@phosphor-icons/react";
import EditorialImage from "./EditorialImage";
import { waLink } from "../data/site";

// Premium treatment card: image, title, blurb, single "Consultar" action.
export default function TreatmentCard({ title, blurb, seed }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-warm-white shadow-soft transition-shadow duration-500 hover:shadow-lift">
      <div className="overflow-hidden">
        <EditorialImage
          seed={seed}
          w={720}
          h={560}
          alt={`${title} — Dermafisherton`}
          rounded="rounded-none"
          className="aspect-[4/3] w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-2xl">{title}</h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-brown/70">
          {blurb}
        </p>
        <a
          href={waLink(`Hola, quisiera consultar por ${title}.`)}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep transition-colors hover:text-brown"
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
