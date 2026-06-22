import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getGutterWidthVariable } from '../GetGutterWidthVariable/GetGutterWidthVariable.ts'
import { getInlineDiffState } from '../GetInlineDiffState/GetInlineDiffState.ts'
import { getLineCount } from '../GetLineCount/GetLineCount.ts'
import { getScrollBarBackgroundImage } from '../GetScrollBarBackgroundImage/GetScrollBarBackgroundImage.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'
import { getVisibleLinesState } from '../GetVisibleLinesState/GetVisibleLinesState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

const getBaseContentRight = (state: DiffViewState): string => {
  if (state.inputValue && state.contentRight.startsWith(state.inputValue)) {
    return state.contentRight.slice(state.inputValue.length)
  }
  return state.contentRight
}

export const deleteRight = async (state: DiffViewState): Promise<DiffViewState> => {
  // If there is an active input buffer, let applyEditInput handle changes via HandleInput
  if (state.inputValue) {
    return state
  }

  const baseContent = getBaseContentRight(state)
  const cursorRow = Math.max(0, Math.min(state.rightEditor.cursorRowIndex, getLineCount(baseContent) - 1))
  const lines = baseContent.split('\n')
  const currentLine = lines[cursorRow] ?? ''
  const cursorCol = Math.max(0, Math.min(state.rightEditor.cursorColumnIndex, currentLine.length))

  // compute absolute index
  let index = 0
  for (let i = 0; i < cursorRow; i++) {
    index += (lines[i] ?? '').length + 1
  }
  index += cursorCol

  if (index >= baseContent.length) {
    return state
  }

  const contentRight = baseContent.slice(0, index) + baseContent.slice(index + 1)
  const { totalLineCountLeft } = state
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
    inputValue: '',
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
