import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderFocusContext } from '../src/parts/RenderFocusContext/RenderFocusContext.ts'

test('renderFocusContext forwards the focus value', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    focus: 3,
    id: 5,
  }

  expect(renderFocusContext(oldState, newState)).toEqual([ViewletCommand.SetFocusContext, 5, 3])
})
