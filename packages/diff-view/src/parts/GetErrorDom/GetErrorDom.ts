import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { defaultAllowedLinkSchemes } from '../AllowedLinkSchemes/AllowedLinkSchemes.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getErrorCodeFrameDom } from '../GetErrorCodeFrameDom/GetErrorCodeFrameDom.ts'
import { getErrorStackDom } from '../GetErrorStackDom/GetErrorStackDom.ts'
import { mergeClassNames } from '../MergeClassNames/MergeClassNames.ts'

const diffEditorErrorMessageNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.DiffEditorErrorMessage,
  type: VirtualDomElements.Div,
}

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
      childCount,
      className: mergeClassNames(ClassNames.DiffEditorContent, contentClassName, ClassNames.DiffEditorError),
      type: VirtualDomElements.Div,
    },
    diffEditorErrorMessageNode,
    text(errorMessage),
    ...getErrorCodeFrameDom(errorCodeFrame),
    ...getErrorStackDom(errorStack, allowedLinkSchemes),
  ]
}
