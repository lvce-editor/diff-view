import type { DiffMode, DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'
import { getTotalLineCount } from '../GetTotalLineCount/GetTotalLineCount.ts'
import { getVisibleLinesState } from '../GetVisibleLinesState/GetVisibleLinesState.ts'

export const setDiffMode = (state: DiffViewState, diffMode: DiffMode): DiffViewState => {
  if (state.diffMode === diffMode) {
    return state
  }

  const totalLineCount = getTotalLineCount(
    diffMode,
    state.contentLeft,
    state.contentRight,
    state.errorLeftMessage,
    state.errorLeftStack,
    state.errorRightMessage,
    state.errorRightStack,
    state.renderModeLeft,
    state.renderModeRight,
  )
  const scrollState = getScrollState(state.height, state.itemHeight, totalLineCount, state.minimumSliderSize, state.deltaY)
  const nextState = {
    ...state,
    diffMode,
    totalLineCount,
    ...scrollState,
  }

  return {
    ...nextState,
    ...getVisibleLinesState(nextState),
  }
}
