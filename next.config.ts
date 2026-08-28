import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @cursor/sdk loads platform binaries at runtime and ships .LICENSE.txt sidecars
  // that the bundler cannot resolve as modules. Keep it external to the server bundle.
  serverExternalPackages: ["@cursor/sdk"],
};

export default nextConfig;
