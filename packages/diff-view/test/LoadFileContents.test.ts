import { expect, test } from '@jest/globals'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { loadFileContents } from '../src/parts/LoadFileContents/LoadFileContents.ts'

test('loadFileContents loads both files in order', async (): Promise<void> => {
  const invocations: unknown[][] = []
  const mockRpc = {
    dispose: (): void => {},
    invocations,
    invoke: async (method: string, ...params: readonly unknown[]): Promise<string> => {
      invocations.push([method, ...params])
      if (method !== 'ExtensionHostFileSystem.readFile') {
        throw new Error(`unexpected method: ${method}`)
      }
      const [protocol, path] = params
      if (protocol === 'data' && path === 'before-content') {
        return 'before-content'
      }
      if (protocol === 'file' && path === '/tmp/after.txt') {
        return 'after-content'
      }
      throw new Error(`unexpected params: ${String(protocol)} ${String(path)}`)
    },
    set: (): void => {},
  }
  ExtensionHost.set(mockRpc as any)

  const result = await loadFileContents('data://before-content', '/tmp/after.txt')

  expect(invocations).toEqual([['ExtensionHostFileSystem.readFile', 'file', '/tmp/after.txt']])
  expect(result).toEqual(['before-content', 'after-content'])
})
