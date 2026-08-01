import { expect, test } from '@jest/globals'
import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import { loadFileContents } from '../src/parts/LoadFileContents/LoadFileContents.ts'

test('loadFileContents loads both files in order', async (): Promise<void> => {
  const fileSystemWorkerInvocations: unknown[][] = []
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
  FileSystemWorker.set(fileSystemWorkerRpc as any)

  const result = await loadFileContents('data://before-content', '/tmp/after.txt')

  expect(fileSystemWorkerInvocations).toEqual([['FileSystem.readFile', 'file:///tmp/after.txt']])
  expect(result).toEqual({
    contentLeft: 'before-content',
    contentRight: 'after-content',
    errorLeftCodeFrame: '',
    errorLeftMessage: '',
    errorLeftStack: '',
    errorRightCodeFrame: '',
    errorRightMessage: '',
    errorRightStack: '',
  })
})

test('loadFileContents captures per-side read errors', async (): Promise<void> => {
  const error = new Error('file not found')
  Object.defineProperty(error, 'stack', {
    value: 'Error: file not found\n    at read missing file',
  })
  const fileSystemWorkerRpc = {
    dispose: (): void => {},
    invoke: async (method: string, ...params: readonly unknown[]): Promise<string> => {
      if (method !== 'FileSystem.readFile') {
        throw new Error(`unexpected method: ${method}`)
      }
      const [uri] = params
      if (uri === 'file:///tmp/after.txt') {
        throw error
      }
      throw new Error(`unexpected params: ${String(uri)}`)
    },
    set: (): void => {},
  }
  FileSystemWorker.set(fileSystemWorkerRpc as any)

  const result = await loadFileContents('data://before-content', '/tmp/after.txt')

  expect(result).toEqual({
    contentLeft: 'before-content',
    contentRight: '',
    errorLeftCodeFrame: '',
    errorLeftMessage: '',
    errorLeftStack: '',
    errorRightCodeFrame: '',
    errorRightMessage: 'file not found',
    errorRightStack: 'Error: file not found\n    at read missing file',
  })
})
