'use client'

import { useState } from 'react'

import { Author } from '@/components/Author'
import { Spacer } from '@/components/Spacer'
import { Sidebar } from '@/components/Sidebar'
import { type PostProps } from '@/app/[...slug]/page'
import { TypewriterWrapper } from '@/components/TypewriterWrapper'

function AuthorsAndContent({ content, frontmatter }: PostProps) {
  return (
    <div className="authors-and-content">
      {frontmatter.authors.map((author, index) => (
        <Author key={index} {...author} />
      ))}
      <Spacer size={32} />
      <div className="content">
        <Sidebar />
        {content}
      </div>
    </div>
  )
}

export function ArticleWrapper({ content, frontmatter }: PostProps) {
  const [typewriterDone, setTypewriterDone] = useState(false)
  return (
    <>
      <article>
        <TypewriterWrapper
          as={'h1'}
          options={{
            cursor: '_',
            delay: 70,
            }}
          string={frontmatter.title}
          handleDone={() => setTypewriterDone(true)}
        />
        {typewriterDone && <AuthorsAndContent content={content} frontmatter={frontmatter} />}
      </article>
    </>
  )
}
