import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 gap-4 md:grid-cols-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl bg-cream md:col-span-3",
      className,
    )}
    {...props}
  >
    <div className="pointer-events-none absolute inset-0">{background}</div>
    <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
      <Icon className="size-8 text-forest" />
      <div className="mt-auto max-w-[36rem]">
        <h3 className="editorial-display text-2xl text-forest md:text-3xl">
          {name}
        </h3>
        <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-forest/80">
          {description}
        </p>
        <Button
          variant="link"
          asChild
          size="sm"
          className="mt-4 h-auto p-0 text-forest"
        >
          <a href={href}>
            {cta}
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </div>
    </div>
  </div>
);

export { BentoCard, BentoGrid };
