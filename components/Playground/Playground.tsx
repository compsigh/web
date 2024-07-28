export function Playground(
  { editable, children }:
  { editable: boolean, children: React.ReactNode }
) {
  return (
    <>
      <div
        contentEditable={editable}
        suppressContentEditableWarning
        style={{
          maxWidth: '700px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px dashed var(--color-compsigh-60)',
          borderRadius: '6px'
        }}
      >
        {children}
      </div>
    </>
  )
}
