import { motion, useReducedMotion } from "motion/react";

// Subtle, slow scroll-reveal. MOTION_INTENSITY 4: enter on view, no loops.
// Motion is motivated: it sequences content as the reader arrives (storytelling).
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 22,
  className = "",
  amount = 0.25,
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
