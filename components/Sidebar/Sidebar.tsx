'use client'

import { useEffect, useState } from 'react'

import { TableOfContents } from '@/components/TableOfContents'

import styles from './Sidebar.module.css'

export function Sidebar() {
  const [entries, setEntries] = useState<string[]>([])

  useEffect(() => {
    const headings = document.querySelectorAll('h2, h3')
    setEntries(Array.from(headings).map(heading => heading.textContent || ''))
  }, [])

  return (
    <aside className={styles.sidebar}>
      <TableOfContents entries={entries} />
      {entries.length > 0 && <hr className={styles.line} /> }
      <p className={styles["nav-edu"]}>Type <kbd>/</kbd> to navigate the platform!</p>
    </aside>
  )
}
