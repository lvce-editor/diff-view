import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../../ClassNames/ClassNames.ts'

export const getRowsDom = (rowsChildCount: number, rows: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: rowsChildCount,
      className: ClassNames.DiffEditorRows,
      type: VirtualDomElements.Div,
    },
    ...rows,
  ]
}
