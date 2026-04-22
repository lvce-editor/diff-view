const lineNumberCharWidth = 9

export const getGutterWidthVariable = (maxLineNumber: number): number => {
  const maxLineNumberCharCount = String(Math.max(maxLineNumber, 1)).length
  return maxLineNumberCharCount * lineNumberCharWidth
}
