import { Shell } from "~/components/landing/shell";

const rows = [
  {
    label: "Dónde lo hacés",
    bank: "Sucursal o una app más",
    senda: "WhatsApp, el que ya usás",
  },
  {
    label: "Cuánto tarda",
    bank: "Horas o días hábiles",
    senda: "Minutos, en la mayoría de los casos",
  },
  {
    label: "Comisión",
    bank: "Alta y a veces escondida",
    senda: "Mínima, confirmada antes de pagar",
  },
  {
    label: "Cómo cobran",
    bank: "Efectivo o cuenta que hay que explicar",
    senda: "Mercado Pago, como siempre",
  },
  {
    label: "Qué ve la familia",
    bank: "Un ticket o una app rara",
    senda: "Pesos. Nada de blockchain.",
  },
];

export function Compare() {
  return (
    <section id="comparar" className="bg-cream py-20 md:py-28">
      <Shell>
        <h2 className="editorial-display max-w-[16ch] text-4xl text-forest md:text-5xl">
          Frente a bancos y redes clásicas
        </h2>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-charcoal/80">
          Rangos típicos del mercado, no una tarifa auditada de Senda. El
          precio exacto se ve en el chat.
        </p>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-stone">
                <th className="py-4 pr-4 text-sm font-medium text-forest/70">
                  {" "}
                </th>
                <th className="py-4 pr-4 text-sm font-medium text-forest/70">
                  Banco o Western Union
                </th>
                <th className="py-4 text-sm font-medium text-forest">Senda</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-stone/80">
                  <th className="py-5 pr-4 align-top text-sm font-medium text-forest">
                    {row.label}
                  </th>
                  <td className="py-5 pr-4 align-top text-base text-charcoal/75">
                    {row.bank}
                  </td>
                  <td className="py-5 align-top text-base text-forest">
                    {row.senda}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Shell>
    </section>
  );
}
