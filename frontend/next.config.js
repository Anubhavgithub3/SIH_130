/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Explicitly set @/ alias so it resolves correctly on all environments
    // (tsconfig paths auto-detection can be unreliable on some Node versions)
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || (process.env.VERCEL ? '' : 'http://localhost:4000');
    if (!backendUrl) {
      return [];
    }
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
