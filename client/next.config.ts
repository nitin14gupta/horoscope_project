import type { NextConfig } from "next";
// @ts-ignore
import withBundleAnalyzer from '@next/bundle-analyzer';

const baseConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'images.unsplash.com', 'www.facebook.com'],
  },
};

const nextConfig = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(baseConfig);

export default nextConfig;
