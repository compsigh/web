// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  reactStrictMode: true,
  transpilePackages: ['next-mdx-remote']
}

export default nextConfig
