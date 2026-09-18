import createNextIntlPlugin from "next-intl/plugin";

import "./src/env.js";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ["react-globe.gl", "globe.gl", "three-globe"],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withNextIntl(config);
