import {
  type EventDetails,
  type Frontmatter,
  generateUnmodifiedSlugsFromMarkdownFiles,
  readMarkdownFileAtRoute
} from '@/app/[...slug]/page'

import { Event } from './Event'
import { EventList } from './EventList'
import { Twinkle } from '@/components/Twinkle'
import { Breadcrumbs } from '@/components/Breadcrumbs'

import styles from './Events.module.css'

type CompleteEventDetails = EventDetails & { end: number, link: string | null }
export type EventFrontmatter = Omit<Frontmatter, 'event_details'> & { event_details: CompleteEventDetails }

async function getEvents() {
  const markdownFiles = await generateUnmodifiedSlugsFromMarkdownFiles('app/events')
  let events: Frontmatter[] = []
  for (const { slug } of markdownFiles) {
    const { frontmatter } = await readMarkdownFileAtRoute(slug)
    if (!frontmatter.event_details)
      throw new Error(`Event ${slug.join('/')} is missing event_details`)
    if (frontmatter.event_details.cover_image === undefined)
      throw new Error(`Event ${slug.join('/')} is missing event_details.cover_image`)
    if (!frontmatter.event_details.start)
      throw new Error(`Event ${slug.join('/')} is missing event_details.start`)
    if (!frontmatter.event_details.end)
      // By default, events end 6 hours after they start
      frontmatter.event_details.end = frontmatter.event_details.start + 6 * 60 * 60
    if (frontmatter.event_details.end && (frontmatter.event_details.end < frontmatter.event_details.start))
      throw new Error(`Event ${slug.join('/')} has event_details.end (${frontmatter.event_details.end}) before event_details.start (${frontmatter.event_details.start})`)
    if (frontmatter.event_details.link === undefined)
      frontmatter.event_details.link = slug.join('/')
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

export const dynamic = 'force-dynamic' // Bandaid solution: dynamic rendering for detecting whether an event is now, upcoming, or past
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
          <div id={styles["breadcrumbs-wrapper"]}>
            <Breadcrumbs />
          </div>
        <div id={styles.content}>
          <h1 id={styles.title}>Events</h1>
          <EventList now={NowEvents} upcoming={UpcomingEvents} past={PastEvents} />
        </div>
      </div>
    </>
  )
}
