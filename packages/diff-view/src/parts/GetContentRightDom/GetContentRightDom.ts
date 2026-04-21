import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getContentDom } from '../GetContentDom/GetContentDom.ts'
import { getImageRightDom } from '../GetImageRightDom/GetImageRightDom.ts'

export const getContentRightDom = (
  renderModeRight: 'text' | 'image',
  contentRight: string,
  errorMessage = '',
  errorStack = '',
  lineNumbers = true,
  totalLineCount = contentRight ? contentRight.split('\n').length : 1,
  minLineY = 0,
  maxLineY = totalLineCount,
  inlineChanges: readonly InlineDiffChange[] = [],
  tokenizedLines: readonly TokenizedLine[] = [],
  uriRight = '',
  imageSrcRight = '',
): readonly VirtualDomNode[] => {
  if (renderModeRight === 'image') {
    return getImageRightDom(uriRight, imageSrcRight)
  }
  return getContentDom(
    ClassNames.DiffEditorContentRight,
    contentRight,
    errorMessage,
    errorStack,
    lineNumbers,
    totalLineCount,
    minLineY,
    maxLineY,
    inlineChanges,
    'right',
    tokenizedLines,
  )
}
