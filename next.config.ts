import { type NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental'
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  reactStrictMode: true,
  transpilePackages: ['next-mdx-remote']
}

export default nextConfig
