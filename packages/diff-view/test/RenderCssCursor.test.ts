import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'

test('renderCss applies a text cursor only to the diff rows surface', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    id: 1,
  }

  const result = renderCss(oldState, newState)

  expect(result[2]).toContain('.DiffEditorRows {')
  expect(result[2]).toContain('cursor: text;')
  expect(result[2]).toContain('.DiffEditorGutter {')
  expect(result[2]).toContain('.SashVertical {')
  expect(result[2]).toContain('cursor: col-resize;')
})

test('renderCss sets right cursor position css variables', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    gutterWidthVariable: 18,
    minLineY: 1,
    rightEditor: {
      cursorColumnIndex: 3,
      cursorRowIndex: 2,
    },
  }

  const result = renderCss(oldState, newState)

  expect(result[2]).toContain('.EditorCursorRight {')
  expect(result[2]).toContain('--CursorLeft: 77px;')
  expect(result[2]).toContain('--CursorTop: 20px;')
  expect(result[2]).toContain('left: var(--CursorLeft);')
  expect(result[2]).toContain('top: var(--CursorTop);')
})
