'use client'

import { useLayoutEffect, useState } from 'react'

import { Author } from '@/components/Author'
import { Spacer } from '@/components/Spacer'
import { Sidebar } from '@/components/Sidebar'
import { Sound } from '../Decorations/Soundboard'
import { type PostProps } from '@/app/[...slug]/page'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Decorations } from '@/components/Decorations'
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
  useLayoutEffect(() => {
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
          typewriterDone &&
            <DelayWrapper>
              <Decorations layout="right">
                <Sound sound="brainrot-1" />
                <Sound sound="brainrot-2" />
                <Sound sound="dude" />
                <Sound sound="have-you-tried-gdb" />
                <Sound sound="noti" />
                <Sound sound="petemob" />
                <Sound sound="skill-issue" />
              </Decorations>
            </DelayWrapper>
        }
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
          {
            !typewriterDone &&
              <div className={styles["breadcrumbs-placeholder"]}>
                <Breadcrumbs />
              </div>
          }
          {
            typewriterDone &&
              <div className={styles["breadcrumbs-wrapper"]}>
                <Breadcrumbs />
              </div>
          }
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

function DelayWrapper({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false)
  useLayoutEffect(() => {
    setTimeout(() => setShow(true), 1000)
  }, [])
  return <>{show && children}</>
}
