import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getContentLeftDom } from '../GetContentLeftDom/GetContentLeftDom.ts'
import { getContentRightDom } from '../GetContentRightDom/GetContentRightDom.ts'
import { getImageLeftDom } from '../GetImageLeftDom/GetImageLeftDom.ts'
import { getImageRightDom } from '../GetImageRightDom/GetImageRightDom.ts'

export const getDiffEditorVirtualDom = (
  contentLeft: string,
  contentRight: string,
  renderModeLeft: 'text' | 'image',
  renderModeRight: 'text' | 'image',
  uriLeft: string,
  uriRight: string,
): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor}`,
      type: VirtualDomElements.Div,
    },
    ...(renderModeLeft === 'image' ? getImageLeftDom(uriLeft) : getContentLeftDom(contentLeft)),
    {
      childCount: 0,
      className: `${ClassNames.Sash} ${ClassNames.SashVertical}`,
      name: 'sash',
      onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
      type: VirtualDomElements.Div,
    },
    ...(renderModeRight === 'image' ? getImageRightDom(uriRight) : getContentRightDom(contentRight)),
  ]
  return dom
}
