import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActionButton } from '../ActionButton/ActionButton.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'

export const getButtonVirtualDom = (button: ActionButton): readonly VirtualDomNode[] => {
  const { icon, label } = button
  return [
    {
      ariaLabel: label,
      childCount: 1,
      className: ClassNames.SourceControlButton,
      name: label,
      title: label,
      type: VirtualDomElements.Button,
    },
    GetIconVirtualDom.getIconVirtualDom(icon, VirtualDomElements.Span),
  ]
}
