"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const viewport = { once: true, margin: "-100px" } as const;

export function ScrollReveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion() ?? false;

  if (reduce) {
    return children;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
