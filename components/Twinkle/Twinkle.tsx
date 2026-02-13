"use client"

import { useEffect, useState } from "react"

import { IconListener } from "./IconListener"
import { Icon, type Icon as IconType } from "./Icon"

export function Twinkle({
  position,
  color = "var(--color-compsigh)",
  density = 70,
  coverage = 50
}: {
  position: "top" | "left"
  color?: "var(--color-compsigh)" | "var(--color-light)"
  density?: number
  coverage?: number
}) {
  if (coverage < 0 || coverage > 100)
    throw new Error("Coverage must be between 0 and 100")

  const [display, setDisplay] = useState(true)
  const [cellData, setCellData] = useState<
    {
      transformScale: number
      translateX: number
      translateY: number
      listenerScale: number
      icon: IconType
    }[][]
  >([])

  useEffect(() => {
    function update() {
      const DENSITY = density
      const { innerWidth, innerHeight } = window

      if (innerWidth < 1160) {
        setDisplay(false)
        return
      }
      setDisplay(true)

      const columns =
        position === "top"
          ? Math.floor((innerWidth / DENSITY) * 1.2)
          : Math.floor((innerWidth / 2 / DENSITY) * 1.2)
      const rows =
        position === "top"
          ? Math.floor((innerHeight / 2 / DENSITY) * 1.2)
          : Math.floor((innerHeight / DENSITY) * 1.2)

      const icons: IconType[] = ["low", "medium-low", "medium-high", "high"]
      const data: {
        transformScale: number
        translateX: number
        translateY: number
        listenerScale: number
        icon: IconType
      }[][] = []
      for (let r = 0; r < rows; r++) {
        const row: (typeof data)[number] = []
        for (let c = 0; c < columns; c++) {
          if (icons.length === 0)
            icons.push("low", "medium-low", "medium-high", "high")
          const randomIndex = Math.floor(Math.random() * icons.length)
          const icon = icons[randomIndex]
          icons.splice(randomIndex, 1)

          row.push({
            transformScale: Math.random() * 0.5 + 0.5,
            translateX: Math.random() * 24 - 12,
            translateY: Math.random() * 24 - 12,
            listenerScale: Math.random() * 0.5 + 0.5,
            icon
          })
        }
        data.push(row)
      }
      setCellData(data)
    }
    update()

    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [density, position])

  if (!display) return <></>
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: position === "top" ? 0 : "-150px",
          width: position === "top" ? "100vw" : `${coverage}vw`,
          height: position === "top" ? `${coverage}vh` : "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: "24px",
          zIndex: -1,
          userSelect: "none",
          opacity: color === "var(--color-light)" ? 1 : 0.7
        }}
      >
        {cellData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              gap: "24px",
              justifyContent: "center"
            }}
          >
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "24px",
                  height: "24px",
                  transform: `scale(${cell.transformScale}) translate(${cell.translateX}px, ${cell.translateY}px)`,
                  pointerEvents: "none"
                }}
              >
                <IconListener scale={cell.listenerScale}>
                  {color === "var(--color-light)" ? (
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        background: "#FFECCC"
                      }}
                    />
                  ) : (
                    <Icon icon={cell.icon} />
                  )}
                </IconListener>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: position === "top" ? "100vw" : `${coverage}vw`,
          height: position === "top" ? `${coverage}vh` : "100vh",
          overflow: "hidden",
          pointerEvents: "none",
          backgroundImage:
            position === "top"
              ? `linear-gradient(to bottom, var(--color-invisible), var(--color-dark) ${coverage - 10}vh)`
              : `linear-gradient(to right, var(--color-invisible), var(--color-dark) ${coverage - 10}vw)`
        }}
      />
    </>
  )
}
