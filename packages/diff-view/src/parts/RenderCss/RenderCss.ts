import { ViewletCommand } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getSashWidth } from '../GetPaneWidths/GetPaneWidths.ts'
import { getScrollBarThumbTop } from '../GetScrollBarThumbTop/GetScrollBarThumbTop.ts'

export const renderCss = (oldState: DiffViewState, newState: DiffViewState): any => {
<<<<<<< HEAD
  const { deltaY, finalDeltaY, height, id, itemHeight, leftWidth, maxLineY, minLineY, rightWidth, scrollBarHeight, totalLineCount } = newState
  const topSpacerHeight = minLineY * itemHeight
  const bottomSpacerHeight = Math.max(totalLineCount - maxLineY, 0) * itemHeight
  const scrollBarThumbTop = getScrollBarThumbTop(height, scrollBarHeight, deltaY, finalDeltaY)
=======
  const { id, itemHeight, layout, leftWidth, rightWidth } = newState
>>>>>>> origin/main
  const css = `
:root {
  --ItemHeight: ${itemHeight}px;
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
<<<<<<< HEAD
  height: var(--DiffEditorHeight);
  position: relative;
=======
  height: 100%;
  width: 100%;
}

.DiffEditorHorizontal {
  flex-direction: row;
}

.DiffEditorVertical {
  flex-direction: column;
>>>>>>> origin/main
}

.DiffEditorContent {
  contain: strict;
  height: 100%;
  overflow: hidden;
}

.DiffEditorContentLeft,
.DiffEditorContentRight {
  display: flex;
  overflow: hidden;
}

.DiffEditorGutter {
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.55);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  font-family: monospace;
  overflow: hidden;
  padding: 0 8px 0 12px;
  text-align: right;
  user-select: none;
}

.DiffEditorLineNumber {
  box-sizing: border-box;
  height: var(--ItemHeight);
  line-height: var(--ItemHeight);
  white-space: pre;
}

.DiffEditorRows {
  contain: strict;
  flex: 1;
  font-family: monospace;
  min-width: 0;
  overflow: hidden;
}

.DiffEditor .EditorRow {
  box-sizing: border-box;
  height: var(--ItemHeight);
  line-height: var(--ItemHeight);
  white-space: pre;
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
<<<<<<< HEAD
  overflow: hidden;
  width: var(--LeftWidth);
}

.DiffEditorContentRight {
  overflow: hidden;
  width: var(--RightWidth);
=======
  ${layout === 'vertical' ? 'height: var(--LeftWidth);' : 'width: var(--LeftWidth);'}
}

.DiffEditorContentRight {
  ${layout === 'vertical' ? 'height: var(--RightWidth);' : 'width: var(--RightWidth);'}
>>>>>>> origin/main
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
  flex-shrink: 0;
<<<<<<< HEAD
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
=======
}

.SashVertical {
  cursor: col-resize;
  width: ${getSashWidth()}px;
}

.SashHorizontal {
  cursor: row-resize;
  height: ${getSashWidth()}px;
>>>>>>> origin/main
}
`
  return [ViewletCommand.SetCss, id, css]
}
