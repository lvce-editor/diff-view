import type { DiffMode, DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getScrollBarBackgroundImage } from '../GetScrollBarBackgroundImage/GetScrollBarBackgroundImage.ts'
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
    state.errorLeftCodeFrame,
    state.errorLeftStack,
    state.errorRightMessage,
    state.errorRightCodeFrame,
    state.errorRightStack,
    state.renderModeLeft,
    state.renderModeRight,
  )
  const scrollState = getScrollState(state.height, state.itemHeight, totalLineCount, state.minimumSliderSize, state.deltaY)
  const scrollBarBackgroundImage = getScrollBarBackgroundImage(state.inlineChanges, totalLineCount)
  const nextState = {
    ...state,
    diffMode,
    scrollBarBackgroundImage,
    totalLineCount,
    ...scrollState,
  }

  return {
    ...nextState,
    ...getVisibleLinesState({
      contentLeft: nextState.contentLeft,
      contentRight: nextState.contentRight,
      inlineChanges: nextState.inlineChanges,
      maxLineY: nextState.maxLineY,
      minLineY: nextState.minLineY,
      tokenizedLinesLeft: nextState.tokenizedLinesLeft,
      tokenizedLinesRight: nextState.tokenizedLinesRight,
      totalLineCountLeft: nextState.totalLineCountLeft,
      totalLineCountRight: nextState.totalLineCountRight,
    }),
  }
}
