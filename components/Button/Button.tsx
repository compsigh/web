import Link from 'next/link'
import type { Route } from 'next'

import styles from './Button.module.css'

export function Button({
  text,
  link
}: {
  text: string,
  link: Route
}) {
  return (
    <>
      <button className={styles.button}>
        <Link href={link}>{text}</Link>
      </button>
    </>
  )
}
