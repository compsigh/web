'use client'

import styles from './Footer.module.css'

export function Footer() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  })
  return (
    <footer className={styles.footer}>
      <p>compsigh</p>
      <p>SF •• CA</p>
      <p>{currentDate}</p>
    </footer>
  )
}
