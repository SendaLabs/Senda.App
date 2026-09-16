/**
 * 21st.dev community — @7ovr/how-it-works-1
 * Source: https://7ovr.com/r/how-it-works-1.json
 * Listing: https://21st.dev/@7ovr/how-it-works-1
 * License: MIT-0
 * IconPlaceholder replaced with lucide icons; Base UI `render` not used.
 */
import { type ReactNode } from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { cn } from "~/lib/utils";

export type HowItWorksStep = {
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
};

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
  return (
    <section
      id={id}
      className={cn(
        "text-forest flex w-full items-center justify-center bg-white px-5 py-14 md:px-8 md:py-20",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-forest/60 text-sm font-medium tracking-widest uppercase">
            {eyebrow}
          </span>
          <h2 className="editorial-display text-forest mt-3 text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="text-charcoal/75 mt-3 text-base leading-relaxed">
            {description}
          </p>
          {action ? (
            <div className="mt-6 flex justify-center">{action}</div>
          ) : null}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map(
            ({ number, icon: Icon, title: stepTitle, copy }, index) => (
              <div key={number} className="relative text-center lg:px-7">
                {index < steps.length - 1 ? (
                  <ArrowRight
                    className="text-forest absolute top-7 -right-3 hidden size-5 lg:block"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="border-forest/20 relative mx-auto flex size-14 items-center justify-center rounded-full border bg-white">
                  <Icon className="text-forest size-6" aria-hidden="true" />
                  <span className="bg-forest text-cream absolute -top-1 -left-1 flex size-6 items-center justify-center rounded-full text-xs font-semibold">
                    {number}
                  </span>
                </div>
                <h3 className="text-forest mt-5 text-base font-semibold">
                  {stepTitle}
                </h3>
                <p className="text-charcoal/70 mx-auto mt-2 max-w-[19ch] text-sm leading-relaxed">
                  {copy}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
