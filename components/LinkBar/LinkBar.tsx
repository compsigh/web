import Link, { type LinkProps } from 'next/link'

import styles from './LinkBar.module.css'

interface LinkBarProps extends LinkProps {
  children: React.ReactNode
  type?: 'previous' | 'next'
}

export function LinkBar({ children, type = 'next', ...props }: LinkBarProps) {
  return (
    <div id={styles["link-container"]}>
      <Link {...props}>
        <div
          id={styles.container}
          className={type === 'next' ? styles.next : styles.previous}
        >
          <div id={styles.bar} />
          <div>{children}</div>
          <div id={styles.arrow}>{type === 'next' ? '>' : '<'}</div>
        </div>
      </Link>
    </div>
  )
}
