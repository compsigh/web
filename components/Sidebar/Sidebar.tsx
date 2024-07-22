'use client'

import { useEffect, useState } from 'react'

import { TableOfContents } from '@/components/TableOfContents'

export function Sidebar() {
  const [entries, setEntries] = useState<string[]>([])

  useEffect(() => {
    const headings = document.querySelectorAll('h2, h3')
    setEntries(Array.from(headings).map(heading => heading.textContent || ''))
  }, [])

  return (
    <>
      <aside>
        <TableOfContents entries={entries} />
      </aside>
    </>
  )
}
