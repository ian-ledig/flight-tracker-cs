import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/flighttracker',
  assetPrefix: '/flighttracker/',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;