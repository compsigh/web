import type { VercelConfig } from "@vercel/config/v1"

const config: VercelConfig = {
  installCommand: "bun install --frozen-lockfile"
}

export default config
