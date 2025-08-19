import Link from 'next/link'

export function NavItems() {
  return (
    <>
      <ul>
        <li>
          <Link href="/docs/code-of-conduct">Code of Conduct</Link>
        </li>
        <li>
          <Link href="/docs/about">About</Link>
        </li>
        <li>
          <Link href="/events">Events</Link>
        </li>
        <li>
          <Link href="/community">Community</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/discord">Discord</Link>
        </li>
        <li>
          <Link href="/instagram">Instagram</Link>
        </li>
      </ul>
    </>
  )
}
