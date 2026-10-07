import { cn } from "~/lib/utils";

export function HeroBlobFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("hero-blob-fallback absolute inset-0", className)}
    />
  );
}
