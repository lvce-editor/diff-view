import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getDisplayItems } from '../GetDisplayItems/GetDisplayItems.ts'
import { getListHeight } from '../GetListHeight/GetListHeight.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import { getVisibleSourceControlItems } from '../GetVisibleSourceControlItems/GetVisibleSourceControlItems.ts'

export const updateVisibleItems = async (state: Readonly<SourceControlState>, expandedGroups: Readonly<Record<string, boolean>>): Promise<SourceControlState> => {
  const { actionsCache, allGroups, fileIconCache, height, iconDefinitions, itemHeight } = state
  const displayItems = getDisplayItems(allGroups, expandedGroups, iconDefinitions)
  const badgeCount = allGroups.reduce((sum, group) => sum + group.items.length, 0)
  const total = displayItems.length
  const listHeight = getListHeight(total, itemHeight, height)
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const minLineY = 0
  const maxLineY = Math.min(numberOfVisible, total)
  const visibleItems = getVisibleSourceControlItems(displayItems, minLineY, maxLineY, actionsCache, fileIconCache)
  return {
    ...state,
    badgeCount,
    expandedGroups,
    items: displayItems,
    maxLineY,
    minLineY,
    visibleItems,
  }
}
