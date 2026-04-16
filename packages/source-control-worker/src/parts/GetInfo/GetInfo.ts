import type { Group } from '../Group/Group.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

export const getInfo = (uid: number): readonly Group[] => {
  const { newState } = SourceControlStates.get(uid)
  return newState.allGroups
}
