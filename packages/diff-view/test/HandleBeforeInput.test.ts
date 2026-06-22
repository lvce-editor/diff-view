import { expect, test } from '@jest/globals'
import { DiffWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleBeforeInput } from '../src/parts/HandleBeforeInput/HandleBeforeInput.ts'

test('handleBeforeInput applies insertText with data', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => {
      return []
    },
  })
  const state = {
    ...createDefaultState(),
    contentLeft: 'alpha',
    contentRight: 'beta',
    inputValue: '',
    rightEditor: {
      cursorRowIndex: 0,
      cursorColumnIndex: 0,
    },
    renderModeRight: 'text',
    errorRightMessage: '',
    maxInputLines: 100,
  }

  const result = await handleBeforeInput(state, 'insertText', 'a')

  expect(result.contentRight).toBe('abeta')
  expect(diffWorkerRpc.invocations.length).toBeGreaterThan(0)
  diffWorkerRpc.restore()
})

test('handleBeforeInput returns state unchanged for unknown input types', async (): Promise<void> => {
  const state = createDefaultState()
  const result = await handleBeforeInput(state, 'insertParagraph', '')
  expect(result).toBe(state)
})
