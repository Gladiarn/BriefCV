import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@sparticuz/chromium"],
  outputFileTracingIncludes: {
    "/api/export": ["./node_modules/@sparticuz/chromium/bin/**/*"],
  },
};

export default nextConfig;
