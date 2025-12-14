import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".vercel/**",
    "out/**",
    "build/**",
    "next-env.d.ts"
  ]),
  {
    rules: {
      "react-hooks/purity": "warn",
      "react-hooks/static-components": "warn",
      "react-hooks/set-state-in-render": "warn",
      "react-hooks/set-state-in-effect": "warn"
    }
  }
])

export default eslintConfig
