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
                { text: 'Preface', link: 'https://github.com/compsigh/framework/blob/main/01%20Preface.md' },
                { text: 'Leadership structure', link: 'https://github.com/compsigh/framework/blob/main/02%20Leadership%20structure.md' },
                { text: 'Leadership processes', link: 'https://github.com/compsigh/framework/blob/main/03%20Leadership%20processes.md' },
                { text: 'Events', link: 'https://github.com/compsigh/framework/blob/main/04%20Events.md' },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  )
}
