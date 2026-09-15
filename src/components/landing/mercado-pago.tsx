import { Shell } from "~/components/landing/shell";

export function MercadoPago() {
  return (
    <section id="mercado-pago" className="bg-cream-deep py-20 md:py-28">
      <Shell className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="editorial-display max-w-[16ch] text-4xl text-forest md:text-5xl">
            El destino es el riel local que ya existe
          </h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-charcoal/80">
            En Argentina, eso es Mercado Pago. La familia no cambia de
            costumbre. Quien manda desde afuera no tiene que explicar cripto
            por teléfono.
          </p>
        </div>
        <ul className="space-y-4 text-forest">
          <li className="border-t border-stone pt-4">Alias o CVU</li>
          <li className="border-t border-stone pt-4">Pesos en la app de siempre</li>
          <li className="border-t border-stone pt-4">Sin wallet para el destinatario</li>
        </ul>
      </Shell>
    </section>
  );
}
