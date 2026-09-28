import { createMDX } from "fumadocs-mdx/next";
import createNextIntlPlugin from "next-intl/plugin";

import "./src/env.js";

const withMDX = createMDX();
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const SENDA_BACKEND_ORIGIN = (
  process.env.SENDA_BACKEND_URL || "https://senda-backend-2r5k.onrender.com"
).replace(/\/$/, "");

/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ["react-globe.gl", "globe.gl", "three-globe"],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      {
        source: "/c/:token",
        destination: `${SENDA_BACKEND_ORIGIN}/c/:token`,
      },
      {
        source: "/c/:token/qr.png",
        destination: `${SENDA_BACKEND_ORIGIN}/c/:token/qr.png`,
      },
    ];
  },
};

export default withNextIntl(withMDX(config));
