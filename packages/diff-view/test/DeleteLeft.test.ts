import { expect, test } from '@jest/globals'
import { DiffWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { deleteLeft } from '../src/parts/DeleteLeft/DeleteLeft.ts'

test('deleteLeft deletes a character to the left of the cursor', async (): Promise<void> => {
  DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => {
      return []
    },
  })
  const state = {
    ...createDefaultState(),
    contentLeft: 'alpha',
    contentRight: 'hello world',
    deltaY: 0,
    errorLeftMessage: '',
    height: 40,
    itemHeight: 20,
    minimumSliderSize: 30,
    renderModeLeft: 'text' as const,
    renderModeRight: 'text' as const,
    rightEditor: {
      cursorColumnIndex: 5,
      cursorRowIndex: 0,
    },
  }

  const result = await deleteLeft(state)

  expect(result.contentRight).toBe('hell world')
})

test('deleteLeft returns state when cursor is at the beginning', async (): Promise<void> => {
  const state = {
    ...createDefaultState(),
    contentLeft: 'alpha',
    contentRight: 'hello world',
    rightEditor: {
      cursorColumnIndex: 0,
      cursorRowIndex: 0,
    },
  }

  const result = await deleteLeft(state)

  expect(result).toBe(state)
})

test('deleteLeft uses inputValue when present', async (): Promise<void> => {
  DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => {
      return []
    },
  })
  const state = {
    ...createDefaultState(),
    contentLeft: 'alpha',
    contentRight: 'abc def',
    deltaY: 0,
    errorLeftMessage: '',
    height: 40,
    inputValue: 'abc',
    itemHeight: 20,
    minimumSliderSize: 30,
    renderModeLeft: 'text' as const,
    renderModeRight: 'text' as const,
    rightEditor: {
      cursorColumnIndex: 3,
      cursorRowIndex: 0,
    },
  }

  const result = await deleteLeft(state)

  expect(result.inputValue).toBe('ab')
})
