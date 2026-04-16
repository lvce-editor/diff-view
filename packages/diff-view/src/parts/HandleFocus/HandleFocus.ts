import { InputSource, WhenExpression } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'

export const handleInputFocus = async (state: SourceControlState): Promise<SourceControlState> => {
  return {
    ...state,
    focus: WhenExpression.FocusSourceControlInput,
    inputSource: InputSource.Script,
  }
}
