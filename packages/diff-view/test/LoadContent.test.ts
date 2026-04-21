import { expect, jest, test } from '@jest/globals'
import { DiffWorker, ExtensionHost, ExtensionManagementWorker, FileSystemWorker, SyntaxHighlightingWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import { VisibleLineType } from '../src/parts/VisibleLine/VisibleLine.ts'

test('loadContent loads both sides of an inline diff uri', async (): Promise<void> => {
  const diffWorkerInvocations: unknown[][] = []
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
  const diffWorkerRpc = {
    dispose: (): void => {},
    invoke: async (method: string, ...params: readonly unknown[]): Promise<readonly unknown[]> => {
      diffWorkerInvocations.push([method, ...params])
      if (method !== 'Diff.diffInline') {
        throw new Error(`unexpected method: ${method}`)
      }
      expect(params).toEqual([['before-content'], ['after-content', 'second-line']])
      return [
        { leftIndex: 0, rightIndex: 0, type: 2 },
        { leftIndex: 0, rightIndex: 0, type: 1 },
        { leftIndex: 0, rightIndex: 1, type: 1 },
      ]
    },
    set: (): void => {},
  }
  ExtensionHost.set(extensionHostRpc as any)
  DiffWorker.set(diffWorkerRpc as any)
  FileSystemWorker.set(fileSystemWorkerRpc as any)

  const state = {
    ...createDefaultState(),
    height: 60,
    itemHeight: 20,
    minimumSliderSize: 30,
    uri: 'inline-diff://data://before-content<->/tmp/after.txt',
  }

  const result = await loadContent(state, { minLineY: 1 })

  expect(diffWorkerInvocations).toEqual([['Diff.diffInline', ['before-content'], ['after-content', 'second-line']]])
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
    inlineChanges: [
      { leftIndex: 0, rightIndex: 0, type: 2 },
      { leftIndex: 0, rightIndex: 0, type: 1 },
      { leftIndex: 0, rightIndex: 1, type: 1 },
    ],
    maxLineY: 3,
    minLineY: 0,
    renderModeLeft: 'text',
    renderModeRight: 'text',
    scrollBarActive: false,
    scrollBarHeight: 60,
    totalLineCount: 3,
    totalLineCountLeft: 1,
    totalLineCountRight: 2,
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
  const diffWorkerRpc = {
    dispose: (): void => {},
    invoke: async (): Promise<readonly unknown[]> => {
      throw new Error('should not invoke diff worker when a pane fails to load')
    },
    set: (): void => {},
  }
  ExtensionHost.set(extensionHostRpc as any)
  DiffWorker.set(diffWorkerRpc as any)
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
    totalLineCountLeft: 1,
    totalLineCountRight: 4,
    uriLeft: 'data://before-content',
    uriRight: '/tmp/missing.txt',
  })
})

test('loadContent sets image render mode when a side has an image extension', async (): Promise<void> => {
  const fileSystemWorkerInvocations: unknown[][] = []
  const createObjectUrlMock = jest.spyOn((globalThis as any).URL, 'createObjectURL').mockReturnValue('blob:before.png')
  const fileSystemWorkerRpc = {
    dispose: (): void => {},
    invoke: async (method: string, ...params: readonly unknown[]): Promise<unknown> => {
      fileSystemWorkerInvocations.push([method, ...params])
      if (method === 'FileSystem.readFile') {
        const [uri] = params
        if (uri === 'file:///tmp/before.png') {
          return 'binary-image-content'
        }
        if (uri === 'file:///tmp/after.txt') {
          return 'after-content\nsecond-line'
        }
        throw new Error(`unexpected params: ${String(uri)}`)
      }
      if (method === 'FileSystem.readFileAsBlob') {
        const [uri] = params
        if (uri === 'file:///tmp/before.png') {
          return {}
        }
        throw new Error(`unexpected params: ${String(uri)}`)
      }
      throw new Error(`unexpected method: ${method}`)
    },
    set: (): void => {},
  }
  const diffWorkerRpc = {
    dispose: (): void => {},
    invoke: async (): Promise<readonly unknown[]> => {
      throw new Error('should not invoke diff worker for image panes')
    },
    set: (): void => {},
  }
  DiffWorker.set(diffWorkerRpc as any)
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
    ['FileSystem.readFileAsBlob', 'file:///tmp/before.png'],
  ])
  expect(result).toMatchObject({
    contentLeft: 'binary-image-content',
    contentRight: 'after-content\nsecond-line',
    errorLeftMessage: '',
    errorLeftStack: '',
    errorRightMessage: '',
    errorRightStack: '',
    imageSrcLeft: 'blob:before.png',
    imageSrcRight: '',
    maxLineY: 2,
    renderModeLeft: 'image',
    renderModeRight: 'text',
    scrollBarHeight: 60,
    totalLineCount: 2,
    totalLineCountLeft: 1,
    totalLineCountRight: 2,
    uriLeft: '/tmp/before.png',
    uriRight: '/tmp/after.txt',
  })
  createObjectUrlMock.mockRestore()
})

test('loadContent expands total line count for inline mode when replacements split into deletion and insertion rows', async (): Promise<void> => {
  const diffWorkerInvocations: unknown[][] = []
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
  const diffWorkerRpc = {
    dispose: (): void => {},
    invoke: async (method: string, ...params: readonly unknown[]): Promise<readonly unknown[]> => {
      diffWorkerInvocations.push([method, ...params])
      if (method !== 'Diff.diffInline') {
        throw new Error(`unexpected method: ${method}`)
      }
      expect(params).toEqual([
        ['same', 'before', 'shared'],
        ['same', 'after', 'shared'],
      ])
      return [
        { leftIndex: 0, rightIndex: 0, type: 0 },
        { leftIndex: 1, rightIndex: 1, type: 2 },
        { leftIndex: 1, rightIndex: 1, type: 1 },
        { leftIndex: 2, rightIndex: 2, type: 0 },
      ]
    },
    set: (): void => {},
  }
  DiffWorker.set(diffWorkerRpc as any)
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

  expect(diffWorkerInvocations).toEqual([['Diff.diffInline', ['same', 'before', 'shared'], ['same', 'after', 'shared']]])
  expect(result).toMatchObject({
    contentLeft: 'same\nbefore\nshared',
    contentRight: 'same\nafter\nshared',
    diffMode: 'inline',
    finalDeltaY: 20,
    maxLineY: 3,
    minLineY: 0,
    totalLineCount: 4,
    visibleLinesLeft: [
      {
        lineNumber: 1,
        tokens: [{ text: 'same', type: '' }],
        type: VisibleLineType.Normal,
      },
      {
        lineNumber: 2,
        tokens: [{ text: 'before', type: '' }],
        type: VisibleLineType.Removed,
      },
      {
        lineNumber: 3,
        tokens: [],
        type: VisibleLineType.Normal,
      },
    ],
    visibleLinesRight: [
      {
        lineNumber: 1,
        tokens: [{ text: 'same', type: '' }],
        type: VisibleLineType.Normal,
      },
      {
        lineNumber: 2,
        tokens: [],
        type: VisibleLineType.Normal,
      },
      {
        lineNumber: 3,
        tokens: [{ text: 'after', type: '' }],
        type: VisibleLineType.Added,
      },
    ],
  })
})

test('loadContent resolves language ids and tokenizes both panes when syntax metadata is available', async (): Promise<void> => {
  const diffWorkerRpc = {
    dispose: (): void => {},
    invocations: [] as unknown[][],
    invoke: async (method: string, ...params: readonly unknown[]): Promise<readonly unknown[]> => {
      diffWorkerRpc.invocations.push([method, ...params])
      if (method !== 'Diff.diffInline') {
        throw new Error(`unexpected method: ${method}`)
      }
      expect(params).toEqual([['const left = 1'], ['const right = 2']])
      return [{ leftIndex: 0, rightIndex: 0, type: 0 }]
    },
    set: (): void => {},
  }
  const extensionManagementWorkerRpc = {
    dispose: (): void => {},
    invocations: [] as unknown[][],
    invoke: async (method: string, ...params: readonly unknown[]): Promise<readonly unknown[]> => {
      extensionManagementWorkerRpc.invocations.push([method, ...params])
      if (method !== 'Extensions.getLanguages') {
        throw new Error(`unexpected method: ${method}`)
      }
      expect(params).toEqual([7, '/tmp/assets'])
      return [
        {
          extensions: ['.ts'],
          id: 'typescript',
          tokenize: '/remote/extensions/builtin.language-basics-typescript/src/tokenizeTypeScript.js',
        },
      ]
    },
    set: (): void => {},
  }
  const fileSystemWorkerRpc = {
    dispose: (): void => {},
    invocations: [] as unknown[][],
    invoke: async (method: string, ...params: readonly unknown[]): Promise<string> => {
      fileSystemWorkerRpc.invocations.push([method, ...params])
      if (method !== 'FileSystem.readFile') {
        throw new Error(`unexpected method: ${method}`)
      }
      const [uri] = params
      if (uri === 'file:///tmp/left.ts') {
        return 'const left = 1'
      }
      if (uri === 'file:///tmp/right.ts') {
        return 'const right = 2'
      }
      throw new Error(`unexpected params: ${String(uri)}`)
    },
    set: (): void => {},
  }
  const syntaxHighlightingWorkerRpc = {
    dispose: (): void => {},
    invocations: [] as unknown[][],
    invoke: async (method: string, ...params: readonly unknown[]): Promise<unknown> => {
      syntaxHighlightingWorkerRpc.invocations.push([method, ...params])
      if (method === 'Tokenizer.load') {
        return undefined
      }
      if (method === 'Tokenizer.tokenizeCodeBlock') {
        const [codeBlock] = params
        if (codeBlock === 'const left = 1') {
          return [['const', 'Token Keyword', ' left = 1', 'Token Text']]
        }
        if (codeBlock === 'const right = 2') {
          return [['const', 'Token Keyword', ' right = 2', 'Token Text']]
        }
      }
      throw new Error(`unexpected method: ${method}`)
    },
    set: (): void => {},
  }
  DiffWorker.set(diffWorkerRpc as any)
  ExtensionManagementWorker.set(extensionManagementWorkerRpc as any)
  FileSystemWorker.set(fileSystemWorkerRpc as any)
  SyntaxHighlightingWorker.set(syntaxHighlightingWorkerRpc as any)

  const state = {
    ...createDefaultState(),
    assetDir: '/tmp/assets',
    height: 40,
    itemHeight: 20,
    minimumSliderSize: 30,
    platform: 7,
    uri: 'inline-diff:///tmp/left.ts<->/tmp/right.ts',
  }

  const result = await loadContent(state, { minLineY: 0 })

  expect(extensionManagementWorkerRpc.invocations).toEqual([['Extensions.getLanguages', 7, '/tmp/assets']])
  expect(syntaxHighlightingWorkerRpc.invocations).toEqual([
    ['Tokenizer.load', 'typescript', '/remote/extensions/builtin.language-basics-typescript/src/tokenizeTypeScript.js'],
    ['Tokenizer.tokenizeCodeBlock', 'const left = 1', 'typescript', '/remote/extensions/builtin.language-basics-typescript/src/tokenizeTypeScript.js'],
    ['Tokenizer.tokenizeCodeBlock', 'const right = 2', 'typescript', '/remote/extensions/builtin.language-basics-typescript/src/tokenizeTypeScript.js'],
  ])
  expect(result).toMatchObject({
    languageIdLeft: 'typescript',
    languageIdRight: 'typescript',
    tokenizedLinesLeft: [['const', 'Token Keyword', ' left = 1', 'Token Text']],
    tokenizedLinesRight: [['const', 'Token Keyword', ' right = 2', 'Token Text']],
  })
})
