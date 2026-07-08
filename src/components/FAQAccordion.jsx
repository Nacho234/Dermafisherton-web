import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react";

function Item({ q, a, isOpen, onToggle, id }) {
  const reduce = useReducedMotion();
  return (
    <div className="border-b border-cream">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${id}`}
          id={`faq-trigger-${id}`}
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="font-display text-xl text-graphite md:text-2xl">
            {q}
          </span>
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-taupe/30 text-brown transition-transform duration-300 ${
              isOpen ? "rotate-45 bg-sage/25" : ""
            }`}
          >
            <Plus size={16} weight="bold" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${id}`}
            role="region"
            aria-labelledby={`faq-trigger-${id}`}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 pr-12 text-[1.02rem] leading-relaxed text-brown/75">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto max-w-3xl">
      {items.map((item, i) => (
        <Item
          key={item.q}
          id={i}
          {...item}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
        />
      ))}
    </div>
  );
}
