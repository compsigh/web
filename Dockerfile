ARG NODE_VERSION

FROM node:${NODE_VERSION}-alpine AS base

# Install libc6-compat for better compatibility
RUN apk add --no-cache libc6-compat

# Enable Corepack
RUN corepack enable

WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Copy prisma schema
COPY prisma ./prisma

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]