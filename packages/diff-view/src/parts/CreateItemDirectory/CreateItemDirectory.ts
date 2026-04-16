import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { DirentType } from '@lvce-editor/constants'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetBadgeVirtualDom from '../GetBadgeVirtualDom/GetBadgeVirtualDom.ts'
import { getButtonsVirtualDom } from '../GetButtonsVirtualDom/GetButtonsVirtualDom.ts'
import { getLabelClassName } from '../GetLabelClassName/GetLabelClassName.ts'
import { getTreeItemClassName } from '../GetTreeItemClassName/GetTreeItemClassName.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as TreeItemPadding from '../TreeItemPadding/TreeItemPadding.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const createItemDirectory = (item: VisibleItem): readonly VirtualDomNode[] => {
  const { badgeCount, buttons, decorationStrikeThrough, icon, indent, label, posInSet, setSize, type } = item
  const labelClassName = getLabelClassName(decorationStrikeThrough)
  const buttonsDom = getButtonsVirtualDom(buttons)
  const hasButtons = buttons.length
  const treeItemClassName = getTreeItemClassName(indent)
  return [
    {
      ariaExpanded: type === DirentType.DirectoryExpanded,
      ariaPosInSet: posInSet,
      ariaSetSize: setSize,
      childCount: 3 + (hasButtons ? 1 : 0),
      className: treeItemClassName,
      paddingRight: TreeItemPadding.PaddingRight,
      role: AriaRoles.TreeItem,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: MergeClassNames.mergeClassNames(ClassNames.Chevron, `MaskIcon${icon}`),
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: labelClassName,
      type: VirtualDomElements.Div,
    },
    text(label),
    ...buttonsDom,
    ...GetBadgeVirtualDom.getBadgeVirtualDom(badgeCount),
  ]
}
