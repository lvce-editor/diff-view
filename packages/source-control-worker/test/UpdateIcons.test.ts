import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as UpdateIcons from '../src/parts/UpdateIcons/UpdateIcons.ts'

const commandMap = {
  'IconTheme.getFileIcon': async (): Promise<string[]> => ['icon1', 'icon2'],
  'IconTheme.getFolderIcon': async (): Promise<string[]> => ['icon1', 'icon2'],
  'IconTheme.getIcons': async (): Promise<string[]> => ['icon1', 'icon2'],
}

test('updateIcons - should update icons for visible items', async (): Promise<void> => {
  const mockRpc = RendererWorker.registerMockRpc(commandMap)
  const defaultState = CreateDefaultState.createDefaultState()
  const state: SourceControlState = {
    ...defaultState,
    items: [
      // @ts-ignore
      { depth: 1, name: 'file1.ts', path: '/test/file1.ts', selected: false, type: 1 },
      // @ts-ignore
      { depth: 1, name: 'file2.ts', path: '/test/file2.ts', selected: false, type: 1 },
      // @ts-ignore
      { depth: 1, name: 'file3.ts', path: '/test/file3.ts', selected: false, type: 1 },
    ],
    maxLineY: 2,
    minLineY: 0,
  }

  const result = await UpdateIcons.updateIcons(state)

  expect(result.fileIconCache).toBeDefined()
  expect(result.items).toEqual(state.items)
  expect(result.minLineY).toBe(state.minLineY)
  expect(result.maxLineY).toBe(state.maxLineY)
  expect(mockRpc.invocations.length).toBeGreaterThan(0)
})

test('updateIcons - should handle empty visible items', async (): Promise<void> => {
  const mockRpc = RendererWorker.registerMockRpc(commandMap)
  const defaultState = CreateDefaultState.createDefaultState()
  const state: SourceControlState = {
    ...defaultState,
    items: [],
    maxLineY: 0,
    minLineY: 0,
  }

  const result = await UpdateIcons.updateIcons(state)

  expect(result.fileIconCache).toBeDefined()
  expect(result.items).toEqual(state.items)
  expect(mockRpc.invocations).toEqual([['IconTheme.getIcons', []]])
})
