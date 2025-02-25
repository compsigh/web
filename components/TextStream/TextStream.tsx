'use client'

import { useEffect, useState } from 'react'
import { RandomReveal } from 'react-random-reveal'

export function TextStream(
  { text, duration = 2 }:
  { text: string, duration?: number }
) {
  const [isLoaded, setIsLoaded] = useState(false)
  const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'.split('')

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches
    if (prefersReducedMotion) return
    setIsLoaded(true)
  }, [])

  return isLoaded
    ?
      <span>
        <RandomReveal
          isPlaying
          characters={text}
          duration={duration}
          characterSet={CHARACTERS}
          ignoreCharacterSet={[' ']}
        />
      </span>
    :
      <span>{text}</span>
}
