import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getNextPaneSizes } from '../GetNextPaneSizes/GetNextPaneSizes.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'
import { getVisibleLinesState } from '../GetVisibleLinesState/GetVisibleLinesState.ts'

interface Dimensions {
  height: number
  width: number
}

export const handleResize = (state: DiffViewState, { height, width }: Readonly<Dimensions>): DiffViewState => {
  // const {} = state
  if (state.width === width && state.height === height) {
    return state
  }

  const { leftWidth, rightWidth } = getNextPaneSizes(state, state.layout, width, height)
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
