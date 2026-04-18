import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

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

export const getLineNumbersDom = (lineCount: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: lineCount,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    ...Array.from({ length: lineCount }, (_, index) => getLineNumberDom(index + 1)).flat(),
  ]
}
