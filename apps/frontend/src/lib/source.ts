import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";

const lazy = docs.toFumadocsSource();

export const source = loader({
  baseUrl: "/docs",
  // fumadocs-mdx 11.5 returns files as a lazy () => VirtualFile[];
  // fumadocs-core 15.8 expects VirtualFile[] eagerly.
  source: {
    files:
      typeof lazy.files === "function"
        ? (lazy.files as () => Exclude<typeof lazy.files, (...args: never) => unknown>)()
        : lazy.files,
  },
});
