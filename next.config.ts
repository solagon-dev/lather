import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      // Routes renamed or removed in the 2026 redesign
      { source: "/treatments", destination: "/services", permanent: true },
      { source: "/treatments/:slug", destination: "/services/:slug", permanent: true },
      { source: "/team", destination: "/about", permanent: true },
      { source: "/memberships", destination: "/gift-cards", permanent: true },
      { source: "/spa-parties", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
