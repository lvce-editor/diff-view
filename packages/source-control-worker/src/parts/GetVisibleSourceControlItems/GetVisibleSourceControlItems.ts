import type { ActionsCache } from '../ActionsCache/ActionsCache.ts'
import type { DisplayItem } from '../DisplayItem/DisplayItem.ts'
import type { FileIconCache } from '../FileIconCache/FileIconCache.ts'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as EmptySourceControlButtons from '../EmptySourceControlButtons/EmptySourceControlButton.ts'
import { getContextId } from '../GetContextId/GetContextId.ts'
import * as GetTreeItemIndent from '../GetTreeItemIndent/GetTreeItemIndent.ts'

export const getVisibleSourceControlItems = (
  items: readonly DisplayItem[],
  minLineY: number,
  maxLineY: number,
  actionsCache: ActionsCache,
  fileIconCache: FileIconCache,
): readonly VisibleItem[] => {
  const visible: VisibleItem[] = []
  for (let i = minLineY; i < maxLineY; i++) {
    const item = items[i]
    const contextId = getContextId(item.groupId, item.type)
    const buttons = actionsCache[contextId] || EmptySourceControlButtons.emptySourceControlButtons
    const fileIcon = fileIconCache[item.label] || ''
    const indent = GetTreeItemIndent.getTreeItemIndent(item.type)
    visible.push({
      ...item,
      buttons,
      fileIcon,
      indent,
    })
  }
  return visible
}
