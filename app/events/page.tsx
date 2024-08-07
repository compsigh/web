import {
  type EventDetails,
  type Frontmatter,
  generateUnmodifiedSlugsFromMarkdownFiles,
  locationIcons,
  readMarkdownFileAtRoute
} from '@/app/[...slug]/page'
import Image from 'next/image'

import { Media } from '@/components/Media'
import { Twinkle } from '@/components/Twinkle'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { StatusIndicator } from '@/components/StatusIndicator'

import styles from './Events.module.css'

type CompleteEventDetails = EventDetails & { end: number }
type EventFrontmatter = Omit<Frontmatter, 'event_details'> & { event_details: CompleteEventDetails }

async function getEvents() {
  const markdownFiles = await generateUnmodifiedSlugsFromMarkdownFiles('app/events')
  let events: Frontmatter[] = []
  for (const { slug } of markdownFiles) {
    const { frontmatter } = await readMarkdownFileAtRoute(slug)
    if (!frontmatter.event_details)
      throw new Error(`Event ${slug.join('/')} is missing event_details`)
    if (!frontmatter.event_details.cover_image)
      throw new Error(`Event ${slug.join('/')} is missing event_details.cover_image`)
    if (!frontmatter.event_details.start)
      throw new Error(`Event ${slug.join('/')} is missing event_details.start`)
    if (!frontmatter.event_details.end)
      // By default, events end 6 hours after they start
      frontmatter.event_details.end = frontmatter.event_details.start + 6 * 60 * 60
    if (frontmatter.event_details.end && (frontmatter.event_details.end < frontmatter.event_details.start))
      throw new Error(`Event ${slug.join('/')} has event_details.end (${frontmatter.event_details.end}) before event_details.start (${frontmatter.event_details.start})`)
    events.push(frontmatter)
  }
  return events as EventFrontmatter[]
}

function designateEvents(events: EventFrontmatter[]) {
  let now = []
  let upcoming = []
  let past = []

  const currentUnixTimestamp = Math.floor(Date.now() / 1000)
  function isEventHappeningNow(start: number, end: number) {
    return start < currentUnixTimestamp && end > currentUnixTimestamp
  }

  for (const event of events)
    if (event.event_details) {
      const { start, end } = event.event_details
      if (isEventHappeningNow(start, end))
        now.push(event)
      else if (end > currentUnixTimestamp)
        upcoming.push(event)
      else
        past.push(event)
    }

  return { now, upcoming, past }
}

function Event({ event }: { event: EventFrontmatter }) {
  const { start } = event.event_details
  const startDate = new Date(start * 1000).toLocaleString('en-US', { timeZone: 'America/Los_Angeles', month: 'short', day: '2-digit' })
  const startTime = new Date(start * 1000).toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit' })
  return (
    <>
      <p className={styles.date}>{startDate}</p>
      <Media src={event.event_details.cover_image} alt={event.title} />
      <div className={styles["title-and-time"]}>
        <h3>{event.title}</h3>
        <p>{startTime}</p>
      </div>
      {
        event.event_details.location &&
          <div className={styles.location}>
            {event.event_details.location === 'The Hive' &&
              <Image src={locationIcons['hive']} alt="Hive" width={20} height={20} />
            }
            <p>{event.event_details.location}</p>
          </div>
      }
      <p>{event.description}</p>
      {event.event_details.activities &&
        <ul className={styles.activities}>
          {event.event_details.activities.map((activity, index) => {
            const activityTime = new Date((start + activity.time_offset) * 1000).toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit' })
            return (
              <li key={index}>
                <span className={styles["activity-title"]}>{activity.title}</span>
                <span className={styles["activity-time"]}>{activityTime}</span>
              </li>
            )
          })}
        </ul>
      }
    </>
  )
}

function EventList({ events }: { events: EventFrontmatter[] }) {
  const { now, upcoming, past } = designateEvents(events)
  return (
    <>
      {
        now.length > 0 &&
          <>
            <div id={styles["now-header"]}>
              <StatusIndicator />
              <h2>Now</h2>
            </div>
            <div className={styles.events}>
              {now.map((event, index) => {
                return (
                  <div key={index} className={styles.event}>
                    <Event event={event} />
                  </div>
                )
              })}
            </div>
          </>
      }
      {
        upcoming.length > 0 &&
          <>
            <h2>Upcoming</h2>
            <div className={styles.events}>
              {upcoming.map((event, index) => {
                return (
                  <div key={index} className={styles.event}>
                    <Event event={event} />
                  </div>
                )
              })}
            </div>
          </>
      }
      {
        past.length > 0 &&
          <>
            <h2>Past</h2>
            <div className={styles.events}>
              {past.map((event, index) => {
                return (
                  <div key={index} className={styles.event}>
                    <Event event={event} />
                  </div>
                )
              })}
            </div>
          </>
      }
    </>
  )
}

export default async function Events() {
  const events = await getEvents()
  return (
    <>
      <div id={styles.page}>
        <div id={styles["twinkle-wrapper"]}>
          <Twinkle position="top" />
        </div>
          <div id={styles["breadcrumbs-wrapper"]}>
            <Breadcrumbs />
          </div>
        <div id={styles.content}>
          <h1 id={styles.title}>Events</h1>
          <EventList events={events} />
        </div>
      </div>
    </>
  )
}
