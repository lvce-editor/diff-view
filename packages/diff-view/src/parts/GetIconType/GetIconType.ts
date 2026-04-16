import { DirentType } from '@lvce-editor/constants'

export const getIconType = (direntType: number): number => {
  switch (direntType) {
    case DirentType.Directory:
    case DirentType.DirectoryExpanded:
      return 2
    default:
      return 1
  }
}
