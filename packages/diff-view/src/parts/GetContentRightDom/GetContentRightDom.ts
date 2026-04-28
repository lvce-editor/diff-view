import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import type { VisibleLine } from '../VisibleLine/VisibleLine.ts'
import { defaultAllowedLinkSchemes } from '../AllowedLinkSchemes/AllowedLinkSchemes.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getContentDom } from '../GetContentDom/GetContentDom.ts'

interface GetContentRightDomOptions {
  readonly allowedLinkSchemes?: readonly string[]
  readonly contentRight: string
  readonly errorCodeFrame?: string
  readonly errorMessage?: string
  readonly errorStack?: string
  readonly inlineChanges?: readonly InlineDiffChange[]
  readonly itemHeight?: number
  readonly lineNumbers?: boolean
  readonly maxLineY?: number
  readonly minLineY?: number
  readonly tokenizedLines?: readonly TokenizedLine[]
  readonly totalLineCount?: number
  readonly visibleLines?: readonly VisibleLine[]
}

export const getContentRightDom = ({
  allowedLinkSchemes = defaultAllowedLinkSchemes,
  contentRight,
  errorCodeFrame = '',
  errorMessage = '',
  errorStack = '',
  inlineChanges = [],
  itemHeight = 20,
  lineNumbers = true,
  maxLineY,
  minLineY = 0,
  tokenizedLines = [],
  totalLineCount,
  visibleLines = [],
}: GetContentRightDomOptions): readonly VirtualDomNode[] => {
  const resolvedTotalLineCount = totalLineCount ?? (contentRight ? contentRight.split('\n').length : 1)
  const resolvedMaxLineY = maxLineY ?? resolvedTotalLineCount

  return getContentDom(
    ClassNames.DiffEditorContentRight,
    contentRight,
    errorMessage,
    errorCodeFrame,
    errorStack,
    allowedLinkSchemes,
    lineNumbers,
    resolvedTotalLineCount,
    minLineY,
    resolvedMaxLineY,
    inlineChanges,
    'right',
    tokenizedLines,
    visibleLines,
    itemHeight,
  )
}
