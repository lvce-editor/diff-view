import * as Diff from '../Diff/Diff.ts'
import * as DiffViewStates from '../DiffViewStates/DiffViewStates.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { newState, oldState } = DiffViewStates.get(uid)
  const result = Diff.diff(oldState, newState)
  return result
}
