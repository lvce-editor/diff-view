import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffEditorWhenExpression from '../src/parts/DiffEditorWhenExpression/DiffEditorWhenExpression.ts'
import { handleClickAt } from '../src/parts/HandleClickAt/HandleClickAt.ts'

test('handleClickAt focuses the editable right side for horizontal layout clicks', (): void => {
  const state = {
    ...createDefaultState(),
    gutterWidthVariable: 18,
    leftWidth: 40,
    totalLineCountRight: 3,
    x: 10,
  }

  const result = handleClickAt(state, 10 + 40 + 18 + 28 + 12 + 27, 40, '')

  expect(result).toMatchObject({
    focus: DiffEditorWhenExpression.FocusDiffEditorText,
    rightEditor: {
      cursorColumnIndex: 3,
      cursorRowIndex: 2,
    },
  })
})

test('handleClickAt ignores horizontal layout clicks in the left side', (): void => {
  const state = {
    ...createDefaultState(),
    leftWidth: 40,
    x: 10,
  }

  const result = handleClickAt(state, 20, 5, '')

  expect(result).toBe(state)
})

test('handleClickAt focuses the editable right side for vertical layout clicks', (): void => {
  const state = {
    ...createDefaultState(),
    gutterWidthVariable: 18,
    layout: 'vertical' as const,
    leftWidth: 40,
    totalLineCountRight: 4,
    y: 10,
  }

  const result = handleClickAt(state, 18 + 28 + 12 + 18, 10 + 40 + 60, '')

  expect(result).toMatchObject({
    focus: DiffEditorWhenExpression.FocusDiffEditorText,
    rightEditor: {
      cursorColumnIndex: 2,
      cursorRowIndex: 3,
    },
  })
})
