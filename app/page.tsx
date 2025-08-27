import { NavItems } from '@/components/NavItems'
import { HomeLoop } from '@/components/HomeLoop'
import { UpcomingEvent } from '@/components/UpcomingEvent'
import { getUpcomingEvents } from '@/app/events/utils'

import styles from './Home.module.css'

export default async function Home() {
  const upcomingEvents = await getUpcomingEvents()

  return (
    <div className={styles.layoutWrapper}>
      <UpcomingEvent events={upcomingEvents} />
      <div id={styles.content}>
        <h1 id={styles.title}>compsigh</h1>
        <p id={styles.description}>
          compsigh is the social computer science club at USFCA for meeting cool people &amp;&amp; building cool things. We host high-quality, low-stakes events, and engage in a vibrant community.
        </p>
        <nav id={styles.navbar}>
          <NavItems />
        </nav>
      </div>
      <div id={styles.background}>
        <HomeLoop />
      </div>
    </div>
  )
}
