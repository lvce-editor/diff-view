import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import type { VisibleLine } from '../VisibleLine/VisibleLine.ts'
import { defaultAllowedLinkSchemes } from '../AllowedLinkSchemes/AllowedLinkSchemes.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getContentDom } from '../GetContentDom/GetContentDom.ts'

export const getContentLeftDom = (
  contentLeft: string,
  errorMessage = '',
  errorCodeFrame = '',
  errorStack = '',
  allowedLinkSchemes: readonly string[] = defaultAllowedLinkSchemes,
  lineNumbers = true,
  totalLineCount = contentLeft ? contentLeft.split('\n').length : 1,
  minLineY = 0,
  maxLineY = totalLineCount,
  inlineChanges: readonly InlineDiffChange[] = [],
  tokenizedLines: readonly TokenizedLine[] = [],
  visibleLines: readonly VisibleLine[] = [],
  itemHeight = 20,
): readonly VirtualDomNode[] => {
  return getContentDom(
    ClassNames.DiffEditorContentLeft,
    contentLeft,
    errorMessage,
    errorCodeFrame,
    errorStack,
    allowedLinkSchemes,
    lineNumbers,
    totalLineCount,
    minLineY,
    maxLineY,
    inlineChanges,
    'left',
    tokenizedLines,
    visibleLines,
    itemHeight,
  )
}
