export function CasePreserver({ children }: { children: React.ReactNode }) {
  return <span style={{ textTransform: 'none' }}>{children}</span>
}
