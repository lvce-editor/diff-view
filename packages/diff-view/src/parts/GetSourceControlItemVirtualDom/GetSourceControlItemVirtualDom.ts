import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { DirentType } from '@lvce-editor/constants'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import { createItemDirectory } from '../CreateItemDirectory/CreateItemDirectory.ts'
import { createItemOther } from '../CreateItemOther/CreateItemOther.ts'

export const getSourceControlItemVirtualDom = (item: VisibleItem): readonly VirtualDomNode[] => {
  switch (item.type) {
    case DirentType.Directory:
    case DirentType.DirectoryExpanded:
      return createItemDirectory(item)
    default:
      return createItemOther(item)
  }
}
