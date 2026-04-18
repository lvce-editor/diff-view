import { ViewletCommand } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import { getSashWidth } from '../GetPaneWidths/GetPaneWidths.ts'

export const renderCss = (oldState: DiffViewState, newState: DiffViewState): any => {
  const { id, leftWidth, rightWidth } = newState
  const css = `
:root {
  --LeftWidth: ${leftWidth}px;
  --RightWidth: ${rightWidth}px;
}

.DiffEditor {
  display: flex;
}

.DiffEditorContent {
  contain: strict;
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
  flex-shrink: 0;
  overflow: hidden;
  padding: 0 8px 0 12px;
  text-align: right;
}

.DiffEditorLineNumber {
  white-space: pre;
}

.DiffEditorRows {
  contain: strict;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.ImageContent {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  overflow: auto;
}

.ImageElement {
  display: block;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.DiffEditorContentLeft {
  width: var(--LeftWidth);
}

.DiffEditorContentRight {
  width: var(--RightWidth);
}

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
}

.Sash {
  cursor: col-resize;
  flex-shrink: 0;
  width: ${getSashWidth()}px;
}
`
  return [ViewletCommand.SetCss, id, css]
}
