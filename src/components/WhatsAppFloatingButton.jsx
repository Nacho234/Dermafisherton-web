import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { waLink } from "../data/site";

// Floating WhatsApp CTA. Appears after a little scroll so it doesn't fight the hero.
export default function WhatsAppFloatingButton() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
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
        scale: visible ? 1 : 0.8,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-sage-deep px-5 py-3.5 text-warm-white shadow-lift md:bottom-7 md:right-7"
    >
      <WhatsappLogo size={22} weight="fill" />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </motion.a>
  );
}
