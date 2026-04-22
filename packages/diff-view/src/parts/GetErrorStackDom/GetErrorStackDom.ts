import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { defaultAllowedLinkSchemes } from '../AllowedLinkSchemes/AllowedLinkSchemes.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getErrorStackLineDom } from './GetErrorStackLineDom/GetErrorStackLineDom.ts'

export const getErrorStackDom = (errorStack: string, allowedLinkSchemes: readonly string[] = defaultAllowedLinkSchemes): readonly VirtualDomNode[] => {
  if (!errorStack) {
    return []
  }
  const stackLines = errorStack.split('\n')
  return [
    {
      childCount: stackLines.length,
      className: ClassNames.DiffEditorErrorStack,
      type: VirtualDomElements.Div,
    },
    ...stackLines.flatMap((stackLine) => getErrorStackLineDom(stackLine, allowedLinkSchemes)),
  ]
}
