import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { defaultAllowedLinkSchemes } from '../AllowedLinkSchemes/AllowedLinkSchemes.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getErrorCodeFrameDom } from '../GetErrorCodeFrameDom/GetErrorCodeFrameDom.ts'
import { getErrorStackDom } from '../GetErrorStackDom/GetErrorStackDom.ts'

export const getErrorDom = (
  contentClassName: string,
  errorMessage: string,
  errorCodeFrame: string,
  errorStack: string,
  allowedLinkSchemes: readonly string[] = defaultAllowedLinkSchemes,
): readonly VirtualDomNode[] => {
  const childCount = 1 + Number(Boolean(errorCodeFrame)) + Number(Boolean(errorStack))
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
    ...getErrorCodeFrameDom(errorCodeFrame),
    ...getErrorStackDom(errorStack, allowedLinkSchemes),
  ]
}
