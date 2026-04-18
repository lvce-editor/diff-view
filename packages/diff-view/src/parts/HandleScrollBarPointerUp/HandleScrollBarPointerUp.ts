import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { handleScrollBarPointerMove } from '../HandleScrollBarPointerMove/HandleScrollBarPointerMove.ts'

export const handleScrollBarPointerUp = (state: DiffViewState, clientY: number): DiffViewState => {
  const nextState = handleScrollBarPointerMove(state, clientY)
  return {
    ...nextState,
    isScrollBarDragging: false,
    scrollBarDragOffsetY: 0,
  }
}
