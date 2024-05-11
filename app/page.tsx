import Link from 'next/link'
import Image from 'next/image'

import { Grid } from '@/components/Grid'
import { Spacer } from '@/components/Spacer'

import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <header>
        <h1 className={styles.title}>compsigh</h1>
        <p className={styles.description}>
          compsigh is a social computer science club for meeting cool people and building cool things.
          <br />
          We host high-quality, low-stakes events, and engage in a vibrant, family-like community.
        </p>
      </header>
      <Spacer size={32} />
      <Grid
        columns={3}
        style={{ placeItems: 'center' }}
      >
        <Image
          src="/assets/E3.svg"
          alt=""
          width={20}
          height={20}
        />
        <Image
          src="/assets/E1.svg"
          alt=""
          width={20}
          height={20}
        />
        <Image
          src="/assets/H4.svg"
          alt=""
          width={20}
          height={20}
        />
      </Grid>
      <Spacer size={10} />
      <Grid
        columns={3}
        style={{ placeItems: 'center' }}
      >
        <Image
          src="/assets/B3.svg"
          alt=""
          width={20}
          height={20}
        />
        <Image
          src="/assets/E4.svg"
          alt=""
          width={20}
          height={20}
        />
        <Image
          src="/assets/C4.svg"
          alt=""
          width={20}
          height={20}
        />
      </Grid>
      <Spacer size={10} />
      <Grid
        columns={3}
        style={{ placeItems: 'center' }}
      >
        <Image
          src="/assets/C1.svg"
          alt=""
          width={20}
          height={20}
        />
        <Image
          src="/assets/A2.svg"
          alt=""
          width={20}
          height={20}
        />
        <Image
          src="/assets/F4.svg"
          alt=""
          width={20}
          height={20}
        />
      </Grid>
      <Spacer size={10} />
      <Grid
        columns={3}
        style={{ placeItems: 'center' }}
      >
        <Image
          src="/assets/H1.svg"
          alt=""
          width={20}
          height={20}
        />
        <Image
          src="/assets/D1.svg"
          alt=""
          width={20}
          height={20}
        />
        <Image
          src="/assets/H3.svg"
          alt=""
          width={20}
          height={20}
        />
      </Grid>
      <Spacer size={32} />
      <nav>
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
