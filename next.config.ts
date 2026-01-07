import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "alabern.namastech",
        hostname: "app.alabern.namastech.com",
      },
    ],
  },
};

export default nextConfig;
