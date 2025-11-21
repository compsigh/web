import { type NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental'
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  reactStrictMode: true,
  transpilePackages: ['next-mdx-remote', 'shiki'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
}

export default nextConfig
