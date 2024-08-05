'use client'

import { useEffect, useState } from 'react'

import styles from './Decorations.module.css'

export function Decorations({
  children,
  layout
}: {
  children: React.ReactNode[],
  layout: { left: boolean, right: boolean }
}) {
  const [display, setDisplay] = useState(true)
  const [numberOfElements, setNumberOfElements] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    function setElementsBasedOnHeight() {
      const { innerWidth, innerHeight } = window
      const documentHeight = document.body.getBoundingClientRect().height
      const largestHeight = Math.max(documentHeight, innerHeight)
      setHeight(largestHeight)
      const DENSITY = 100 // For every x pixels on the y-axis, add a Decoration
      setNumberOfElements(Math.floor(largestHeight / DENSITY))

      if (innerWidth < 1420) {
        setDisplay(false)
        return
      }
      else setDisplay(true)
    }
    setElementsBasedOnHeight()

    function handleResize() { setElementsBasedOnHeight() }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [children, layout])

  const decorations = Array.from(children)
  function pickDecoration() {
    const randomIndex = Math.floor(Math.random() * decorations.length)
    const randomChild = decorations[randomIndex]
    decorations.splice(randomIndex, 1)
    return randomChild
  }

  if (!display) return <></>
  return (
    <div
      id={styles.container}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '100vw',
        height: height,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {Array.from({ length: numberOfElements }, (_, index) => (
        <div
          key={index}
          style={{
            alignSelf: `${
              layout.left && layout.right
                ? index % 2 === 0
                  ? 'flex-start'
                  : 'flex-end'
                : layout.left
                  ? 'flex-start'
                  : 'flex-end'
            }`,
            margin: '0 60px'
          }}
        >
          <div
            style={{
              marginRight: `${
                layout.left && layout.right
                  ? index % 2 === 0
                    ? '0'
                    : `${Math.random() * 70 - 10}px`
                  : layout.left
                    ? '0'
                    : `${Math.random() * 70 - 10}px`
              }`,
              marginLeft: `${
                layout.left && layout.right
                  ? index % 2 === 0
                    ? `${Math.random() * 70 - 10}px`
                    : '0'
                  : layout.left
                    ? `${Math.random() * 70 - 10}px`
                    :'0'
              }`,
              pointerEvents: 'auto'
            }}
          >
            {pickDecoration()}
          </div>
        </div>
      ))}
    </div>
  )
}
