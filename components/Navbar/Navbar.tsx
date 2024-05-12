import Link from 'next/link'

import styles from './Navbar.module.css'

export function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link href={`/events`}>Events</Link>
          </li>
          <li>
            <Link href={`https://instagram.com/compsigh_`}>Instagram</Link>
          </li>
          <li>
            <Link href={`https://discord.compsigh.club`}>Discord</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
