import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-hosted deployment: emit a self-contained server bundle under
  // .next/standalone so the Docker runtime image does not need node_modules.
  output: "standalone",
  images: {
    domains: [
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "s3.us-west-2.amazonaws.com",
      "www.notion.so",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.licdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
