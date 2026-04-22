import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getContentLeftDom } from '../GetContentLeftDom/GetContentLeftDom.ts'
import { getContentRightDom } from '../GetContentRightDom/GetContentRightDom.ts'
import { getInlineDiffEditorVirtualDom } from '../GetInlineDiffEditorVirtualDom/GetInlineDiffEditorVirtualDom.ts'
import { getSashDom } from '../GetSashDom/GetSashDom.ts'
import { getScrollBarDom } from '../GetScrollBarDom/GetScrollBarDom.ts'

export const getDiffEditorVirtualDom = (state: DiffViewState): readonly VirtualDomNode[] => {
  const {
    allowedLinkSchemes,
    contentLeft,
    contentRight,
    diffMode,
    errorLeftCodeFrame,
    errorLeftMessage,
    errorLeftStack,
    errorRightCodeFrame,
    errorRightMessage,
    errorRightStack,
    inlineChanges,
    itemHeight,
    layout,
    lineNumbers,
    maxLineY,
    minLineY,
    renderModeLeft,
    renderModeRight,
    scrollBarActive,
    tokenizedLinesLeft,
    tokenizedLinesRight,
    totalLineCountLeft,
    totalLineCountRight,
    visibleLinesLeft,
    visibleLinesRight,
  } = state
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
    errorLeftCodeFrame,
    errorLeftStack,
    allowedLinkSchemes,
    showLineNumbers,
    totalLineCountLeft,
    minLineY,
    maxLineY,
    inlineChanges,
    tokenizedLinesLeft,
    visibleLinesLeft,
    itemHeight,
  )
  const rightDom = getContentRightDom(
    contentRight,
    errorRightMessage,
    errorRightCodeFrame,
    errorRightStack,
    allowedLinkSchemes,
    showLineNumbers,
    totalLineCountRight,
    minLineY,
    maxLineY,
    inlineChanges,
    tokenizedLinesRight,
    visibleLinesRight,
    itemHeight,
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
