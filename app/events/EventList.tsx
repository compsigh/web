'use client'

import { useEffect, useRef } from 'react'

import styles from './Events.module.css'

export function EventList({
  now, upcoming, past
}: {
  now: JSX.Element[],
  upcoming: JSX.Element[],
  past: JSX.Element[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const combinedEvents = [
    ...past.map((event, index) => ({ type: 'event', element: <div key={index} className={`${styles.event} ${styles["past-event"]}`}>{event}</div> })),
    ...past.length > 0 ? [{ type: 'header', element: <h2 key={styles.past} id={styles.past} style={{ display: now.length === 0 ? 'none' : ''}}>Past</h2> }] : [],
    ...now.map((event, index) => ({ type: 'event', element: <div key={index} className={`${styles.event} ${styles["now-event"]}`}>{event}</div> })),
    ...now.length === 0 ? [{ type: 'header', element: <div key={styles["past-upcoming-divider"]} id={styles["past-upcoming-divider"]}><h2>Past</h2><hr /><h2>Upcoming</h2></div> }] : [],
    ...upcoming.length > 0 ? [{ type: 'header', element: <h2 key={styles.upcoming} id={styles.upcoming} style={{ display: now.length === 0 ? 'none' : ''}}>Upcoming</h2> }] : [],
    ...upcoming.map((event, index) => ({ type: 'event', element: <div key={index} className={`${styles.event} ${styles["upcoming-event"]}`}>{event}</div> }))
  ]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const nowEvents = container.querySelectorAll(`.${styles["now-event"]}`)
    const upcomingEvents = container.querySelectorAll(`.${styles["upcoming-event"]}`)

    if (nowEvents.length > 0) {
      const firstNowEvent = nowEvents[0] as HTMLElement
      firstNowEvent.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
    else if (upcomingEvents.length > 0) {
      const firstUpcomingEvent = upcomingEvents[0] as HTMLElement
      firstUpcomingEvent.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const eventElements = container.querySelectorAll(`.${styles["event-wrapper"]}, h2, hr`)

      eventElements.forEach((event, index) => {
        const htmlElement = event as HTMLElement
        const elementPosition = htmlElement.getBoundingClientRect().top + htmlElement.clientHeight / 2
        const containerPosition = container.getBoundingClientRect().top
        const distance = Math.abs((elementPosition - containerPosition) - (container.clientHeight / 2))

        const scale = 1 - Math.min(distance / (container.clientHeight / 2), 1) * 0.1
        const opacity = 1 - Math.min(distance / (container.clientHeight / 2), 1) * 0.8

        htmlElement.style.transform = `scale(${scale})`
        htmlElement.style.opacity = `${opacity}`
      })
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div
        ref={containerRef}
        className={styles["event-list-container"]}
      >
        {combinedEvents.map((item, index) => (
          item.type === 'header'
            ? item.element
            : (
              <div
                key={index}
                className={styles["event-wrapper"]}
              >
                {item.element}
              </div>
            )
        ))}
      </div>
    </>
  )
}
