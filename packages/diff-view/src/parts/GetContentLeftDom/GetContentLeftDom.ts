import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import type { VisibleLine } from '../VisibleLine/VisibleLine.ts'
import { defaultAllowedLinkSchemes } from '../AllowedLinkSchemes/AllowedLinkSchemes.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getContentDom } from '../GetContentDom/GetContentDom.ts'

interface GetContentLeftDomOptions {
  readonly allowedLinkSchemes?: readonly string[]
  readonly contentLeft: string
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

export const getContentLeftDom = ({
  allowedLinkSchemes = defaultAllowedLinkSchemes,
  contentLeft,
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
}: GetContentLeftDomOptions): readonly VirtualDomNode[] => {
  const resolvedTotalLineCount = totalLineCount ?? (contentLeft ? contentLeft.split('\n').length : 1)
  const resolvedMaxLineY = maxLineY ?? resolvedTotalLineCount

  return getContentDom(
    ClassNames.DiffEditorContentLeft,
    contentLeft,
    errorMessage,
    errorCodeFrame,
    errorStack,
    allowedLinkSchemes,
    lineNumbers,
    resolvedTotalLineCount,
    minLineY,
    resolvedMaxLineY,
    inlineChanges,
    'left',
    tokenizedLines,
    visibleLines,
    itemHeight,
  )
}
