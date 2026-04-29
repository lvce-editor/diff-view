import { ViewletCommand } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getCss } from '../GetCss/GetCss.ts'
import { getSashWidth } from '../GetPaneWidths/GetPaneWidths.ts'
import { getScrollBarBackgroundImage } from '../GetScrollBarBackgroundImage/GetScrollBarBackgroundImage.ts'
import { getScrollBarThumbTop } from '../GetScrollBarThumbTop/GetScrollBarThumbTop.ts'

export const renderCss = (oldState: DiffViewState, newState: DiffViewState): any => {
  const { deltaY, diffScrollBarWidth, finalDeltaY, gutterWidthVariable, height, id, inlineChanges, itemHeight, leftWidth, rightWidth, scrollBarHeight, totalLineCount } = newState
  const scrollBarThumbTop = getScrollBarThumbTop(height, scrollBarHeight, deltaY, finalDeltaY)
  const scrollBarBackgroundImage = getScrollBarBackgroundImage(inlineChanges, totalLineCount)
  const { layout } = newState
  const staticCss = getCss()
  const gutterWidth = 'var(--GutterWidth)'
  const gutterPaddingWidth = 20
  const inlineGutterExtraWidth = 9 + gutterPaddingWidth
  const css = `
:root {
  --ItemHeight: ${itemHeight}px;
  --LeftWidth: ${leftWidth}px;
  --RightWidth: ${rightWidth}px;
  --GutterWidth: ${gutterWidthVariable}px;
  --DiffEditorHeight: ${height}px;
  --DiffScrollBarWidth: ${diffScrollBarWidth}px;
  --EditorRowHeight: ${itemHeight}px;
  --ScrollBarHeight: ${scrollBarHeight}px;
  --ScrollBarBackgroundImage: ${scrollBarBackgroundImage};
  --ScrollBarThumbTop: ${scrollBarThumbTop}px;
}

.DiffEditor {
  display: flex;
  height: var(--DiffEditorHeight);
  position: relative;
  width: 100%;
}

.DiffEditorHorizontal {
  flex-direction: row;
}

.DiffEditorVertical {
  flex-direction: column;
}

.InlineDiffEditor {
  flex-direction: column;
}

.DiffEditorContent {
  contain: strict;
  height: 100%;
  overflow: hidden;
  user-select: text;
}

.InlineDiffEditorContent {
  display: flex;
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
  width: calc(${gutterWidth} + ${gutterPaddingWidth}px);
}

.InlineDiffEditor .DiffEditorGutter {
  width: calc(${gutterWidth} * 2 + ${inlineGutterExtraWidth}px);
}

.DiffEditorLineNumber {
  box-sizing: border-box;
  height: var(--ItemHeight);
  line-height: var(--ItemHeight);
  white-space: pre;
}

.DiffEditorLineNumberEmpty {
  box-sizing: border-box;
  flex-shrink: 0;
}

.DiffEditorRows {
  contain: strict;
  cursor: text;
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

.DiffEditor .Deletion {
  background: rgba(255, 0, 0, 0.16);
  color: #ffb3b3;
}

.DiffEditor .Insertion {
  background: rgba(0, 128, 0, 0.18);
  color: #b7f7c0;
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

.InlineDiffEditor .EditorRow,
.InlineDiffEditor .Insertion,
.InlineDiffEditor .Deletion {
  padding: 0 8px;
}

.Insertion {
  background: rgba(46, 160, 67, 0.18);
}

.Deletion {
  background: rgba(248, 81, 73, 0.18);
}

.ImageElement {
  display: block;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.DiffEditorContentLeft {
  ${layout === 'vertical' ? 'height: var(--LeftWidth);' : 'width: var(--LeftWidth);'}
}

.DiffEditorContentRight {
  ${layout === 'vertical' ? 'height: var(--RightWidth);' : 'width: var(--RightWidth);'}
}

.DiffEditorError {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.DiffEditorErrorMessage {
  font-weight: 600;
}

.Sash {
  flex-shrink: 0;
}

.SashVertical {
  cursor: col-resize;
  width: ${getSashWidth()}px;
}

.SashHorizontal {
  cursor: row-resize;
  height: ${getSashWidth()}px;
}

${staticCss}
`
  return [ViewletCommand.SetCss, id, css]
}
