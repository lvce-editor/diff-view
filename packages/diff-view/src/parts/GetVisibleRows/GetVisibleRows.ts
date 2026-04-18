export const getVisibleRows = (content: string, totalLineCount: number, minLineY: number, maxLineY: number): readonly string[] => {
  const lines = content ? content.split('\n') : ['']
  const visibleCount = Math.max(maxLineY - minLineY, 0)
  const visibleLines = lines.slice(minLineY, maxLineY)
  if (visibleLines.length === visibleCount) {
    return visibleLines
  }
  const paddedLines = [...visibleLines]
  while (paddedLines.length < visibleCount && paddedLines.length < totalLineCount) {
    paddedLines.push('')
  }
  return paddedLines
}
