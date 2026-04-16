import { InputSource } from '@lvce-editor/constants'
import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'
import { getInputHeight } from '../GetInputHeight/GetInputHeight.ts'

export const handleInput = async (state: DiffViewState, value: string, inputSource = InputSource.User): Promise<DiffViewState> => {
  const { inputFontFamily, inputFontSize, inputFontWeight, inputLetterSpacing, inputLineHeight, inputPadding, width } = state
  const inputBoxHeight = await getInputHeight(value, width, inputFontFamily, inputFontWeight, inputFontSize, inputLetterSpacing, inputLineHeight, inputPadding)
  return {
    ...state,
    inputBoxHeight,
    inputSource,
    inputValue: value,
  }
}
