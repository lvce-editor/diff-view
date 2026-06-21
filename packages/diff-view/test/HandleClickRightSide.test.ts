import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickRightSide } from '../src/parts/HandleClickRightSide/HandleClickRightSide.ts'

test('handleClickRightSide focuses the editable right side', (): void => {
  const state = createDefaultState()

  const result = handleClickRightSide(state)

  expect(result).toMatchObject({
    focus: WhenExpression.FocusEditorText,
    focusVersion: 1,
  })
})

test('handleClickRightSide increments focusVersion when already focused', (): void => {
  const state = {
    ...createDefaultState(),
    focus: WhenExpression.FocusEditorText,
    focusVersion: 4,
  }

  const result = handleClickRightSide(state)

  expect(result).toMatchObject({
    focus: WhenExpression.FocusEditorText,
    focusVersion: 5,
  })
})
