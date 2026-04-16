import { MenuEntryId } from '@lvce-editor/constants'
import type { SourceControlState } from '../SourceControlState/SourceControlState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleContextMenu = async (state: SourceControlState, button: number, x: number, y: number): Promise<SourceControlState> => {
  const { id } = state
  await ContextMenu.show2(id, MenuEntryId.SourceControl, x, y, {
    menuId: MenuEntryId.SourceControl,
  })
  return state
}
