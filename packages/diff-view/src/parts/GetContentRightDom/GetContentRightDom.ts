import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import type { VisibleLine } from '../VisibleLine/VisibleLine.ts'
import { defaultAllowedLinkSchemes } from '../AllowedLinkSchemes/AllowedLinkSchemes.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import type { DiffMode } from '../DiffViewState/DiffViewState.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getContentDom } from '../GetContentDom/GetContentDom.ts'
<<<<<<< Updated upstream
=======
import { getCursorDom } from '../GetCursorDom/GetCursorDom.ts'
import { getDiffEditorButtonsDom } from '../GetDiffEditorButtonsDom/GetDiffEditorButtonsDom.ts'
>>>>>>> Stashed changes
import * as InputName from '../InputName/InputName.ts'

interface GetContentRightDomOptions {
  readonly allowedLinkSchemes?: readonly string[]
  readonly contentRight: string
  readonly diffMode?: DiffMode
  readonly editable?: boolean
  readonly errorCodeFrame?: string
  readonly errorMessage?: string
  readonly errorStack?: string
  readonly inlineChanges?: readonly InlineDiffChange[]
  readonly inputValue?: string
  readonly itemHeight?: number
  readonly lineNumbers?: boolean
  readonly maxLineY?: number
  readonly minLineY?: number
  readonly showWhitespace?: boolean
  readonly tokenizedLines?: readonly TokenizedLine[]
  readonly totalLineCount?: number
  readonly visibleLines?: readonly VisibleLine[]
}

const getInputWrapperDom = (inputValue: string): readonly VirtualDomNode[] => [
  {
    childCount: 1,
    className: ClassNames.DiffEditorInputWrapper,
    type: VirtualDomElements.Div,
  },
  {
    childCount: 0,
    className: ClassNames.DiffEditorInput,
    name: InputName.DiffEditorInput,
    onInput: DomEventListenerFunctions.HandleInput,
    type: VirtualDomElements.TextArea,
    value: inputValue,
  },
]

export const getContentRightDom = ({
  allowedLinkSchemes = defaultAllowedLinkSchemes,
  contentRight,
  diffMode = 'sideBySide',
  editable = false,
  errorCodeFrame = '',
  errorMessage = '',
  errorStack = '',
  inlineChanges = [],
  inputValue = '',
  itemHeight = 20,
  lineNumbers = true,
  maxLineY,
  minLineY = 0,
  showWhitespace = false,
  tokenizedLines = [],
  totalLineCount,
  visibleLines = [],
}: GetContentRightDomOptions): readonly VirtualDomNode[] => {
  const resolvedTotalLineCount = totalLineCount ?? (contentRight ? contentRight.split('\n').length : 1)
  const resolvedMaxLineY = maxLineY ?? resolvedTotalLineCount

  const contentDom = getContentDom(
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
  const buttonsDom = getDiffEditorButtonsDom(diffMode, showWhitespace)
  if (!editable || errorMessage) {
    const [content, ...rest] = contentDom
    return [
      {
        ...content,
        childCount: content.childCount + 1,
        onClick: DomEventListenerFunctions.HandleClickRightSide,
      },
      ...rest,
      ...buttonsDom,
    ]
  }
  const [content, ...rest] = contentDom
  return [
    {
      ...content,
<<<<<<< Updated upstream
      childCount: content.childCount + 1,
=======
      childCount: content.childCount + 3,
>>>>>>> Stashed changes
      onClick: DomEventListenerFunctions.HandleClickRightSide,
    },
    ...rest,
    ...getInputWrapperDom(inputValue),
    ...buttonsDom,
  ]
}
