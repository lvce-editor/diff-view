import type * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

interface ContextMenuPropsBase {
  readonly menuId: number
}

interface ContextMenuPropsSourceControl extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.Diff
}

export type ContextMenuProps = ContextMenuPropsSourceControl
