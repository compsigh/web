"use client"

// Components
import { LinkBar } from "@/components/LinkBar"

// Functions
import { isValidURL } from "./isValidURL"

// Types
import { EventFrontmatter } from "@/app/events/page"

// Styles
import styles from "./HomepageBanner.module.css"

export function HomepageBanner({ events }: { events: EventFrontmatter[] }) {
  const currentTime = Math.floor(new Date().getTime() / 1000)
  if (events.length === 0) return <></>

  const updatedEvents: EventFrontmatter[] = [
    ...events,
    {
      title: "compsigh night v2026.01.20 6 7",
      description: "register!",
      event_details: {
        start: 1770420908,
        end: 1770420968,
        location: "The Hive",
        cover_image: "/events/2025-11-07/deploy25.png",
        pictures: [],
        link: "https://touch-grass.tech/"
      },
      slug: "events/2025-11-07/deploy25"
    }
  ]

  const upcomingEvents: EventFrontmatter[] = []
  for (const event of updatedEvents)
    if (currentTime < event.event_details.start) upcomingEvents.push(event)

  if (upcomingEvents.length === 0) return <></>
  const nearestUpcomingEvent = upcomingEvents[0]
  const title = nearestUpcomingEvent.title
  const eventLink = nearestUpcomingEvent.event_details.link!

  if (!isValidURL(eventLink)) return <></>

  return (
    <div className={styles.banner}>
      {/*<Link href={eventLink} style={{ fontFamily: "var(--font-tronica-mono)" }}>
        <span>Next event: </span>
        <TextStream duration={1} text={`${title} >`} />
      </Link>*/}
      <LinkBar
        arrowDirection="forward"
        alignment="end"
        order="text-first"
        href={"https://compsigh.club"}
      >
        Next event: {title}
      </LinkBar>
    </div>
  )
}
