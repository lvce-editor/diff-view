import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { readFile } from '../src/parts/FileSystem/FileSystem.ts'

test('readFile', async (): Promise<void> => {
  const commandMap = {
    'FileSystem.readFile': async (): Promise<string> => 'test content',
  }
  const mockRpc = RendererWorker.registerMockRpc(commandMap)
  const content = await readFile('test.txt')
  expect(content).toBe('test content')
  expect(mockRpc.invocations).toEqual([['FileSystem.readFile', 'test.txt']])
})
