"use client"

import { EventFrontmatter } from "@/app/events/page"
import Link from "next/link"

import { isValidURL } from "./isValidURL"

export function HomepageBanner({ events }: { events: EventFrontmatter[] }) {
  const currentTime = Math.floor(new Date().getTime() / 1000)
  if (events.length === 0) return <></>

  const updatedEvents: EventFrontmatter[] = [
    ...events,
    {
      title: "DAVE",
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
    <Link href={eventLink}>
      <h1>&quot;{title}&quot; is coming up.</h1>
    </Link>
  )
}
