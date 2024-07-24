// @ts-check
import withPlaiceholder from '@plaiceholder/next'

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  reactStrictMode: true
}

export default withPlaiceholder(nextConfig)
