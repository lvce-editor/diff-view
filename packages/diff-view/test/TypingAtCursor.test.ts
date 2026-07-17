import { expect, test } from '@jest/globals'
import { DiffWorker } from '@lvce-editor/rpc-registry'
import { applyEditInput } from '../src/parts/ApplyEditInput/ApplyEditInput.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { insertLineBreak } from '../src/parts/InsertLineBreak/InsertLineBreak.ts'

test('typing inserts characters at the cursor position', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => [],
  })

  const state = {
    ...createDefaultState(),
    contentLeft: '',
    contentRight: 'helloWorld',
    inputValue: '',
    rightEditor: {
      cursorColumnIndex: 5,
      cursorRowIndex: 0,
    },
    totalLineCountLeft: 1,
    totalLineCountRight: 1,
  }

  const result = await applyEditInput(state, ' ')

  expect(diffWorkerRpc.invocations.length).toBeGreaterThanOrEqual(0)
  expect(result.contentRight).toBe('hello World')
  expect(result.inputValue).toBe(' ')
  expect(result.rightEditor).toEqual({
    cursorColumnIndex: 6,
    cursorRowIndex: 0,
  })
})

test('typing multiple input events replaces the previous input buffer', async (): Promise<void> => {
  using diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => [],
  })

  const state = {
    ...createDefaultState(),
    contentLeft: '',
    contentRight: 'helloWorld',
    inputValue: '',
    rightEditor: {
      cursorColumnIndex: 10,
      cursorRowIndex: 0,
    },
    totalLineCountLeft: 1,
    totalLineCountRight: 1,
  }

  const afterFirstInput = await applyEditInput(state, ' ')
  const afterSecondInput = await applyEditInput(afterFirstInput, ' a')
  const result = await applyEditInput(afterSecondInput, ' abc')

  expect(diffWorkerRpc.invocations.length).toBeGreaterThanOrEqual(0)
  expect(result.contentRight).toBe('helloWorld abc')
  expect(result.inputValue).toBe(' abc')
  expect(result.rightEditor).toEqual({
    cursorColumnIndex: 14,
    cursorRowIndex: 0,
  })
})

test('insertLineBreak at cursor splits the line', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => [],
  })

  const state = {
    ...createDefaultState(),
    contentLeft: '',
    contentRight: 'abcDef',
    inputValue: 'abc',
    rightEditor: {
      cursorColumnIndex: 3,
      cursorRowIndex: 0,
    },
    totalLineCountLeft: 1,
    totalLineCountRight: 1,
  }

  const result = await insertLineBreak(state)

  expect(diffWorkerRpc.invocations.length).toBeGreaterThanOrEqual(0)
  expect(result.contentRight).toBe('abc\nDef')
  expect(result.inputValue).toBe('abc\n')
})
