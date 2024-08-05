'use client'

import { useEffect, useState } from 'react'

import { IconListener } from './IconListener'
import { Icon, type Icon as IconType } from './Icon'

/**
 * Strategy:
 * ✔︎ Like `Decorations`, render a container div of full width and height
 * ✔︎ Render icons at a specified density, in a grid, but with random offsets
 * ✔︎ Each icon has a fluctuating opacity, as well as a random offset of scale
 * ✔︎ The further down the container, the less baseline opacity icons have
 * ✔︎ When the mouse moves, each icon moves with a subtle, random offset in the direction of the mouse
 *   □ The closer the icon is to the mouse, the more it moves
 * ✔︎ Hide on smaller viewports
 */
export function Twinkle() {
  const [display, setDisplay] = useState(true)
  const [documentHeight, setDocumentHeight] = useState(0)
  const [rows, setRows] = useState(0)
  const [columns, setColumns] = useState(0)

  useEffect(() => {
    function setElementsBasedOnHeight() {
      const { innerWidth } = window
      const documentHeight = document.body.getBoundingClientRect().height
      setDocumentHeight(documentHeight)

      const DENSITY = 50
      setColumns(Math.floor((innerWidth / DENSITY) * 1.2))
      setRows(Math.floor(documentHeight / DENSITY))

      if (innerWidth < 860) {
        setDisplay(false)
        return
      }
      else setDisplay(true)
    }
    setElementsBasedOnHeight()

    function handleResize() { setElementsBasedOnHeight() }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const icons: IconType[] = ['none', 'low', 'medium-low', 'medium-high', 'high']
  function pickIcon() {
    if (icons.length === 0)
      icons.push('none', 'low', 'medium-low', 'medium-high', 'high')
    const randomIndex = Math.floor(Math.random() * icons.length)
    const randomIcon = icons[randomIndex]
    icons.splice(randomIndex, 1)
    return randomIcon
  }

  if (!display) return <></>
  return (
    <>
      <div style={{
        position: 'absolute',
        top: -100,
        left: -100,
        width: '120vw',
        height: documentHeight,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: '24px',
        zIndex: -1,
        userSelect: 'none',
        opacity: 0.7
      }}>
        {Array.from({ length: rows }, (_, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              opacity: 1 - index / rows
            }}
          >
            {Array.from({ length: columns }, (_, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '24px',
                  height: '24px',
                  transform: `scale(${Math.random() * 0.5 + 0.5}) translate(${Math.random() * 24 - 12}px, ${Math.random() * 24 - 12}px)`,
                  pointerEvents: 'none',
                }}
              >
                <IconListener>
                  <Icon icon={pickIcon()} />
                </IconListener>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
