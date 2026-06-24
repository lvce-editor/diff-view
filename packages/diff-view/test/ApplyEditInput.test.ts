import { expect, test } from '@jest/globals'
import { DiffWorker } from '@lvce-editor/rpc-registry'
import { applyEditInput } from '../src/parts/ApplyEditInput/ApplyEditInput.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('applyEditInput returns state when input value is unchanged', async (): Promise<void> => {
  using mockRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => {
      return []
    },
  })
  const state = {
    ...createDefaultState(),
    inputValue: 'abc',
  }

  const result = await applyEditInput(state, 'abc')

  expect(mockRpc.invocations).toEqual([])
  expect(result).toBe(state)
})

test('applyEditInput inserts text at cursor position', async (): Promise<void> => {
  using mockRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => {
      return []
    },
  })
  const state = {
    ...createDefaultState(),
    contentLeft: 'left',
    contentRight: 'world',
    errorRightMessage: '',
    inputValue: '',
    maxInputLines: 100,
    renderModeRight: 'text' as const,
    rightEditor: {
      cursorColumnIndex: 0,
      cursorRowIndex: 0,
    },
  }

  const result = await applyEditInput(state, 'hello ')

  expect(mockRpc.invocations.length).toBeGreaterThan(0)
  expect(result.contentRight).toBe('hello world')
})

test('applyEditInput returns state when renderModeRight is not text', async (): Promise<void> => {
  const state = {
    ...createDefaultState(),
    renderModeRight: 'image' as const,
  }

  const result = await applyEditInput(state, 'test')

  expect(result).toBe(state)
})

test('applyEditInput returns state when there is an error message', async (): Promise<void> => {
  const state = {
    ...createDefaultState(),
    errorRightMessage: 'error',
  }

  const result = await applyEditInput(state, 'test')

  expect(result).toBe(state)
})
