import { expect, test } from '@jest/globals'
import { DiffWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { applyEditInput } from '../src/parts/ApplyEditInput/ApplyEditInput.ts'

test('applyEditInput returns state when input value is unchanged', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => {
      return []
    },
  })
  const state = {
    ...createDefaultState(),
    inputValue: 'abc',
  }

  const result = await applyEditInput(state, 'abc')

  expect(result).toBe(state)
  diffWorkerRpc.restore()
})

test('applyEditInput inserts text at cursor position', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => {
      return []
    },
  })
  const state = {
    ...createDefaultState(),
    contentLeft: 'left',
    contentRight: 'world',
    inputValue: '',
    rightEditor: {
      cursorRowIndex: 0,
      cursorColumnIndex: 0,
    },
    renderModeRight: 'text' as const,
    errorRightMessage: '',
    maxInputLines: 100,
  }

  const result = await applyEditInput(state, 'hello ')

  expect(result.contentRight).toBe('hello world')
  diffWorkerRpc.restore()
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
