import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getErrorDom = (contentClassName: string, errorMessage: string, errorStack: string): readonly VirtualDomNode[] => {
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
