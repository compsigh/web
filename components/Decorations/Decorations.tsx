"use client"

import { useEffect, useState } from "react"

import styles from "./Decorations.module.css"

export function Decorations({
  children,
  layout
}: {
  children: React.ReactNode[]
  layout: { left: boolean; right: boolean }
}) {
  const [display, setDisplay] = useState(true)
  const [height, setHeight] = useState(0)
  const [items, setItems] = useState<
    { childIndex: number; marginRight: string; marginLeft: string }[]
  >([])

  useEffect(() => {
    function update() {
      const { innerWidth, innerHeight } = window
      const documentHeight = document.body.getBoundingClientRect().height
      const largestHeight = Math.max(documentHeight, innerHeight)
      setHeight(largestHeight)
      const DENSITY = 100
      const numberOfElements = Math.floor(largestHeight / DENSITY)

      if (innerWidth < 1420) {
        setDisplay(false)
        return
      }
      setDisplay(true)

      const childCount = Array.from(children).length
      const available = [...Array(childCount).keys()]
      const data: {
        childIndex: number
        marginRight: string
        marginLeft: string
      }[] = []
      for (let i = 0; i < numberOfElements; i++) {
        let childIndex = -1
        if (available.length > 0) {
          const randomIndex = Math.floor(Math.random() * available.length)
          childIndex = available[randomIndex]
          available.splice(randomIndex, 1)
        }
        data.push({
          childIndex,
          marginRight: `${Math.random() * 70 - 10}px`,
          marginLeft: `${Math.random() * 70 - 10}px`
        })
      }
      setItems(data)
    }
    update()

    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [children, layout])

  if (!display) return <></>
  return (
    <div
      id={styles.container}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        width: "100vw",
        height: height,
        pointerEvents: "none",
        overflow: "hidden"
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            alignSelf: `${
              layout.left && layout.right
                ? index % 2 === 0
                  ? "flex-start"
                  : "flex-end"
                : layout.left
                  ? "flex-start"
                  : "flex-end"
            }`,
            margin: "0 60px"
          }}
        >
          <div
            style={{
              marginRight: `${
                layout.left && layout.right
                  ? index % 2 === 0
                    ? "0"
                    : item.marginRight
                  : layout.left
                    ? "0"
                    : item.marginRight
              }`,
              marginLeft: `${
                layout.left && layout.right
                  ? index % 2 === 0
                    ? item.marginLeft
                    : "0"
                  : layout.left
                    ? item.marginLeft
                    : "0"
              }`,
              pointerEvents: "auto"
            }}
          >
            {item.childIndex >= 0 ? children[item.childIndex] : null}
          </div>
        </div>
      ))}
    </div>
  )
}
