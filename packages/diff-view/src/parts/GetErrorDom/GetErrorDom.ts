import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { defaultAllowedLinkSchemes } from '../AllowedLinkSchemes/AllowedLinkSchemes.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getErrorStackDom } from '../GetErrorStackDom/GetErrorStackDom.ts'

export const getErrorDom = (
  contentClassName: string,
  errorMessage: string,
  errorStack: string,
  allowedLinkSchemes: readonly string[] = defaultAllowedLinkSchemes,
): readonly VirtualDomNode[] => {
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
    ...getErrorStackDom(errorStack, allowedLinkSchemes),
  ]
}
