import { ViewletCommand } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getSashWidth } from '../GetPaneWidths/GetPaneWidths.ts'
import { getScrollBarThumbTop } from '../GetScrollBarThumbTop/GetScrollBarThumbTop.ts'

export const renderCss = (oldState: DiffViewState, newState: DiffViewState): any => {
  const { deltaY, finalDeltaY, gutterWidthVariable, height, id, itemHeight, leftWidth, rightWidth, scrollBarBackgroundImage, scrollBarHeight } = newState
  const scrollBarThumbTop = getScrollBarThumbTop(height, scrollBarHeight, deltaY, finalDeltaY)
  const { layout } = newState
  const gutterWidth = 'var(--GutterWidth)'
  const gutterPaddingWidth = 20
  const inlineGutterExtraWidth = 9 + gutterPaddingWidth
  const css = `
:root {
  --DiffBackground: #0b0d10;
  --DiffForeground: rgba(255, 255, 255, 0.88);
  --DiffGutterBackground: #0f1218;
  --DiffGutterForeground: rgba(255, 255, 255, 0.58);
  --DiffSeparatorColor: rgba(255, 255, 255, 0.12);
  --DiffMissingLineBackground: rgba(255, 255, 255, 0.035);
  --DiffDeletionBackground: rgba(248, 81, 73, 0.2);
  --DiffDeletionForeground: #ffb3ad;
  --DiffDeletionAccent: #ff5f6d;
  --DiffInsertionBackground: rgba(46, 160, 67, 0.22);
  --DiffInsertionForeground: #b7f7c0;
  --DiffInsertionAccent: #3fb950;
  --ItemHeight: ${itemHeight}px;
  --LeftWidth: ${leftWidth}px;
  --RightWidth: ${rightWidth}px;
  --GutterWidth: ${gutterWidthVariable}px;
  --EditorRowHeight: ${itemHeight}px;
  --ScrollBarHeight: ${scrollBarHeight}px;
  --ScrollBarBackgroundImage: ${scrollBarBackgroundImage};
  --ScrollBarThumbTop: ${scrollBarThumbTop}px;
}


.DiffEditor {
  background: var(--DiffBackground);
  color: var(--DiffForeground);
  display: flex;
  position: relative;
  width: 100%;
}

.DiffEditorWithSearch {
  flex-direction: column;
}

.DiffEditorBody {
  display: flex;
  flex: 1;
  min-height: 0;
  min-width: 0;
}

.DiffSearchHeader {
  align-items: center;
  background: var(--DiffGutterBackground);
  border-bottom: 1px solid var(--DiffSeparatorColor);
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  height: 40px;
  padding: 6px 12px;
}

.DiffSearchInput {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 4px;
  box-sizing: border-box;
  color: var(--DiffForeground);
  font: 13px system-ui, sans-serif;
  height: 28px;
  max-width: 320px;
  min-width: 120px;
  outline: none;
  padding: 0 8px;
  width: 100%;
}

.DiffSearchInput:focus {
  border-color: rgba(116, 178, 255, 0.72);
}

.DiffEditorButtons {
  align-items: center;
  display: inline-flex;
  gap: 8px;
  position: absolute;
  right: 14px;
  top: 8px;
  z-index: 2;
}

.DiffEditorModeToggle,
.DiffEditorWhitespaceToggle {
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 4px;
  color: var(--DiffForeground);
  cursor: pointer;
  display: inline-flex;
  font: 12px system-ui, sans-serif;
  height: 28px;
  padding: 0 10px;
}

.DiffEditorModeToggle:hover,
.DiffEditorWhitespaceToggle:hover {
  background: rgba(255, 255, 255, 0.14);
}

.DiffEditorWhitespaceToggleActive {
  background: rgba(74, 144, 226, 0.24);
  border-color: rgba(116, 178, 255, 0.58);
}

.DiffEditorHorizontal {
  flex-direction: row;
}

.DiffEditorVertical {
  flex-direction: column;
}

.DiffEditorWithSearch.DiffEditorHorizontal,
.DiffEditorWithSearch.DiffEditorVertical {
  flex-direction: column;
}

.DiffEditorBody.DiffEditorVertical {
  flex-direction: column;
}

.DiffEditorBody.DiffEditorHorizontal {
  flex-direction: row;
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
  flex-direction: row;
  height: 100%;
  overflow: hidden;
}

.DiffEditorContentLeft,
.DiffEditorContentRight {
  align-items: stretch;
  display: flex;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  position: relative;
}

.DiffEditorGutter {
  background: var(--DiffGutterBackground);
  border-right: 1px solid var(--DiffSeparatorColor);
  box-sizing: border-box;
  color: var(--DiffGutterForeground);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  font-family: monospace;
  font-variant-numeric: tabular-nums;
  overflow: hidden;
  text-align: right;
  user-select: none;
  width: calc(${gutterWidth} + ${gutterPaddingWidth}px);
}

.InlineDiffEditor .DiffEditorGutter {
  width: calc(${gutterWidth} * 2 + ${inlineGutterExtraWidth}px);
}

.DiffEditorLineNumber {
  border-left: 2px solid transparent;
  box-sizing: border-box;
  height: var(--ItemHeight);
  line-height: var(--ItemHeight);
  padding: 0 10px 0 6px;
  white-space: pre;
}

.DiffEditor .DiffEditorLineNumber {
  color: var(--DiffGutterForeground);
}

.DiffEditor .DiffEditorLineNumberDeletion {
  background: var(--DiffDeletionBackground);
  border-left-color: var(--DiffDeletionAccent);
  color: var(--DiffDeletionAccent);
}

.DiffEditor .DiffEditorLineNumberInsertion {
  background: var(--DiffInsertionBackground);
  border-left-color: var(--DiffInsertionAccent);
  color: var(--DiffInsertionAccent);
}

.DiffEditor .DiffEditorLineNumberMeta {
  color: rgba(255, 255, 255, 0.4);
}

.DiffEditorLineNumberEmpty {
  background-color: var(--DiffMissingLineBackground);
  background-image: repeating-linear-gradient(135deg, transparent 0, transparent 5px, rgba(255, 255, 255, 0.06) 5px, rgba(255, 255, 255, 0.06) 6px);
  box-sizing: border-box;
  flex-shrink: 0;
}

.DiffEditorRows {
  background: var(--DiffBackground);
  contain: layout paint style;
  cursor: text;
  flex: 1 1 auto;
  font-family: monospace;
  height: 100%;
  min-width: 0;
  overflow: hidden;
}

.DiffEditor .EditorRow {
  box-sizing: border-box;
  height: var(--ItemHeight);
  line-height: var(--ItemHeight);
  padding: 0 12px;
  white-space: pre;
}

.DiffEditorInputWrapper {
  contain: strict;
  height: 0;
  position: absolute;
  width: 0;
  z-index: 1;
}

.DiffEditorInput {
  background: transparent;
  border: 0;
  color: transparent;
  cursor: text;
  height: 0;
  outline: none;
  padding: 0;
  position: absolute;
  width: 0;
}

.DiffEditor .Deletion {
  background: var(--DiffDeletionBackground);
  box-shadow: inset 3px 0 var(--DiffDeletionAccent);
  color: var(--DiffDeletionForeground);
}

.DiffEditor .Insertion {
  background: var(--DiffInsertionBackground);
  box-shadow: inset 3px 0 var(--DiffInsertionAccent);
  color: var(--DiffInsertionForeground);
}

.DiffEditor .GitButtons {
  background: rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.75);
  font-size: 12px;
}

.DiffEditor .IncomingChange {
  background: rgba(46, 160, 67, 0.16);
  box-shadow: inset 3px 0 var(--DiffInsertionAccent);
  color: rgba(183, 247, 192, 0.95);
  font-size: 12px;
}

.DiffToken--changed {
  background: rgba(245, 158, 11, 0.22);
  border-radius: 4px;
}

.DiffEditorLineMissing {
  background-color: var(--DiffMissingLineBackground);
  background-image: repeating-linear-gradient(135deg, transparent 0, transparent 5px, rgba(255, 255, 255, 0.06) 5px, rgba(255, 255, 255, 0.06) 6px);
  box-shadow: none;
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

.DiffScrollBar {
  background-color: rgba(128, 128, 128, 0.15);
  background-image: var(--ScrollBarBackgroundImage);
  border-radius: 4px;
  height: 100%;
  position: absolute;
  right: 2px;
  top: 0;
  width: 8px;
}

.DiffScrollBarThumb {
  background: rgba(128, 128, 128, 0.45);
  border-radius: 4px;
  cursor: pointer;
  height: var(--ScrollBarHeight);
  position: absolute;
  top: var(--ScrollBarThumbTop);
  width: 100%;
}

:root {
 --DiffSeparatorBackground: gray;
 --DiffSeparatorWidth: 8px;

}

.DiffEditor .Sash {
  position: relative;
  width: var(--DiffSeparatorWidth);
  background: var(--DiffSeparatorBackground);

}

.DiffEditorErrorCodeFrame,
.DiffEditorErrorStack {
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 3px solid rgba(248, 81, 73, 0.6);
  border-radius: 6px;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.86);
  font-family: monospace;
  font-size: 12px;
  line-height: 1.5;
  max-width: 100%;
  min-width: 0;
  overflow: auto;
  padding: 8px 10px;
  user-select: text;
  white-space: pre-wrap;
  word-break: break-word;
}

.DiffEditorErrorStackLink {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
  white-space: nowrap;
}
`
  return [ViewletCommand.SetCss, id, css]
}
