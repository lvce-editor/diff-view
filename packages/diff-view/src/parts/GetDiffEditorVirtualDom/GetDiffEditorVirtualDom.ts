import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getContentLeftDom } from '../GetContentLeftDom/GetContentLeftDom.ts'
import { getContentRightDom } from '../GetContentRightDom/GetContentRightDom.ts'
import { getImageLeftDom } from '../GetImageLeftDom/GetImageLeftDom.ts'
import { getImageRightDom } from '../GetImageRightDom/GetImageRightDom.ts'

export const getDiffEditorVirtualDom = ({
  contentLeft,
  contentRight,
  errorLeftMessage,
  errorLeftStack,
  errorRightMessage,
  errorRightStack,
  renderModeLeft,
  renderModeRight,
  uriLeft,
  uriRight,
}: Pick<
  DiffViewState,
  | 'contentLeft'
  | 'contentRight'
  | 'errorLeftMessage'
  | 'errorLeftStack'
  | 'errorRightMessage'
  | 'errorRightStack'
  | 'renderModeLeft'
  | 'renderModeRight'
  | 'uriLeft'
  | 'uriRight'
>): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor}`,
      type: VirtualDomElements.Div,
    },
    ...(renderModeLeft === 'image' ? getImageLeftDom(uriLeft) : getContentLeftDom(contentLeft, errorLeftMessage, errorLeftStack)),
    {
      childCount: 0,
      className: `${ClassNames.Sash} ${ClassNames.SashVertical}`,
      name: 'sash',
      onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
      type: VirtualDomElements.Div,
    },
    ...(renderModeRight === 'image' ? getImageRightDom(uriRight) : getContentRightDom(contentRight, errorRightMessage, errorRightStack)),
  ]
  return dom
}
