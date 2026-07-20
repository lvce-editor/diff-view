import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { mergeClassNames } from '../MergeClassNames/MergeClassNames.ts'

const diffEditorSelectionsNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.DiffEditorSelections,
  type: VirtualDomElements.Div,
}

export const getCursorDom = (): readonly VirtualDomNode[] => {
  return [
    diffEditorSelectionsNode,
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.EditorCursor, ClassNames.EditorCursorRight),
      type: VirtualDomElements.Div,
    },
  ]
}
