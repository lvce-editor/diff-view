import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getEmptyLineNumberDom = (emptyLineCount: number, itemHeight: number): VirtualDomNode => {
  return {
    childCount: 0,
    className: ClassNames.DiffEditorLineNumberEmpty,
    style: `height: ${emptyLineCount * itemHeight}px;`,
    type: VirtualDomElements.Div,
  }
}
