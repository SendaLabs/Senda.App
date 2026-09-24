/**
 * Magic UI animated-beam demo adapted for Senda:
 * WhatsApp → Senda → Mercado Pago corridor.
 * Beam: https://magicui.design/r/animated-beam (via 21st / Magic UI registry)
 */
"use client";

import { MessageCircle, Wallet } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { AnimatedBeam } from "~/components/ui/animated-beam";
import { cn } from "~/lib/utils";

type Props = {
  fromLabel: string;
  viaLabel: string;
  toLabel: string;
  caption: string;
  className?: string;
};

export function CorridorBeam({
  fromLabel,
  viaLabel,
  toLabel,
  caption,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const viaRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={containerRef}
        className="border-stone/80 bg-cream relative mx-auto flex h-48 w-full max-w-xl items-center justify-between overflow-hidden rounded-2xl border px-6 md:h-56 md:px-10"
      >
        <Node ref={fromRef} label={fromLabel}>
          <MessageCircle className="text-forest size-6" aria-hidden="true" />
        </Node>
        <Node ref={viaRef} label={viaLabel} emphasized>
          <Image
            src="/images/logoverde.png"
            alt=""
            width={96}
            height={24}
            className="h-5 w-auto"
            aria-hidden="true"
          />
        </Node>
        <Node ref={toRef} label={toLabel}>
          <Wallet className="text-forest size-6" aria-hidden="true" />
        </Node>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={fromRef}
          toRef={viaRef}
          curvature={-40}
          pathColor="#d9d5ca"
          gradientStartColor="#123c36"
          gradientStopColor="#3d5c56"
          duration={4}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={viaRef}
          toRef={toRef}
          curvature={40}
          pathColor="#d9d5ca"
          gradientStartColor="#123c36"
          gradientStopColor="#3d5c56"
          duration={4}
          delay={0.6}
        />
      </div>
      <p className="text-forest/75 mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed">
        {caption}
      </p>
    </div>
  );
}

function Node({
  ref,
  label,
  children,
  emphasized,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  label: string;
  children: React.ReactNode;
  emphasized?: boolean;
}) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          "flex size-14 items-center justify-center rounded-2xl border bg-white shadow-[0_10px_28px_rgba(18,60,54,0.12)] md:size-16",
          emphasized ? "border-forest/30" : "border-stone",
        )}
      >
        {children}
      </div>
      <span className="text-forest max-w-20 text-center text-xs font-medium md:max-w-none md:text-sm">
        {label}
      </span>
    </div>
  );
}
