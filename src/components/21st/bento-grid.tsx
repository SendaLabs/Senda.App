/**
 * 21st.dev community — kokonutd Bento Grid
 * Source: https://cdn.21st.dev/user_2rQ1QHrJyxpmWMHhqhANzWMc64n/bento-grid/code.tsx
 * Listing: https://21st.dev/@kokonutd/bento-grid
 * License: MIT (kokonut-labs/kokonutui)
 */
"use client";

import { cn } from "~/lib/utils";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  href?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
}

interface BentoGridProps {
  items: BentoItem[];
  className?: string;
}

function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => {
        const body = (
          <>
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                item.hasPersistentHover
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,60,54,0.04)_1px,transparent_1px)] bg-[length:4px_4px]" />
            </div>

            <div className="relative flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex size-8 items-center justify-center rounded-lg bg-forest/5 transition-all duration-300 group-hover:bg-forest/10">
                  {item.icon}
                </div>
                <span
                  className={cn(
                    "rounded-lg px-2 py-1 text-xs font-medium text-forest/70 backdrop-blur-sm",
                    "bg-forest/5 transition-colors duration-300 group-hover:bg-forest/10",
                  )}
                >
                  {item.status ?? "Active"}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-[15px] font-medium tracking-tight text-forest">
                  {item.title}
                  {item.meta ? (
                    <span className="ml-2 text-xs font-normal text-forest/55">
                      {item.meta}
                    </span>
                  ) : null}
                </h3>
                <p className="text-sm leading-snug text-charcoal/75 font-[425]">
                  {item.description}
                </p>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-forest/60">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-forest/5 px-2 py-1 backdrop-blur-sm transition-all duration-200 hover:bg-forest/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-forest/55 opacity-0 transition-opacity group-hover:opacity-100">
                  {item.cta ?? "Ver →"}
                </span>
              </div>
            </div>

            <div
              className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-transparent via-forest/10 to-transparent p-px transition-opacity duration-300 ${
                item.hasPersistentHover
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            />
          </>
        );

        const cardClass = cn(
          "group relative overflow-hidden rounded-xl p-4 transition-all duration-300",
          "border border-stone/80 bg-white",
          "hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(18,60,54,0.08)] will-change-transform",
          item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
          {
            "-translate-y-0.5 shadow-[0_8px_24px_rgba(18,60,54,0.08)]":
              item.hasPersistentHover,
          },
        );

        if (item.href) {
          return (
            <a key={item.title} href={item.href} className={cardClass}>
              {body}
            </a>
          );
        }

        return (
          <div key={item.title} className={cardClass}>
            {body}
          </div>
        );
      })}
    </div>
  );
}

export { BentoGrid };
