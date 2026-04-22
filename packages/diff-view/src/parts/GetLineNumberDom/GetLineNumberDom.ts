import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

const parentNode = {
  childCount: 1,
  className: ClassNames.DiffEditorLineNumber,
  type: VirtualDomElements.Div,
}

export const getLineNumberDom = (lineNumber: number): readonly VirtualDomNode[] => {
  return [parentNode, text(String(lineNumber))]
}
