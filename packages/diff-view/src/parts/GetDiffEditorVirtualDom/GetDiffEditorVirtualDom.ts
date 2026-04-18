import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getContentLeftDom } from '../GetContentLeftDom/GetContentLeftDom.ts'
import { getContentRightDom } from '../GetContentRightDom/GetContentRightDom.ts'

export const getDiffEditorVirtualDom = (contentLeft: string, contentRight: string): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor}`,
      type: VirtualDomElements.Div,
    },
    ...getContentLeftDom(contentLeft),
    {
      childCount: 0,
      className: `${ClassNames.Sash} ${ClassNames.SashVertical}`,
      name: 'sash',
      onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
      type: VirtualDomElements.Div,
    },
    ...getContentRightDom(contentRight),
  ]
  return dom
}
