import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getCursorDom = (): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorSelections,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: `${ClassNames.EditorCursor} ${ClassNames.EditorCursorRight}`,
      type: VirtualDomElements.Div,
    },
  ]
}
