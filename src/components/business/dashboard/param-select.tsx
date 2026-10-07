"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent, type ReactNode, useTransition } from "react";

import { cn } from "~/lib/utils";

type Option = { value: string; label: string };

/** Native select that keeps its value in the URL so filtered views are shareable. */
export function ParamSelect({
  param,
  value,
  defaultValue,
  options,
  label,
  icon,
  className,
}: {
  param: string;
  value: string;
  defaultValue: string;
  options: readonly Option[];
  label: string;
  icon?: ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    const next = new URLSearchParams(searchParams);
    if (event.target.value === defaultValue) next.delete(param);
    else next.set(param, event.target.value);
    const query = next.toString();
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  }

  return (
    <div
      className={cn(
        "relative inline-flex items-center transition-opacity",
        isPending && "opacity-60",
        className,
      )}
    >
      {icon ? (
        <span className="text-forest/70 pointer-events-none absolute left-3 flex">
          {icon}
        </span>
      ) : null}
      <select
        value={value}
        onChange={onChange}
        aria-label={label}
        aria-busy={isPending || undefined}
        className={cn(
          "border-stone text-charcoal hover:border-forest/40 focus-visible:border-forest/50 focus-visible:ring-forest/15 h-10 w-full cursor-pointer appearance-none rounded-xl border bg-white pr-9 text-sm transition-colors outline-none focus-visible:ring-3",
          icon ? "pl-9" : "pl-3",
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="text-charcoal/50 pointer-events-none absolute right-3 size-4"
        aria-hidden
      />
    </div>
  );
}
