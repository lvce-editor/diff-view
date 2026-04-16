import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { Group } from '../Group/Group.ts'
import { getDisplayItemsGroup } from '../GetDisplayItemsGroup/GetDisplayItemsGroup.ts'

export const getDisplayItems = (
  allGroups: readonly Group[],
  expandedGroups: Readonly<Record<string, boolean>>,
  iconDefinitions: readonly string[],
): readonly DisplayItem[] => {
  const displayItems = []
  for (const group of allGroups) {
    const groupDisplayItems = getDisplayItemsGroup(group, expandedGroups, iconDefinitions)
    displayItems.push(...groupDisplayItems)
  }
  return displayItems
}
