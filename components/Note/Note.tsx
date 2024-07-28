export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderTop: '1px solid var(--color-compsigh)',
        borderBottom: '1px solid var(--color-compsigh)',
        padding: '8px',
        margin: '32px 0'
      }}
    >
      {children}
    </div>
  )
}
