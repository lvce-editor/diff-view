import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { mergeClassNames } from '../MergeClassNames/MergeClassNames.ts'

export const getCursorDom = (): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorSelections,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.EditorCursor, ClassNames.EditorCursorRight),
      type: VirtualDomElements.Div,
    },
  ]
}
