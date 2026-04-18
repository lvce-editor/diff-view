import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getContentLeftDom = (contentLeft: string): readonly VirtualDomNode[] => {
  const lines = contentLeft.split('\n')
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
      className: ClassNames.DiffEditorContentLeft,
      type: VirtualDomElements.Div,
    },
    ...rows,
  ]
}
