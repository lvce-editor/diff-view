import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'

test('renderCss renders left and right widths as css variables', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    deltaY: 20,
    finalDeltaY: 140,
    height: 100,
    id: 1,
    itemHeight: 20,
    leftWidth: 120,
    maxLineY: 6,
    minLineY: 1,
    rightWidth: 176,
    scrollBarHeight: 40,
    totalLineCount: 10,
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
  --DiffEditorHeight: 100px;
  --EditorRowHeight: 20px;
  --TopSpacerHeight: 20px;
  --BottomSpacerHeight: 80px;
  --ScrollBarHeight: 40px;
  --ScrollBarThumbTop: 8.571428571428571px;
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
  flex-shrink: 0;
<<<<<<< HEAD
  height: 100%;
  width: 4px;
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
=======
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
>>>>>>> origin/main
`,
  ])
})
