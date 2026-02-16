#!/usr/bin/env bash

# Vercel Ignored Build Step script.
# Exit 0 = skip build, exit 1 = proceed with build.
# https://vercel.com/docs/projects/overview#ignored-build-step

# Relevant paths: changes to any of these should trigger a build.
WATCH_PATHS=(
  "app/"
  "components/"
  "functions/"
  "prisma/"
  "public/"
  "eslint.config.mjs"
  "flags.ts"
  "next.config.ts"
  "package.json"
  "pnpm-lock.yaml"
  "tsconfig.json"
)

# Allow force-skipping or force-building via commit message.
# Usage: include [skip build] or [force build] in commit message.
if [[ "$VERCEL_GIT_COMMIT_MESSAGE" == *"[skip build]"* ]]; then
  echo "Found [skip build] in commit message. Skipping build."
  exit 0
fi

if [[ "$VERCEL_GIT_COMMIT_MESSAGE" == *"[force build]"* ]]; then
  echo "Found [force build] in commit message. Proceeding with build."
  exit 1
fi

echo "Checking for relevant changes..."

# Compare against the previous commit.
# Vercel checks out a single commit, so HEAD^ is the prior deploy ref.
DIFF_OUTPUT=$(git diff --name-only HEAD^ HEAD -- "${WATCH_PATHS[@]}")

if [ -z "$DIFF_OUTPUT" ]; then
  echo "No relevant changes detected. Skipping build."
  exit 0
fi

echo "Relevant changes found:"
echo "$DIFF_OUTPUT"
exit 1
