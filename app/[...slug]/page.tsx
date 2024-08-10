import path from 'node:path'
import Link from 'next/link'
import { Suspense } from 'react'
import fs from 'node:fs/promises'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'

import '@/app/katex.min.css'
import remarkMath from 'remark-math'
import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode, { type Options } from 'rehype-pretty-code'

import { Mic } from '@/components/Mic'
import { Grid } from '@/components/Grid'
import { Note } from '@/components/Note'
import { Media } from '@/components/Media'
import { Spacer } from '@/components/Spacer'
import { Author } from '@/components/Author'
import { LinkBar } from '@/components/LinkBar'
import { Playground } from '@/components/Playground'
import { PostWrapper } from '@/components/PostWrapper'
import { CasePreserver } from '@/components/CasePreserver'

import './Typography.css'

type Author = {
  name: string
  avatar: string
}

type Reference = {
  text: string
  link: string
}

type Activity = {
  title: string
  time_offset: number
  link?: string
}

export const locationIcons = {
  'hive': '/emotes/hive.svg',
  'classroom': '/emotes/classroom.png',
  'ka-499': '/emotes/ka-499.png',
  'lucky-strike': '/emotes/lucky-strike.png',
  'getty-study': '/emotes/getty-study.png',
  'cs-labs': '/emotes/cs-labs.png',
  'escape-game': '/emotes/escape-game.png',
  'billiards': '/emotes/billiards.png',
  'ggp': '/emotes/ggp.png',
  'undercaf': '/emotes/undercaf.png',
  'uc-4': '/emotes/uc-4.png',
  'mclaren': '/emotes/mclaren.png'
}

export type EventDetails = {
  start: number
  end?: number
  location?: string
  // `cover_image` can be empty, but must be explicitly specified
  cover_image: string | null
  activities?: Activity[]
  pictures?: string[]
  // If there's no `link`, clicking the event will open the event page
  // If link === null, clicking the event will do nothing
  // If link is a string, clicking the event will open the link
  link?: string | null
}

export type Frontmatter = {
  title: string
  description: string
  authors?: Author[]
  og_image?: string
  decorations?: boolean
  previous?: Reference
  next?: Reference
  slug?: string
  event_details?: EventDetails
}

export type PostProps = {
  content: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  frontmatter: Frontmatter
}

/**
 * Given a route served by the Next.js App Router, read the Markdown file associated with the route.
 *
 * @param {string[]} segments - A route served by the Next.js App Router. The last element in the array is the filename, and each preceding element is a parent directory.
 * @example readMarkdownFileAtRoute(['docs', 'about']) // Reads `app/docs/about.md`
 */
export async function readMarkdownFileAtRoute(segments: string[]) {
  try {
    const filePath = path.join(process.cwd(), 'app', ...segments) + '.md'
    const page = await fs.readFile(filePath, 'utf8')

    const vercelTheme = await import('./vercel-theme.json')
    const rehypePrettyCodeOptions: Options = {
      theme: vercelTheme as any
    }

    const { content, frontmatter } = await compileMDX<Frontmatter>({
      source: page,
      components: { CasePreserver, Grid, Link, LinkBar, Media, Mic, Note, Playground, Spacer },
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [
            [rehypePrettyCode as any, rehypePrettyCodeOptions],
            rehypeSlug,
            rehypeKatex as any
          ]
        }
      }
    })
    return { content, frontmatter }
  } catch (error) {
    // If a Markdown file does not exist at the route provided, it's possible the route is a slug alias
    // For each Markdown file, read it and compare its frontmatter `slug` to the route provided
    if ((error as any).code === 'ENOENT') {
      const slugs = await generateUnmodifiedSlugsFromMarkdownFiles('app')
      for (const { slug } of slugs) {
        const { frontmatter } = await readMarkdownFileAtRoute(slug)
        if (frontmatter.slug === segments.join('/'))
          return readMarkdownFileAtRoute(slug)
      }
    }
    notFound()
  }
}

export async function generateMetadata(
  { params }:
  { params: { slug: string[] } }
) {
  const { frontmatter } = await readMarkdownFileAtRoute(params.slug)
  const metadata: Metadata = {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      siteName: "compsigh",
    }
  }

  metadata.openGraph!.images = [{
    url: `api/og?title=${frontmatter.title}`,
    width: 1200,
    height: 630,
    alt: ''
  }]

  if (frontmatter.og_image)
    metadata.openGraph!.images = [{
      url: frontmatter.og_image,
      width: 1200,
      height: 630,
      alt: ''
    }]

  return metadata
}

/**
 * Recursively generate a list of slugs for Next.js' `generateStaticParams()` from all Markdown files in a folder and its subfolders. The slugs are relative to the `app/` directory. Does not modify the slug regardless of frontmatter; that is done in `generateStaticParams()`.
 *
 * @param {string} folder - The folder from where to scan for Markdown files.
 * @example generateUnmodifiedSlugsFromMarkdownFiles('app') // Returns [{ slug: ['docs', '01-about'] }, { slug: ['docs', '02-values'] }, ...]
 */
export async function generateUnmodifiedSlugsFromMarkdownFiles(folder: string) {
  const folderContents = await fs.readdir(folder, { withFileTypes: true })
  const files = folderContents.filter((file) => file.isFile())
  const directories = folderContents.filter((file) => file.isDirectory())
  let slugs = files
    .filter((file) => file.name.endsWith('.md'))
    .map((file) => file.name.replace(/\.md$/, ''))
    .map((slug) => path.join(folder, slug))
    .map((slug) => slug.split('/'))
    .map((slug) => slug.slice(1))
    .map((slug) => ({ slug }))

  for (const directory of directories) {
    const nestedSlugs = await generateUnmodifiedSlugsFromMarkdownFiles(path.join(folder, directory.name))
    slugs = slugs.concat(nestedSlugs)
  }

  return slugs
}

export const dynamicParams = false
export async function generateStaticParams() {
  const slugs = await generateUnmodifiedSlugsFromMarkdownFiles('app')

  // For each file:
  // 1. Read it
  // 2. Parse its Markdown frontmatter
  // 3. Determine if it has a `slug` key
  // 4. If it does, replace the entry in `slugs` with the new slug
  for (const [index, { slug: route }] of slugs.entries()) {
    const { frontmatter } = await readMarkdownFileAtRoute(route)
    if (frontmatter.slug)
      slugs[index] = { slug: frontmatter.slug.split('/') }
  }
  return slugs
}

export default async function Page(
  { params }:
  { params: { slug: string[] } }
) {
  const { content, frontmatter } = await readMarkdownFileAtRoute(params.slug)
  if (frontmatter.decorations === undefined) frontmatter.decorations = true
  return (
    <>
      <Suspense>
        <PostWrapper content={content} frontmatter={frontmatter} />
        <Spacer size="20vh" />
      </Suspense>
    </>
  )
}
