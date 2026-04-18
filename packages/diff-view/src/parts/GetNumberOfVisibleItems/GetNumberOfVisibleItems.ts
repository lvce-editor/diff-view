export const getNumberOfVisibleItems = (height: number, itemHeight: number): number => {
  if (itemHeight <= 0) {
    return 0
  }
  return Math.max(Math.ceil(height / itemHeight), 1)
}
