import { expect, test } from '@jest/globals'
import { ExtensionHost, FileSystemWorker } from '@lvce-editor/rpc-registry'
import { readFile } from '../src/parts/ReadFile/ReadFile.ts'

test('readFile returns empty content for untitled uri', async (): Promise<void> => {
  const mockRpc = {
    dispose: (): void => {},
    invocations: [] as readonly unknown[][],
    invoke: async (method: string, ...params: readonly unknown[]): Promise<string> => {
      mockRpc.invocations = [...mockRpc.invocations, [method, ...params]]
      throw new Error('should not invoke rpc')
    },
    set: (): void => {},
  }
  ExtensionHost.set(mockRpc as any)

  const result = await readFile('untitled://Untitled-1')

  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([])
})

test('readFile returns inline content for data uri', async (): Promise<void> => {
  const mockRpc = {
    dispose: (): void => {},
    invocations: [] as readonly unknown[][],
    invoke: async (method: string, ...params: readonly unknown[]): Promise<string> => {
      mockRpc.invocations = [...mockRpc.invocations, [method, ...params]]
      throw new Error(`unexpected method: ${method} ${params.join(' ')}`)
    },
    set: (): void => {},
  }
  ExtensionHost.set(mockRpc as any)

  const result = await readFile('data://before-content')

  expect(result).toBe('before-content')
  expect(mockRpc.invocations).toEqual([])
})

test.skip('readFile reads file content through file system worker', async (): Promise<void> => {
  const extensionHostRpc = {
    dispose: (): void => {},
    invocations: [] as readonly unknown[][],
    invoke: async (method: string, ...params: readonly unknown[]): Promise<string> => {
      extensionHostRpc.invocations = [...extensionHostRpc.invocations, [method, ...params]]
      throw new Error(`unexpected method: ${method}`)
    },
    set: (): void => {},
  }
  const fileSystemWorkerRpc = {
    dispose: (): void => {},
    invocations: [] as readonly unknown[][],
    invoke: async (method: string, ...params: readonly unknown[]): Promise<string> => {
      fileSystemWorkerRpc.invocations = [...fileSystemWorkerRpc.invocations, [method, ...params]]
      if (method !== 'FileSystem.readFile') {
        throw new Error(`unexpected method: ${method}`)
      }
      const [uri] = params
      if (uri !== 'file:///tmp/after.txt') {
        throw new Error(`unexpected params: ${String(uri)}`)
      }
      return 'after-content'
    },
    set: (): void => {},
  }
  ExtensionHost.set(extensionHostRpc as any)
  FileSystemWorker.set(fileSystemWorkerRpc as any)

  const result = await readFile('/tmp/after.txt')

  expect(result).toBe('after-content')
  expect(extensionHostRpc.invocations).toEqual([])
  expect(fileSystemWorkerRpc.invocations).toEqual([['FileSystem.readFile', 'file:///tmp/after.txt']])
})
