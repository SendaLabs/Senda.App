import {
  originCities,
  projectOrthographic,
  buenosAires,
} from "~/components/landing/rails-cities";
import { GlobeFrame } from "~/components/landing/rails-globe-frame";

export function RailsGlobeFallback() {
  const cx = 200;
  const cy = 200;
  const radius = 152;
  const destination = projectOrthographic(
    buenosAires.lat,
    buenosAires.lng,
    cx,
    cy,
    radius,
  );

  return (
    <GlobeFrame>
      <div
        className="absolute inset-[10%] rounded-full bg-[#e4eee8] shadow-[inset_-16px_-10px_28px_rgba(18,60,54,0.16)]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #123c36 1.15px, transparent 1.35px)",
          backgroundSize: "11px 11px",
          backgroundPosition: "center",
        }}
      />
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        {originCities.map((city) => {
          const start = projectOrthographic(city.lat, city.lng, cx, cy, radius);
          if (!start || !destination) return null;
          const midX = (start.x + destination.x) / 2;
          const midY = (start.y + destination.y) / 2 - 36;
          return (
            <path
              key={city.name}
              d={`M ${start.x} ${start.y} Q ${midX} ${midY} ${destination.x} ${destination.y}`}
              fill="none"
              stroke="#2ecc9f"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.9"
            />
          );
        })}
      </svg>
    </GlobeFrame>
  );
}
