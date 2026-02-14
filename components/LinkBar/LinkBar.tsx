import Link, { type LinkProps } from "next/link"

import styles from "./LinkBar.module.css"

interface LinkBarProps extends LinkProps {
  children: React.ReactNode
  arrowDirection?: "back" | "forward"
  alignment?: "start" | "end"
  order?: "text-first" | "arrow-first"
}

export function LinkBar({
  children,
  arrowDirection = "forward",
  alignment = "end",
  order = "text-first",
  ...props
}: LinkBarProps) {
  return (
    <div id={styles["link-container"]}>
      <Link {...props}>
        <div
          id={styles.container}
          className={`
            ${order === "text-first" ? styles["text-first"] : styles["arrow-first"]}
            ${alignment === "start" ? styles["alignment-start"] : styles["alignment-end"]}
          `}
        >
          <div id={styles.bar} />
          <div>{children}</div>
          <div id={styles.arrow}>
            {arrowDirection === "forward" ? ">" : "<"}
          </div>
        </div>
      </Link>
    </div>
  )
}
