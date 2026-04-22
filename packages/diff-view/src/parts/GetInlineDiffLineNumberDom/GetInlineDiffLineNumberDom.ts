import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffRow } from '../GetInlineDiffRows/GetInlineDiffRows.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getInlineDiffLineNumberText } from '../GetInlineDiffLineNumberText/GetInlineDiffLineNumberText.ts'

export const getInlineDiffLineNumberDom = (row: InlineDiffRow): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.DiffEditorLineNumber,
      type: VirtualDomElements.Div,
    },
    text(getInlineDiffLineNumberText(row)),
  ]
}
