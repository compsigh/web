// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  reactStrictMode: true
}

export default nextConfig
