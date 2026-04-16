import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'

export const updateIcons = async (state: SourceControlState): Promise<SourceControlState> => {
  const { items, maxLineY, minLineY } = state
  const visible = items.slice(minLineY, maxLineY)
  const newFileIconCache = await GetFileIcons.getFileIcons(visible, Object.create(null))
  // TODO update visible items
  return {
    ...state,
    fileIconCache: newFileIconCache,
  }
}
