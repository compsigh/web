'use client'

import { usePathname } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'

import { docs } from '@/app/docs/docs'
import { Author } from '@/components/Author'
import { Spacer } from '@/components/Spacer'
import { Sidebar } from '@/components/Sidebar'
import { LinkBar } from '@/components/LinkBar'
import { Sound } from '../Decorations/Soundboard'
import { type PostProps } from '@/app/[...slug]/page'
import { Decorations } from '@/components/Decorations'
import { Emote } from '@/components/Decorations/Emote'
import { Quote, quotes } from '@/components/Decorations/Quote'
import { TypewriterWrapper } from '@/components/TypewriterWrapper'

import styles from './PostWrapper.module.css'

function AuthorsAndContent({ content, frontmatter }: PostProps) {
  return (
    <div className={styles["authors-and-content"]}>
      {frontmatter.authors && frontmatter.authors.map((author, index) => (
        <Author key={index} {...author} />
      ))}
      <Spacer size={frontmatter.authors ? 32 : 0} />
      {content}
      {frontmatter.previous &&
        <>
          <Spacer size={32} />
          <LinkBar
            type="previous"
            href={frontmatter.previous.link}
          >
            {frontmatter.previous.text}
          </LinkBar>
        </>
      }
      {frontmatter.next &&
        <>
          <Spacer size={32} />
          <LinkBar
            type="next"
            href={frontmatter.next.link}
          >
            {frontmatter.next.text}
          </LinkBar>
        </>
      }
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
  const pathName = usePathname()
  return (
    <>
      <article className={styles.post}>
        {
          typewriterDone && frontmatter.decorations &&
            <DelayWrapper>
              <Decorations layout={{ left: true, right: true }}>
                <Sound sound="brainrot-1" />
                <Sound sound="brainrot-2" />
                <Sound sound="dude" />
                <Sound sound="have-you-tried-gdb" />
                <Sound sound="noti" />
                <Sound sound="petemob" />
                <Sound sound="skill-issue" />
                <Emote emote="bensonstare" />
                <Emote emote="c" />
                <Emote emote="calendar" />
                <Emote emote="clone" />
                <Emote emote="compsighLogo" />
                <Emote emote="cue" />
                <Emote emote="deploy23" />
                <Emote emote="figma" />
                <Emote emote="github" />
                <Emote emote="go" />
                <Emote emote="haskell" />
                <Emote emote="heart" />
                <Emote emote="hive" />
                <Emote emote="intellijidea" />
                <Emote emote="java" />
                <Emote emote="leetcode" />
                <Emote emote="linux" />
                <Emote emote="markdown" />
                <Emote emote="mehmote" />
                <Emote emote="neovim" />
                <Emote emote="nextjs" />
                <Emote emote="nixos" />
                <Emote emote="nodejs" />
                <Emote emote="notepad" />
                <Emote emote="obsidian" />
                <Emote emote="openBook" />
                <Emote emote="philmote" />
                <Emote emote="picnic" />
                <Emote emote="playingCards" />
                <Emote emote="python" />
                <Emote emote="react" />
                <Emote emote="repost" />
                <Emote emote="rust" />
                <Emote emote="sunflowers" />
                <Emote emote="taoFedora" />
                <Emote emote="threejs" />
                <Emote emote="tunnel" />
                <Emote emote="typescript" />
                <Emote emote="usf" />
                <Emote emote="ventrue" />
                <Emote emote="vercel" />
                <Emote emote="vim" />
                <Emote emote="vscode" />
                <Emote emote="warp" />
                <Quote quote={quotes[0]} />
                <Quote quote={quotes[1]} />
                <Quote quote={quotes[2]} />
                <Quote quote={quotes[3]} />
                <Quote quote={quotes[4]} />
                <Quote quote={quotes[5]} />
                <Quote quote={quotes[6]} />
                <Quote quote={quotes[7]} />
                <Quote quote={quotes[8]} />
              </Decorations>
            </DelayWrapper>
        }
        {
          !typewriterDone &&
            <div className={styles["sidebar-placeholder"]} style={{ opacity: 0 }}>
              <Sidebar
                structured={pathName.startsWith('/docs')}
                entries={docs}
              />
            </div>
        }
        {
          typewriterDone &&
            <div className={styles["sidebar-wrapper"]}>
              <Sidebar
                structured={pathName.startsWith('/docs')}
                entries={docs}
              />
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
        {
          !typewriterDone && pathName.startsWith('/docs') &&
            <div
              className={`${styles["sidebar-placeholder"]} ${styles.secondary}`}
              style={{ opacity: 0 }}
            >
              <Sidebar structured={false} />
            </div>
        }
        {
          typewriterDone && pathName.startsWith('/docs') &&
            <div className={`${styles["sidebar-wrapper"]} ${styles.secondary}`}>
              <Sidebar structured={false} />
            </div>
        }
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
