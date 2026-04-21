import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getContentLeftDom } from '../GetContentLeftDom/GetContentLeftDom.ts'
import { getContentRightDom } from '../GetContentRightDom/GetContentRightDom.ts'
import { getInlineDiffEditorVirtualDom } from '../GetInlineDiffEditorVirtualDom/GetInlineDiffEditorVirtualDom.ts'
import { getScrollBarDom } from '../GetScrollBarDom/GetScrollBarDom.ts'

const getSashDom = (sashLayoutClass: string): VirtualDomNode => ({
  childCount: 0,
  className: `${ClassNames.Sash} ${sashLayoutClass}`,
  name: 'sash',
  onPointerDown: DomEventListenerFunctions.HandleSashPointerDown,
  type: VirtualDomElements.Div,
})

export const getDiffEditorVirtualDom = ({
  contentLeft,
  contentRight,
  diffMode,
  errorLeftMessage,
  errorLeftStack,
  errorRightMessage,
  errorRightStack,
  imageSrcLeft,
  imageSrcRight,
  inlineChanges,
  layout,
  lineNumbers,
  maxLineY,
  minLineY,
  renderModeLeft,
  renderModeRight,
  scrollBarActive,
  tokenizedLinesLeft,
  tokenizedLinesRight,
  totalLineCount,
  totalLineCountLeft,
  totalLineCountRight,
  uriLeft,
  uriRight,
  visibleLinesLeft,
  visibleLinesRight,
}: Pick<
  DiffViewState,
  | 'contentLeft'
  | 'contentRight'
  | 'diffMode'
  | 'errorLeftMessage'
  | 'errorLeftStack'
  | 'errorRightMessage'
  | 'errorRightStack'
  | 'imageSrcLeft'
  | 'imageSrcRight'
  | 'inlineChanges'
  | 'lineNumbers'
  | 'layout'
  | 'renderModeLeft'
  | 'renderModeRight'
  | 'scrollBarActive'
  | 'visibleLinesLeft'
  | 'visibleLinesRight'
  | 'tokenizedLinesLeft'
  | 'tokenizedLinesRight'
  | 'totalLineCount'
  | 'totalLineCountLeft'
  | 'totalLineCountRight'
  | 'uriLeft'
  | 'uriRight'
  | 'maxLineY'
  | 'minLineY'
>): readonly VirtualDomNode[] => {
  const canRenderInline = diffMode === 'inline' && renderModeLeft === 'text' && renderModeRight === 'text' && !errorLeftMessage && !errorRightMessage
  if (canRenderInline) {
    return getInlineDiffEditorVirtualDom(contentLeft, contentRight, lineNumbers, minLineY, maxLineY)
  }

  const showLineNumbers = lineNumbers && renderModeLeft === 'text' && renderModeRight === 'text'
  const diffEditorLayoutClass = layout === 'vertical' ? ClassNames.DiffEditorVertical : ClassNames.DiffEditorHorizontal
  const sashLayoutClass = layout === 'vertical' ? ClassNames.SashHorizontal : ClassNames.SashVertical
  const leftDom = getContentLeftDom(
    contentLeft,
    errorLeftMessage,
    errorLeftStack,
    showLineNumbers,
    totalLineCountLeft,
    minLineY,
    maxLineY,
    inlineChanges,
    tokenizedLinesLeft,
    visibleLinesLeft,
  )
  const rightDom = getContentRightDom(
    contentRight,
    errorRightMessage,
    errorRightStack,
    showLineNumbers,
    totalLineCountRight,
    minLineY,
    maxLineY,
    inlineChanges,
    tokenizedLinesRight,
    visibleLinesRight,
  )
  const scrollBarDom = scrollBarActive ? getScrollBarDom() : []
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: scrollBarActive ? 4 : 3,
      className: `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${diffEditorLayoutClass}`,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      onWheel: DomEventListenerFunctions.HandleWheel,
      type: VirtualDomElements.Div,
    },
    ...leftDom,
    getSashDom(sashLayoutClass),
    ...rightDom,
    ...scrollBarDom,
  ]
  return dom
}
