import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const diffScrollBarNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.DiffScrollBar,
  type: VirtualDomElements.Div,
}

const diffScrollBarThumbNode: VirtualDomNode = {
  childCount: 0,
  className: ClassNames.DiffScrollBarThumb,
  name: 'scrollBarThumb',
  onPointerDown: DomEventListenerFunctions.HandleScrollBarPointerDown,
  type: VirtualDomElements.Div,
}

export const getScrollBarDom = (): readonly VirtualDomNode[] => {
  return [diffScrollBarNode, diffScrollBarThumbNode]
}
