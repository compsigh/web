import Link from 'next/link'

export function NavItems() {
  return (
    <>
      <ul>
        <li>
          <Link href="/docs/about">About</Link>
        </li>
        <li>
          <Link href="/events">Events</Link>
        </li>
        <li>
          <Link href="/community">Community</Link>
        </li>
        <li>
          <Link href="/support">Support</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="https://discord.compsigh.club">Discord</Link>
        </li>
        <li>
          <Link href="https://instagram.com/compsigh.club">Instagram</Link>
        </li>
      </ul>
    </>
  )
}
