import { expect, test } from '@jest/globals'
import { DiffWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { deleteLeft } from '../src/parts/DeleteLeft/DeleteLeft.ts'
import { deleteRight } from '../src/parts/DeleteRight/DeleteRight.ts'
import { insertLineBreak } from '../src/parts/InsertLineBreak/InsertLineBreak.ts'

test('insertLineBreak inserts a newline into the edit buffer', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (beforeLines: readonly string[], afterLines: readonly string[]): Promise<readonly unknown[]> => {
      expect([beforeLines, afterLines]).toEqual([['alpha'], ['gamma', 'beta']])
      return []
    },
  })
  const state = {
    ...createDefaultState(),
    contentLeft: 'alpha',
    contentRight: 'gammabeta',
    inputValue: 'gamma',
    totalLineCountLeft: 1,
    totalLineCountRight: 1,
  }

  const result = await insertLineBreak(state)

  expect(diffWorkerRpc.invocations).toEqual([['Diff.diffInline', ['alpha'], ['gamma', 'beta']]])
  expect(result.contentRight).toBe('gamma\nbeta')
  expect(result.inputValue).toBe('gamma\n')
  expect(result.totalLineCountRight).toBe(2)
})

test('insertLineBreak returns the same state when max input lines is reached', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => {
      throw new Error('should not diff when max input lines is reached')
    },
  })
  const state = {
    ...createDefaultState(),
    inputValue: 'first',
    maxInputLines: 1,
  }

  const result = await insertLineBreak(state)

  expect(diffWorkerRpc.invocations).toEqual([])
  expect(result).toBe(state)
})

test('deleteLeft deletes the previous edit buffer character', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (beforeLines: readonly string[], afterLines: readonly string[]): Promise<readonly unknown[]> => {
      expect([beforeLines, afterLines]).toEqual([['alpha'], ['gammabeta']])
      return []
    },
  })
  const state = {
    ...createDefaultState(),
    contentLeft: 'alpha',
    contentRight: 'gamma beta',
    inputValue: 'gamma ',
    totalLineCountLeft: 1,
    totalLineCountRight: 1,
  }

  const result = await deleteLeft(state)

  expect(diffWorkerRpc.invocations).toEqual([['Diff.diffInline', ['alpha'], ['gammabeta']]])
  expect(result.contentRight).toBe('gammabeta')
  expect(result.inputValue).toBe('gamma')
})

test('deleteLeft returns the same state for an empty edit buffer', async (): Promise<void> => {
  const state = createDefaultState()

  const result = await deleteLeft(state)

  expect(result).toBe(state)
})

test('deleteRight returns the same state at the prepend boundary', (): void => {
  const state = createDefaultState()

  const result = deleteRight(state)

  expect(result).toBe(state)
})
