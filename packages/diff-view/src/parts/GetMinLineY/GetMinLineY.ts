export const getMinLineY = (savedState: unknown): number => {
  if (!savedState || typeof savedState !== 'object') {
    return 0
  }
  const { minLineY } = savedState as { readonly minLineY?: unknown }
  if (typeof minLineY === 'number') {
    return minLineY
  }
  return 0
}
