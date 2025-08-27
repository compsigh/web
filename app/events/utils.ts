import {
  type EventDetails,
  type Frontmatter,
  generateUnmodifiedSlugsFromMarkdownFiles,
  readMarkdownFileAtRoute
} from '@/app/[...slug]/page'

type CompleteEventDetails = EventDetails & { end: number, link: string | null }
export type EventFrontmatter = Omit<Frontmatter, 'event_details'> & { event_details: CompleteEventDetails }

export async function getEvents() {
  const markdownFiles = await generateUnmodifiedSlugsFromMarkdownFiles('app/events')
  const events: Frontmatter[] = []
  for (const { slug } of markdownFiles) {
    const { frontmatter } = await readMarkdownFileAtRoute(slug)
    if (!frontmatter.event_details)
      throw new Error(`Event ${slug.join('/')} is missing event_details`)
    if (frontmatter.event_details.hide_on_timeline)
      continue
    if (frontmatter.event_details.cover_image === undefined)
      throw new Error(`Event ${slug.join('/')} is missing event_details.cover_image`)
    if (!frontmatter.event_details.start)
      throw new Error(`Event ${slug.join('/')} is missing event_details.start`)
    if (frontmatter.event_details.end && (frontmatter.event_details.end < frontmatter.event_details.start))
      throw new Error(`Event ${slug.join('/')} has event_details.end (${frontmatter.event_details.end}) before event_details.start (${frontmatter.event_details.start})`)
    if (frontmatter.event_details.link === undefined)
      frontmatter.event_details.link = slug.join('/')
    events.push(frontmatter)
  }
  return events as EventFrontmatter[]
}

export function designateEvents(events: EventFrontmatter[]) {
  const now = []
  const upcoming = []
  const past = []

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

export async function getUpcomingEvents() {
  const events = await getEvents()
  const { upcoming } = designateEvents(events)
  return upcoming
}
