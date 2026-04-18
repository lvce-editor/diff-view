import type { SavedState } from '../SavedState/SavedState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as DiffViewStates from '../DiffViewStates/DiffViewStates.ts'

export const saveState = (uid: number): SavedState => {
  Assert.number(uid)
  const value = DiffViewStates.get(uid)
  const { newState } = value
  const { deltaY, inputValue, maxLineY, minLineY, root } = newState
  return {
    deltaY,
    inputValue,
    maxLineY,
    minLineY,
    root,
  }
}
