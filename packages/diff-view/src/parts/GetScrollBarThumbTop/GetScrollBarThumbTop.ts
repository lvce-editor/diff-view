export const getScrollBarThumbTop = (height: number, scrollBarHeight: number, deltaY: number, finalDeltaY: number): number => {
  const scrollRange = Math.max(height - scrollBarHeight, 0)
  if (scrollRange === 0 || finalDeltaY <= 0) {
    return 0
  }
  return (deltaY / finalDeltaY) * scrollRange
}
