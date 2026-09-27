"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

export function Mermaid({ chart }: { chart: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <MermaidContent chart={chart} />;
}

function MermaidContent({ chart }: { chart: string }) {
  const id = useId();
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          fontFamily: "inherit",
          themeCSS: "margin: 1.5rem auto 0;",
          theme: resolvedTheme === "dark" ? "dark" : "default",
        });

        const { svg: nextSvg } = await mermaid.render(
          id.replaceAll(":", ""),
          chart.replaceAll("\\n", "\n"),
        );

        if (!cancelled) {
          setError(null);
          setSvg(nextSvg);
        }
      } catch (err) {
        if (!cancelled) {
          setSvg(null);
          setError(err instanceof Error ? err.message : "No se pudo renderizar el diagrama");
        }
      }
    }

    void render();
    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-lg border border-fd-border bg-fd-secondary p-4 text-sm text-fd-secondary-foreground">
        <code>{chart.replaceAll("\\n", "\n")}</code>
        <p className="mt-3 text-fd-muted-foreground">Mermaid: {error}</p>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="rounded-lg border border-dashed border-fd-border p-6 text-sm text-fd-muted-foreground">
        Cargando diagrama…
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
}
