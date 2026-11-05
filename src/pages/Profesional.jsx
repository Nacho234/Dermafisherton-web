import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  User,
} from "@phosphor-icons/react";
import Reveal from "../components/Reveal";
import Button from "../components/Button";
import CTASection from "../components/CTASection";
import { getMember } from "../data/team";
import { waLink } from "../data/site";

// Perfil individual de cada integrante del equipo: /equipo/<slug>
export default function Profesional() {
  const { slug } = useParams();
  const member = getMember(slug);

  if (!member) return <Navigate to="/nosotros" replace />;

  const { name, role, photo, bioLong, bio, details } = member;
  const message = `Hola, quisiera pedir un turno con ${name} (${role}).`;

  return (
    <>
      <section className="bg-warm-white pt-24 md:pt-28">
        <div className="container-page pb-16 md:pb-24">
          <Reveal>
            <Link
              to="/nosotros"
              className="group inline-flex items-center gap-2 rounded-full border border-cream bg-cream/25 px-4 py-2 text-sm font-medium text-brown/75 transition-colors hover:border-sage-deep/40 hover:text-graphite"
            >
              <ArrowLeft
                size={15}
                weight="bold"
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              Nuestro equipo
            </Link>
          </Reveal>

          {/* Cabecera del perfil */}
          <div className="mt-9 grid items-center gap-8 md:grid-cols-12 md:gap-12">
            <Reveal className="md:col-span-4 lg:col-span-3">
              <div className="bezel-shell max-w-xs">
                <div className="bezel-core aspect-square w-full overflow-hidden bg-cream">
                  {photo ? (
                    <img
                      src={photo}
                      alt={name}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <span className="grid h-full w-full place-items-center bg-sage/15 text-sage-deep">
                      <User size={72} weight="light" />
                    </span>
                  )}
                </div>
              </div>
            </Reveal>

            <div className="md:col-span-8 lg:col-span-9">
              <Reveal delay={0.06}>
                <span className="eyebrow">{role}</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-3 text-[2.3rem] leading-[1.06] sm:text-5xl">
                  {name}
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-brown/75">
                  {bioLong || bio}
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="mt-8">
                  <Button
                    href={waLink(message)}
                    target="_blank"
                    rel="noreferrer"
                    variant="sage"
                    size="lg"
                    arrow
                  >
                    Pedir un turno
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Detalles / áreas */}
          {details?.length > 0 && (
            <Reveal className="bezel-shell mt-14">
              <div className="bezel-core bg-surface-pure p-7 sm:p-9">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-taupe">
                  Formación y áreas de atención
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {details.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <CheckCircle
                        size={21}
                        weight="light"
                        className="mt-0.5 shrink-0 text-sage-deep"
                      />
                      <span className="text-[0.98rem] leading-relaxed text-brown/80">
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CTASection
        title={`Coordiná tu turno con ${name.replace(/^Dr[a]?\.\s/, "")}`}
        text="Escribinos por WhatsApp y coordinamos tu evaluación cuando te quede cómodo."
        message={message}
      />
    </>
  );
}
