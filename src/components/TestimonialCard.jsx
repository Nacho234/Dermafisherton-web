// Quote max 3 lines, clean attribution (name + detail). Real typographic quotes.
export default function TestimonialCard({ quote, name, detail }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-cream bg-warm-white/60 p-8">
      <span aria-hidden className="font-display text-5xl leading-none text-sage-deep/50">
        &ldquo;
      </span>
      <blockquote className="mt-3 flex-1 font-display text-[1.4rem] leading-snug text-graphite">
        {quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-cream pt-5 text-sm">
        <span className="font-semibold text-brown">{name}</span>
        <span className="mt-0.5 block text-taupe">{detail}</span>
      </figcaption>
    </figure>
  );
}
