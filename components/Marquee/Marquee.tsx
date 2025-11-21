import { connection } from 'next/server'

// Functions
import { getAllMarqueeEntries } from '@/functions/db/marquee'

// Styles
import styles from './Marquee.module.css'

export async function Marquee() {
  await connection()
  const marqueeEntries = await getAllMarqueeEntries()
  return (
    <>
      <div className={styles.container}>
        <div className={styles.marquee}>
          {
            marqueeEntries.map((entry) => (
              <p key={entry.id} className={styles.text}>
                <span className={styles.name}>{entry.nickname}</span>
                {' '} is working on {' '}
                <span className={styles.name}>{entry.project}</span>
              </p>
            ))
          }
        </div>
      </div>
    </>
  )
}
