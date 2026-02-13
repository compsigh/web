"use client"

import { useSyncExternalStore } from "react"
import { RandomReveal } from "react-random-reveal"

const emptySubscribe = () => () => {}

export function TextStream({
  text,
  duration = 2
}: {
  text: string
  duration?: number
}) {
  const isLoaded = useSyncExternalStore(
    emptySubscribe,
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  )
  const CHARACTERS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?".split(
      ""
    )

  return isLoaded ? (
    <span>
      <RandomReveal
        isPlaying
        characters={text}
        duration={duration}
        characterSet={CHARACTERS}
        ignoreCharacterSet={[" "]}
      />
    </span>
  ) : (
    <span>{text}</span>
  )
}
