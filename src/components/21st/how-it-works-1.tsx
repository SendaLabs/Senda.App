/**
 * 21st.dev community — @7ovr/how-it-works-1
 * Source: https://7ovr.com/r/how-it-works-1.json
 * Listing: https://21st.dev/@7ovr/how-it-works-1
 * License: MIT-0
 * IconPlaceholder replaced with lucide icons; Base UI `render` not used.
 */
import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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
        "flex w-full items-center justify-center bg-cream px-5 py-20 text-forest md:px-8 md:py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium tracking-widest text-forest/60 uppercase">
            {eyebrow}
          </span>
          <h2 className="editorial-display mt-3 text-4xl text-forest md:text-5xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-charcoal/75">
            {description}
          </p>
          {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map(({ number, icon: Icon, title: stepTitle, copy }) => (
            <Card key={number} className="relative bg-white p-6 ring-stone/80">
              <Badge
                variant="secondary"
                className="absolute top-6 right-6 font-mono text-xs tabular-nums"
              >
                {number}
              </Badge>

              <CardHeader className="p-0">
                <span className="flex size-12 items-center justify-center rounded-lg border border-stone bg-cream">
                  <Icon className="size-5 text-forest" aria-hidden="true" />
                </span>

                <CardTitle className="mt-5 text-base font-semibold text-forest">
                  {stepTitle}
                </CardTitle>
                <CardDescription className="mt-2 text-sm leading-relaxed text-charcoal/75">
                  {copy}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
