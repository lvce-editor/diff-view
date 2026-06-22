import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DiffViewState } from '../DiffViewState/DiffViewState.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getContentLeftDom } from '../GetContentLeftDom/GetContentLeftDom.ts'
import { getContentRightDom } from '../GetContentRightDom/GetContentRightDom.ts'
import { getDiffEditorButtonsDom } from '../GetDiffEditorButtonsDom/GetDiffEditorButtonsDom.ts'
import { getDiffSearchHeaderDom } from '../GetDiffSearchHeaderDom/GetDiffSearchHeaderDom.ts'
import { getImageLeftDom } from '../GetImageLeftDom/GetImageLeftDom.ts'
import { getImageRightDom } from '../GetImageRightDom/GetImageRightDom.ts'
import { getInlineDiffEditorVirtualDom } from '../GetInlineDiffEditorVirtualDom/GetInlineDiffEditorVirtualDom.ts'
import { getSashDom } from '../GetSashDom/GetSashDom.ts'
import { getScrollBarDom } from '../GetScrollBarDom/GetScrollBarDom.ts'

const getRootDom = (childCount: number, className: string): VirtualDomNode => {
  return {
    childCount,
    className,
    onContextMenu: DomEventListenerFunctions.HandleContextMenu,
    onWheel: DomEventListenerFunctions.HandleWheel,
    type: VirtualDomElements.Div,
  }
}

const getEditorBodyDom = (diffEditorLayoutClass: string): VirtualDomNode => {
  return {
    childCount: 3,
    className: `${ClassNames.DiffEditorBody} ${diffEditorLayoutClass}`,
    type: VirtualDomElements.Div,
  }
}

const getDiffEditorWithSearchDom = (
  diffEditorLayoutClass: string,
  sashLayoutClass: string,
  leftDom: readonly VirtualDomNode[],
  rightDom: readonly VirtualDomNode[],
  buttonsDom: readonly VirtualDomNode[],
  scrollBarDom: readonly VirtualDomNode[],
  scrollBarActive: boolean,
  contentLeft: string,
  contentRight: string,
  searchQuery: string,
): readonly VirtualDomNode[] => {
  return [
    getRootDom(scrollBarActive ? 4 : 3, `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${diffEditorLayoutClass} ${ClassNames.DiffEditorWithSearch}`),
    ...getDiffSearchHeaderDom(contentLeft, contentRight, searchQuery),
    getEditorBodyDom(diffEditorLayoutClass),
    ...leftDom,
    getSashDom(sashLayoutClass),
    ...rightDom,
    ...buttonsDom,
    ...scrollBarDom,
  ]
}

const getDiffEditorWithoutSearchDom = (
  diffEditorLayoutClass: string,
  sashLayoutClass: string,
  leftDom: readonly VirtualDomNode[],
  rightDom: readonly VirtualDomNode[],
  buttonsDom: readonly VirtualDomNode[],
  scrollBarDom: readonly VirtualDomNode[],
  scrollBarActive: boolean,
): readonly VirtualDomNode[] => {
  return [
    getRootDom(scrollBarActive ? 5 : 4, `${ClassNames.Viewlet} ${ClassNames.DiffEditor} ${diffEditorLayoutClass}`),
    ...leftDom,
    getSashDom(sashLayoutClass),
    ...rightDom,
    ...buttonsDom,
    ...scrollBarDom,
  ]
}

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
    imageSrcLeft,
    imageSrcRight,
    inlineChanges,
    inputValue,
    itemHeight,
    layout,
    lineNumbers,
    maxLineY,
    minLineY,
    renderModeLeft,
    renderModeRight,
    scrollBarActive,
    searchQuery,
    searchVisible,
    showWhitespace,
    tokenizedLinesLeft,
    tokenizedLinesRight,
    totalLineCountLeft,
    totalLineCountRight,
    uriLeft,
    uriRight,
    visibleLinesLeft,
    visibleLinesRight,
  } = state
  const canRenderInline = diffMode === 'inline' && renderModeLeft === 'text' && renderModeRight === 'text' && !errorLeftMessage && !errorRightMessage
  if (canRenderInline) {
    return getInlineDiffEditorVirtualDom(contentLeft, contentRight, lineNumbers, minLineY, maxLineY, searchVisible, searchQuery, showWhitespace)
  }

  const showLineNumbers = lineNumbers && renderModeLeft === 'text' && renderModeRight === 'text'
  const diffEditorLayoutClass = layout === 'vertical' ? ClassNames.DiffEditorVertical : ClassNames.DiffEditorHorizontal
  const sashLayoutClass = layout === 'vertical' ? ClassNames.SashHorizontal : ClassNames.SashVertical
  const leftDom =
    renderModeLeft === 'image' && !errorLeftMessage
      ? getImageLeftDom(uriLeft, imageSrcLeft)
      : getContentLeftDom({
          allowedLinkSchemes,
          contentLeft,
          errorCodeFrame: errorLeftCodeFrame,
          errorMessage: errorLeftMessage,
          errorStack: errorLeftStack,
          inlineChanges,
          itemHeight,
          lineNumbers: showLineNumbers,
          maxLineY,
          minLineY,
          tokenizedLines: tokenizedLinesLeft,
          totalLineCount: totalLineCountLeft,
          visibleLines: visibleLinesLeft,
        })
  const rightDom =
    renderModeRight === 'image' && !errorRightMessage
      ? getImageRightDom(uriRight, imageSrcRight)
      : getContentRightDom({
          allowedLinkSchemes,
          contentRight,
          editable: true,
          errorCodeFrame: errorRightCodeFrame,
          errorMessage: errorRightMessage,
          errorStack: errorRightStack,
          inlineChanges,
          inputValue,
          itemHeight,
          lineNumbers: showLineNumbers,
          maxLineY,
          minLineY,
          tokenizedLines: tokenizedLinesRight,
          totalLineCount: totalLineCountRight,
          visibleLines: visibleLinesRight,
        })
  const scrollBarDom = scrollBarActive ? getScrollBarDom() : []
  const buttonsDom = getDiffEditorButtonsDom(diffMode, showWhitespace)
  if (searchVisible) {
    return getDiffEditorWithSearchDom(
      diffEditorLayoutClass,
      sashLayoutClass,
      leftDom,
      rightDom,
      buttonsDom,
      scrollBarDom,
      scrollBarActive,
      contentLeft,
      contentRight,
      searchQuery,
    )
  }
  return getDiffEditorWithoutSearchDom(diffEditorLayoutClass, sashLayoutClass, leftDom, rightDom, buttonsDom, scrollBarDom, scrollBarActive)
}
