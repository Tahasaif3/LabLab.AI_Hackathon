import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ✅ Ignore TypeScript errors while building
  typescript: {
    ignoreBuildErrors: true,
  },};

export default nextConfig;
