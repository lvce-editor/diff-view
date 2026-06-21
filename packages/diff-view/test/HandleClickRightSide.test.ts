import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickRightSide } from '../src/parts/HandleClickRightSide/HandleClickRightSide.ts'

test('handleClickRightSide focuses the editable right side', (): void => {
  const state = createDefaultState()

  const result = handleClickRightSide(state, 41, 20)

  expect(result).toMatchObject({
    focus: WhenExpression.FocusEditorText,
    focusVersion: 1,
    rightEditor: {
      cursorColumnIndex: 0,
      cursorRowIndex: 1,
    },
  })
})

test('handleClickRightSide increments focusVersion when already focused', (): void => {
  const state = {
    ...createDefaultState(),
    focus: WhenExpression.FocusEditorText,
    focusVersion: 4,
  }

  const result = handleClickRightSide(state, 98, 40)

  expect(result).toMatchObject({
    focus: WhenExpression.FocusEditorText,
    focusVersion: 5,
    rightEditor: {
      cursorColumnIndex: 1,
      cursorRowIndex: 2,
    },
  })
})
