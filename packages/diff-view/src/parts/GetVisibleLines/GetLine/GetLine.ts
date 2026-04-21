export const getLine = (lines: readonly string[], index: number): string => {
  if (index < 0 || index >= lines.length) {
    return ''
  }
  return lines[index]
}
