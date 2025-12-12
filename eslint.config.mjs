import next from "eslint-config-next"
import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"
import js from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginNext from "@next/eslint-plugin-next"

export default [
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@next/next": pluginNext
    },
    rules: {
      ...pluginNext.configs.recommended.rules
    }
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts"
    ]
  }
]
