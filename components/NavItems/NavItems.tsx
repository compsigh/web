import Link from 'next/link'
import { FaDiscord, FaInstagram } from 'react-icons/fa'
import styles from './NavItems.module.css'

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
          <Link href="/discord">
            <span className={styles.icon}>
              <FaDiscord size={16} />
            </span>
            Discord
          </Link>
        </li>
        <li>
          <Link href="/instagram">
            <span className={styles.icon}>
              <FaInstagram size={16} />
            </span>
            Instagram
          </Link>
        </li>
      </ul>
    </>
  )
}
