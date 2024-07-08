'use client'

import TypewriterComponent, { type Options } from 'typewriter-effect'

export function TypewriterWrapper(
  { as, options, string, handleDone }:
  {
    as?: React.ElementType,
    options?: Partial<Options>,
    string: string,
    handleDone?: () => void
  }
) {
  return (
    <>
      <TypewriterComponent
        component={as}
        options={options}
        onInit={(typewriter) => {
          typewriter
            .start()
            .typeString(string)
            .callFunction(() => {
              if (handleDone) handleDone()
            })
        }}
      />
    </>
  )
}
