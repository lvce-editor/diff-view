import { WhenExpression } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'

export const handleClickAt = (state: DiffViewState, clientX: number, clientY: number, targetName: string): DiffViewState => {
  const isVertical = state.layout === 'vertical'
  const isRightSide = isVertical ? clientY >= state.y + state.leftWidth : clientX >= state.x + state.leftWidth
  if (!isRightSide || state.focus === WhenExpression.FocusEditorText) {
    return state
  }
  return {
    ...state,
    focus: WhenExpression.FocusEditorText,
  }
}
