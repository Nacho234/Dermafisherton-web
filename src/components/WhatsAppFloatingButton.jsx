import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { waLink } from "../data/site";

// Floating WhatsApp CTA con cápsula Double-Bezel y física táctil.
export default function WhatsAppFloatingButton() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.a
      href={waLink("Hola, quisiera coordinar una consulta.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Consultar por WhatsApp"
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.85,
        y: visible ? 0 : 12,
        pointerEvents: visible ? "auto" : "none",
      }}
      whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ duration: reduce ? 0 : 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="fixed bottom-5 right-5 z-40 rounded-full border border-sage/45 bg-surface-pure/80 p-1 shadow-lift backdrop-blur-md md:bottom-7 md:right-7"
    >
      <span className="flex items-center gap-2.5 rounded-full bg-sage-deep px-5 py-3 text-warm-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]">
        <WhatsappLogo size={21} weight="fill" />
        <span className="hidden text-sm font-semibold tracking-wide sm:inline">
          WhatsApp
        </span>
      </span>
    </motion.a>
  );
}
