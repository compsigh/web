// Components
import Link from 'next/link'
import { Twinkle } from '@/components/Twinkle'

// Styles
import styles from './Framework.module.css'

function Entry(
  { entry }:
  { entry: { text: string, link: string } }
) {
  return (
    <li>
      <Link href={entry.link}>
        {entry.text}
      </Link>
    </li>
  )
}

function TableOfContents(
  { entries }:
  { entries: { text: string, link: string }[] }
) {
  return (
    <nav id={styles["structured-sidebar"]}>
      <ul>
        {entries.map((entry, index) => (
          <Entry key={index} entry={entry} />
        ))}
      </ul>
    </nav>
  )
}

export default function Framework() {
  return (
    <>
      <div id={styles.page}>
        <div id={styles["twinkle-wrapper"]}>
          <Twinkle
            position="top"
            color="var(--color-light)"
            density={40}
            coverage={70}
          />
        </div>
        <div id={styles.content}>
          <div id={styles.cover}>
            <h1 id={styles.title}>framework</h1>
            <p id={styles.subtitle}>
              <em>documenting the mission &amp; methods of compsigh leadership</em>
            </p>
            <TableOfContents
              entries={[
                { text: 'preface', link: '/docs/framework/preface' },
                { text: 'hosting events', link: '/docs/framework/hosting-events' },
                { text: 'promoting events', link: '/docs/framework/promoting-events' },
                { text: 'leadership structure', link: '/docs/framework/leadership-structure' },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  )
}
