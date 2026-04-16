import { test, expect } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ContextMenu from '../src/parts/ContextMenu/ContextMenu.ts'

test('show2', async (): Promise<void> => {
  const commandMap = {
    'ContextMenu.show2': async (): Promise<void> => {},
  }
  const mockRpc = RendererWorker.registerMockRpc(commandMap)
  await ContextMenu.show2(1, MenuEntryId.SourceControl, 2, 3, {
    menuId: MenuEntryId.SourceControl,
  })
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 1, MenuEntryId.SourceControl, 2, 3, { menuId: MenuEntryId.SourceControl }]])
})
