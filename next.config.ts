import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['devsow.wpengine.com'], // Add the hostname here
  },
};

export default nextConfig;
