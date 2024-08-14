import {
  type Frontmatter,
  generateUnmodifiedSlugsFromMarkdownFiles,
  readMarkdownFileAtRoute
} from '@/app/[...slug]/page'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { NeonSunsetVideo } from '@/components/NeonSunsetVideo'

import '@/app/[...slug]/Typography.css'
import styles from './Community.module.css'

export type PostFrontmatter = Frontmatter & { post_date: number }

async function getPosts() {
  const markdownFiles = await generateUnmodifiedSlugsFromMarkdownFiles('app/community')
  let posts: Record<string, PostFrontmatter> = {}
  for (const { slug } of markdownFiles) {
    const { frontmatter } = await readMarkdownFileAtRoute(slug)
    if (!frontmatter.post_date)
      throw new Error(`Event ${slug.join('/')} is missing post_date`)
    posts[slug.join('/')] = frontmatter as PostFrontmatter
  }
  // Sort by post_date
  posts = Object.fromEntries(Object.entries(posts).sort((a, b) => b[1].post_date - a[1].post_date))
  return posts
}

export default async function Community() {
  const posts = await getPosts()
  return (
    <>
      <div id={styles.page}>
        <NeonSunsetVideo />
        <div id={styles["breadcrumbs-wrapper"]}>
          <Breadcrumbs />
        </div>
        <div id={styles.content}>
          <h1 id={styles.title}>Community</h1>
        </div>
      </div>
    </>
  )
}
