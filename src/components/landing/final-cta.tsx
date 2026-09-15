import { Cta1 } from "~/components/21st/cta-1";
import { site } from "~/lib/site";

export function FinalCta() {
  return (
    <Cta1
      id="empezar"
      title="Escribile a Senda"
      description="Estamos en piloto. Contanos desde dónde mandás y a qué alias llega. Te respondemos por mail y armamos el envío por WhatsApp."
      primary={{ href: site.mailto, label: "Escribir a Senda" }}
      secondary={{ href: site.howHref, label: "Ver los pasos" }}
      note={`${site.email} · sin número de WhatsApp público todavía`}
    />
  );
}
