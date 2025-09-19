import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "placehold.jp" },
      { protocol: "https", hostname: "example.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/collection/products",
        destination: "/collection/products/all",
        permanent: true,
      },
      {
        source: "/collection",
        destination: "/collection/products/all",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
