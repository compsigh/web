'use client'

import { useRef, useEffect } from 'react'

import { Moon } from '@/components/Moon'

import styles from './NeonSunsetVideo.module.css'

export function NeonSunsetVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const moonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
    
    function handleMouseMove(event: MouseEvent) {
      if (!prefersReducedMotion) {
        const { clientX } = event
        const { innerWidth } = window
        const offsetX = ((clientX / innerWidth) - 0.5) * -2
        const offsetY = 0
  
        if (videoRef.current)
          videoRef.current.style.transform = `translate(${-50 + offsetX * 5}%, ${-50 + offsetY * 5}%)`
        if (moonRef.current)
          moonRef.current.style.transform = `translate(${offsetX * 10}vw, ${offsetY * 50}px)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <div id={styles.container}>
        <div id={styles.layer}>
          <video
            ref={videoRef}
            id={styles.video}
            src="/assets/neon-sunset.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div id={styles["video-mask"]} />
          <div
            ref={moonRef}
            id={styles["moon-wrapper"]}
          >
            <Moon />
          </div>
        </div>
      </div>
    </>
  )
}
