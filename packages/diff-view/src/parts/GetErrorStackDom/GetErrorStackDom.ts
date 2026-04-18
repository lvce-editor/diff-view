import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getErrorStackDom = (errorStack: string): readonly VirtualDomNode[] => {
  if (!errorStack) {
    return []
  }
  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorErrorStack,
      type: VirtualDomElements.Div,
    },
    text(errorStack),
  ]
}
