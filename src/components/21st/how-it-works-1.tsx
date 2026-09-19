/**
 * 21st.dev community — @7ovr/how-it-works-1
 * Source: https://7ovr.com/r/how-it-works-1.json
 * Listing: https://21st.dev/@7ovr/how-it-works-1
 * License: MIT-0
 */
"use client";

import { type CSSProperties, type ReactNode, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Banknote,
  CheckCircle2,
  CreditCard,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

import { cn } from "~/lib/utils";

export type HowItWorksStep = {
  number: string;
  title: string;
  copy: string;
};

const stepIcons: LucideIcon[] = [
  MessageCircle,
  Banknote,
  CreditCard,
  CheckCircle2,
];

export function HowItWorks1({
  id,
  eyebrow,
  title,
  description,
  steps,
  action,
  className,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  steps: readonly HowItWorksStep[];
  action?: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const [drawn, setDrawn] = useState(reduce);

  return (
    <section
      id={id}
      className={cn(
        "text-forest flex w-full items-center justify-center bg-white px-5 py-12 md:px-8 md:py-16",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-forest/60 text-sm font-medium tracking-widest uppercase">
            {eyebrow}
          </span>
          <h2 className="editorial-display text-forest mt-3 text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="text-charcoal/75 mt-3 text-base leading-relaxed">
            {description}
          </p>
          {action ? (
            <div className="mt-5 flex justify-center">{action}</div>
          ) : null}
        </div>

        <motion.div
          className="mt-9 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-7 lg:grid-cols-4 lg:gap-0"
          initial={false}
          whileInView="show"
          viewport={{ once: true, amount: 0.28 }}
          onViewportEnter={() => setDrawn(true)}
        >
          {steps.map(({ number, title: stepTitle, copy }, index) => {
            const Icon = stepIcons[index] ?? MessageCircle;
            return (
              <div key={number} className="relative text-center lg:px-7">
                {index < steps.length - 1 ? (
                  <ArrowRight
                    className="text-forest absolute top-[1.75rem] -right-3 hidden size-5 -translate-y-1/2 lg:block"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="icon-wrap relative mx-auto size-12">
                  <Icon
                    aria-hidden
                    strokeWidth={1.75}
                    absoluteStrokeWidth
                    data-drawn={drawn ? "true" : "false"}
                    className={cn(
                      "size-12 text-[#0f3d2e]",
                      reduce ? undefined : "how-icon-stroke",
                    )}
                    style={
                      {
                        "--how-icon-delay": `${index * 0.35}s`,
                      } as CSSProperties
                    }
                  />
                  <span className="bg-forest text-cream absolute -top-[6px] -right-[6px] flex size-6 items-center justify-center rounded-full text-xs font-semibold">
                    {number}
                  </span>
                </div>
                <h3 className="text-forest mt-4 text-base font-semibold">
                  {stepTitle}
                </h3>
                <p className="text-charcoal/70 mx-auto mt-2 max-w-[19ch] text-sm leading-relaxed">
                  {copy}
                </p>
                {index < steps.length - 1 ? (
                  <ArrowDown
                    className="text-forest mx-auto mt-4 block size-5 md:hidden"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
