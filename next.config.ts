import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Consolidated the service pages down to the three PCG actually sells;
  // the retired ones were indexed, so they redirect rather than 404.
  async redirects() {
    return [
      "blockchain-consulting",
      "development",
      "branding",
      "social-media",
    ].map((id) => ({
      source: `/services/${id}`,
      destination: "/services",
      permanent: true,
    }));
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
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
