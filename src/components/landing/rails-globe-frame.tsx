import { cn } from "~/lib/utils";

export function GlobeFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full min-w-0 max-w-[min(100%,720px)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 size-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0f3d2e]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(46,204,159,0.22)_0%,rgba(244,241,232,0)_70%)]"
      />
      <div className="relative z-[2] aspect-square w-full min-w-0 overflow-x-clip">
        {children}
      </div>
    </div>
  );
}
