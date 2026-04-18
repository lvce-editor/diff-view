import { expect, test } from '@jest/globals'
import { ExtensionHost, FileSystemWorker } from '@lvce-editor/rpc-registry'
import { loadFileContents } from '../src/parts/LoadFileContents/LoadFileContents.ts'

test('loadFileContents loads both files in order', async (): Promise<void> => {
  const extensionHostInvocations: unknown[][] = []
  const fileSystemWorkerInvocations: unknown[][] = []
  const extensionHostRpc = {
    dispose: (): void => {},
    invoke: async (method: string, ...params: readonly unknown[]): Promise<string> => {
      extensionHostInvocations.push([method, ...params])
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
  const fileSystemWorkerRpc = {
    dispose: (): void => {},
    invoke: async (method: string, ...params: readonly unknown[]): Promise<string> => {
      fileSystemWorkerInvocations.push([method, ...params])
      if (method !== 'FileSystem.readFile') {
        throw new Error(`unexpected method: ${method}`)
      }
      const [uri] = params
      if (uri === 'file:///tmp/after.txt') {
        return 'after-content'
      }
      throw new Error(`unexpected params: ${String(uri)}`)
    },
    set: (): void => {},
  }
  ExtensionHost.set(extensionHostRpc as any)
  FileSystemWorker.set(fileSystemWorkerRpc as any)

  const result = await loadFileContents('data://before-content', '/tmp/after.txt')

  expect(extensionHostInvocations).toEqual([])
  expect(fileSystemWorkerInvocations).toEqual([['FileSystem.readFile', 'file:///tmp/after.txt']])
  expect(result).toEqual(['before-content', 'after-content'])
})
