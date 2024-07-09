import { Avatar } from '@/components/Avatar'

import styles from './Mic.module.css'

export function Mic({ name, avatar }: { name: string, avatar: string }) {
  return (
    <>
      <span className={styles.container}>
        <Avatar name={name} src={avatar} />
      </span>
    </>
  )
}
