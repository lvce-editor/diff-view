import { InputSource, WhenExpression } from '@lvce-editor/constants'
import type { DiffViewState } from '../SourceControlState/SourceControlState.ts'

export const handleInputFocus = async (state: DiffViewState): Promise<DiffViewState> => {
  return {
    ...state,
    focus: WhenExpression.FocusSourceControlInput,
    inputSource: InputSource.Script,
  }
}
