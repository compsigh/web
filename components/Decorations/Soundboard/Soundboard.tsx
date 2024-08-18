'use client'

import useSound from 'use-sound'

import styles from './Soundboard.module.css'

export type Sound
  = 'brainrot-1'
  | 'brainrot-2'
  | 'dude'
  | 'have-you-tried-gdb'
  | 'noti'
  | 'petemob'
  | 'skill-issue'

export function Sound({ sound }: { sound: Sound }) {
  const [play] = useSound(`/sounds/${sound}.mp3`, { interrupt: true })

  function handlePlay() {
    play()
  }

  return (
    <>
      <button
        className={styles.sound}
        onClick={handlePlay}
        style={{
          // Random rotation between -10 and 10 degrees
          transform: `rotate(${Math.random() * 20 - 10}deg)`
        }}
      >
        <PlayIcon
          style={{
            verticalAlign: 'middle'
          }}
        />
        {sound}
      </button>
    </>
  )
}

export function PlayIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.8891 8.11132C16.8844 9.10662 17.5 10.4816 17.5 12.0004C17.5 13.5192 16.8844 14.8942 15.8891 15.8895M4 7.99999H5.2759C5.74377 7.99999 6.19684 7.83596 6.55627 7.53643L10.3598 4.36681C11.0111 3.82403 12 4.28719 12 5.13503V18.8649C12 19.7128 11.0111 20.1759 10.3598 19.6332L6.55627 16.4635C6.19684 16.164 5.74377 16 5.2759 16H4C2.89543 16 2 15.1046 2 14V9.99999C2 8.89542 2.89543 7.99999 4 7.99999Z"
      />
    </svg>
  )
}
