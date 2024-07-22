import Link from 'next/link'

import styles from './TableOfContents.module.css'

export function TableOfContents({ entries }: { entries: string[] }) {
  if (entries.length === 0) return <></>
  return (
    <>
      <p className={styles["jump-to"]}>Jump to:</p>
      <nav className={styles["table-of-contents"]}>
        <ul>
          {entries.map((entry, index) => (
            <li key={index}>
              <Link href={`#${entry.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s/g, '-')}`}>
                {entry}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
