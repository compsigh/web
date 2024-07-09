import { Avatar } from '@/components/Avatar'

import styles from './Author.module.css'

export function Author({ name, avatar }: { name: string, avatar: string }) {
  return (
    <>
      <span className={styles.wrapper}>
        <span className={styles.container}>
          <Avatar name={name} src={avatar} />
          <span className={styles.name}>{name}</span>
        </span>
      </span>
    </>
  )
}
