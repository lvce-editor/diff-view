import type { DiffMode, RenderMode } from '../DiffViewState/DiffViewState.ts'
import { getInlineDiffRows } from '../GetInlineDiffRows/GetInlineDiffRows.ts'
import { getLineCount } from '../GetLineCount/GetLineCount.ts'

export const getDisplayedContent = (content: string, errorMessage: string, errorCodeFrame: string, errorStack: string): string => {
  if (!errorMessage) {
    return content
  }
  return [errorMessage, errorCodeFrame, errorStack].filter(Boolean).join('\n\n')
}

export const getTotalLineCount = (
  diffMode: DiffMode,
  contentLeft: string,
  contentRight: string,
  errorLeftMessage: string,
  errorLeftCodeFrame: string,
  errorLeftStack: string,
  errorRightMessage: string,
  errorRightCodeFrame: string,
  errorRightStack: string,
  renderModeLeft: RenderMode,
  renderModeRight: RenderMode,
): number => {
  if (diffMode === 'inline' && renderModeLeft === 'text' && renderModeRight === 'text' && !errorLeftMessage && !errorRightMessage) {
    return getInlineDiffRows(contentLeft, contentRight).length
  }

  return Math.max(
    renderModeLeft === 'image' ? 1 : getLineCount(getDisplayedContent(contentLeft, errorLeftMessage, errorLeftCodeFrame, errorLeftStack)),
    renderModeRight === 'image' ? 1 : getLineCount(getDisplayedContent(contentRight, errorRightMessage, errorRightCodeFrame, errorRightStack)),
  )
}
