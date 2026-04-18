import { expect, test } from '@jest/globals'
import { ExtensionHost, FileSystemWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('loadContent loads both sides of an inline diff uri', async (): Promise<void> => {
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
        return 'after-content\nsecond-line'
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
        return 'after-content\nsecond-line'
      }
      throw new Error(`unexpected params: ${String(uri)}`)
    },
    set: (): void => {},
  }
  ExtensionHost.set(extensionHostRpc as any)
  FileSystemWorker.set(fileSystemWorkerRpc as any)

  const state = {
    ...createDefaultState(),
    height: 60,
    itemHeight: 20,
    minimumSliderSize: 30,
    uri: 'inline-diff://data://before-content<->/tmp/after.txt',
  }

  const result = await loadContent(state, { minLineY: 1 })

  expect(extensionHostInvocations).toEqual([])
  expect(fileSystemWorkerInvocations).toEqual([['FileSystem.readFile', 'file:///tmp/after.txt']])
  expect(result).toMatchObject({
    contentLeft: 'before-content',
    contentRight: 'after-content\nsecond-line',
    deltaY: 0,
    errorLeftMessage: '',
    errorLeftStack: '',
    errorRightMessage: '',
    errorRightStack: '',
    finalDeltaY: 0,
    initial: false,
    maxLineY: 2,
    minLineY: 0,
    renderModeLeft: 'text',
    renderModeRight: 'text',
    scrollBarActive: false,
    scrollBarHeight: 60,
    totalLineCount: 2,
    uriLeft: 'data://before-content',
    uriRight: '/tmp/after.txt',
  })
})

test('loadContent stores pane load errors instead of throwing', async (): Promise<void> => {
  const error = new Error('file not found: /tmp/missing.txt')
  error.stack = 'Error: file not found: /tmp/missing.txt\n    at read missing file'
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
      if (uri === 'file:///tmp/missing.txt') {
        throw error
      }
      throw new Error(`unexpected params: ${String(uri)}`)
    },
    set: (): void => {},
  }
  ExtensionHost.set(extensionHostRpc as any)
  FileSystemWorker.set(fileSystemWorkerRpc as any)

  const state = {
    ...createDefaultState(),
    height: 40,
    itemHeight: 20,
    minimumSliderSize: 30,
    uri: 'inline-diff://data://before-content<->/tmp/missing.txt',
  }

  const result = await loadContent(state, { minLineY: 0 })

  expect(result).toMatchObject({
    contentLeft: 'before-content',
    contentRight: '',
    deltaY: 0,
    errorLeftMessage: '',
    errorLeftStack: '',
    errorRightMessage: 'file not found: /tmp/missing.txt',
    errorRightStack: 'Error: file not found: /tmp/missing.txt\n    at read missing file',
    finalDeltaY: 40,
    initial: false,
    maxLineY: 2,
    minLineY: 0,
    scrollBarActive: true,
    scrollBarHeight: 30,
    uriLeft: 'data://before-content',
    uriRight: '/tmp/missing.txt',
  })
})

test('loadContent sets image render mode when a side has an image extension', async (): Promise<void> => {
  const fileSystemWorkerInvocations: unknown[][] = []
  const fileSystemWorkerRpc = {
    dispose: (): void => {},
    invoke: async (method: string, ...params: readonly unknown[]): Promise<string> => {
      fileSystemWorkerInvocations.push([method, ...params])
      if (method !== 'FileSystem.readFile') {
        throw new Error(`unexpected method: ${method}`)
      }
      const [uri] = params
      if (uri === 'file:///tmp/before.png') {
        return 'binary-image-content'
      }
      if (uri === 'file:///tmp/after.txt') {
        return 'after-content\nsecond-line'
      }
      throw new Error(`unexpected params: ${String(uri)}`)
    },
    set: (): void => {},
  }
  FileSystemWorker.set(fileSystemWorkerRpc as any)

  const state = {
    ...createDefaultState(),
    height: 60,
    itemHeight: 20,
    minimumSliderSize: 30,
    uri: 'inline-diff:///tmp/before.png<->/tmp/after.txt',
  }

  const result = await loadContent(state, { minLineY: 0 })

  expect(fileSystemWorkerInvocations).toEqual([
    ['FileSystem.readFile', 'file:///tmp/before.png'],
    ['FileSystem.readFile', 'file:///tmp/after.txt'],
  ])
  expect(result).toMatchObject({
    contentLeft: 'binary-image-content',
    contentRight: 'after-content\nsecond-line',
    errorLeftMessage: '',
    errorLeftStack: '',
    errorRightMessage: '',
    errorRightStack: '',
    maxLineY: 2,
    renderModeLeft: 'image',
    renderModeRight: 'text',
    scrollBarHeight: 60,
    totalLineCount: 2,
    uriLeft: '/tmp/before.png',
    uriRight: '/tmp/after.txt',
  })
})

test('loadContent expands total line count for inline mode when replacements split into deletion and insertion rows', async (): Promise<void> => {
  const fileSystemWorkerRpc = {
    dispose: (): void => {},
    invoke: async (method: string, ...params: readonly unknown[]): Promise<string> => {
      if (method !== 'FileSystem.readFile') {
        throw new Error(`unexpected method: ${method}`)
      }
      const [uri] = params
      if (uri === 'file:///tmp/before.txt') {
        return 'same\nbefore\nshared'
      }
      if (uri === 'file:///tmp/after.txt') {
        return 'same\nafter\nshared'
      }
      throw new Error(`unexpected params: ${String(uri)}`)
    },
    set: (): void => {},
  }
  FileSystemWorker.set(fileSystemWorkerRpc as any)

  const state = {
    ...createDefaultState(),
    diffMode: 'inline' as const,
    height: 60,
    itemHeight: 20,
    minimumSliderSize: 30,
    uri: 'inline-diff:///tmp/before.txt<->/tmp/after.txt',
  }

  const result = await loadContent(state, { minLineY: 0 })

  expect(result).toMatchObject({
    contentLeft: 'same\nbefore\nshared',
    contentRight: 'same\nafter\nshared',
    diffMode: 'inline',
    finalDeltaY: 20,
    maxLineY: 3,
    minLineY: 0,
    totalLineCount: 4,
  })
})
