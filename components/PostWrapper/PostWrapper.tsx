'use client'

import { useEffect, useState } from 'react'

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
  const CURSOR_WIDTH = 1
  const MAX_LENGTH_MOBILE = 11 - CURSOR_WIDTH
  const MAX_LENGTH_TABLET = 20 - CURSOR_WIDTH
  const MAX_LENGTH_DESKTOP = 23 - CURSOR_WIDTH
  const [maxStringLength, setMaxStringLength] = useState(MAX_LENGTH_DESKTOP)
  useEffect(() => {
    function calculateMaxStringLength() {
      if (window.innerWidth < 768) return MAX_LENGTH_MOBILE
      if (window.innerWidth < 1024) return MAX_LENGTH_TABLET
      return MAX_LENGTH_DESKTOP
    }
    setMaxStringLength(calculateMaxStringLength())
  }, [MAX_LENGTH_MOBILE, MAX_LENGTH_TABLET, MAX_LENGTH_DESKTOP])
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
              delay: 50,
              }}
            strings={frontmatter.title.split(' ')}
            maxLength={maxStringLength}
            handleDone={() => setTypewriterDone(true)}
          />
          {typewriterDone && <AuthorsAndContent content={content} frontmatter={frontmatter} />}
        </div>
      </article>
    </>
  )
}
