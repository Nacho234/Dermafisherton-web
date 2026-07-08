import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  WhatsappLogo,
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

  // Slug inexistente -> volvemos a Nosotros (donde está el equipo).
  if (!member) return <Navigate to="/nosotros" replace />;

  const { name, role, photo, bioLong, bio, details } = member;
  const message = `Hola, quisiera pedir un turno con ${name} (${role}).`;

  return (
    <>
      <section className="bg-warm-white pt-28 md:pt-32">
        <div className="container-page pb-16 md:pb-24">
          <Reveal mode="mount">
            <Link
              to="/nosotros"
              className="inline-flex items-center gap-2 text-sm font-medium text-brown/70 transition-colors hover:text-brown"
            >
              <ArrowLeft size={16} weight="bold" /> Nuestro equipo
            </Link>
          </Reveal>

          {/* Cabecera del perfil */}
          <div className="mt-8 grid items-center gap-8 md:grid-cols-12 md:gap-12">
            <Reveal mode="mount" className="md:col-span-4 lg:col-span-3">
              <div className="aspect-square w-full max-w-xs overflow-hidden rounded-3xl border border-cream bg-cream shadow-soft">
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
            </Reveal>

            <div className="md:col-span-8 lg:col-span-9">
              <Reveal mode="mount" delay={0.06}>
                <span className="eyebrow">{role}</span>
              </Reveal>
              <Reveal mode="mount" delay={0.1}>
                <h1 className="mt-3 text-[2.2rem] leading-[1.05] sm:text-5xl">
                  {name}
                </h1>
              </Reveal>
              <Reveal mode="mount" delay={0.16}>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brown/75">
                  {bioLong || bio}
                </p>
              </Reveal>
              <Reveal mode="mount" delay={0.22}>
                <div className="mt-8">
                  <Button
                    href={waLink(message)}
                    target="_blank"
                    rel="noreferrer"
                    variant="sage"
                    size="lg"
                  >
                    <WhatsappLogo size={20} weight="fill" /> Pedir un turno
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Detalles / áreas */}
          {details?.length > 0 && (
            <Reveal className="mt-14 border-t border-cream pt-12">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-taupe">
                Formación y áreas
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {details.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <CheckCircle
                      size={22}
                      weight="light"
                      className="mt-0.5 shrink-0 text-sage-deep"
                    />
                    <span className="text-[1rem] leading-relaxed text-brown/80">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
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
