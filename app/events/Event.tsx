import Link from 'next/link'
import Image from 'next/image'
import { EventFrontmatter } from './page'
import { locationIcons } from '@/app/[...slug]/page'

import { Media } from '@/components/Media'
import { StatusIndicator } from '@/components/StatusIndicator'

import styles from './Events.module.css'

export function Event({ event }: { event: EventFrontmatter }) {
  const { start, end } = event.event_details
  const currentYear = new Date().getFullYear()
  const year = new Date(start * 1000).getFullYear()
  const startDate = new Date(start * 1000).toLocaleString('en-US', { timeZone: 'America/Los_Angeles', month: 'short', day: '2-digit', year: year === currentYear ? undefined : 'numeric' }).replace(',', '')
  const startTime = new Date(start * 1000).toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit' })
  const idStartDate = new Date(start * 1000).toLocaleDateString('sv-SE', { timeZone: 'America/Los_Angeles'})

  const currentUnixTimestamp = Math.floor(Date.now() / 1000)
  function isEventHappeningNow(start: number, end: number) {
    return start < currentUnixTimestamp && end > currentUnixTimestamp
  }

  function LinkWrapper({ children, link }: { children: React.ReactNode, link?: string }) {
    return link ? <Link href={link}>{children}</Link> : <>{children}</>
  }

  return (
    <>
      <p
        id={`${idStartDate}-${encodeURIComponent(event.title)}`}
        className={styles.date}
      >
        {startDate}
      </p>
      {
        event.event_details.cover_image &&
          <Media
            src={event.event_details.cover_image}
            link={event.event_details.link ? event.event_details.link : undefined}
            alt={event.title}
            priority={isEventHappeningNow(start, end)}
          />
      }
      <div className={styles["title-and-time"]}>
        <p className={styles.title}>
          <LinkWrapper link={event.event_details.link ? event.event_details.link : undefined}>
            {event.title}
          </LinkWrapper>
        </p>
        {
          isEventHappeningNow(start, end)
            ?
              <div className={styles.now}>
                <StatusIndicator />
                <span>Now</span>
              </div>
            :
              <p className={styles.time}>{startTime}</p>
        }
      </div>
      {
        event.event_details.location &&
          <div className={styles.location}>
            {event.event_details.location === 'The Hive' &&
              <Image src={locationIcons.hive} alt={event.event_details.location} width={20} height={20} />
            }
            {((event.event_details.location === 'LS 103') || (event.event_details.location === 'LS 209') || (event.event_details.location === 'LS 210')) &&
              <Image src={locationIcons.classroom} alt={event.event_details.location} width={30} height={30} />
            }
            {((event.event_details.location === 'HR 411') || (event.event_details.location === 'HR 413')) &&
              <Image src={locationIcons['cs-labs']} alt={event.event_details.location} width={30} height={30} />
            }
            {event.event_details.location === 'KA 499' &&
              <Image src={locationIcons['ka-499']} alt="KA 499" width={20} height={20} />
            }
            {event.event_details.location === 'Lucky Strike San Francisco' &&
              <Image src={locationIcons['lucky-strike']} alt={event.event_details.location} width={24} height={24} />
            }
            {event.event_details.location === 'Lo Schiavo Getty Study' &&
              <Image src={locationIcons['getty-study']} alt={event.event_details.location} width={30} height={30} />
            }
            {event.event_details.location === 'Escape Game San Francisco' &&
              <Image src={locationIcons['escape-game']} alt={event.event_details.location} width={24} height={24} />
            }
            {event.event_details.location === 'Family Billiards San Francisco' &&
              <Image src={locationIcons.billiards} alt={event.event_details.location} width={24} height={24} />
            }
            {event.event_details.location.includes('Golden Gate Park') &&
              <Image src={locationIcons.ggp} alt={event.event_details.location} width={24} height={24} />
            }
            {event.event_details.location.includes('Undercaf') &&
              <Image src={locationIcons.undercaf} alt={event.event_details.location} width={24} height={24} />
            }
            {event.event_details.location.includes('UC 4th Floor Lounge') &&
              <Image src={locationIcons['uc-4']} alt={event.event_details.location} width={24} height={24} />
            }
            {event.event_details.location.includes('McLaren Conference Center') &&
              <Image src={locationIcons.mclaren} alt={event.event_details.location} width={24} height={24} />
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
                <LinkWrapper link={activity.link}>
                  <span className={styles["activity-title"]}>{activity.title}</span>
                </LinkWrapper>
                <span className={styles["activity-time"]}>{activityTime}</span>
              </li>
            )
          })}
        </ul>
      }
    </>
  )
}
