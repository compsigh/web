import { Spacer } from '@/components/Spacer'
import { HiveVideo } from '@/components/HiveVideo'

import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <HiveVideo />
      <p className={styles.description}>
        compsigh is a social computer science club for meeting cool people and building cool things. We host high-quality, low-stakes events, and engage in a vibrant, family-like community.
      </p>
      <Spacer size={32} />
      <Spacer size={`20vh`} />
    </>
  )
}
