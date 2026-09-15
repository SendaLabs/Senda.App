import { Shell } from "~/components/landing/shell";

export function Roadmap() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <Shell>
        <h2 className="editorial-display max-w-[16ch] text-4xl text-forest md:text-5xl">
          Hoy Argentina. Después, más rieles locales.
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <article className="max-w-[50ch]">
            <h3 className="text-xl text-forest">Ahora</h3>
            <p className="mt-3 text-base leading-relaxed text-charcoal/80">
              El mundo manda a Argentina. El último tramo es Mercado Pago.
              Un corredor, bien hecho.
            </p>
          </article>
          <article className="max-w-[50ch]">
            <h3 className="text-xl text-forest">Después</h3>
            <p className="mt-3 text-base leading-relaxed text-charcoal/80">
              Más países cobran en sus rieles de siempre. Misma idea: chat
              familiar, infraestructura quieta, destino local.
            </p>
          </article>
        </div>
      </Shell>
    </section>
  );
}
