import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.jp" },
      { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "clean-ant-257.convex.cloud" },
      {
        protocol: "https",
        hostname: "brave-cheetah-312.convex.cloud/",
      },
    ],
  },
};

export default nextConfig;
