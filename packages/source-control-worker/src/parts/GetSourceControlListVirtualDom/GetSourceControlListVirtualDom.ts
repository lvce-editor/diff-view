import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../VisibleItem/VisibleItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSourceControlItemVirtualDom from '../GetSourceControlItemVirtualDom/GetSourceControlItemVirtualDom.ts'

export const getSourceControlListVirtualDom = (items: readonly VisibleItem[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: items.length,
      className: ClassNames.SourceControlItems,
      onClick: DomEventListenerFunctions.HandleClickAt,
      onPointerOut: DomEventListenerFunctions.HandleMouseOutAt,
      onPointerOver: DomEventListenerFunctions.HandleMouseOverAt,
      role: AriaRoles.Tree,
      type: VirtualDomElements.Div,
    },
    ...items.flatMap(GetSourceControlItemVirtualDom.getSourceControlItemVirtualDom),
  ]
}
