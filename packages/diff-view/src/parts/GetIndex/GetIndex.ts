import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const getIndex = (state: SourceControlState, eventX: number, eventY: number): number => {
  const { headerHeight, itemHeight, y } = state
  const relativeY = eventY - y - headerHeight
  const index = Math.floor(relativeY / itemHeight)
  return index
}
