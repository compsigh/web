import styles from './StatusIndicator.module.css'

export function StatusIndicator() {
  return (
    <>
      <div id={styles.wrapper}>
        <div id={styles["status-indicator-ping"]} />
        <div id={styles["status-indicator"]} />
      </div>
    </>
  )
}
