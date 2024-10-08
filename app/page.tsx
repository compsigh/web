import { NavItems } from '@/components/NavItems'
import { HiveVideo } from '@/components/HiveVideo'

import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <div id={styles.content}>
        <h1 id={styles.title}>compsigh</h1>
        <p id={styles.description}>
          compsigh is the social computer science club at USFCA for meeting cool people &amp;&amp; building cool things. We host high-quality, low-stakes events, and engage in a vibrant, family-like community.
        </p>
        <nav id={styles.navbar}>
          <NavItems />
        </nav>
      </div>
      <div id={styles.background}>
        <HiveVideo />
      </div>
    </>
  )
}
