import { expect, test } from '@jest/globals'
import { DiffWorker } from '@lvce-editor/rpc-registry'
import { getInlineDiffState } from '../src/parts/GetInlineDiffState/GetInlineDiffState.ts'

test('inline replacements use separate display rows for the original and modified lines', async () => {
  using mockRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async () => [
      { leftIndex: 0, rightIndex: 0, type: 2 },
      { leftIndex: 0, rightIndex: 0, type: 1 },
    ],
  })
  const inline = await getInlineDiffState('old', 'new', 'inline')
  const sideBySide = await getInlineDiffState('old', 'new', 'side-by-side')
  expect(inline.totalLineCount).toBe(2)
  expect(sideBySide.totalLineCount).toBe(1)
  expect(mockRpc.invocations).toHaveLength(2)
})

test('inline scrolling includes conflict decoration rows', async () => {
  using mockRpc = DiffWorker.registerMockRpc({ 'Diff.diffInline': async () => [] })
  const content = '<<<<<<< HEAD\ncurrent\n=======\nincoming\n>>>>>>> branch'
  const result = await getInlineDiffState(content, content, 'inline')
  expect(result.totalLineCount).toBe(7)
  expect(mockRpc.invocations).toHaveLength(1)
})
