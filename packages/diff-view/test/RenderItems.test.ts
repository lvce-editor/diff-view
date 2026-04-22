import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getDiffEditorVirtualDom } from '../src/parts/GetDiffEditorVirtualDom/GetDiffEditorVirtualDom.ts'
import { renderItems } from '../src/parts/RenderItems/RenderItems.ts'

test('renderItems returns an empty dom update for initial render', (): void => {
  const result = renderItems(createDefaultState(), {
    ...createDefaultState(),
    initial: true,
  })

  expect(result).toEqual([ViewletCommand.SetDom2, 1, []])
})

test('renderItems returns the diff editor dom for normal renders', (): void => {
  const state = {
    ...createDefaultState(),
    contentLeft: 'before-content',
    contentRight: 'after-content',
    id: 3,
    maxLineY: 1,
    totalLineCount: 1,
  }

  const result = renderItems(state, state)

  expect(result[0]).toBe(ViewletCommand.SetDom2)
  expect(result[1]).toBe(3)
  expect(result[2]).toEqual(getDiffEditorVirtualDom(state))
})
