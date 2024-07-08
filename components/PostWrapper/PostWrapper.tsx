'use client'

import { useState } from 'react'

import { Author } from '@/components/Author'
import { Spacer } from '@/components/Spacer'
import { Sidebar } from '@/components/Sidebar'
import { type PostProps } from '@/app/[...slug]/page'
import { TypewriterWrapper } from '@/components/TypewriterWrapper'

import styles from './PostWrapper.module.css'

function AuthorsAndContent({ content, frontmatter }: PostProps) {
  return (
    <div className={styles["authors-and-content"]}>
      {frontmatter.authors.map((author, index) => (
        <Author key={index} {...author} />
      ))}
      <Spacer size={32} />
      {content}
    </div>
  )
}

export function PostWrapper({ content, frontmatter }: PostProps) {
  const [typewriterDone, setTypewriterDone] = useState(false)
  return (
    <>
      <article className={styles.post}>
        {
          !typewriterDone &&
            <div className={styles["sidebar-placeholder"]} style={{ opacity: 0 }}>
              <Sidebar />
            </div>
        }
        {
          typewriterDone &&
            <div className={styles["sidebar-wrapper"]}>
              <Sidebar />
            </div>
        }
        <div className={styles.content}>
          <TypewriterWrapper
            as={'h1'}
            options={{
              cursor: '_',
              delay: 30,
              }}
            string={frontmatter.title}
            handleDone={() => setTypewriterDone(true)}
          />
          {typewriterDone && <AuthorsAndContent content={content} frontmatter={frontmatter} />}
        </div>
      </article>
    </>
  )
}
