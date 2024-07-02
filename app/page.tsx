import Link from 'next/link'

import { NavItems } from '@/components/NavItems'
import { HiveVideo } from '@/components/HiveVideo'

import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <Link href={`/`}>
          <h1 className={styles.title}>compsigh</h1>
        </Link>
        <p className={styles.description}>
          compsigh is a social computer science club for meeting cool people and building cool things. We host high-quality, low-stakes events, and engage in a vibrant, family-like community.
        </p>
        <nav className={styles.navbar}>
          <NavItems />
        </nav>
      </header>
      <HiveVideo />
    </>
  )
}
