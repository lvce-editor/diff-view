import { InputSource } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const isEqual = (oldState: DiffViewState, newState: DiffViewState): boolean => {
  return newState.inputSource === InputSource.User || oldState.inputValue === newState.inputValue
}
