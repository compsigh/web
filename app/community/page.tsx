// Functions
import {
  type Frontmatter,
  generateUnmodifiedSlugsFromMarkdownFiles,
  readMarkdownFileAtRoute
} from "@/app/[...slug]/page"

// Components
import Link from "next/link"
import { Suspense } from "react"
import { Marquee } from "@/components/Marquee"
import { TextStream } from "@/components/TextStream"
import { NeonSunsetVideo } from "@/components/NeonSunsetVideo"

// Styles
import styles from "./Community.module.css"

export type PostFrontmatter = Frontmatter & { post_date: number }

async function getPosts() {
  const markdownFiles =
    await generateUnmodifiedSlugsFromMarkdownFiles("app/community")
  let posts: Record<string, PostFrontmatter> = {}
  for (const { slug } of markdownFiles) {
    const { frontmatter } = await readMarkdownFileAtRoute(slug)
    if (!frontmatter.post_date)
      throw new Error(`Event ${slug.join("/")} is missing post_date`)
    posts[slug.join("/")] = frontmatter as PostFrontmatter
  }
  // Sort by post_date
  posts = Object.fromEntries(
    Object.entries(posts).sort((a, b) => b[1].post_date - a[1].post_date)
  )
  return posts
}

export default async function Community() {
  const posts = await getPosts()
  return (
    <>
      <div id={styles.page}>
        <Suspense fallback={<></>}>
          <Marquee />
        </Suspense>
        <div id={styles.content}>
          <h1 id={styles.title}>Community</h1>
          <ul>
            {Object.entries(posts).map(([slug, post], index) => {
              const formattedPostDate = new Date(post.post_date * 1000)
                .toLocaleString("en-US", {
                  timeZone: "America/Los_Angeles",
                  month: "short",
                  day: "2-digit",
                  year: "numeric"
                })
                .replace(",", "")
              return (
                <li key={index} className={styles.post}>
                  <TextStream
                    text={formattedPostDate}
                    duration={2 + index / 10}
                  />
                  <Link href={slug}>
                    <TextStream text={post.title} duration={2 + index / 10} />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div id={styles.background}>
          <NeonSunsetVideo />
        </div>
      </div>
    </>
  )
}
