'use client'

import Link from 'next/link'
import { useState } from 'react'

import { TableOfContents } from '@/components/TableOfContents'

import styles from './StructuredSidebar.module.css'

type Page = {
  text: string
  link: string
}

type Directory = {
  name: string
  entries: Directory | Page[]
}

export type StructuredSidebarProps = (Page | Directory)[]

export function StructuredSidebar({ entries }: { entries: StructuredSidebarProps }) {
  return (
    <nav id={styles["structured-sidebar"]}>
      <ul>
        {entries.map((entry, index) => (
          <SidebarItem key={index} entry={entry} />
        ))}
      </ul>
    </nav>
  )
}

type SidebarItemProps = {
  entry: Page | Directory
}

function SidebarItem({ entry }: SidebarItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Directory
  if ('entries' in entry)
    return (
      <li>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          <span>{entry.name}</span>
          <span
            id={styles.arrow}
            className={isExpanded ? styles.expanded : styles.collapsed}
          >
            &gt;
          </span>
        </button>
        {isExpanded && (
          <ul>
            {
              // Page[]
              !('name' in entry.entries) &&
                entry.entries.map((subEntry, index) => (
                  <SidebarItem key={index} entry={subEntry} />
                ))
            }
            {
              // Directory
              ('name' in entry.entries) &&
                <SidebarItem entry={entry.entries} />
            }
          </ul>
        )}
      </li>
    )

  return (
    <li>
      <Link href={entry.link}>
        {entry.text}
      </Link>
    </li>
  )
}

export function Sidebar({
  structured, entries
}: {
  structured?: boolean, entries?: StructuredSidebarProps
}) {
  if (structured && entries)
    return StructuredSidebar({ entries })
  return (
    <>
      <aside>
        <TableOfContents />
      </aside>
    </>
  )
}
