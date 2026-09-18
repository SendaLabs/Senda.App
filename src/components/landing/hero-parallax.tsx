"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function HeroParallax({
  copy,
  card,
}: {
  copy: ReactNode;
  card: ReactNode;
}) {
  const reduce = useReducedMotion() ?? false;
  const targetRef = useRef<HTMLDivElement>(null);
  const [allowParallax, setAllowParallax] = useState(false);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 96]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const update = () => setAllowParallax(desktop.matches && !reduce);
    update();
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, [reduce]);

  return (
    <div
      ref={targetRef}
      className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16"
    >
      <motion.div className="min-w-0" style={allowParallax ? { y: copyY } : undefined}>
        {copy}
      </motion.div>
      <div className="mx-auto w-full min-w-0 max-w-md md:mx-0 md:justify-self-end">
        <motion.div style={allowParallax ? { y: cardY } : undefined}>
          {card}
        </motion.div>
      </div>
    </div>
  );
}
