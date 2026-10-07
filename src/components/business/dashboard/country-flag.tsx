import type { DashboardCountry } from "~/components/business/dashboard/filters";
import { cn } from "~/lib/utils";

const US_STRIPES = [0, 2, 4, 6, 8, 10, 12];

function FlagShapes({ code }: { code: DashboardCountry }) {
  switch (code) {
    case "AR":
      return (
        <>
          <rect width="24" height="18" fill="#74acdf" />
          <rect y="6" width="24" height="6" fill="#ffffff" />
          <circle cx="12" cy="9" r="1.9" fill="#f6b40e" />
        </>
      );
    case "CR":
      return (
        <>
          <rect width="24" height="18" fill="#002b7f" />
          <rect y="3" width="24" height="12" fill="#ffffff" />
          <rect y="6" width="24" height="6" fill="#ce1126" />
        </>
      );
    case "US":
      return (
        <>
          <rect width="24" height="18" fill="#ffffff" />
          {US_STRIPES.map((y) => (
            <rect
              key={y}
              y={y * 1.385}
              width="24"
              height="1.385"
              fill="#b22234"
            />
          ))}
          <rect width="10.5" height="9.7" fill="#3c3b6e" />
        </>
      );
    case "ES":
      return (
        <>
          <rect width="24" height="18" fill="#aa151b" />
          <rect y="4.5" width="24" height="9" fill="#f1bf00" />
        </>
      );
  }
}

export function CountryFlag({
  code,
  className,
}: {
  code: DashboardCountry;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 18"
      className={cn(
        "h-3 w-4 shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(23,25,24,0.08)]",
        className,
      )}
      aria-hidden
    >
      <FlagShapes code={code} />
    </svg>
  );
}
