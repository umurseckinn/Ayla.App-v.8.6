import type { NextConfig } from "next";
import path from "node:path";
const loaderPath = require.resolve('orchids-visual-edits/loader.js');

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [loaderPath]
      }
    }
  },
  // NOTE: Security headers must be set at hosting/CDN level for static exports
  // Next.js headers() config doesn't work with 'output: export' mode
  // Configure X-Frame-Options, X-Content-Type-Options, Referrer-Policy 
  // in your Capacitor/Vercel/Netlify/hosting config
};

export default nextConfig;
// Orchids restart: 1768910592935
