import { expect, jest, test } from '@jest/globals'
import { DiffWorker, ExtensionHost, ExtensionManagementWorker, FileSystemWorker, SyntaxHighlightingWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import { VisibleLineType } from '../src/parts/VisibleLine/VisibleLine.ts'

test('loadContent loads both sides of an inline diff uri', async (): Promise<void> => {
  const extensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostFileSystem.readFile': async (protocol: string, path: string): Promise<string> => {
      if (protocol === 'data' && path === 'before-content') {
        return 'before-content'
      }
      if (protocol === 'file' && path === '/tmp/after.txt') {
        return 'after-content\nsecond-line'
      }
      throw new Error(`unexpected params: ${String(protocol)} ${String(path)}`)
    },
  })
  const fileSystemWorkerRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': async (uri: string): Promise<string> => {
      if (uri === 'file:///tmp/after.txt') {
        return 'after-content\nsecond-line'
      }
      throw new Error(`unexpected params: ${String(uri)}`)
    },
  })
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (beforeLines: readonly string[], afterLines: readonly string[]): Promise<readonly unknown[]> => {
      expect([beforeLines, afterLines]).toEqual([['before-content'], ['after-content', 'second-line']])
      return [
        { leftIndex: 0, rightIndex: 0, type: 2 },
        { leftIndex: 0, rightIndex: 0, type: 1 },
        { leftIndex: 0, rightIndex: 1, type: 1 },
      ]
    },
  })

  const state = {
    ...createDefaultState(),
    height: 60,
    itemHeight: 20,
    minimumSliderSize: 30,
    uri: 'inline-diff://data://before-content<->/tmp/after.txt',
  }

  const result = await loadContent(state, { minLineY: 1 })

  expect(diffWorkerRpc.invocations).toEqual([['Diff.diffInline', ['before-content'], ['after-content', 'second-line']]])
  expect(extensionHostRpc.invocations).toEqual([])
  expect(fileSystemWorkerRpc.invocations).toEqual([['FileSystem.readFile', 'file:///tmp/after.txt']])
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
    maxLineY: 2,
    minLineY: 0,
    renderModeLeft: 'text',
    renderModeRight: 'text',
    scrollBarActive: false,
    scrollBarHeight: 60,
    totalLineCount: 2,
    totalLineCountLeft: 1,
    totalLineCountRight: 2,
    uriLeft: 'data://before-content',
    uriRight: '/tmp/after.txt',
    visibleLinesLeft: [
      {
        lineNumber: 1,
        tokens: [{ text: 'before-content', type: '' }],
        type: VisibleLineType.Removed,
      },
      {
        lineNumber: -1,
        tokens: [],
        type: VisibleLineType.Normal,
      },
    ],
    visibleLinesRight: [
      {
        lineNumber: 1,
        tokens: [{ text: 'after-content', type: '' }],
        type: VisibleLineType.Added,
      },
      {
        lineNumber: 2,
        tokens: [{ text: 'second-line', type: '' }],
        type: VisibleLineType.Added,
      },
    ],
  })
})

test('loadContent stores pane load errors instead of throwing', async (): Promise<void> => {
  const error = new Error('file not found: /tmp/missing.txt')
  error.stack = 'Error: file not found: /tmp/missing.txt\n    at read missing file'
  const extensionHostRpc = ExtensionHost.registerMockRpc({
    'ExtensionHostFileSystem.readFile': async (): Promise<string> => {
      throw new Error('should not invoke extension host')
    },
  })
  const fileSystemWorkerRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': async (uri: string): Promise<string> => {
      if (uri === 'file:///tmp/missing.txt') {
        throw error
      }
      throw new Error(`unexpected params: ${String(uri)}`)
    },
  })
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => {
      throw new Error('should not invoke diff worker when a pane fails to load')
    },
  })

  const state = {
    ...createDefaultState(),
    height: 40,
    itemHeight: 20,
    minimumSliderSize: 30,
    uri: 'inline-diff://data://before-content<->/tmp/missing.txt',
  }

  const result = await loadContent(state, { minLineY: 0 })

  expect(extensionHostRpc.invocations).toEqual([])
  expect(fileSystemWorkerRpc.invocations).toEqual([['FileSystem.readFile', 'file:///tmp/missing.txt']])
  expect(diffWorkerRpc.invocations).toEqual([])
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
  const createObjectUrlMock = jest.spyOn((globalThis as any).URL, 'createObjectURL').mockReturnValue('blob:before.png')
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (): Promise<readonly unknown[]> => {
      throw new Error('should not invoke diff worker for image panes')
    },
  })
  const fileSystemWorkerRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': async (uri: string): Promise<unknown> => {
      if (uri === 'file:///tmp/before.png') {
        return 'binary-image-content'
      }
      if (uri === 'file:///tmp/after.txt') {
        return 'after-content\nsecond-line'
      }
      throw new Error(`unexpected params: ${String(uri)}`)
    },
    'FileSystem.readFileAsBlob': async (uri: string): Promise<unknown> => {
      if (uri === 'file:///tmp/before.png') {
        return {}
      }
      throw new Error(`unexpected params: ${String(uri)}`)
    },
  })

  const state = {
    ...createDefaultState(),
    height: 60,
    itemHeight: 20,
    minimumSliderSize: 30,
    uri: 'inline-diff:///tmp/before.png<->/tmp/after.txt',
  }

  const result = await loadContent(state, { minLineY: 0 })

  expect(diffWorkerRpc.invocations).toEqual([])
  expect(fileSystemWorkerRpc.invocations).toEqual([
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
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (beforeLines: readonly string[], afterLines: readonly string[]): Promise<readonly unknown[]> => {
      expect([beforeLines, afterLines]).toEqual([
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
  })
  const fileSystemWorkerRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': async (uri: string): Promise<string> => {
      if (uri === 'file:///tmp/before.txt') {
        return 'same\nbefore\nshared'
      }
      if (uri === 'file:///tmp/after.txt') {
        return 'same\nafter\nshared'
      }
      throw new Error(`unexpected params: ${String(uri)}`)
    },
  })

  const state = {
    ...createDefaultState(),
    diffMode: 'inline' as const,
    height: 60,
    itemHeight: 20,
    minimumSliderSize: 30,
    uri: 'inline-diff:///tmp/before.txt<->/tmp/after.txt',
  }

  const result = await loadContent(state, { minLineY: 0 })

  expect(diffWorkerRpc.invocations).toEqual([['Diff.diffInline', ['same', 'before', 'shared'], ['same', 'after', 'shared']]])
  expect(fileSystemWorkerRpc.invocations).toEqual([
    ['FileSystem.readFile', 'file:///tmp/before.txt'],
    ['FileSystem.readFile', 'file:///tmp/after.txt'],
  ])
  expect(result).toMatchObject({
    contentLeft: 'same\nbefore\nshared',
    contentRight: 'same\nafter\nshared',
    diffMode: 'inline',
    finalDeltaY: 0,
    maxLineY: 3,
    minLineY: 0,
    totalLineCount: 3,
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
        tokens: [{ text: 'shared', type: '' }],
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
        tokens: [{ text: 'after', type: '' }],
        type: VisibleLineType.Added,
      },
      {
        lineNumber: 3,
        tokens: [{ text: 'shared', type: '' }],
        type: VisibleLineType.Normal,
      },
    ],
  })
})

test('loadContent resolves language ids and tokenizes both panes when syntax metadata is available', async (): Promise<void> => {
  const diffWorkerRpc = DiffWorker.registerMockRpc({
    'Diff.diffInline': async (beforeLines: readonly string[], afterLines: readonly string[]): Promise<readonly unknown[]> => {
      expect([beforeLines, afterLines]).toEqual([['const left = 1'], ['const right = 2']])
      return [{ leftIndex: 0, rightIndex: 0, type: 0 }]
    },
  })
  const extensionManagementWorkerRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': async (platform: number, assetDir: string): Promise<readonly unknown[]> => {
      expect([platform, assetDir]).toEqual([7, '/tmp/assets'])
      return [
        {
          extensions: ['.ts'],
          id: 'typescript',
          tokenize: '/remote/extensions/builtin.language-basics-typescript/src/tokenizeTypeScript.js',
        },
      ]
    },
  })
  const fileSystemWorkerRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': async (uri: string): Promise<string> => {
      if (uri === 'file:///tmp/left.ts') {
        return 'const left = 1'
      }
      if (uri === 'file:///tmp/right.ts') {
        return 'const right = 2'
      }
      throw new Error(`unexpected params: ${String(uri)}`)
    },
  })
  const syntaxHighlightingWorkerRpc = {
    dispose: (): void => {},
    invocations: [] as unknown[][],
    invoke: async (method: string, ...params: readonly unknown[]): Promise<unknown> => {
      syntaxHighlightingWorkerRpc.invocations = [...syntaxHighlightingWorkerRpc.invocations, [method, ...params]]
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

  expect(diffWorkerRpc.invocations).toEqual([['Diff.diffInline', ['const left = 1'], ['const right = 2']]])
  expect(extensionManagementWorkerRpc.invocations).toEqual([['Extensions.getLanguages', 7, '/tmp/assets']])
  expect(fileSystemWorkerRpc.invocations).toEqual([
    ['FileSystem.readFile', 'file:///tmp/left.ts'],
    ['FileSystem.readFile', 'file:///tmp/right.ts'],
  ])
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
