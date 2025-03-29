import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "pt", "es"],
    defaultLocale: "en",
    localeDetection: false,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    config.resolve.alias["@/public"] = path.resolve(__dirname, "public");
    config.resolve.alias["@/src"] = path.resolve(__dirname, "src");
    config.resolve.alias["@/components"] = path.resolve(
      __dirname,
      "src/components"
    );
    config.resolve.alias["@/utils"] = path.resolve(__dirname, "src/utils");
    config.resolve.alias["@/styles"] = path.resolve(__dirname, "src/styles");

    return config;
  },
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

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
