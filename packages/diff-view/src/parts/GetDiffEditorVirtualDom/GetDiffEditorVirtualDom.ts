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
  layout,
  lineNumbers,
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
  | 'lineNumbers'
  | 'layout'
  | 'renderModeLeft'
  | 'renderModeRight'
  | 'uriLeft'
  | 'uriRight'
>): readonly VirtualDomNode[] => {
<<<<<<< HEAD
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
=======
  const showLineNumbers = lineNumbers && renderModeLeft === 'text' && renderModeRight === 'text'
  const diffEditorLayoutClass = layout === 'vertical' ? ClassNames.DiffEditorVertical : ClassNames.DiffEditorHorizontal
  const sashLayoutClass = layout === 'vertical' ? ClassNames.SashHorizontal : ClassNames.SashVertical
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${diffEditorLayoutClass}`,
      type: VirtualDomElements.Div,
    },
    ...(renderModeLeft === 'image' ? getImageLeftDom(uriLeft) : getContentLeftDom(contentLeft, errorLeftMessage, errorLeftStack, showLineNumbers)),
>>>>>>> origin/main
    {
      childCount: 0,
      className: `${ClassNames.Sash} ${sashLayoutClass}`,
      name: 'sash',
      onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
      type: VirtualDomElements.Div,
    },
<<<<<<< HEAD
<<<<<<< HEAD
    ...(renderModeRight === 'image' ? getImageRightDom(uriRight) : getContentRightDom(contentRight, errorRightMessage, errorRightStack)),
=======
    ...(renderModeRight === 'image' ? getImageRightDom(uriRight) : getContentRightDom(contentRight, totalLineCount, minLineY, maxLineY)),
    ...getScrollBarDom(),
>>>>>>> bb00f9f225c6 (feat(diff-view): implement scroll bar functionality and improve rendering)
=======
    ...(renderModeRight === 'image' ? getImageRightDom(uriRight) : getContentRightDom(contentRight, errorRightMessage, errorRightStack, showLineNumbers)),
>>>>>>> origin/main
  ]
  return dom
}
