import Image from "next/image";

import { Shell } from "~/components/landing/shell";
import { team } from "~/lib/site";

export function Team() {
  return (
    <section id="equipo" className="bg-white py-20 md:py-28">
      <Shell className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr] lg:items-start">
        <div>
          <h2 className="editorial-display text-4xl text-forest md:text-5xl">
            Quiénes somos
          </h2>
          <p className="team-statement mt-6 max-w-[40ch] font-serif text-2xl leading-snug text-forest">
            La tecnología no es un fin, sino una herramienta para facilitar y
            mejorar la vida de las personas.
          </p>
          <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-charcoal/80">
            Su verdadero impacto surge cuando ponemos el foco en ellas.
          </p>

          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {team.map((person) => (
              <li key={person.name}>
                <Image
                  src={person.image}
                  alt={`Retrato ilustrado de ${person.name}`}
                  width={320}
                  height={400}
                  unoptimized
                  className="aspect-[4/5] w-full rounded-2xl bg-cream-deep object-cover object-top"
                />
                <p className="mt-4 text-lg text-forest">{person.name}</p>
                <p className="text-sm text-charcoal/70">{person.role}</p>
                <p className="mt-2 flex flex-wrap gap-x-3 text-sm">
                  <a
                    href={person.telegram}
                    className="text-forest underline-offset-4 hover:underline"
                  >
                    Telegram
                  </a>
                  <a
                    href={person.x}
                    className="text-forest underline-offset-4 hover:underline"
                  >
                    X
                  </a>
                  {"linkedin" in person && person.linkedin ? (
                    <a
                      href={person.linkedin}
                      className="text-forest underline-offset-4 hover:underline"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <Image
            src="/maps/latin-america.svg"
            alt="Mapa de América Latina, con Senda entre Costa Rica y Argentina"
            width={420}
            height={520}
            unoptimized
            className="h-auto w-full"
          />
          <span className="absolute top-[30%] left-[40%] size-3 rounded-full bg-forest" />
          <span className="absolute top-[72%] left-[61%] size-3 rounded-full bg-forest" />
        </div>
      </Shell>
    </section>
  );
}
