# Guide to the `compsigh/web` codebase for Claude Code

`compsigh/web` is the web platform of compsigh, the social computer science club for meeting cool people && building cool things at the University of San Francisco

## Tech stack

- Node version: 24.x
- Package manager: pnpm 10.27.0
- Language: TypeScript (strict mode)
- Framework: Next.js 16 (App Router) with Turbopack
- Database: Postgres via Prisma ORM
- Content: MDX (`next-mdx-remote`)
- Hosting: Vercel with Edge Config & `@vercel/flags`

## Code style

- No semicolons in JavaScript/TypeScript files
- No trailing commas
- Path aliases: `@/*` maps to root directory
- ESLint enforces Next.js best practices and React hooks rules

## Architecture

### Content system

The web platform uses a file-based MDX content system, where Markdown files become pages.

- Markdown files are located in `app/`
- The catch-all route at `app/[...slug]/page.tsx` handles all `.md` files
- All pages are statically generated at build time (`dynamicParams = false`)
- Frontmatter affects how each file is rendered
- Event files have an additional `event_details` object, with fields that, for example, note its start & end times
- Events live in `app/events/YYYY-MM-DD/` directories
- If `link` is defined in frontmatter, the page is not built (`generateStaticParams` filters it out)

### Components

- Generally, all reusable components live in `components/`
- All styling is done with CSS Modules
- Each component has its own directory, with:
  - The actual component file, e.g. `Media.tsx`
  - A CSS Modules file, e.g. `Media.module.css`
  - An `index.ts` re-exporting the file
