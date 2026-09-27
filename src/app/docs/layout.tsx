import { RootProvider } from "fumadocs-ui/provider";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";

import { baseOptions } from "~/lib/layout.shared";
import { source } from "~/lib/source";

import "~/styles/docs.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Senda Docs",
    template: "%s · Senda Docs",
  },
  icons: [
    { rel: "icon", url: "/images/favicon.png" },
    { rel: "apple-touch-icon", url: "/images/favicon.png" },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR" className={geist.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-fd-background font-sans text-fd-foreground antialiased">
        <RootProvider
          search={{ enabled: false }}
          theme={{
            defaultTheme: "light",
            attribute: "class",
          }}
        >
          <DocsLayout tree={source.pageTree} {...baseOptions()}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
