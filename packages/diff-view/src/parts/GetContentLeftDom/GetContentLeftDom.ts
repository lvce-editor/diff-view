import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getRowsDom } from '../GetRowsDom/GetRowsDom.ts'

export const getContentLeftDom = (contentLeft: string): readonly VirtualDomNode[] => {
  const lines = contentLeft.split('\n')
  const rows = getRowsDom(lines)

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
