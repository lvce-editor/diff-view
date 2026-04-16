import { expect, test } from '@jest/globals'
import { InputSource, WhenExpression } from '@lvce-editor/constants'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleInputFocus } from '../src/parts/HandleFocus/HandleFocus.ts'

test('handleInputFocus - updates focus and inputSource', async (): Promise<void> => {
  const state: SourceControlState = createDefaultState()
  const result = await handleInputFocus(state)
  expect(result.focus).toBe(WhenExpression.FocusSourceControlInput)
  expect(result.inputSource).toBe(InputSource.Script)
  expect(result).toEqual({
    ...state,
    focus: WhenExpression.FocusSourceControlInput,
    inputSource: InputSource.Script,
  })
})
