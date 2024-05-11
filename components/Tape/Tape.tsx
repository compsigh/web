'use client'

import { useMemo } from 'react'

import styles from './Tape.module.css'

export function Tape() {
  const viewportHeight = window.innerHeight
  const tapeHeight = 37
  const tapeCount = Math.ceil(viewportHeight / tapeHeight)
  const TAPES_PER_ROW = 10

  const texts = useMemo(() => [
    'compsigh',
    'San Francisco',
    '2024'
  ], [])

  const repeatedTexts = useMemo(() => Array.from({ length: TAPES_PER_ROW }, () => texts).flat(), [TAPES_PER_ROW, texts])

  const offsets = useMemo(() => {
    return Array.from({ length: tapeCount }, () => Math.floor(Math.random() * 100))
  }, [tapeCount])

  return (
    <div className={styles.container}>
      {offsets.map((offset, i) => (
        // @ts-ignore
        <div key={i} className={styles.tape} style={{'--start-offset': `${offset}%`}}>
          {repeatedTexts.map((text, j) => (
            <div key={j} className={styles.text}>
              {text}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
