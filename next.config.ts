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
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/coming-soon",
        permanent: true,
      },
      {
        source: "/cart/:path*",
        destination: "/coming-soon",
        permanent: true,
      },
      {
        source: "/collection/:path*",
        destination: "/coming-soon",
        permanent: true,
      },
      {
        source: "/info/:path*",
        destination: "/coming-soon",
        permanent: true,
      },
      {
        source: "/payment/:path*",
        destination: "/coming-soon",
        permanent: true,
      },
      {
        source: "/admin/:path*",
        destination: "/coming-soon",
        permanent: true,
      },
      // {
      //   source: "/products",
      //   destination: "/collection/products/all",
      //   permanent: true,
      // },
      // {
      //   source: "/collection/products",
      //   destination: "/collection/products/all",
      //   permanent: true,
      // },
      // {
      //   source: "/collection",
      //   destination: "/collection/products/all",
      //   permanent: true,
      // },
      // {
      //   source: "/policy",
      //   destination: "/info/policies",
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
