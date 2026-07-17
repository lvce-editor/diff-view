import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getGutterWidthVariable } from '../GetGutterWidthVariable/GetGutterWidthVariable.ts'
import { getInlineDiffState } from '../GetInlineDiffState/GetInlineDiffState.ts'
import { getLineCount } from '../GetLineCount/GetLineCount.ts'
import { getScrollBarBackgroundImage } from '../GetScrollBarBackgroundImage/GetScrollBarBackgroundImage.ts'
import { getScrollState } from '../GetScrollState/GetScrollState.ts'
import { getVisibleLinesState } from '../GetVisibleLinesState/GetVisibleLinesState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import { loadSyntaxHighlighting } from '../LoadSyntaxHighlighting/LoadSyntaxHighlighting.ts'

export const applyEditInput = async (state: DiffViewState, inputValue: string): Promise<DiffViewState> => {
  if (inputValue === state.inputValue || state.renderModeRight !== 'text' || state.errorRightMessage || getLineCount(inputValue) > state.maxInputLines) {
    return state
  }

  const { totalLineCountLeft } = state
  const { cursorColumnIndex, cursorRowIndex } = state.rightEditor
  const precedingLines = state.contentRight.split('\n').slice(0, cursorRowIndex).join('\n')
  const fullIndex = precedingLines.length + (cursorRowIndex === 0 ? 0 : 1) + cursorColumnIndex
  const inputStart = Math.max(fullIndex - state.inputValue.length, 0)
  const before = state.contentRight.slice(0, inputStart)
  const after = state.contentRight.slice(fullIndex)
  const contentRight = `${before}${inputValue}${after}`
  const linesBeforeCursor = `${before}${inputValue}`.split('\n')
  const rightEditor = {
    cursorColumnIndex: (linesBeforeCursor.at(-1) || '').length,
    cursorRowIndex: linesBeforeCursor.length - 1,
  }
  const totalLineCountRight = getLineCount(contentRight)
  const canComputeInlineDiff = state.renderModeLeft === 'text' && !state.errorLeftMessage
  const { inlineChanges, totalLineCount } = canComputeInlineDiff
    ? await getInlineDiffState(state.contentLeft, contentRight)
    : {
        inlineChanges: [],
        totalLineCount: Math.max(totalLineCountLeft, totalLineCountRight),
      }
  const scrollState = getScrollState(state.height, state.itemHeight, totalLineCount, state.minimumSliderSize, state.deltaY)
  const syntaxHighlightingState =
    state.renderModeRight === 'text' && !state.errorRightMessage
      ? await loadSyntaxHighlighting(state.contentLeft, contentRight, state.uriLeft, state.uriRight, state.platform, state.assetDir)
      : undefined
  const nextState = {
    ...state,
    contentRight,
    gutterWidthVariable: getGutterWidthVariable(Math.max(totalLineCountLeft, totalLineCountRight)),
    inlineChanges,
    inputSource: InputSource.User,
    inputValue,
    languageIdLeft: syntaxHighlightingState?.languageIdLeft || state.languageIdLeft,
    languageIdRight: syntaxHighlightingState?.languageIdRight || state.languageIdRight,
    rightEditor,
    scrollBarBackgroundImage: getScrollBarBackgroundImage(inlineChanges, totalLineCount),
    tokenizedLinesLeft: syntaxHighlightingState?.tokenizedLinesLeft || state.tokenizedLinesLeft,
    tokenizedLinesRight: syntaxHighlightingState?.tokenizedLinesRight || [],
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
