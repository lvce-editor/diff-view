import type { DiffMode, RenderMode } from '../DiffViewState/DiffViewState.ts'
import { getInlineDiffRows } from '../GetInlineDiffRows/GetInlineDiffRows.ts'
import { getLineCount } from '../GetLineCount/GetLineCount.ts'

const getDisplayedContent = (content: string, errorMessage: string, errorStack: string): string => {
  if (!errorMessage) {
    return content
  }
  return errorStack ? `${errorMessage}\n\n${errorStack}` : errorMessage
}

export const getTotalLineCount = (
  diffMode: DiffMode,
  contentLeft: string,
  contentRight: string,
  errorLeftMessage: string,
  errorLeftStack: string,
  errorRightMessage: string,
  errorRightStack: string,
  renderModeLeft: RenderMode,
  renderModeRight: RenderMode,
): number => {
  if (diffMode === 'inline' && renderModeLeft === 'text' && renderModeRight === 'text' && !errorLeftMessage && !errorRightMessage) {
    return getInlineDiffRows(contentLeft, contentRight).length
  }

  return Math.max(
    renderModeLeft === 'image' ? 1 : getLineCount(getDisplayedContent(contentLeft, errorLeftMessage, errorLeftStack)),
    renderModeRight === 'image' ? 1 : getLineCount(getDisplayedContent(contentRight, errorRightMessage, errorRightStack)),
  )
}
