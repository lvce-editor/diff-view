export const getScrollBarHeight = (height: number, contentHeight: number, minimumSliderSize: number): number => {
  if (contentHeight <= 0) {
    return height
  }
  if (contentHeight <= height) {
    return height
  }
  return Math.max((height / contentHeight) * height, minimumSliderSize)
}