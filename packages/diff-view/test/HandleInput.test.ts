import { expect, test } from '@jest/globals'
import { DiffWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleInput } from '../src/parts/HandleInput/HandleInput.ts'
import { VisibleLineType } from '../src/parts/VisibleLine/VisibleLine.ts'

test('handleInput inserts input at the start of the right content and recomputes the diff', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (beforeLines: readonly string[], afterLines: readonly string[]): Promise<readonly unknown[]> => {
      expect([beforeLines, afterLines]).toEqual([['alpha'], ['gamma beta']])
      return [
        { leftIndex: 0, rightIndex: 0, type: 2 },
        { leftIndex: 0, rightIndex: 0, type: 1 },
      ]
    },
  })
  const state = {
    ...createDefaultState(),
    contentLeft: 'alpha',
    contentRight: 'beta',
    height: 40,
    itemHeight: 20,
    maxLineY: 1,
    minimumSliderSize: 30,
    totalLineCount: 1,
    totalLineCountLeft: 1,
    totalLineCountRight: 1,
  }

  const result = await handleInput(state, 'gamma ')

  expect(diffWorkerRpc.invocations).toEqual([['Diff.diffInline', ['alpha'], ['gamma beta']]])
  expect(result).toMatchObject({
    contentRight: 'gamma beta',
    inputValue: 'gamma ',
    maxLineY: 1,
    minLineY: 0,
    totalLineCount: 1,
    totalLineCountLeft: 1,
    totalLineCountRight: 1,
    visibleLinesRight: [
      {
        lineNumber: 1,
        tokens: [
          { text: 'g', type: 'DiffToken--changed' },
          { text: 'a', type: '' },
          { text: 'mma bet', type: 'DiffToken--changed' },
          { text: 'a', type: '' },
        ],
        type: VisibleLineType.Added,
      },
    ],
  })
})

test('handleInput applies the hidden input value before the stable right content', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (beforeLines: readonly string[], afterLines: readonly string[]): Promise<readonly unknown[]> => {
      expect([beforeLines, afterLines]).toEqual([['alpha'], ['gamma !beta']])
      return [
        { leftIndex: 0, rightIndex: 0, type: 2 },
        { leftIndex: 0, rightIndex: 0, type: 1 },
      ]
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

  const result = await handleInput(state, 'gamma !')

  expect(diffWorkerRpc.invocations).toEqual([['Diff.diffInline', ['alpha'], ['gamma !beta']]])
  expect(result.contentRight).toBe('gamma !beta')
  expect(result.inputValue).toBe('gamma !')
})

test('handleInput supports shrinking the hidden input value', async (): Promise<void> => {
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

  const result = await handleInput(state, 'gamma')

  expect(diffWorkerRpc.invocations).toEqual([['Diff.diffInline', ['alpha'], ['gammabeta']]])
  expect(result.contentRight).toBe('gammabeta')
  expect(result.inputValue).toBe('gamma')
})

test('handleInput returns the same state for unchanged input value', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => {
      throw new Error('should not diff unchanged input')
    },
  })
  const state = {
    ...createDefaultState(),
    inputValue: 'gamma ',
  }

  const result = await handleInput(state, 'gamma ')

  expect(diffWorkerRpc.invocations).toEqual([])
  expect(result).toBe(state)
})
