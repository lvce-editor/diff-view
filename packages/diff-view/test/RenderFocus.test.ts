import { expect, test } from '@jest/globals'
import { ViewletCommand, WhenExpression } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderFocus } from '../src/parts/RenderFocus/RenderFocus.ts'

test('renderFocus focuses the hidden diff editor input when the editor receives focus', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    focus: WhenExpression.FocusEditorText,
    id: 7,
  }

  expect(renderFocus(oldState, newState)).toEqual([ViewletCommand.FocusSelector, 7, '.DiffEditorInput'])
})

test('renderFocus returns no command for non-editor focus', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    focus: WhenExpression.Empty,
  }

  expect(renderFocus(oldState, newState)).toEqual([])
})
