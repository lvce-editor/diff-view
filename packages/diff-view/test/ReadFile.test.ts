import { expect, test } from '@jest/globals'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { readFile } from '../src/parts/ReadFile/ReadFile.ts'

test('readFile returns empty content for untitled uri', async (): Promise<void> => {
  const mockRpc = {
    invocations: [] as readonly unknown[][],
    invoke: async (method: string, ...params: readonly unknown[]): Promise<string> => {
      mockRpc.invocations = [...mockRpc.invocations, [method, ...params]]
      throw new Error('should not invoke rpc')
    },
    set: (): void => {},
    dispose: (): void => {},
  }
  ExtensionHost.set(mockRpc as any)

  const result = await readFile('untitled://Untitled-1')

  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([])
})

test('readFile returns inline content for data uri', async (): Promise<void> => {
  const mockRpc = {
    invocations: [] as readonly unknown[][],
    invoke: async (method: string, ...params: readonly unknown[]): Promise<string> => {
      mockRpc.invocations = [...mockRpc.invocations, [method, ...params]]
      throw new Error(`unexpected method: ${method} ${params.join(' ')}`)
    },
    set: (): void => {},
    dispose: (): void => {},
  }
  ExtensionHost.set(mockRpc as any)

  const result = await readFile('data://before-content')

  expect(result).toBe('before-content')
  expect(mockRpc.invocations).toEqual([])
})

test('readFile reads file content through extension host', async (): Promise<void> => {
  const mockRpc = {
    invocations: [] as readonly unknown[][],
    invoke: async (method: string, ...params: readonly unknown[]): Promise<string> => {
      mockRpc.invocations = [...mockRpc.invocations, [method, ...params]]
      if (method !== 'ExtensionHostFileSystem.readFile') {
        throw new Error(`unexpected method: ${method}`)
      }
      return 'after-content'
    },
    set: (): void => {},
    dispose: (): void => {},
  }
  ExtensionHost.set(mockRpc as any)

  const result = await readFile('/tmp/after.txt')

  expect(result).toBe('after-content')
  expect(mockRpc.invocations).toEqual([['ExtensionHostFileSystem.readFile', 'file', '/tmp/after.txt']])
})
