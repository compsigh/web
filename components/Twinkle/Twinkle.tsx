'use client'

import { useEffect, useState } from 'react'

import { IconListener } from './IconListener'
import { Icon, type Icon as IconType } from './Icon'

export function Twinkle({ position }: { position: 'top' | 'left' }) {
  const [display, setDisplay] = useState(true)
  const [rows, setRows] = useState(0)
  const [columns, setColumns] = useState(0)

  useEffect(() => {
    function setElementsBasedOnHeight() {
      const DENSITY = 70
      const { innerWidth, innerHeight } = window
      const columnLogic = position === 'top' ? Math.floor((innerWidth / DENSITY) * 1.2) : Math.floor((innerWidth / 2 / DENSITY) * 1.2)
      const rowLogic = position === 'top' ? Math.floor((innerHeight / 2 / DENSITY) * 1.2) : Math.floor((innerHeight / DENSITY) * 1.2)
      setColumns(columnLogic)
      setRows(rowLogic)

      if (innerWidth < 1160) {
        setDisplay(false)
        return
      }
      else setDisplay(true)
    }
    setElementsBasedOnHeight()

    function handleResize() { setElementsBasedOnHeight() }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [position])

  const icons: IconType[] = ['low', 'medium-low', 'medium-high', 'high']
  function pickIcon() {
    if (icons.length === 0)
      icons.push('low', 'medium-low', 'medium-high', 'high')
    const randomIndex = Math.floor(Math.random() * icons.length)
    const randomIcon = icons[randomIndex]
    icons.splice(randomIndex, 1)
    return randomIcon
  }

  let scale = 1
  function randomScale() {
    scale = Math.random() * 0.5 + 0.5
    return scale
  }

  if (!display) return <></>
  return (
    <>
      <div style={{
        position: 'absolute',
        top: 0,
        left: position === 'top' ? 0 : '-150px',
        width: position === 'top' ? '100vw' : '50vw',
        height: position === 'top' ? '50vh' : '100vh',
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
              justifyContent: 'center'
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
                  transform: `scale(${randomScale()}) translate(${Math.random() * 24 - 12}px, ${Math.random() * 24 - 12}px)`,
                  pointerEvents: 'none',
                }}
              >
                <IconListener scale={randomScale()}>
                  <Icon icon={pickIcon()} />
                </IconListener>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: position === 'top' ? '100vw' : '50vw',
        height: position === 'top' ? '50vh' : '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundImage: position === 'top' ? 'linear-gradient(to bottom, var(--color-invisible), var(--color-dark) 40vh)' : 'linear-gradient(to right, var(--color-invisible), var(--color-dark) 40vw)'
      }} />
    </>
  )
}
