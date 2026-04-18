import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getContentLeftDom } from '../GetContentLeftDom/GetContentLeftDom.ts'
import { getContentRightDom } from '../GetContentRightDom/GetContentRightDom.ts'
import { getImageLeftDom } from '../GetImageLeftDom/GetImageLeftDom.ts'
import { getImageRightDom } from '../GetImageRightDom/GetImageRightDom.ts'
import { getInlineDiffEditorVirtualDom } from '../GetInlineDiffEditorVirtualDom/GetInlineDiffEditorVirtualDom.ts'
import { getScrollBarDom } from '../GetScrollBarDom/GetScrollBarDom.ts'

export const getDiffEditorVirtualDom = ({
  contentLeft,
  contentRight,
  diffMode,
  errorLeftMessage,
  errorLeftStack,
  errorRightMessage,
  errorRightStack,
  layout,
  lineNumbers,
  maxLineY,
  minLineY,
  renderModeLeft,
  renderModeRight,
  totalLineCount,
  uriLeft,
  uriRight,
}: Pick<
  DiffViewState,
  | 'contentLeft'
  | 'contentRight'
  | 'diffMode'
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
  const canRenderInline = diffMode === 'inline' && renderModeLeft === 'text' && renderModeRight === 'text' && !errorLeftMessage && !errorRightMessage
  if (canRenderInline) {
    return getInlineDiffEditorVirtualDom(contentLeft, contentRight, lineNumbers, minLineY, maxLineY)
  }

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
