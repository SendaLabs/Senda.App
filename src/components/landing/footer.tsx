import Image from "next/image";

import { Shell } from "~/components/landing/shell";
import { navItems, site } from "~/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone bg-white py-14 text-forest">
      <Shell className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logoverde.png"
            alt="Senda"
            width={430}
            height={101}
            className="h-8 w-auto"
          />
          <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-charcoal/75">
            Remesas a Argentina por WhatsApp. Ellos cobran en Mercado Pago.
          </p>
        </div>

        <div>
          <p className="text-sm text-forest">Página</p>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm text-forest">Senda</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={site.mailto} className="hover:underline">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.github} className="hover:underline">
                GitHub
              </a>
            </li>
            <li>
              <a href={site.linkedin} className="hover:underline">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.x} className="hover:underline">
                X
              </a>
            </li>
          </ul>
        </div>
      </Shell>
      <Shell className="mt-10 border-t border-stone pt-6">
        <p className="max-w-[70ch] text-xs leading-relaxed text-charcoal/65">
          © {new Date().getFullYear()} Senda. Proyecto en el{" "}
          <a href={site.challenge} className="underline underline-offset-2">
            Argentina Builder Challenge
          </a>
          , sobre rieles Stellar. Landing de producto. Sin cotización en vivo.
        </p>
      </Shell>
    </footer>
  );
}
