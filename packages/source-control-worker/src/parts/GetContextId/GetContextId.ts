import { DirentType } from '@lvce-editor/constants'

export const getContextId = (groupId: string, type: number): string => {
  if (type === DirentType.File) {
    return `${groupId}-item`
  }
  return groupId
}
