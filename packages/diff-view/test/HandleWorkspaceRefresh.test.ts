import { expect, test } from '@jest/globals'
import { ExtensionHost, RendererWorker } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleWorkspaceRefresh } from '../src/parts/HandleWorkspaceRefresh/HandleWorkspaceRefresh.ts'
import * as Refresh from '../src/parts/Refresh/Refresh.ts'

test('handleWorkspaceRefresh should call refresh and return updated state', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': async (): Promise<{ allGroups: never[]; gitRoot: string }> => ({
      allGroups: [],
      gitRoot: '/test',
    }),
  }
  const mockRpc = ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const rendererCommandMap = {
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
  }
  RendererWorker.registerMockRpc(rendererCommandMap)

  const state: SourceControlState = createDefaultState()
  const result = await handleWorkspaceRefresh(state)
  expect(result).toEqual({
    ...state,
    allGroups: [],
    finalDeltaY: 0,
    gitRoot: '',
    items: [],
    maxLineY: 0,
    scrollBarHeight: 0,
    visibleItems: [],
  })
  expect(mockRpc.invocations).toEqual([])
})

test('handleWorkspaceRefresh should return same result as refresh', async (): Promise<void> => {
  const extensionHostCommandMap = {
    'ExtensionHostSourceControl.getGroups': async (): Promise<{ allGroups: never[]; gitRoot: string }> => ({
      allGroups: [],
      gitRoot: '/test',
    }),
  }
  ExtensionHost.registerMockRpc(extensionHostCommandMap)

  const rendererCommandMap = {
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
  }
  RendererWorker.registerMockRpc(rendererCommandMap)

  const state: SourceControlState = createDefaultState()
  const refreshResult = await Refresh.refresh(state)
  const handleWorkspaceRefreshResult = await handleWorkspaceRefresh(state)
  expect(handleWorkspaceRefreshResult).toEqual(refreshResult)
})
