import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    localPatterns: [
      {
        pathname: "./public/**",
      },
      {
        pathname: "./src/brand/**",
      },
      {
        pathname: "/media/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          process.env.NEXT_PUBLIC_CONFIG_IMAGE_URL || "default.hostname.com",
        port: "",
        pathname: "/media/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
