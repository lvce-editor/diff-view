import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker, FileSystemWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { readFile } from '../src/parts/ReadFile/ReadFile.ts'

test('readFile returns empty content for untitled uri', async (): Promise<void> => {
  const result = await readFile('untitled://Untitled-1')

  expect(result).toBe('')
})

test('readFile returns inline content for data uri', async (): Promise<void> => {
  const result = await readFile('data://before-content')

  expect(result).toBe('before-content')
})

test('readFile reads file content through file system worker', async (): Promise<void> => {
  const fileSystemWorkerRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': async (uri: string): Promise<string> => {
      if (uri !== 'file:///tmp/after.txt') {
        throw new Error(`unexpected params: ${uri}`)
      }
      return 'after-content'
    },
  })

  const result = await readFile('/tmp/after.txt')

  expect(result).toBe('after-content')
  expect(fileSystemWorkerRpc.invocations).toEqual([['FileSystem.readFile', 'file:///tmp/after.txt']])
})

test('readFile reads memfs content through the renderer file system', async (): Promise<void> => {
  const rendererWorkerRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile': async (uri: string): Promise<string> => {
      if (uri !== 'memfs:///workspace/file.txt') {
        throw new Error(`unexpected params: ${uri}`)
      }
      return 'memfs-content'
    },
  })

  const result = await readFile('memfs:///workspace/file.txt')

  expect(result).toBe('memfs-content')
  expect(rendererWorkerRpc.invocations).toEqual([['FileSystem.readFile', 'memfs:///workspace/file.txt']])
})

test('readFile reads fetch content through renderer file system', async (): Promise<void> => {
  const rendererWorkerRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile': async (uri: string): Promise<string> => {
      if (uri !== 'fetch:///playground/package-lock.json') {
        throw new Error(`unexpected params: ${uri}`)
      }
      return 'fetch-content'
    },
  })

  const result = await readFile('fetch:///playground/package-lock.json')

  expect(result).toBe('fetch-content')
  expect(rendererWorkerRpc.invocations).toEqual([['FileSystem.readFile', 'fetch:///playground/package-lock.json']])
})

test('readFile reads extension protocols through extension management worker', async (): Promise<void> => {
  const extensionManagementWorkerRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeFileSystemProviderReadFile': async (protocol: string, uri: string): Promise<unknown> => {
      if (protocol !== 'git-file-before' || uri !== 'git-file-before://file:///workspace/src/file.ts') {
        throw new Error(`unexpected params: ${protocol} ${uri}`)
      }
      return { found: true, result: 'git-content' }
    },
  })

  const result = await readFile('git-file-before://file:///workspace/src/file.ts')

  expect(result).toBe('git-content')
  expect(extensionManagementWorkerRpc.invocations).toEqual([
    ['Extensions.executeFileSystemProviderReadFile', 'git-file-before', 'git-file-before://file:///workspace/src/file.ts'],
  ])
})

test('readFile decodes Blob content from extension file system providers', async (): Promise<void> => {
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeFileSystemProviderReadFile': async (): Promise<unknown> => ({
      found: true,
      result: new Blob(['before 😀\nafter'], { type: 'text/plain' }),
    }),
  })

  await expect(readFile('remote-ssh:///workspace/file.txt')).resolves.toBe('before 😀\nafter')
})

test('readFile returns empty content from an empty Blob extension provider', async (): Promise<void> => {
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeFileSystemProviderReadFile': async (): Promise<unknown> => ({
      found: true,
      result: new Blob([]),
    }),
  })

  await expect(readFile('remote-ssh:///workspace/empty.txt')).resolves.toBe('')
})

test('readFile rejects invalid extension file system provider results', async (): Promise<void> => {
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeFileSystemProviderReadFile': async (): Promise<unknown> => ({ found: true, result: { content: 'not text' } }),
  })

  await expect(readFile('remote-ssh:///workspace/file.txt')).rejects.toThrow('expected file system provider remote-ssh to return a string or Blob')
})

test('readFile rejects when no isolated extension provides the protocol', async (): Promise<void> => {
  ExtensionManagementWorker.registerMockRpc({
    'Extensions.executeFileSystemProviderReadFile': async (): Promise<unknown> => ({ found: false }),
  })

  await expect(readFile('missing:///workspace/file.txt')).rejects.toThrow('no file system provider found for missing')
})
