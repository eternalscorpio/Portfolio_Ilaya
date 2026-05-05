/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for catching bugs early
  reactStrictMode: true,

  // Compress output
  compress: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 768, 1024, 1280, 1920],
    minimumCacheTTL: 86400, // 24h cache
  },

  // Performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Cache static assets for 1 year
        source: '/(.*)\\.(ico|png|jpg|jpeg|svg|webp|avif|woff2|woff|ttf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // Reduce bundle size
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei'],
  },
};

export default nextConfig;
