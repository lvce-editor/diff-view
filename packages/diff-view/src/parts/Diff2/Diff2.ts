import * as Diff from '../Diff/Diff.ts'
import * as SourceControlStates from '../SourceControlStates/SourceControlStates.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { newState, oldState } = SourceControlStates.get(uid)
  const result = Diff.diff(oldState, newState)
  return result
}
