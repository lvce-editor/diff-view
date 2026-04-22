const stackLocationRegex = /((?:[a-zA-Z][a-zA-Z0-9+.-]*:\/\/|\/)[^\s)]+):(\d+):(\d+)\)?$/

export { stackLocationRegex }

export const getStackLineLocation = (stackLine: string): string => {
  const match = stackLine.match(stackLocationRegex)
  if (!match) {
    return ''
  }
  const [, location] = match
  return location
}
