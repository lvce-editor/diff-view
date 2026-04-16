import { DirentType } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { handleClickDirectory } from '../HandleClickDirectory/HandleClickDirectory.ts'
import { handleClickDirectoryExpanded } from '../HandleClickDirectoryExpanded/HandleClickDirectoryExpanded.ts'
import { handleClickFile } from '../HandleClickFile/HandleClickFile.ts'
import * as Logger from '../Logger/Logger.ts'

export const selectIndex = async (state: SourceControlState, index: number): Promise<SourceControlState> => {
  const { items } = state
  if (index < 0 || index >= items.length) {
    return state
  }
  const item = items[index]
  switch (item.type) {
    case DirentType.Directory:
      return handleClickDirectory(state, item)
    case DirentType.DirectoryExpanded:
      return handleClickDirectoryExpanded(state, item)
    case DirentType.File:
      return handleClickFile(state, item)
    default:
      Logger.warn(`unknown item type: ${item.type}`)
      return state
  }
}
