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

test('readFile reads file content through file system worker', async (): Promise<void> => {
  const extensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostFileSystem.readFile': async (): Promise<string> => {
      throw new Error('should not call extension host for file uris')
    },
  })
  const fileSystemWorkerRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': async (uri: string): Promise<string> => {
      if (uri !== 'file:///tmp/after.txt') {
        throw new Error(`unexpected params: ${String(uri)}`)
      }
      return 'after-content'
    },
  })

  const result = await readFile('/tmp/after.txt')

  expect(result).toBe('after-content')
  expect(extensionHostRpc.invocations).toEqual([])
  expect(fileSystemWorkerRpc.invocations).toEqual([['FileSystem.readFile', 'file:///tmp/after.txt']])
})

test('readFile reads memfs content through the memory file system command', async (): Promise<void> => {
  const extensionHostRpc = ExtensionHost.registerMockRpc({
    'FileSystemMemory.readFile': async (path: string): Promise<string> => {
      if (path !== '/workspace/file.txt') {
        throw new Error(`unexpected params: ${String(path)}`)
      }
      return 'memfs-content'
    },
  })

  const result = await readFile('memfs:///workspace/file.txt')

  expect(result).toBe('memfs-content')
  expect(extensionHostRpc.invocations).toEqual([['FileSystemMemory.readFile', '/workspace/file.txt']])
})

test('readFile reads non-file protocols through extension host', async (): Promise<void> => {
  const extensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostFileSystem.readFile': async (protocol: string, path: string): Promise<string> => {
      if (protocol !== 'git' || path !== 'HEAD~1:src/file.ts') {
        throw new Error(`unexpected params: ${String(protocol)} ${String(path)}`)
      }
      return 'git-content'
    },
  })

  const result = await readFile('git://HEAD~1:src/file.ts')

  expect(result).toBe('git-content')
  expect(extensionHostRpc.invocations).toEqual([['ExtensionHostFileSystem.readFile', 'git', 'HEAD~1:src/file.ts']])
})
