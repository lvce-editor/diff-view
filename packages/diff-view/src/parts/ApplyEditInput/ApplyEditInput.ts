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

export const applyEditInput = async (state: DiffViewState, inputValue: string): Promise<DiffViewState> => {
  if (inputValue === state.inputValue || state.renderModeRight !== 'text' || state.errorRightMessage || getLineCount(inputValue) > state.maxInputLines) {
    return state
  }

  const { totalLineCountLeft } = state
  // compute base content without any previously-applied input buffer
  const baseContent = getBaseContentRight(state)

  // derive insertion index from cursor position (row/column)
  // compute full content index (including any previously-applied inputValue prefix)
  const fullLines = state.contentRight ? state.contentRight.split('\n') : ['']
  const fullCursorRow = Math.max(0, Math.min(state.rightEditor.cursorRowIndex, fullLines.length - 1))
  const fullCurrentLine = fullLines[fullCursorRow] ?? ''
  const fullCursorCol = Math.max(0, Math.min(state.rightEditor.cursorColumnIndex, fullCurrentLine.length))
  let fullIndex = 0
  for (let i = 0; i < fullCursorRow; i++) {
    fullIndex += (fullLines[i] ?? '').length + 1
  }
  fullIndex += fullCursorCol

  const prefixLength = state.inputValue && state.contentRight.startsWith(state.inputValue) ? state.inputValue.length : 0
  const index = Math.max(0, fullIndex - prefixLength)
  const lines = baseContent.split('\n')

  const before = baseContent.slice(0, index)
  const after = baseContent.slice(index)
  const contentRight = `${before}${inputValue}${after}`
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
