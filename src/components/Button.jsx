import { Link } from "react-router-dom";

// One radius system (pill for interactive), tactile press, AA contrast checked.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-all duration-300 ease-out active:translate-y-px " +
  "whitespace-nowrap select-none text-[0.95rem] leading-none";

const sizes = {
  md: "px-6 py-3.5",
  lg: "px-8 py-4 text-base",
};

const variants = {
  // graphite bg + warm-white text -> ~13:1 contrast
  primary:
    "bg-graphite text-warm-white hover:bg-brown shadow-soft hover:shadow-lift",
  // sage-deep bg + warm-white text -> AA large
  sage: "bg-sage-deep text-warm-white hover:brightness-95 shadow-soft hover:shadow-lift",
  // outline on light
  outline:
    "border border-taupe/40 text-brown hover:border-brown hover:bg-black/[0.03]",
  ghost: "text-brown hover:bg-black/[0.04]",
};

export default function Button({
  as = "button",
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }
  const Tag = as;
  return (
    <Tag className={cls} {...props}>
      {children}
    </Tag>
  );
}
