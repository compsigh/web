'use client'

import { useEffect, useState } from 'react'

import { CommandBar } from '@/components/CommandBar'
import { TableOfContents } from '@/components/TableOfContents'

import styles from './Sidebar.module.css'

export function Sidebar() {
  const [entries, setEntries] = useState<string[]>([])
  const [navEduVisible, setNavEduVisible] = useState(true)

  useEffect(() => {
    const headings = document.querySelectorAll('h2, h3')
    setEntries(Array.from(headings).map(heading => heading.textContent || ''))

    const hideNavEduListener = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault()
        setNavEduVisible(false)
      }

      if (e.key === 'Escape')
        setNavEduVisible(true)
    }

    document.addEventListener('keydown', hideNavEduListener)
    return () => document.removeEventListener('keydown', hideNavEduListener)
  }, [])

  return (
    <>
      <aside className={styles.sidebar}>
        <TableOfContents entries={entries} />
        {entries.length > 0 && <hr className={styles.line} /> }
        {navEduVisible && <p className={styles["nav-edu"]}>Type <kbd>/</kbd> to navigate the platform!</p>}
        <CommandBar />
      </aside>
    </>
  )
}
