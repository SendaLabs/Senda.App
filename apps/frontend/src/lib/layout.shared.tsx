import Image from "next/image";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

function DocsBrand() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/images/logoverde.png"
        alt="Senda"
        width={140}
        height={33}
        className="h-7 w-auto dark:hidden"
        priority
      />
      <Image
        src="/images/logoblanco.png"
        alt="Senda"
        width={140}
        height={33}
        className="hidden h-7 w-auto dark:block"
        priority
      />
      <span className="text-fd-muted-foreground hidden text-[0.7rem] font-medium tracking-[0.14em] uppercase sm:inline">
        Docs
      </span>
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <DocsBrand />,
      url: "/docs",
    },
    githubUrl: "https://github.com/SendaLabs/Senda.App",
  };
}
