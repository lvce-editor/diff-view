import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleContextMenu } from '../src/parts/HandleContextMenu/HandleContextMenu.ts'

test('handleContextMenu shows context menu and does not change state', async (): Promise<void> => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })

  const state = createDefaultState()

  const result = await handleContextMenu(state, 2, 10, 20)

  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 1, 22, 10, 20, { menuId: 22 }]])
  expect(result).toBe(state)
})
