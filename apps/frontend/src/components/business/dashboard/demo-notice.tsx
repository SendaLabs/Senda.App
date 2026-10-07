"use client";

import { Info, X } from "lucide-react";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { Link } from "~/i18n/navigation";
import { cn } from "~/lib/utils";

type DemoNoticeLabels = {
  title: string;
  copy: string;
  cta: string;
  dismiss: string;
};

const DemoNoticeContext = createContext<(() => void) | null>(null);

const AUTO_DISMISS_MS = 6000;

export function DemoNoticeProvider({
  labels,
  children,
}: {
  labels: DemoNoticeLabels;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const show = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => setOpen(false), AUTO_DISMISS_MS);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <DemoNoticeContext.Provider value={show}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-end sm:inset-x-auto sm:right-6 sm:bottom-6"
      >
        {open ? (
          <div className="border-forest/15 text-forest pointer-events-auto flex w-full max-w-sm gap-3 rounded-2xl border bg-white px-4 py-3.5 shadow-[0_18px_40px_rgba(18,60,54,0.18)]">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            <div className="min-w-0 flex-1 text-sm leading-relaxed">
              <p className="font-medium">{labels.title}</p>
              <p className="text-charcoal/70 mt-0.5">{labels.copy}</p>
              <Link
                href="/lista-de-espera"
                className="mt-1.5 inline-flex font-medium underline underline-offset-4 hover:no-underline"
              >
                {labels.cta}
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={labels.dismiss}
              className="text-charcoal/50 hover:text-forest focus-visible:ring-forest/30 -mt-1 -mr-1.5 flex size-8 shrink-0 items-center justify-center rounded-lg outline-none focus-visible:ring-2"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        ) : null}
      </div>
    </DemoNoticeContext.Provider>
  );
}

export function DemoActionButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const show = useContext(DemoNoticeContext);
  if (!show) {
    throw new Error("DemoActionButton must be used inside DemoNoticeProvider");
  }
  return (
    <button type="button" onClick={show} className={cn(className)}>
      {children}
    </button>
  );
}
