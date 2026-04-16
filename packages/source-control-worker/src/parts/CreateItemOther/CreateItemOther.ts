import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getButtonsVirtualDom } from '../GetButtonsVirtualDom/GetButtonsVirtualDom.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'
import { getLabelClassName } from '../GetLabelClassName/GetLabelClassName.ts'
import { getTreeItemClassName } from '../GetTreeItemClassName/GetTreeItemClassName.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const chevron: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.Chevron,
  type: VirtualDomElements.Div,
}

const getIconsDom = (icon: string, fileIcon: string): readonly VirtualDomNode[] => {
  if (icon === ClassNames.ChevronRight) {
    return [chevron, GetIconVirtualDom.getIconVirtualDom(icon)]
  }

  return [GetFileIconVirtualDom.getFileIconVirtualDom(fileIcon)]
}

export const createItemOther = (item: VisibleItem): readonly VirtualDomNode[] => {
  const { buttons, decorationIcon, decorationIconTitle, decorationStrikeThrough, detail, file, fileIcon, icon, indent, label, posInSet, setSize } = item
  const labelClassName = getLabelClassName(decorationStrikeThrough)
  const dom: VirtualDomNode[] = []
  const hasButtons = buttons.length
  const buttonsDom = getButtonsVirtualDom(buttons)
  const treeItemClassName = getTreeItemClassName(indent)
  dom.push(
    {
      ariaPosInSet: posInSet,
      ariaSetSize: setSize,
      childCount: 3 + (hasButtons ? 1 : 0),
      className: treeItemClassName,
      paddingRight: '12px',
      role: AriaRoles.TreeItem,
      title: file,
      type: VirtualDomElements.Div,
    },
    ...getIconsDom(icon, fileIcon),
  )
  const labelDom = {
    childCount: 1,
    className: labelClassName,
    type: VirtualDomElements.Div,
  }
  dom.push(labelDom, text(label))

  if (detail) {
    labelDom.childCount++
    dom.push(
      {
        childCount: 1,
        className: ClassNames.LabelDetail,
        type: VirtualDomElements.Span,
      },
      text(detail),
    )
  }
  dom.push(...buttonsDom)
  dom.push({
    childCount: 0,
    className: ClassNames.DecorationIcon,
    src: decorationIcon,
    title: decorationIconTitle,
    type: VirtualDomElements.Img,
  })
  return dom
}
