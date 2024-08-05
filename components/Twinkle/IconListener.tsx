'use client'

import { useEffect, useRef } from 'react'

export function IconListener({ children }: { children: React.ReactNode }) {
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const icon = iconRef.current
      if (!icon) return

      const { clientX, clientY } = event
      const { innerWidth, innerHeight } = window
      const centerX = innerWidth / 2
      const centerY = innerHeight / 2

      const distanceX = clientX - centerX
      const distanceY = clientY - centerY

      const randomFactorX = Math.random() * 0.2 + 0.9
      const randomFactorY = Math.random() * 0.2 + 0.9

      const offsetX = (distanceX / innerWidth) * 100 + randomFactorX
      const offsetY = (distanceY / innerHeight) * 100 + randomFactorY

      icon.style.transform = `translate(${offsetX}%, ${offsetY}%)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
}, [])

  return (
    <div ref={iconRef}>
      {children}
    </div>
  )
}
