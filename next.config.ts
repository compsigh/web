import { type NextConfig } from "next"
import { withVercelToolbar as Toolbar } from "@vercel/toolbar/plugins/next"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  reactStrictMode: true,
  transpilePackages: ["next-mdx-remote", "shiki"],
  async redirects() {
    return [
      {
        source: "/workshop",
        destination: "https://danil-theuser.github.io/ai-workshop/",
        permanent: false
      }
    ]
  }
}

const withVercelToolbar = Toolbar()

export default withVercelToolbar(nextConfig)
