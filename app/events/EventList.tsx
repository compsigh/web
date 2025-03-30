'use client'

import { type JSX, useEffect, useRef } from 'react'

import { Spacer } from '@/components/Spacer'

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
    ...past.length > 0 ? [{ type: 'heading', element: <p key={styles.past} id={styles.past} className={styles.heading} style={{ display: now.length === 0 ? 'none' : ''}}>Past</p> }] : [],
    ...now.map((event, index) => ({ type: 'event', element: <div key={index} className={`${styles.event} ${styles["now-event"]}`}>{event}</div> })),
    ...now.length === 0 ? [{ type: 'heading', element: <div key={styles["past-upcoming-divider"]} id={styles["past-upcoming-divider"]}><p className={styles.heading}>Past</p><hr /><p className={styles.heading}>Upcoming</p></div> }] : [],
    ...upcoming.length > 0 ? [{ type: 'heading', element: <p key={styles.upcoming} id={styles.upcoming} className={styles.heading} style={{ display: now.length === 0 ? 'none' : ''}}>Upcoming</p> }] : [],
    ...upcoming.map((event, index) => ({ type: 'event', element: <div key={index} className={`${styles.event} ${styles["upcoming-event"]}`}>{event}</div> }))
  ]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const nowEvents = container.querySelectorAll(`.${styles["now-event"]}`)
    const upcomingEvents = container.querySelectorAll(`.${styles["upcoming-event"]}`)
    const pastEvents = container.querySelectorAll(`.${styles["past-event"]}`)

    if (nowEvents.length > 0) {
      const firstNowEvent = nowEvents[0] as HTMLElement
      firstNowEvent.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
    else if (upcomingEvents.length > 0) {
      const firstUpcomingEvent = upcomingEvents[0] as HTMLElement
      firstUpcomingEvent.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
    else if (pastEvents.length > 0) {
      const mostRecentEvent = pastEvents[pastEvents.length - 1] as HTMLElement
      mostRecentEvent.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
  }, [])

  useEffect(() => {
    const page = document.querySelector(`#${styles.page}`)
    if (!page) return
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const eventElements = container.querySelectorAll(`.${styles["event-wrapper"]}, p.${styles.heading}, hr`)

      eventElements.forEach(event => {
        const htmlElement = event as HTMLElement
        const elementPosition = htmlElement.getBoundingClientRect().top + page.scrollTop + htmlElement.clientHeight / 2
        const distance = Math.abs((elementPosition - (window.innerHeight / 2 + page.scrollTop)))

        const scale = 1 - Math.min(distance / (window.innerHeight / 2), 1) * 0.1
        const opacity = 1 - Math.min(distance / (window.innerHeight / 2), 1) * 0.8

        htmlElement.style.transform = `scale(${scale})`
        htmlElement.style.opacity = `${opacity}`
      })
    }

    page.addEventListener('scroll', handleScroll)
    return () => page.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div
        ref={containerRef}
        className={styles["event-list-container"]}
      >
        <Spacer size="20vh" />
        {combinedEvents.map((item, index) => (
          item.type === 'heading'
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
        <Spacer size="20vh" />
      </div>
    </>
  )
}
