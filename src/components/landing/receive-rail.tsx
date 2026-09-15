import { Marquee } from "~/components/ui/marquee";

const origins = [
  "Madrid",
  "Miami",
  "São Paulo",
  "Ciudad de México",
  "Berlín",
  "Santiago",
  "Nueva York",
  "Barcelona",
  "Londres",
  "Montevideo",
];

export function ReceiveRail() {
  return (
    <section
      aria-label="Orígenes hacia Argentina"
      className="border-y border-stone bg-cream-deep py-7"
    >
      <p className="px-5 text-center text-sm text-forest md:text-base">
        Cualquiera en el mundo puede mandar a Argentina. Hoy.
      </p>
      <Marquee pauseOnHover className="mt-4 [--duration:36s]">
        {origins.map((city) => (
          <span
            key={city}
            className="mx-2 rounded-full bg-white px-4 py-2 text-sm text-forest"
          >
            {city} → Mercado Pago
          </span>
        ))}
      </Marquee>
    </section>
  );
}
