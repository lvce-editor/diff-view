const lookAheadLimit = 3

export const findLookAheadMatch = (lines: readonly string[], startIndex: number, needle: string): number => {
  const endIndex = Math.min(startIndex + lookAheadLimit, lines.length - 1)
  for (let i = startIndex; i <= endIndex; i++) {
    if (lines[i] === needle) {
      return i
    }
  }
  return -1
}
