import Link from 'next/link'
import Image from 'next/image'

import { Grid } from '@/components/Grid'
import { Spacer } from '@/components/Spacer'
import { Navbar } from '@/components/Navbar'

import styles from './Header.module.css'

export function Header() {
  return (
    <>
      <header className={styles.header}>
        <Spacer size={32} />
        <Grid columns={2}>
          <Link href={`/`}>
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
          </Link>
          <Navbar />
        </Grid>
      </header>
    </>
  )
}
