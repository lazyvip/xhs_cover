import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'p.weizwz.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
