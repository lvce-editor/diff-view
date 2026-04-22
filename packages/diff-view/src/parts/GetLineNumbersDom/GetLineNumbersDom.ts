import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getLineNumberDom } from '../GetLineNumberDom/GetLineNumberDom.ts'

export const getLineNumbersDom = (startLineNumber: number, lineCount: number): readonly VirtualDomNode[] => {
  const lineNumbers = Array.from({ length: lineCount }, (_, index) => startLineNumber + index)

  return [
    {
      childCount: lineCount,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    ...lineNumbers.flatMap((lineNumber) => getLineNumberDom(lineNumber)),
  ]
}
