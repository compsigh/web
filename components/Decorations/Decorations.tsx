'use client'

import { useEffect, useState } from 'react'

import styles from './Decorations.module.css'

export function Decorations({
  children,
  layout
}: {
  children: React.ReactNode[],
  layout: 'full-width' | 'right'
}) {
  const [display, setDisplay] = useState(true)
  const [positions, setPositions] = useState<{x: number, y: number, childIndex: number}[]>([])

  useEffect(() => {
    function generateRandomPositions() {
      const { innerWidth } = window
      const documentHeight = document.body.getBoundingClientRect().height
      const NUMBER_OF_ELEMENTS = Math.floor(documentHeight / 200)

      if (innerWidth < 1420) {
        setDisplay(false)
        return
      }
      else setDisplay(true)

      const positions = []
      for (let i = 0; i < NUMBER_OF_ELEMENTS; i++) {
        let x, y, childIndex
        do {
          childIndex = Math.floor(Math.random() * children.length)
          x = Math.random() * innerWidth
          y = Math.random() * documentHeight
        }
        while
          (( (layout === 'right' && x < (innerWidth / 2 + 350)))  // Avoid center
          || (layout === 'right' && x + 200 > innerWidth)         // Avoid right overflow
          || (layout === 'right' && y + 100 > documentHeight))    // Avoid bottom overflow
        positions.push({ x, y, childIndex })
      }
      setPositions(positions)
    }
    generateRandomPositions()

    function handleResize() { generateRandomPositions() }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [children, layout])

  if (!display) return <></>
  return (
    <div
      id={styles.container}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: document.body.getBoundingClientRect().height,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {positions.map((pos, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            pointerEvents: 'auto'
          }}
        >
          {children[pos.childIndex]}
        </div>
      ))}
    </div>
  )
}
