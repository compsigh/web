import Link from 'next/link'
import Image from 'next/image'
import { EventFrontmatter } from './page'
import { locationIcons } from '@/app/[...slug]/page'

import { Media } from '@/components/Media'
import { StatusIndicator } from '@/components/StatusIndicator'

import styles from './Events.module.css'

export function Event({ event }: { event: EventFrontmatter }) {
  const { start, end } = event.event_details
  const startDate = new Date(start * 1000).toLocaleString('en-US', { timeZone: 'America/Los_Angeles', month: 'short', day: '2-digit' })
  const startTime = new Date(start * 1000).toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit' })

  const currentUnixTimestamp = Math.floor(Date.now() / 1000)
  function isEventHappeningNow(start: number, end: number) {
    return start < currentUnixTimestamp && end > currentUnixTimestamp
  }

  return (
    <>
      <p className={styles.date}>{startDate}</p>
      {event.event_details.cover_image && <Media src={event.event_details.cover_image} alt={event.title} priority={isEventHappeningNow(start, end)} />}
      <div className={styles["title-and-time"]}>
        <p className={styles.title}>{event.title}</p>
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
            {((event.event_details.location === 'LS 103') || (event.event_details.location === 'LS 210')) &&
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
            <p>{event.event_details.location}</p>
          </div>
      }
      <p>{event.description}</p>
      {event.event_details.activities &&
        <ul className={styles.activities}>
          {event.event_details.activities.map((activity, index) => {
            const activityTime = new Date((start + activity.time_offset) * 1000).toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit' })
            const LinkWrapper = ({ children }: { children: React.ReactNode }) => activity.link ? <Link href={activity.link}>{children}</Link> : children
            return (
              <li key={index}>
                <LinkWrapper><span className={styles["activity-title"]}>{activity.title}</span></LinkWrapper>
                <span className={styles["activity-time"]}>{activityTime}</span>
              </li>
            )
          })}
        </ul>
      }
    </>
  )
}
