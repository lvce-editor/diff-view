import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker as ParentRpc } from '@lvce-editor/rpc-registry'
import type { SourceControlState } from '../src/parts/SourceControlState/SourceControlState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleContextMenu } from '../src/parts/HandleContextMenu/HandleContextMenu.ts'

test('handleContextMenu', async (): Promise<void> => {
  const commandMap = {
    'ContextMenu.show2': async (): Promise<void> => {},
  }
  const mockRpc = ParentRpc.registerMockRpc(commandMap)

  const state: SourceControlState = createDefaultState()
  const button = 2
  const x = 100
  const y = 200

  const newState = await handleContextMenu(state, button, x, y)
  expect(newState).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      state.id,
      MenuEntryId.SourceControl,
      x,
      y,
      {
        menuId: MenuEntryId.SourceControl,
      },
    ],
  ])
})
