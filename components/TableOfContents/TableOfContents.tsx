'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

import styles from './TableOfContents.module.css'

type Heading = {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    const headingElements = document.querySelectorAll('h2, h3')
    const headingsArray = Array.from(headingElements).map(heading => ({
      id: heading.id || heading.textContent?.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s/g, '-') || '',
      text: heading.textContent || '',
      level: heading.tagName === 'H2' ? 2 : 3
    }))
    setHeadings(headingsArray)
  }, [])

  function HeadingDetailsWrapper({
    heading, subheadings, children
  }: {
    heading: Heading, subheadings: Heading[], children: React.ReactNode
  }) {
    if (subheadings.length > 0)
      return (
        <>
          <details>
            <summary>
              <Link href={`#${heading.id}`}>{heading.text}</Link>
            </summary>
            {children}
          </details>
        </>
      )
    return (
      <>
        <Link href={`#${heading.id}`}>{heading.text}</Link>
        {children}
      </>
    )
  }

  if (headings.length === 0) return <></>
  return (
    <>
      <p id={styles["jump-to"]}>Jump to:</p>
      <nav id={styles["table-of-contents"]}>
      <ul>
          {headings.map((heading, index) => {
            if (heading.level === 3) return null
            const subHeadings = []
            for (let i = index + 1; i < headings.length && headings[i].level !== 2; i++)
              if (headings[i].level === 3)
                subHeadings.push(headings[i])
            return (
              <li key={heading.id}>
                <HeadingDetailsWrapper heading={heading} subheadings={subHeadings}>
                {subHeadings.length > 0 && (
                  <ul>
                    {subHeadings.map(subheading => (
                      <li key={subheading.id}>
                        <Link href={`#${subheading.id}`}>{subheading.text}</Link>
                      </li>
                    ))}
                  </ul>
                )}
                </HeadingDetailsWrapper>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
