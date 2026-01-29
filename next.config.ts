import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "placehold.jp" },
      { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "content.payfast.io" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },

  async redirects() {
    return [
      // {
      //   source: "/:path*",
      //   destination: "/",
      //   permanent: false,
      // },
    ];
  },
};

export default nextConfig;
