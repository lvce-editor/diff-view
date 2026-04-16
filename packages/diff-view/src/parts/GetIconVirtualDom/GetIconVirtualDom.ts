import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

export const getIconVirtualDom = (icon: string, type = VirtualDomElements.Div): VirtualDomNode => {
  return {
    childCount: 0,
    className: `MaskIcon MaskIcon${icon}`,
    role: AriaRoles.None,
    type,
  }
}
