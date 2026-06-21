import type * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

export interface ContextMenuPropsBase {
  readonly menuId: number
}

export interface ContextMenuPropsSourceControl extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.Diff
}

export type ContextMenuProps = ContextMenuPropsSourceControl
