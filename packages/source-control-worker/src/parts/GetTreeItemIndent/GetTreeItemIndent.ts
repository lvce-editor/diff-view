import { DirentType } from '@lvce-editor/constants'

const defaultIndent = 16 // 1rem = 16px

export const getTreeItemIndent = (type: number): number => {
  if (type === DirentType.Directory || type === DirentType.DirectoryExpanded) {
    return 0
  }
  return defaultIndent
}
