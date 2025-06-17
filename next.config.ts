import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // ESLint errors will now be checked during build
    ignoreDuringBuilds: false,
  },
}

export default nextConfig
