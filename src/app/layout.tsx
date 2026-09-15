import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Senda — Mandá plata a casa por WhatsApp",
  description:
    "Remesas a Argentina desde cualquier país. Todo por WhatsApp. Ellos cobran en Mercado Pago. Stellar viaja por debajo.",
  icons: [
    { rel: "icon", url: "/images/favicon.png" },
    { rel: "apple-touch-icon", url: "/images/favicon.png" },
  ],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-cream font-sans text-charcoal antialiased">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
