import { MenuEntryId } from '@lvce-editor/constants'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleContextMenu = async (state: DiffViewState, button: number, clientX: number, clientY: number): Promise<DiffViewState> => {
  await ContextMenu.show2(state.id, MenuEntryId.SourceControl, clientX, clientY, {
    menuId: MenuEntryId.SourceControl,
  })
  return state
}
