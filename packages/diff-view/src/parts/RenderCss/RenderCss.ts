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

.Sash {
  cursor: col-resize;
  flex-shrink: 0;
  width: ${getSashWidth()}px;
}
`
  return [ViewletCommand.SetCss, id, css]
}
