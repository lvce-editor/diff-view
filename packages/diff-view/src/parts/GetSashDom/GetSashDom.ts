import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { mergeClassNames } from '../MergeClassNames/MergeClassNames.ts'

export const getSashDom = (sashLayoutClass: string): VirtualDomNode => ({
  childCount: 0,
  className: mergeClassNames(ClassNames.Sash, sashLayoutClass),
  name: 'sash',
  onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
  type: VirtualDomElements.Div,
})
