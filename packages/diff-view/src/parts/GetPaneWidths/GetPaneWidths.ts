const SASH_WIDTH = 4
const DEFAULT_MINIMUM_PANE_WIDTH = 50

const clamp = (value: number, minimum: number, maximum: number): number => {
  return Math.max(minimum, Math.min(value, maximum))
}

const getAvailableWidth = (width: number): number => {
  return Math.max(width - SASH_WIDTH, 0)
}

export const getSashWidth = (): number => {
  return SASH_WIDTH
}

export const getMinimumPaneWidth = (width: number): number => {
  return Math.min(DEFAULT_MINIMUM_PANE_WIDTH, Math.floor(getAvailableWidth(width) / 2))
}

export const getDefaultPaneWidths = (width: number): { readonly leftWidth: number; readonly rightWidth: number } => {
  const availableWidth = getAvailableWidth(width)
  const leftWidth = Math.floor(availableWidth / 2)
  const rightWidth = availableWidth - leftWidth
  return {
    leftWidth,
    rightWidth,
  }
}

export const getClampedLeftWidth = (width: number, leftWidth: number): number => {
  const availableWidth = getAvailableWidth(width)
  const minimumPaneWidth = getMinimumPaneWidth(width)
  const maximumLeftWidth = availableWidth - minimumPaneWidth
  return clamp(leftWidth, minimumPaneWidth, maximumLeftWidth)
}

export const getRightWidth = (width: number, leftWidth: number): number => {
  return getAvailableWidth(width) - leftWidth
}