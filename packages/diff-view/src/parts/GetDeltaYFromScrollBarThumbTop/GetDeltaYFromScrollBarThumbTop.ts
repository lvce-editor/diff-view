export const getDeltaYFromScrollBarThumbTop = (height: number, scrollBarHeight: number, thumbTop: number, finalDeltaY: number): number => {
  const scrollRange = Math.max(height - scrollBarHeight, 0)
  if (scrollRange === 0 || finalDeltaY <= 0) {
    return 0
  }
  const clampedThumbTop = Math.min(Math.max(thumbTop, 0), scrollRange)
  return (clampedThumbTop / scrollRange) * finalDeltaY
}
