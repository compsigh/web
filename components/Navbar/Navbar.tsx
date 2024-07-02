import { NavItems } from '@/components/NavItems'

import styles from './Navbar.module.css'

export function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <NavItems />
      </nav>
    </>
  )
}
