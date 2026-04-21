import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getContentDom } from '../GetContentDom/GetContentDom.ts'
import { getImageLeftDom } from '../GetImageLeftDom/GetImageLeftDom.ts'

export const getContentLeftDom = (
  renderModeLeft: 'text' | 'image',
  contentLeft: string,
  errorMessage = '',
  errorStack = '',
  lineNumbers = true,
  totalLineCount = contentLeft ? contentLeft.split('\n').length : 1,
  minLineY = 0,
  maxLineY = totalLineCount,
  inlineChanges: readonly InlineDiffChange[] = [],
  tokenizedLines: readonly TokenizedLine[] = [],
  uriLeft = '',
  imageSrcLeft = '',
): readonly VirtualDomNode[] => {
  if (renderModeLeft === 'image') {
    return getImageLeftDom(uriLeft, imageSrcLeft)
  }
  return getContentDom(
    ClassNames.DiffEditorContentLeft,
    contentLeft,
    errorMessage,
    errorStack,
    lineNumbers,
    totalLineCount,
    minLineY,
    maxLineY,
    inlineChanges,
    'left',
    tokenizedLines,
  )
}
