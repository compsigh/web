import styles from './Grid.module.css'

export function Grid(
  {
    children,
    columns,
    columnSizeDistribution,
    gap,
    style
  }:
  {
    children: React.ReactNode,
    columns?: number,
    columnSizeDistribution?: string[],
    gap?: string,
    style?: React.CSSProperties
  }
) {
  const defaultColumnTemplate = `repeat(${columns || 'auto-fit'}, minmax(0, 1fr))`
  const gridTemplateColumns = columnSizeDistribution
    ? columnSizeDistribution.join(' ')
    : defaultColumnTemplate

  return (
    <>
      <div
        className={styles["responsive-grid"]}
        style={{
          display: 'grid',
          gridTemplateColumns,
          gap: gap || '32px',
          ...style
        }}
      >
        {children}
      </div>
    </>
  )
}
