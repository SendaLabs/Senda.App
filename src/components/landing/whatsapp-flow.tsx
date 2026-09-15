import { Shell } from "~/components/landing/shell";

export function WhatsAppFlow() {
  return (
    <section className="bg-cream-deep py-20 md:py-28">
      <Shell>
        <h2 className="editorial-display max-w-[16ch] text-4xl text-forest md:text-5xl">
          El chat es el producto
        </h2>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-charcoal/80">
          Mandás desde WhatsApp. Ellos ven un crédito en Mercado Pago. Ejemplo
          de conversación, no una captura real.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl bg-forest p-5 text-cream md:p-7">
            <p className="text-sm text-cream/70">Quien envía</p>
            <div className="mt-6 space-y-3">
              <Bubble side="in">Hola Senda, quiero mandar 200 USD a mi hermana en Córdoba.</Bubble>
              <Bubble side="out">
                Perfecto. ¿Alias o CVU de Mercado Pago?
              </Bubble>
              <Bubble side="in">luna.mendez.mp</Bubble>
              <Bubble side="out">
                200 USD → 270.000 ARS de ejemplo. Comisión incluida. ¿Confirmás?
              </Bubble>
              <Bubble side="in">Sí, adelante.</Bubble>
              <Bubble side="out">
                Enviado. Ella ya tiene los pesos en Mercado Pago.
              </Bubble>
            </div>
          </article>

          <article className="rounded-2xl bg-white p-5 md:p-7">
            <p className="text-sm text-forest/70">Quien recibe</p>
            <div className="mt-8 rounded-2xl bg-cream p-6">
              <p className="text-sm text-forest/70">Mercado Pago</p>
              <p className="mt-3 text-4xl tabular-nums tracking-tight text-forest">
                +$270.000
              </p>
              <p className="mt-2 text-base text-charcoal/80">
                Transferencia recibida, Senda
              </p>
              <p className="mt-8 max-w-[40ch] text-sm leading-relaxed text-forest/80">
                No abre una wallet. No descarga Senda. No toca una stablecoin.
              </p>
            </div>
          </article>
        </div>
      </Shell>
    </section>
  );
}

function Bubble({
  children,
  side,
}: {
  children: React.ReactNode;
  side: "in" | "out";
}) {
  return (
    <p
      className={
        side === "in"
          ? "ml-8 rounded-2xl rounded-tr-sm bg-cream px-4 py-3 text-sm leading-relaxed text-charcoal"
          : "mr-8 rounded-2xl rounded-tl-sm bg-forest-soft px-4 py-3 text-sm leading-relaxed text-cream"
      }
    >
      {children}
    </p>
  );
}
