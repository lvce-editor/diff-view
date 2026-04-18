import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getRowsDom } from '../GetRowsDom/GetRowsDom.ts'

const getLineNumberDom = (lineNumber: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text(String(lineNumber)),
  ]
}

const getLineNumbersDom = (lineCount: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: lineCount,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    ...Array.from({ length: lineCount }, (_, index) => getLineNumberDom(index + 1)).flat(),
  ]
}

const getErrorDom = (contentClassName: string, errorMessage: string, errorStack: string): readonly VirtualDomNode[] => {
  const childCount = errorStack ? 2 : 1
  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount,
      className: `${contentClassName} ${ClassNames.DiffEditorError}`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorMessage,
      type: VirtualDomElements.Div,
    },
    text(errorMessage),
    ...(errorStack
      ? ([
          {
            childCount: 1,
            className: ClassNames.DiffEditorErrorStack,
            type: VirtualDomElements.Div,
          },
          text(errorStack),
        ] as const)
      : []),
  ]
}

export const getContentDom = (
  contentClassName: string,
  content: string,
  errorMessage: string,
  errorStack: string,
  lineNumbers: boolean,
): readonly VirtualDomNode[] => {
  if (errorMessage) {
    return getErrorDom(contentClassName, errorMessage, errorStack)
  }
  const lines = content.split('\n')
  const rows = getRowsDom(lines)

  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: lineNumbers ? 2 : lines.length,
      className: contentClassName,
      type: VirtualDomElements.Div,
    },
    ...(lineNumbers ? getLineNumbersDom(lines.length) : []),
    ...(lineNumbers
      ? [
          {
            childCount: lines.length,
            className: ClassNames.DiffEditorRows,
            type: VirtualDomElements.Div,
          },
          ...rows,
        ]
      : rows),
  ]
}
