import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { DemoActionButton } from "~/components/business/dashboard/demo-notice";
import { cn } from "~/lib/utils";

export function Panel({
  id,
  title,
  action,
  tone = "light",
  className,
  children,
}: {
  id: string;
  title: string;
  action?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  const headingId = `${id}-title`;
  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "flex min-w-0 flex-col rounded-2xl p-5",
        tone === "light"
          ? "text-charcoal bg-white shadow-[0_1px_2px_rgba(23,25,24,0.04),0_8px_24px_rgba(23,25,24,0.04)]"
          : "bg-[#0b2a24] text-white shadow-[0_12px_32px_rgba(6,31,27,0.28)]",
        className,
      )}
    >
      <div className="flex min-h-10 items-center justify-between gap-3">
        <h2
          id={headingId}
          className="text-[0.95rem] font-semibold tracking-[-0.01em]"
        >
          {title}
        </h2>
        {action}
      </div>
      <div className="mt-4 flex min-w-0 flex-1 flex-col">{children}</div>
    </section>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="text-charcoal/60 border-stone flex flex-1 items-center justify-center rounded-xl border border-dashed px-4 py-8 text-center text-sm">
      {children}
    </p>
  );
}

export function SeeAllButton({
  label,
  tone = "light",
}: {
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <DemoActionButton
      className={cn(
        "inline-flex min-h-9 shrink-0 items-center gap-1 rounded-lg px-2 text-xs font-medium whitespace-nowrap underline-offset-4 outline-none hover:underline focus-visible:ring-2",
        tone === "light"
          ? "text-forest focus-visible:ring-forest/30"
          : "text-white/85 focus-visible:ring-white/40",
      )}
    >
      {label}
      <ArrowRight className="size-3.5" aria-hidden />
    </DemoActionButton>
  );
}
