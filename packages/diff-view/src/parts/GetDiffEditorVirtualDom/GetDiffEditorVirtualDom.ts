import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getContentLeftDom } from '../GetContentLeftDom/GetContentLeftDom.ts'
import { getContentRightDom } from '../GetContentRightDom/GetContentRightDom.ts'
import { getImageLeftDom } from '../GetImageLeftDom/GetImageLeftDom.ts'
import { getImageRightDom } from '../GetImageRightDom/GetImageRightDom.ts'

<<<<<<< HEAD
export const getDiffEditorVirtualDom = ({
  contentLeft,
  contentRight,
  errorLeftMessage,
  errorLeftStack,
  errorRightMessage,
  errorRightStack,
}: Pick<DiffViewState, 'contentLeft' | 'contentRight' | 'errorLeftMessage' | 'errorLeftStack' | 'errorRightMessage' | 'errorRightStack'>): readonly VirtualDomNode[] => {
=======
export const getDiffEditorVirtualDom = (
  contentLeft: string,
  contentRight: string,
  renderModeLeft: 'text' | 'image',
  renderModeRight: 'text' | 'image',
  uriLeft: string,
  uriRight: string,
): readonly VirtualDomNode[] => {
>>>>>>> origin/main
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor}`,
      type: VirtualDomElements.Div,
    },
<<<<<<< HEAD
    ...getContentLeftDom(contentLeft, errorLeftMessage, errorLeftStack),
=======
    ...(renderModeLeft === 'image' ? getImageLeftDom(uriLeft) : getContentLeftDom(contentLeft)),
>>>>>>> origin/main
    {
      childCount: 0,
      className: `${ClassNames.Sash} ${ClassNames.SashVertical}`,
      name: 'sash',
      onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
      type: VirtualDomElements.Div,
    },
<<<<<<< HEAD
    ...getContentRightDom(contentRight, errorRightMessage, errorRightStack),
=======
    ...(renderModeRight === 'image' ? getImageRightDom(uriRight) : getContentRightDom(contentRight)),
>>>>>>> origin/main
  ]
  return dom
}
