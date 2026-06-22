import { expect, test } from '@jest/globals'
import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleWorkspaceChange } from '../src/parts/HandleWorkspaceChange/HandleWorkspaceChange.ts'

test('handleWorkspaceChange returns state unchanged when content has not changed', async (): Promise<void> => {
  const fileSystemWorkerRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': async (uri: string): Promise<string> => {
      if (uri === 'file:///tmp/before.txt') {
        return 'same content'
      }
      if (uri === 'file:///tmp/after.txt') {
        return 'same content'
      }
      throw new Error(`unexpected uri: ${uri}`)
    },
  })
  const extensionHostRpc = createDefaultState().rpc as any
  const state = {
    ...createDefaultState(),
    contentLeft: 'same content',
    contentRight: 'same content',
    errorLeftMessage: '',
    errorRightMessage: '',
    uriLeft: '/tmp/before.txt',
    uriRight: '/tmp/after.txt',
  }

  const result = await handleWorkspaceChange(state)

  expect(result).toBe(state)
})
