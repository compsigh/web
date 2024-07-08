export function Spacer(
  { size, axis = 'vertical' }:
  { size: number | string, axis?: 'vertical' | 'horizontal' }
) {
  if (axis === 'horizontal') return <div style={{ width: size }} />
  return <div style={{ height: size }} />
}
