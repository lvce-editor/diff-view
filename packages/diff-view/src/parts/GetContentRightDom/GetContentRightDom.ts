import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffChange } from '../InlineDiffChange/InlineDiffChange.ts'
import type { TokenizedLine } from '../TokenizedLine/TokenizedLine.ts'
import type { VisibleLine } from '../VisibleLine/VisibleLine.ts'
import { defaultAllowedLinkSchemes } from '../AllowedLinkSchemes/AllowedLinkSchemes.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getContentDom } from '../GetContentDom/GetContentDom.ts'
import { getCursorDom } from '../GetCursorDom/GetCursorDom.ts'
import * as InputName from '../InputName/InputName.ts'

interface GetContentRightDomOptions {
  readonly allowedLinkSchemes?: readonly string[]
  readonly contentRight: string
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
  readonly tokenizedLines?: readonly TokenizedLine[]
  readonly totalLineCount?: number
  readonly visibleLines?: readonly VisibleLine[]
}

const getInputWrapperDom = (inputValue: string, caretPosition = inputValue.length): readonly VirtualDomNode[] => [
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
    selectionEnd: caretPosition,
    selectionStart: caretPosition,
    type: VirtualDomElements.TextArea,
    value: inputValue,
  },
]

export const getContentRightDom = ({
  allowedLinkSchemes = defaultAllowedLinkSchemes,
  contentRight,
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
  if (!editable || errorMessage) {
    const [content, ...rest] = contentDom
    return [
      {
        ...content,
      onPointerDown: DomEventListenerFunctions.HandleClickRightSide,
      }
      ...rest,
    ]
  }
  const [content, ...rest] = contentDom
  const cursorDom = getCursorDom()
  return [
    {
      ...content,
      childCount: content.childCount + 2,
      onPointerDown: DomEventListenerFunctions.HandleClickRightSide,
    }
    ...rest,
    ...cursorDom,
    ...getInputWrapperDom(inputValue),
  ]
}
