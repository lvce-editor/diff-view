import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'

test('renderCss renders left and right widths as css variables', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    id: 1,
    leftWidth: 120,
    rightWidth: 176,
  }

  const result = renderCss(oldState, newState)

  expect(result).toEqual([
    ViewletCommand.SetCss,
    1,
    `
:root {
  --ItemHeight: 20px;
  --LeftWidth: 120px;
  --RightWidth: 176px;
}

.DiffEditor {
  display: flex;
  height: 100%;
  width: 100%;
}

.DiffEditorHorizontal {
  flex-direction: row;
}

.DiffEditorVertical {
  flex-direction: column;
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
  flex-shrink: 0;
}

.SashVertical {
  cursor: col-resize;
  width: 4px;
}

.SashHorizontal {
  cursor: row-resize;
  height: 4px;
}
`,
  ])
})

test('renderCss renders stacked pane heights for vertical layout', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    id: 1,
    layout: 'vertical' as const,
    leftWidth: 120,
    rightWidth: 176,
  }

  const result = renderCss(oldState, newState)

  expect(result).toEqual([
    ViewletCommand.SetCss,
    1,
    `
:root {
  --ItemHeight: 20px;
  --LeftWidth: 120px;
  --RightWidth: 176px;
}

.DiffEditor {
  display: flex;
  height: 100%;
  width: 100%;
}

.DiffEditorHorizontal {
  flex-direction: row;
}

.DiffEditorVertical {
  flex-direction: column;
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

.ImageElement {
  display: block;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.DiffEditorContentLeft {
  height: var(--LeftWidth);
}

.DiffEditorContentRight {
  height: var(--RightWidth);
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
  flex-shrink: 0;
}

.SashVertical {
  cursor: col-resize;
  width: 4px;
}

.SashHorizontal {
  cursor: row-resize;
  height: 4px;
}
`,
  ])
})
