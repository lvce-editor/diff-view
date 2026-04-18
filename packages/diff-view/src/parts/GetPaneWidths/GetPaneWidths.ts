const SASH_WIDTH = 4
const DEFAULT_MINIMUM_PANE_WIDTH = 50

const clamp = (value: number, minimum: number, maximum: number): number => {
  return Math.max(minimum, Math.min(value, maximum))
}

const getAvailableSize = (size: number): number => {
  return Math.max(size - SASH_WIDTH, 0)
}

export const getSashWidth = (): number => {
  return SASH_WIDTH
}

export const getMinimumPaneWidth = (width: number): number => {
  return Math.min(DEFAULT_MINIMUM_PANE_WIDTH, Math.floor(getAvailableSize(width) / 2))
}

export const getDefaultPaneWidths = (width: number): { readonly leftWidth: number; readonly rightWidth: number } => {
  const availableWidth = getAvailableSize(width)
  const leftWidth = Math.floor(availableWidth / 2)
  const rightWidth = availableWidth - leftWidth
  return {
    leftWidth,
    rightWidth,
  }
}

export const getClampedLeftWidth = (width: number, leftWidth: number): number => {
  const availableWidth = getAvailableSize(width)
  const minimumPaneWidth = getMinimumPaneWidth(width)
  const maximumLeftWidth = availableWidth - minimumPaneWidth
  return clamp(leftWidth, minimumPaneWidth, maximumLeftWidth)
}

export const getRightWidth = (width: number, leftWidth: number): number => {
  return getAvailableSize(width) - leftWidth
}

export const getPaneSizes = (size: number, ratio = 0.5): { readonly leftWidth: number; readonly rightWidth: number } => {
  const availableSize = getAvailableSize(size)
  const leftWidth = Math.floor(availableSize * ratio)
  const rightWidth = availableSize - leftWidth
  return {
    leftWidth,
    rightWidth,
  }
}

export const getClampedPaneSize = (size: number, leftWidth: number): number => {
  const availableSize = getAvailableSize(size)
  const minimumPaneWidth = Math.min(DEFAULT_MINIMUM_PANE_WIDTH, Math.floor(availableSize / 2))
  const maximumLeftWidth = availableSize - minimumPaneWidth
  return clamp(leftWidth, minimumPaneWidth, maximumLeftWidth)
}

export const getRemainingPaneSize = (size: number, leftWidth: number): number => {
  return getAvailableSize(size) - leftWidth
}
