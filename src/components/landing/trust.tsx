import { ForestShapes } from "~/components/21st/elegant-shape";
import { Shell } from "~/components/landing/shell";

export function Trust() {
  return (
    <section
      id="confianza"
      className="relative isolate overflow-hidden bg-forest py-24 text-cream md:py-32"
    >
      <ForestShapes />
      <Shell className="relative z-10">
        <h2 className="editorial-display max-w-[16ch] text-4xl md:text-6xl">
          El riel es Stellar. La experiencia no.
        </h2>
        <p className="hero-impact-line mt-8 max-w-[22ch] text-3xl text-cream md:text-4xl">
          La blockchain no es el producto.
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <p className="max-w-[60ch] text-lg leading-relaxed text-cream/85">
            Stellar mueve el valor en segundos, con comisiones mínimas. Las
            stablecoins viajan como infraestructura: rápidas, estables, y
            fuera de la vista.
          </p>
          <p className="max-w-[60ch] text-lg leading-relaxed text-cream/85">
            Quien recibe no crea cuenta en Senda, no firma una transacción y
            no aprende una red. Ve pesos en Mercado Pago. Eso es el diseño.
          </p>
        </div>
      </Shell>
    </section>
  );
}
