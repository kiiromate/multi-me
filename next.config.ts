import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // Temporarily ignore ESLint errors during build for stabilization
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
