import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getPaneSizes } from '../GetPaneWidths/GetPaneWidths.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'
import { getVisibleLinesState } from '../GetVisibleLinesState/GetVisibleLinesState.ts'

const getNextPaneSizes = (state: DiffViewState, width: number, height: number): { readonly leftWidth: number; readonly rightWidth: number } => {
  const totalPaneSize = state.leftWidth + state.rightWidth
  const ratio = totalPaneSize === 0 ? 0.5 : state.leftWidth / totalPaneSize
  const size = state.layout === 'vertical' ? height : width
  return getPaneSizes(size, ratio)
}

export const handleResize = (state: DiffViewState, width: number, height: number): DiffViewState => {
  if (state.width === width && state.height === height) {
    return state
  }

  const { leftWidth, rightWidth } = getNextPaneSizes(state, width, height)
  const scrollState = getScrollState(height, state.itemHeight, state.totalLineCount, state.minimumSliderSize, state.deltaY)

  const nextState = {
    ...state,
    height,
    leftWidth,
    rightWidth,
    width,
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
