import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import { applyRender } from '../src/parts/ApplyRender/ApplyRender.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('applyRender runs renderers in diff order', (): void => {
  const oldState = createDefaultState()
  const newState = {
    ...oldState,
    focus: 3,
    id: 2,
    inputValue: 'commit message',
  }

  const result = applyRender(oldState, newState, [DiffType.RenderFocusContext, DiffType.RenderValue])

  expect(result).toEqual([
    [ViewletCommand.SetFocusContext, 2, 3],
    [ViewletCommand.SetValueByName, 2, InputName.SourceControlInput, 'commit message'],
  ])
})
