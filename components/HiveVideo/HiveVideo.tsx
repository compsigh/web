'use client'

import { useEffect, useRef } from 'react'

import styles from './HiveVideo.module.css'

export function HiveVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const { clientX, clientY } = event
      const { innerWidth, innerHeight } = window
      const offsetX = ((clientX / innerWidth) - 0.5) * -2
      const offsetY = ((clientY / innerHeight) - 0.5) * -2

      if (videoRef.current)
        videoRef.current.style.transform = `translate(${-50 + offsetX * 5}%, ${-50 + offsetY * 5}%)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <div className={styles.container}>
        <video
          ref={videoRef}
          className={styles.video}
          src="/assets/hive-loop-compressed.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </>
  )
}
