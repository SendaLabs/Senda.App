/**
 * 21st.dev community — @7ovr/cta-1
 * Source: https://7ovr.com/r/cta-1.json
 * Listing: https://21st.dev/@7ovr/cta-1
 * License: MIT-0
 * Base UI `render` replaced with Button asChild.
 */
import { ArrowRight } from "lucide-react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function Cta1({
  id,
  title,
  description,
  primary,
  secondary,
  note,
  className,
}: {
  id?: string;
  title: string;
  description: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  note: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "flex w-full items-center justify-center bg-forest px-5 py-24 text-cream md:px-8 md:py-32",
        className,
      )}
    >
      <div className="w-full max-w-3xl rounded-2xl border border-cream/20 bg-forest-soft/40 px-6 py-12 text-center sm:px-12 sm:py-16">
        <h2 className="editorial-display text-4xl text-cream md:text-6xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
          {description}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="cream" size="cta" asChild className="w-full sm:w-auto">
            <a href={primary.href}>
              {primary.label}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </a>
          </Button>
          <Button
            variant="ghostForest"
            size="cta"
            asChild
            className="w-full sm:w-auto"
          >
            <a href={secondary.href}>{secondary.label}</a>
          </Button>
        </div>

        <p className="mt-6 text-xs text-cream/70">{note}</p>
      </div>
    </section>
  );
}
