export const getWheelDeltaY = (deltaMode: number, deltaY: number, itemHeight: number, height: number): number => {
  switch (deltaMode) {
    case 1:
      return deltaY * itemHeight
    case 2:
      return deltaY * height
    default:
      return deltaY
  }
}
