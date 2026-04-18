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
  | 'maxLineY'
  | 'minLineY'
  | 'totalLineCount'
>): readonly VirtualDomNode[] => {
  const showLineNumbers = lineNumbers && renderModeLeft === 'text' && renderModeRight === 'text'
  const diffEditorLayoutClass = layout === 'vertical' ? ClassNames.DiffEditorVertical : ClassNames.DiffEditorHorizontal
  const sashLayoutClass = layout === 'vertical' ? ClassNames.SashHorizontal : ClassNames.SashVertical
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: 4,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${diffEditorLayoutClass}`,
      type: VirtualDomElements.Div,
    },
    ...(renderModeLeft === 'image'
      ? getImageLeftDom(uriLeft)
      : getContentLeftDom(contentLeft, errorLeftMessage, errorLeftStack, showLineNumbers, totalLineCount, minLineY, maxLineY)),
    {
      childCount: 0,
      className: `${ClassNames.Sash} ${sashLayoutClass}`,
      name: 'sash',
      onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
      type: VirtualDomElements.Div,
    },
    ...(renderModeRight === 'image'
      ? getImageRightDom(uriRight)
      : getContentRightDom(contentRight, errorRightMessage, errorRightStack, showLineNumbers, totalLineCount, minLineY, maxLineY)),
    ...getScrollBarDom(),
  ]
  return dom
}
