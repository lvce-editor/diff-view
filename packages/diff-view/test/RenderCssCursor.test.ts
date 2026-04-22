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
