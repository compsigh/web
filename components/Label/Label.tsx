import styles from './Label.module.css'

export function Label({ text }: { text: string }) {
  return (
    <>
      <div className={styles.label}>
        {text}
      </div>
    </>
  )
}
