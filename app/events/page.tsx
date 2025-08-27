import { Event } from './Event'
import { EventList } from './EventList'
import { Twinkle } from '@/components/Twinkle'
import { getEvents, designateEvents } from './utils'

import styles from './Events.module.css'

export default async function Events() {
  const events = await getEvents()
  const { now, upcoming, past } = designateEvents(events)

  const NowEvents = now.map((event, index) => {
    return <Event key={index} event={event} />
  })
  const UpcomingEvents = upcoming.map((event, index) => {
    return <Event key={index} event={event} />
  })
  const PastEvents = past.map((event, index) => {
    return <Event key={index} event={event} />
  })

  return (
    <>
      <div id={styles.page}>
        <div id={styles["twinkle-wrapper"]}>
          <Twinkle position="left" />
        </div>
        <div id={styles.content}>
          <h1 id={styles.title}>Events</h1>
          <EventList now={NowEvents} upcoming={UpcomingEvents} past={PastEvents} />
        </div>
      </div>
    </>
  )
}
