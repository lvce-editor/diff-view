import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

export const handleContextMenu = async (state: DiffViewState, button: number, clientX: number, clientY: number): Promise<DiffViewState> => {
  await ContextMenu.show2(state.id, MenuEntryId.Diff, clientX, clientY, {
    menuId: MenuEntryId.Diff,
  })
  return state
}
