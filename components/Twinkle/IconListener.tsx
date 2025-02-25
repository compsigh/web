'use client'

import { useEffect, useRef } from 'react'

export function IconListener({
  scale, children
}: {
  scale: number, children: React.ReactNode
}) {
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches

    function handleMouseMove(event: MouseEvent) {
      if (prefersReducedMotion) return
      const icon = iconRef.current
      if (!icon) return

      const { clientX, clientY } = event
      const { innerWidth, innerHeight } = window
      const centerX = innerWidth / 2
      const centerY = innerHeight / 2

      const distanceX = clientX - centerX
      const distanceY = clientY - centerY

      const offsetX = (distanceX / innerWidth) * scale * 500
      const offsetY = (distanceY / innerHeight) * scale * 500

      icon.style.transform = `translate(${offsetX}%, ${offsetY}%)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
}, [scale])

  return (
    <div ref={iconRef}>
      {children}
    </div>
  )
}
