import { expect, test } from '@jest/globals'
import { DiffWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { deleteRight } from '../src/parts/DeleteRight/DeleteRight.ts'

test('deleteRight deletes a character to the right of the cursor', async (): Promise<void> => {
  DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => {
      return []
    },
  })
  const state = {
    ...createDefaultState(),
    contentLeft: 'alpha',
    contentRight: 'pear world',
    deltaY: 0,
    errorLeftMessage: '',
    height: 40,
    itemHeight: 20,
    minimumSliderSize: 30,
    renderModeLeft: 'text' as const,
    renderModeRight: 'text' as const,
    rightEditor: {
      cursorColumnIndex: 1,
      cursorRowIndex: 0,
    },
  }

  const result = await deleteRight(state)

  expect(result.contentRight).toBe('par world')
})

test('deleteRight returns state when cursor is at the end', async (): Promise<void> => {
  const state = {
    ...createDefaultState(),
    contentLeft: 'alpha',
    contentRight: 'hello world',
    rightEditor: {
      cursorColumnIndex: 11,
      cursorRowIndex: 0,
    },
  }

  const result = await deleteRight(state)

  expect(result).toBe(state)
})

test('deleteRight returns state when inputValue is present', async (): Promise<void> => {
  const state = {
    ...createDefaultState(),
    contentLeft: 'alpha',
    contentRight: 'abc def',
    inputValue: 'abc',
    rightEditor: {
      cursorColumnIndex: 3,
      cursorRowIndex: 0,
    },
  }

  const result = await deleteRight(state)

  expect(result).toBe(state)
})
