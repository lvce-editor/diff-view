import { expect, test } from '@jest/globals'
import { DiffWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { applyEditInput } from '../src/parts/ApplyEditInput/ApplyEditInput.ts'
import { insertLineBreak } from '../src/parts/InsertLineBreak/InsertLineBreak.ts'

test('typing inserts characters at the cursor position', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => []
  })

  const state = {
    ...createDefaultState(),
    contentLeft: '',
    contentRight: 'helloWorld',
    inputValue: ' ',
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
})

test('insertLineBreak at cursor splits the line', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => []
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
