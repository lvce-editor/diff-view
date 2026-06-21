import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffEditorWhenExpression from '../src/parts/DiffEditorWhenExpression/DiffEditorWhenExpression.ts'
import { handleClickRightSide } from '../src/parts/HandleClickRightSide/HandleClickRightSide.ts'

test('handleClickRightSide focuses the editable right side', (): void => {
  const state = createDefaultState()

  const result = handleClickRightSide(state)

  expect(result).toMatchObject({
    focus: DiffEditorWhenExpression.FocusDiffEditorText,
    focusVersion: 1,
  })
})

test('handleClickRightSide increments focusVersion when already focused', (): void => {
  const state = {
    ...createDefaultState(),
    focus: DiffEditorWhenExpression.FocusDiffEditorText,
    focusVersion: 4,
  }

  const result = handleClickRightSide(state)

  expect(result).toMatchObject({
    focus: DiffEditorWhenExpression.FocusDiffEditorText,
    focusVersion: 5,
  })
})
