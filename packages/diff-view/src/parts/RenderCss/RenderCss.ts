import { ViewletCommand } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getSashWidth } from '../GetPaneWidths/GetPaneWidths.ts'
import { getScrollBarThumbTop } from '../GetScrollBarThumbTop/GetScrollBarThumbTop.ts'

export const renderCss = (oldState: DiffViewState, newState: DiffViewState): any => {
  const { deltaY, finalDeltaY, height, id, itemHeight, leftWidth, maxLineY, minLineY, rightWidth, scrollBarHeight, totalLineCount } = newState
  const topSpacerHeight = minLineY * itemHeight
  const bottomSpacerHeight = Math.max(totalLineCount - maxLineY, 0) * itemHeight
  const scrollBarThumbTop = getScrollBarThumbTop(height, scrollBarHeight, deltaY, finalDeltaY)
  const css = `
:root {
  --LeftWidth: ${leftWidth}px;
  --RightWidth: ${rightWidth}px;
  --DiffEditorHeight: ${height}px;
  --EditorRowHeight: ${itemHeight}px;
  --TopSpacerHeight: ${topSpacerHeight}px;
  --BottomSpacerHeight: ${bottomSpacerHeight}px;
  --ScrollBarHeight: ${scrollBarHeight}px;
  --ScrollBarThumbTop: ${scrollBarThumbTop}px;
}

.DiffEditor {
  display: flex;
  height: var(--DiffEditorHeight);
  position: relative;
}

.DiffEditorContent {
  contain: strict;
  height: 100%;
  overflow: hidden;
}

.ImageContent {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  overflow: auto;
}

.EditorRow {
  min-height: var(--EditorRowHeight);
}

.ImageElement {
  display: block;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.DiffEditorContentLeft {
  overflow: hidden;
  width: var(--LeftWidth);
}

.DiffEditorContentRight {
  overflow: hidden;
  width: var(--RightWidth);
}

<<<<<<< HEAD
.DiffEditorError {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.DiffEditorErrorMessage {
  font-weight: 600;
}

.DiffEditorErrorStack {
  font-family: monospace;
  white-space: pre-wrap;
=======
.DiffEditorSpacerTop {
  height: var(--TopSpacerHeight);
}

.DiffEditorSpacerBottom {
  height: var(--BottomSpacerHeight);
>>>>>>> bb00f9f225c6 (feat(diff-view): implement scroll bar functionality and improve rendering)
}

.Sash {
  cursor: col-resize;
  flex-shrink: 0;
  height: 100%;
  width: ${getSashWidth()}px;
}

.ScrollBar {
  background: rgba(128, 128, 128, 0.15);
  border-radius: 4px;
  height: 100%;
  position: absolute;
  right: 2px;
  top: 0;
  width: 8px;
}

.ScrollBarThumb {
  background: rgba(128, 128, 128, 0.45);
  border-radius: 4px;
  cursor: pointer;
  height: var(--ScrollBarHeight);
  position: absolute;
  top: var(--ScrollBarThumbTop);
  width: 100%;
}
`
  return [ViewletCommand.SetCss, id, css]
}
