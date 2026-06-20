import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getContentDomWithoutLineNumbers = (contentClassName: string, rowsChildCount: number, rows: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: rowsChildCount,
      className: `${ClassNames.DiffEditorContent} ${contentClassName}`,
      type: VirtualDomElements.Div,
    },
    ...rows,
  ]
}
