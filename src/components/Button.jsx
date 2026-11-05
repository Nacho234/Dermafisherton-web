import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";

// One radius system (pill for interactive), tactile press, AA contrast checked.
// Supports `arrow` for the high-end "Button-in-Button" trailing circular badge.
const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium " +
  "transition-[background-color,border-color,box-shadow,color,transform,filter] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] " +
  "active:scale-[0.97] active:duration-100 " +
  "whitespace-nowrap select-none text-[0.95rem] leading-none";

const sizes = {
  md: "px-6 py-3.5",
  lg: "px-8 py-4 text-base",
};

const arrowSizes = {
  md: "pl-6 pr-2 py-2",
  lg: "pl-7 pr-2.5 py-2.5 text-base",
};

const badgeSizes = {
  md: "h-8 w-8",
  lg: "h-9 w-9",
};

const variants = {
  // graphite bg + warm-white text -> ~13:1 contrast
  primary:
    "bg-graphite text-warm-white hover:bg-brown shadow-soft hover:shadow-lift " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_30px_-14px_rgba(44,44,44,0.38)]",
  // sage-deep bg + warm-white text -> AA large
  sage:
    "bg-sage-deep text-warm-white hover:bg-[#6e8265] shadow-soft hover:shadow-lift " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_12px_28px_-14px_rgba(125,145,116,0.45)]",
  // outline on light
  outline:
    "border border-brown/20 bg-warm-white/80 text-brown hover:border-brown/50 hover:bg-cream/30 shadow-ambient",
  // dorado champagne (hero): texto grafito sobre oro claro
  gold:
    "gold-fill btn-shine text-graphite hover:brightness-105 " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_14px_30px_-14px_rgba(150,108,36,0.6)]",
  ghost: "text-brown hover:bg-cream/35",
};

const badgeVariants = {
  primary: "bg-warm-white/14 text-warm-white group-hover:bg-warm-white/22",
  sage: "bg-warm-white/18 text-warm-white group-hover:bg-warm-white/28",
  outline: "bg-brown/[0.07] text-brown group-hover:bg-brown/12",
  gold: "bg-white/40 text-graphite group-hover:bg-white/55",
  ghost: "bg-brown/[0.06] text-brown group-hover:bg-brown/12",
};

export default function Button({
  as = "button",
  to,
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  children,
  ...props
}) {
  const pad = arrow ? arrowSizes[size] : sizes[size];
  const cls = `${base} ${pad} ${variants[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          aria-hidden
          className={`grid ${badgeSizes[size]} shrink-0 place-items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105 ${badgeVariants[variant]}`}
        >
          <ArrowUpRight size={15} weight="bold" />
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {content}
      </a>
    );
  }
  const Tag = as;
  return (
    <Tag className={cls} {...props}>
      {content}
    </Tag>
  );
}
