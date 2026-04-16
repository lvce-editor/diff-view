import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'
import { updateVisibleItems } from '../UpdateVisibleItems/UpdateVisibleItem.ts'

export const handleClickDirectoryExpanded = async (state: DiffViewState, item: any): Promise<DiffViewState> => {
  const { expandedGroups } = state
  const newExpandedGroups = {
    ...expandedGroups,
    [item.groupId]: false,
  }
  return updateVisibleItems(state, newExpandedGroups)
}
