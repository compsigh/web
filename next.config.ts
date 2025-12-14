import { type NextConfig } from "next"
import { withVercelToolbar as Toolbar } from "@vercel/toolbar/plugins/next"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  reactStrictMode: true,
  transpilePackages: ["next-mdx-remote", "shiki"]
}

const withVercelToolbar = Toolbar()

export default withVercelToolbar(nextConfig)
