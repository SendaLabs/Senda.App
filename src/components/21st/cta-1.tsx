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
  primary: { href: string; label: string; target?: string };
  secondary: { href: string; label: string };
  note: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "bg-forest text-cream flex w-full items-center justify-center px-5 py-20 md:px-8 md:py-24",
        className,
      )}
    >
      <div className="border-cream/20 bg-forest-soft/40 w-full max-w-3xl rounded-2xl border px-5 py-10 text-center sm:px-10 sm:py-12">
        <h2 className="editorial-display text-cream text-3xl md:text-5xl">
          {title}
        </h2>
        <p className="text-cream/85 mx-auto mt-5 max-w-xl text-base leading-relaxed md:text-lg">
          {description}
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            variant="cream"
            size="cta"
            asChild
            className="w-full sm:w-auto"
          >
            <a
              href={primary.href}
              target={primary.target}
              rel={primary.target === "_blank" ? "noreferrer" : undefined}
            >
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

        <p className="text-cream/70 mt-6 text-xs">{note}</p>
      </div>
    </section>
  );
}
