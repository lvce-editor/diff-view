import { InputSource } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import { getInputHeight } from '../GetInputHeight/GetInputHeight.ts'

export const handleInput = async (state: SourceControlState, value: string, inputSource = InputSource.User): Promise<SourceControlState> => {
  const { inputFontFamily, inputFontSize, inputFontWeight, inputLetterSpacing, inputLineHeight, inputPadding, width } = state
  const inputBoxHeight = await getInputHeight(value, width, inputFontFamily, inputFontWeight, inputFontSize, inputLetterSpacing, inputLineHeight, inputPadding)
  return {
    ...state,
    inputBoxHeight,
    inputSource,
    inputValue: value,
  }
}
