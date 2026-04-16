import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'
import { getNumberOfVisibleItems } from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'

export const setDeltaY = async (state: DiffViewState, newDeltaY: number): Promise<DiffViewState> => {
  const { actionsCache, fileIconCache, headerHeight, height, itemHeight, items } = state
  const normalizedDeltaY = Math.max(newDeltaY, 0)
  const newMinLineY = Math.floor(normalizedDeltaY / itemHeight)
  const total = items.length
  const listHeight = height - headerHeight
  const visibleCount = getNumberOfVisibleItems(listHeight, itemHeight)
  const maxLineY = Math.min(newMinLineY + visibleCount, total)
  const visible = getVisibleSourceControlItems(items, newMinLineY, maxLineY, actionsCache, fileIconCache)
  return {
    ...state,
    deltaY: newDeltaY,
    maxLineY,
    minLineY: newMinLineY,
    visibleItems: visible,
  }
}
