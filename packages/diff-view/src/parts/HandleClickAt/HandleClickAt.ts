import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { handleClickRightSide } from '../HandleClickRightSide/HandleClickRightSide.ts'

export const handleClickAt = (state: DiffViewState, clientX: number, clientY: number, targetName: string): DiffViewState => {
  const isVertical = state.layout === 'vertical'
  const isRightSide = isVertical ? clientY >= state.y + state.leftWidth : clientX >= state.x + state.leftWidth
  if (!isRightSide) {
    return state
  }
  return handleClickRightSide(state)
}
