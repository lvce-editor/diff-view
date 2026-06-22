import { expect, test } from '@jest/globals'
import { DiffWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { deleteLeft } from '../src/parts/DeleteLeft/DeleteLeft.ts'

test('deleteLeft deletes a character to the left of the cursor', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => {
      return []
    },
  })
  const state = {
    ...createDefaultState(),
    contentLeft: 'alpha',
    contentRight: 'hello world',
    rightEditor: {
      cursorRowIndex: 0,
      cursorColumnIndex: 5,
    },
    renderModeLeft: 'text' as const,
    renderModeRight: 'text' as const,
    errorLeftMessage: '',
    height: 40,
    itemHeight: 20,
    minimumSliderSize: 30,
    deltaY: 0,
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
      cursorRowIndex: 0,
      cursorColumnIndex: 0,
    },
  }

  const result = await deleteLeft(state)

  expect(result).toBe(state)
})

test('deleteLeft uses inputValue when present', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => {
      return []
    },
  })
  const state = {
    ...createDefaultState(),
    contentLeft: 'alpha',
    contentRight: 'abc def',
    inputValue: 'abc',
    rightEditor: {
      cursorRowIndex: 0,
      cursorColumnIndex: 3,
    },
    renderModeLeft: 'text' as const,
    renderModeRight: 'text' as const,
    errorLeftMessage: '',
    height: 40,
    itemHeight: 20,
    minimumSliderSize: 30,
    deltaY: 0,
  }

  const result = await deleteLeft(state)

  expect(result.inputValue).toBe('ab')
})
