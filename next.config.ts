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
    ],
  },
};

export default nextConfig;
