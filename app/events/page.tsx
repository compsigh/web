import { Twinkle } from '@/components/Twinkle'
import { Breadcrumbs } from '@/components/Breadcrumbs'

import styles from './Events.module.css'

export default function Events() {
  return (
    <>
      <div id={styles.page}>
        <div id={styles["twinkle-wrapper"]}>
          <Twinkle />
        </div>
        <div id={styles.content}>
          <div id={styles["breadcrumbs-wrapper"]}>
            <Breadcrumbs />
          </div>
          <h1 id={styles.title}>Events</h1>
        </div>
      </div>
    </>
  )
}
