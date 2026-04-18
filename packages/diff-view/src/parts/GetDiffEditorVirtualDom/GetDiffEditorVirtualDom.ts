import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getContentLeftDom } from '../GetContentLeftDom/GetContentLeftDom.ts'
import { getContentRightDom } from '../GetContentRightDom/GetContentRightDom.ts'
import { getImageLeftDom } from '../GetImageLeftDom/GetImageLeftDom.ts'
import { getImageRightDom } from '../GetImageRightDom/GetImageRightDom.ts'
import { getScrollBarDom } from '../GetScrollBarDom/GetScrollBarDom.ts'

<<<<<<< HEAD
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
=======
export const getDiffEditorVirtualDom = (
  contentLeft: string,
  contentRight: string,
  renderModeLeft: 'text' | 'image',
  renderModeRight: 'text' | 'image',
  uriLeft: string,
  uriRight: string,
  minLineY: number,
  maxLineY: number,
  totalLineCount: number,
): readonly VirtualDomNode[] => {
>>>>>>> bb00f9f225c6 (feat(diff-view): implement scroll bar functionality and improve rendering)
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: 4,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor}`,
      type: VirtualDomElements.Div,
    },
<<<<<<< HEAD
    ...(renderModeLeft === 'image' ? getImageLeftDom(uriLeft) : getContentLeftDom(contentLeft, errorLeftMessage, errorLeftStack)),
=======
    ...(renderModeLeft === 'image' ? getImageLeftDom(uriLeft) : getContentLeftDom(contentLeft, totalLineCount, minLineY, maxLineY)),
>>>>>>> bb00f9f225c6 (feat(diff-view): implement scroll bar functionality and improve rendering)
    {
      childCount: 0,
      className: `${ClassNames.Sash} ${ClassNames.SashVertical}`,
      name: 'sash',
      onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
      type: VirtualDomElements.Div,
    },
<<<<<<< HEAD
    ...(renderModeRight === 'image' ? getImageRightDom(uriRight) : getContentRightDom(contentRight, errorRightMessage, errorRightStack)),
=======
    ...(renderModeRight === 'image' ? getImageRightDom(uriRight) : getContentRightDom(contentRight, totalLineCount, minLineY, maxLineY)),
    ...getScrollBarDom(),
>>>>>>> bb00f9f225c6 (feat(diff-view): implement scroll bar functionality and improve rendering)
  ]
  return dom
}
