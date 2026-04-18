import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getRowsDom } from '../GetRowsDom/GetRowsDom.ts'

export const getContentRightDom = (contentRight: string): readonly VirtualDomNode[] => {
  const lines = contentRight.split('\n')
  const rows = getRowsDom(lines)

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
