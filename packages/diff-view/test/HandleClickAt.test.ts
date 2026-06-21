import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickAt } from '../src/parts/HandleClickAt/HandleClickAt.ts'

test('handleClickAt focuses the editable right side for horizontal layout clicks', (): void => {
  const state = {
    ...createDefaultState(),
    gutterWidthVariable: 18,
    leftWidth: 40,
    x: 10,
  }

  const result = handleClickAt(state, 10 + 40 + 18 + 20 + 12 + 27, 40, '')

  expect(result).toMatchObject({
    focus: WhenExpression.FocusEditorText,
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
    y: 10,
  }

  const result = handleClickAt(state, 18 + 20 + 12 + 18, 10 + 40 + 60, '')

  expect(result).toMatchObject({
    focus: WhenExpression.FocusEditorText,
    rightEditor: {
      cursorColumnIndex: 2,
      cursorRowIndex: 3,
    },
  })
})
