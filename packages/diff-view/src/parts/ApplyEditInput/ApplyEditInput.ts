import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getGutterWidthVariable } from '../GetGutterWidthVariable/GetGutterWidthVariable.ts'
import { getInlineDiffState } from '../GetInlineDiffState/GetInlineDiffState.ts'
import { getLineCount } from '../GetLineCount/GetLineCount.ts'
import { getScrollBarBackgroundImage } from '../GetScrollBarBackgroundImage/GetScrollBarBackgroundImage.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'
import { getVisibleLinesState } from '../GetVisibleLinesState/GetVisibleLinesState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

const getBaseContentRight = (state: DiffViewState): string => {
  if (state.contentRight.startsWith(state.inputValue)) {
    return state.contentRight.slice(state.inputValue.length)
  }
  return state.contentRight
}

export const applyEditInput = async (state: DiffViewState, inputValue: string): Promise<DiffViewState> => {
  if (inputValue === state.inputValue || state.renderModeRight !== 'text' || state.errorRightMessage || getLineCount(inputValue) > state.maxInputLines) {
    return state
  }

  const { totalLineCountLeft } = state
  const contentRight = `${inputValue}${getBaseContentRight(state)}`
  const totalLineCountRight = getLineCount(contentRight)
  const canComputeInlineDiff = state.renderModeLeft === 'text' && !state.errorLeftMessage
  const { inlineChanges, totalLineCount } = canComputeInlineDiff
    ? await getInlineDiffState(state.contentLeft, contentRight)
    : {
        inlineChanges: [],
        totalLineCount: Math.max(totalLineCountLeft, totalLineCountRight),
      }
  const scrollState = getScrollState(state.height, state.itemHeight, totalLineCount, state.minimumSliderSize, state.deltaY)
  const nextState = {
    ...state,
    contentRight,
    gutterWidthVariable: getGutterWidthVariable(Math.max(totalLineCountLeft, totalLineCountRight)),
    inlineChanges,
    inputSource: InputSource.User,
    inputValue,
    scrollBarBackgroundImage: getScrollBarBackgroundImage(inlineChanges, totalLineCount),
    tokenizedLinesRight: [],
    totalLineCount,
    totalLineCountLeft,
    totalLineCountRight,
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
