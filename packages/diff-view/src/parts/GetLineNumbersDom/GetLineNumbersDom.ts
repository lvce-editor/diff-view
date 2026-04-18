import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getLineNumberDom } from '../GetLineNumberDom/GetLineNumberDom.ts'

export const getLineNumbersDom = (startLineNumber: number, lineCount: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: lineCount,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    ...Array.from({ length: lineCount }, (_, index) => getLineNumberDom(startLineNumber + index)).flat(),
  ]
}
