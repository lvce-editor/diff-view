import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'

export const getIndex = (state: DiffViewState, eventX: number, eventY: number): number => {
  const { headerHeight, itemHeight, y } = state
  const relativeY = eventY - y - headerHeight
  const index = Math.floor(relativeY / itemHeight)
  return index
}
