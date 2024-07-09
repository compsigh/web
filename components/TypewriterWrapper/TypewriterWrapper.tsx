'use client'

import TypewriterComponent, { type Options } from 'typewriter-effect'

export function TypewriterWrapper(
  { as, options, strings, maxLength, handleDone }:
  {
    as?: React.ElementType,
    options?: Partial<Options>,
    strings: string[],
    maxLength: number,
    handleDone?: () => void
  }
) {
  return (
    <>
      <TypewriterComponent
        component={as}
        options={options}
        onInit={(typewriter) => {
          let processedStrings: string[] = []
          let currentLength = 0
          strings.forEach((string, index) => {
            if (currentLength + string.length > maxLength && index !== 0) {
              processedStrings.push('<br>')
              currentLength = 0
            }
            processedStrings.push(string)
            currentLength += string.length + 1
          })
          typewriter.start()
          processedStrings.forEach((string, index) => {
            typewriter.typeString((index !== processedStrings.length - 1) ? `${string} ` : string)
          })
          typewriter.callFunction(() => {
            if (handleDone) handleDone()
          })
        }}
      />
    </>
  )
}
