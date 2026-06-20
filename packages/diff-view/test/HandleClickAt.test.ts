import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickAt } from '../src/parts/HandleClickAt/HandleClickAt.ts'

test('handleClickAt focuses the editable right side for horizontal layout clicks', (): void => {
  const state = {
    ...createDefaultState(),
    leftWidth: 40,
    x: 10,
  }

  const result = handleClickAt(state, 60, 5, '')

  expect(result).toMatchObject({
    focus: WhenExpression.FocusEditorText,
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
    layout: 'vertical' as const,
    leftWidth: 40,
    y: 10,
  }

  const result = handleClickAt(state, 5, 60, '')

  expect(result).toMatchObject({
    focus: WhenExpression.FocusEditorText,
  })
})
