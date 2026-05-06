import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ac-ec.com.sa",
      },
      {
        protocol: "https",
        hostname: "test.ac-ec.com.sa",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
