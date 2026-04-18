import { expect, test } from '@jest/globals'
import { ExtensionHost } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('loadContent loads both sides of an inline diff uri', async (): Promise<void> => {
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
        return 'after-content\nsecond-line'
      }
      throw new Error(`unexpected params: ${String(protocol)} ${String(path)}`)
    },
    set: (): void => {},
  }
  ExtensionHost.set(mockRpc as any)

  const state = {
    ...createDefaultState(),
    height: 60,
    itemHeight: 20,
    minimumSliderSize: 30,
    uri: 'inline-diff://data://before-content<->/tmp/after.txt',
  }

  const result = await loadContent(state, { minLineY: 1 })

  expect(invocations).toEqual([['ExtensionHostFileSystem.readFile', 'file', '/tmp/after.txt']])
  expect(result).toMatchObject({
    contentLeft: 'before-content',
    contentRight: 'after-content\nsecond-line',
    deltaY: 20,
    finalDeltaY: 0,
    initial: false,
    maxLineY: 2,
    minLineY: 1,
    scrollBarActive: false,
    scrollBarHeight: 60,
    uriLeft: 'data://before-content',
    uriRight: '/tmp/after.txt',
  })
})
