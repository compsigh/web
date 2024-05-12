import { fetchEvents } from '@/functions/notion'

export default async function Events() {
  const events = await fetchEvents()
  return (
    <>
      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <p>{event.title} — {event.date}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
