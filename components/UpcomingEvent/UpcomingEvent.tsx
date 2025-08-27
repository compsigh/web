import Link from 'next/link'
import Image from 'next/image'
import { EventFrontmatter } from '@/app/events/utils'

import styles from './UpcomingEvent.module.css'

export function UpcomingEvent({ events }: { events: EventFrontmatter[] }) {
  if (events.length === 0) {
    return null
  }

  const nextEvent = events[0]
  const { start } = nextEvent.event_details
  const START_TIME_IN_MS = start * 1000
  const currentYear = new Date().getFullYear()
  const year = new Date(START_TIME_IN_MS).getFullYear()
  const startDate = new Date(START_TIME_IN_MS)
    .toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      month: 'short',
      day: '2-digit',
      year:
        year === currentYear
          ? undefined
          : 'numeric'
    })
    .replace(',', '')
  const startTime = new Date(START_TIME_IN_MS)
    .toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      hour: '2-digit',
      minute: '2-digit'
    })

  return (
    <div className={styles.container}>
      {nextEvent.event_details.link ? (
        <Link href={nextEvent.event_details.link}>
          <div className={styles.banner}>
            {nextEvent.event_details.cover_image && (
              <div className={styles.backgroundImage}>
                <Image
                  src={nextEvent.event_details.cover_image}
                  alt=""
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                <div className={styles.overlay} />
              </div>
            )}
            <div className={styles.content}>
              <div className={styles.dateTime}>
                <p className={styles.date}>{startDate}</p>
                <p className={styles.time}>{startTime}</p>
              </div>
              <div className={styles.eventInfo}>
                <h2 className={styles.title}>
                  {nextEvent.title}
                </h2>
                {nextEvent.event_details.location && (
                  <div className={styles.location}>
                    <span>{nextEvent.event_details.location}</span>
                  </div>
                )}
                <p className={styles.description}>{nextEvent.description}</p>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className={styles.banner}>
          {nextEvent.event_details.cover_image && (
            <div className={styles.backgroundImage}>
              <Image
                src={nextEvent.event_details.cover_image}
                alt=""
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className={styles.overlay} />
            </div>
          )}
          <div className={styles.content}>
            <div className={styles.dateTime}>
              <p className={styles.date}>{startDate}</p>
              <p className={styles.time}>{startTime}</p>
            </div>
            <div className={styles.eventInfo}>
              <h2 className={styles.title}>
                {nextEvent.title}
              </h2>
              {nextEvent.event_details.location && (
                <div className={styles.location}>
                  <span>{nextEvent.event_details.location}</span>
                </div>
              )}
              <p className={styles.description}>{nextEvent.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
