import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getContentRightDom = (contentRight: string): readonly VirtualDomNode[] => {
  const lines = contentRight.split('\n')
  const rows = lines.flatMap((line) => {
    return [
      {
        childCount: 1,
        className: ClassNames.EditorRow,
        type: VirtualDomElements.Div,
      },
      text(line),
    ]
  })

  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: lines.length,
      className: ClassNames.DiffEditorContentRight,
      type: VirtualDomElements.Div,
    },
    ...rows,
  ]
}
