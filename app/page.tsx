import Link from 'next/link'

export default function Home() {
  return (
    <>
      <header>
        <h1>compsigh</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
        </ul>
      </nav>
      <p>compsigh is a social computer science club for meeting cool people and building cool things. We host high-quality, low-stakes events, and engage in a vibrant, family-like community.</p>
    </>
  )
}
