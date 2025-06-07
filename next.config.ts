import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/flight-tracker',
  assetPrefix: '/flight-tracker/',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;