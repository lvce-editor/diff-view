import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { InlineDiffRow } from '../../GetInlineDiffRows/GetInlineDiffRows.ts'
import * as ClassNames from '../../ClassNames/ClassNames.ts'
import { getInlineDiffLineNumberDom } from '../GetInlineDiffLineNumberDom/GetInlineDiffLineNumberDom.ts'

export const getInlineDiffLineNumbersDom = (visibleRows: readonly InlineDiffRow[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: visibleRows.length,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    ...visibleRows.flatMap(getInlineDiffLineNumberDom),
  ]
}
