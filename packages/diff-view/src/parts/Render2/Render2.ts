import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as DiffViewStates from '../DiffViewStates/DiffViewStates.ts'

export const render2 = (uid: number, diffResult: readonly number[]): readonly any[] => {
  const { newState, oldState } = DiffViewStates.get(uid)
  DiffViewStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  return commands
}
