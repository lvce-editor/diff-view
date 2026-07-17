import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffEditorWhenExpression from '../src/parts/DiffEditorWhenExpression/DiffEditorWhenExpression.ts'
import { handleClickRightSide } from '../src/parts/HandleClickRightSide/HandleClickRightSide.ts'

test('handleClickRightSide focuses the editable right side', (): void => {
  const state = {
    ...createDefaultState(),
    contentRight: 'zero\none',
    totalLineCountRight: 2,
  }

  const result = handleClickRightSide(state, 49, 20)

  expect(result).toMatchObject({
    focus: DiffEditorWhenExpression.FocusDiffEditorText,
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
    contentRight: 'zero\none\ntwo',
    focus: DiffEditorWhenExpression.FocusDiffEditorText,
    focusVersion: 4,
    totalLineCountRight: 3,
  }

  const result = handleClickRightSide(state, 106, 40)

  expect(result).toMatchObject({
    focus: DiffEditorWhenExpression.FocusDiffEditorText,
    focusVersion: 5,
    rightEditor: {
      cursorColumnIndex: 1,
      cursorRowIndex: 2,
    },
  })
})
