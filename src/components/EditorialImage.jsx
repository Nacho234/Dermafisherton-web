// Editorial image. Pass a real `src` (imported asset) for clinic photography,
// or leave it out to fall back to an on-brand grayscale placeholder (Picsum).
// `scrim` adds the warm overlay — turn it off for clean color photos.
export default function EditorialImage({
  src,
  seed = "dermafisherton",
  w = 900,
  h = 1100,
  alt = "",
  className = "",
  rounded = "rounded-3xl",
  priority = false,
  grayscale = true,
  scrim = true,
  objectPosition = "center",
}) {
  const resolved =
    src || `https://picsum.photos/seed/${seed}/${w}/${h}${grayscale ? "?grayscale" : ""}`;
  return (
    <figure
      className={`relative overflow-hidden bg-cream ${scrim ? "img-scrim" : ""} ${rounded} ${className}`}
    >
      <img
        src={resolved}
        alt={alt}
        width={w}
        height={h}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{ objectPosition }}
        className="h-full w-full object-cover"
      />
    </figure>
  );
}
