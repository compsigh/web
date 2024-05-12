import Image from 'next/image'

import { Grid } from '@/components/Grid'
import { Spacer } from '@/components/Spacer'

import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <header>
        <Spacer size={32} />
        <Grid
          columns={2}
          columnSizeDistribution={['0fr', '0fr']}
          gap='32px'
        >
          <Image
            unoptimized
            src="/assets/compsigh-logo.svg"
            alt="compsigh logo"
            width={40}
            height={40}
            className={styles.logo}
          />
          <h1 className={styles.title}>compsigh</h1>
          </Grid>
        <p className={styles.description}>
          compsigh is a social computer science club for meeting cool people and building cool things. We host high-quality, low-stakes events, and engage in a vibrant, family-like community.
        </p>
      </header>
      <Spacer size={32} />
      <section className={styles.vectors}>
        <Grid
          columns={3}
          style={{ placeItems: 'center' }}
        >
          <Image
            src="/assets/vectors/E3.svg"
            alt=""
            width={20}
            height={20}
            className={styles.start}
          />
          <Image
            src="/assets/vectors/E1.svg"
            alt=""
            width={20}
            height={20}
          />
          <Image
            src="/assets/vectors/H4.svg"
            alt=""
            width={20}
            height={20}
            className={styles.end}
          />
        </Grid>
        <Spacer size={10} />
        <Grid
          columns={3}
          style={{ placeItems: 'center' }}
        >
          <Image
            src="/assets/vectors/B3.svg"
            alt=""
            width={20}
            height={20}
            className={styles.start}
          />
          <Image
            src="/assets/vectors/E4.svg"
            alt=""
            width={20}
            height={20}
          />
          <Image
            src="/assets/vectors/C4.svg"
            alt=""
            width={20}
            height={20}
            className={styles.end}
          />
        </Grid>
        <Spacer size={10} />
        <Grid
          columns={3}
          style={{ placeItems: 'center' }}
        >
          <Image
            src="/assets/vectors/C1.svg"
            alt=""
            width={20}
            height={20}
            className={styles.start}
          />
          <Image
            src="/assets/vectors/A2.svg"
            alt=""
            width={20}
            height={20}
          />
          <Image
            src="/assets/vectors/F4.svg"
            alt=""
            width={20}
            height={20}
            className={styles.end}
          />
        </Grid>
        <Spacer size={10} />
        <Grid
          columns={3}
          style={{ placeItems: 'center' }}
        >
          <Image
            src="/assets/vectors/H1.svg"
            alt=""
            width={20}
            height={20}
            className={styles.start}
          />
          <Image
            src="/assets/vectors/D1.svg"
            alt=""
            width={20}
            height={20}
          />
          <Image
            src="/assets/vectors/H3.svg"
            alt=""
            width={20}
            height={20}
            className={styles.end}
          />
        </Grid>
      </section>
      <Spacer size={32} />
    </>
  )
}
