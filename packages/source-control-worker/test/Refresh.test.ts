import { expect, test } from '@jest/globals'
import { ExtensionHost, RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Refresh from '../src/parts/Refresh/Refresh.ts'

test('refresh should update state with groups and visible items', async (): Promise<void> => {
  const parentCommandMap = {
    'IconTheme.getIcons': async (): Promise<readonly string[]> => [],
  }
  ParentRpc.registerMockRpc(parentCommandMap)

  const commandMap = {
    'ExtensionHostSourceControl.getGroups': async (): Promise<{ allGroups: never[]; gitRoot: string }> => ({
      allGroups: [],
      gitRoot: '/test',
    }),
  }
  const mockRpc = ExtensionHost.registerMockRpc(commandMap)

  const state: SourceControlState = createDefaultState()
  const result = await Refresh.refresh(state)
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
