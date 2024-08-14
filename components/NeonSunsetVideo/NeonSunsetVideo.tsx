'use client'

import { useRef, useEffect } from 'react'
import styles from './NeonSunsetVideo.module.css'

export function NeonSunsetVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const { clientX } = event
      const { innerWidth } = window
      const offsetX = ((clientX / innerWidth) - 0.5) * -2
      const offsetY = 0

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
          src="/assets/neon-sunset.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '56%',
          overflow: 'hidden',
          pointerEvents: 'none',
          backgroundImage: 'linear-gradient(to top, var(--color-invisible), var(--color-dark) 10%)'
        }} />
      </div>
    </>
  )
}
