/**
 * 21st.dev community — @7ovr/testimonials-1
 * Source: https://7ovr.com/r/testimonials-1.json
 * Listing: https://21st.dev/@7ovr/testimonials-1
 * License: MIT-0
 * Adapted as corridor scenarios (no invented customers).
 */
import { Quote } from "lucide-react";

import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { cn } from "~/lib/utils";

export type Scenario = {
  quote: string;
  route: string;
  detail: string;
  initials: string;
};

export function Scenarios1({
  eyebrow,
  title,
  description,
  items,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly Scenario[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "flex w-full items-center justify-center bg-cream px-5 py-20 text-forest md:px-8 md:py-28",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-block rounded-md border border-stone px-3 py-1 text-xs font-semibold tracking-widest text-forest/60 uppercase">
            {eyebrow}
          </span>
          <h2 className="editorial-display mt-4 text-4xl text-forest md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-charcoal/75">
            {description}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-stone bg-stone md:grid-cols-3">
          {items.map(({ quote, route, detail, initials }) => (
            <Card
              key={route}
              className="flex flex-col gap-0 border-0 bg-white p-8 ring-0 transition-colors duration-200 hover:bg-cream"
            >
              <CardContent className="flex flex-1 flex-col gap-5 p-0">
                <Quote
                  className="size-8 text-forest opacity-20"
                  aria-hidden="true"
                />
                <blockquote className="flex-1 text-base leading-relaxed text-forest">
                  “{quote}”
                </blockquote>
              </CardContent>

              <CardFooter className="mt-8 gap-4 border-t border-stone px-0 pt-6 pb-0">
                <span className="flex size-10 items-center justify-center rounded-full border border-stone bg-cream text-xs font-semibold text-forest">
                  {initials}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-forest">
                    {route}
                  </span>
                  <span className="text-xs text-forest/65">{detail}</span>
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
