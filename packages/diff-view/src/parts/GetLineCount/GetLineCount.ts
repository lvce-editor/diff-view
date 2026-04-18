export const getLineCount = (content: string): number => {
  if (!content) {
    return 1
  }
  return content.split('\n').length
}