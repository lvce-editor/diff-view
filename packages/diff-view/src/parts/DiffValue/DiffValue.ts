import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const isEqual = (oldState: SourceControlState, newState: SourceControlState): boolean => {
  return newState.inputSource === InputSource.User || oldState.inputValue === newState.inputValue
}
