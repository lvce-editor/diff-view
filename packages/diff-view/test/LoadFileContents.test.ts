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
      if (uri === '/tmp/after.txt') {
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
  expect(fileSystemWorkerInvocations).toEqual([['FileSystem.readFile', '/tmp/after.txt']])
  expect(result).toEqual([
    {
      content: 'before-content',
      errorMessage: '',
      errorStack: '',
    },
    {
      content: 'after-content',
      errorMessage: '',
      errorStack: '',
    },
  ])
})

test('loadFileContents captures per-side read errors', async (): Promise<void> => {
  const error = new Error('file not found')
  error.stack = 'Error: file not found\n    at read missing file'
  const extensionHostRpc = {
    dispose: (): void => {},
    invoke: async (): Promise<string> => {
      throw new Error('should not invoke extension host')
    },
    set: (): void => {},
  }
  const fileSystemWorkerRpc = {
    dispose: (): void => {},
    invoke: async (method: string, ...params: readonly unknown[]): Promise<string> => {
      if (method !== 'FileSystem.readFile') {
        throw new Error(`unexpected method: ${method}`)
      }
      const [uri] = params
      if (uri === '/tmp/after.txt') {
        throw error
      }
      throw new Error(`unexpected params: ${String(uri)}`)
    },
    set: (): void => {},
  }
  ExtensionHost.set(extensionHostRpc as any)
  FileSystemWorker.set(fileSystemWorkerRpc as any)

  const result = await loadFileContents('data://before-content', '/tmp/after.txt')

  expect(result).toEqual([
    {
      content: 'before-content',
      errorMessage: '',
      errorStack: '',
    },
    {
      content: '',
      errorMessage: 'file not found',
      errorStack: 'Error: file not found\n    at read missing file',
    },
  ])
})
