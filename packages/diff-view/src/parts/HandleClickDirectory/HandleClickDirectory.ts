import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { updateVisibleItems } from '../UpdateVisibleItems/UpdateVisibleItem.ts'

export const handleClickDirectory = async (state: SourceControlState, item: any): Promise<SourceControlState> => {
  const { expandedGroups } = state
  const newExpandedGroups = {
    ...expandedGroups,
    [item.groupId]: true,
  }
  return updateVisibleItems(state, newExpandedGroups)
}
