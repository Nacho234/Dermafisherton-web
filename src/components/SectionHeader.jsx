import Reveal from "./Reveal";

// Vertical stack only (no split-header pattern). Eyebrow is optional and
// rationed by the pages themselves (max 1 per 3 sections).
export default function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}) {
  const alignCls = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignCls} ${className}`}>
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="text-3xl leading-[1.08] sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-brown/75">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
