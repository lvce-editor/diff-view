import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleLine } from '../../VisibleLine/VisibleLine.ts'
import * as ClassNames from '../../ClassNames/ClassNames.ts'
import { getLineNumberDom } from '../../GetLineNumberDom/GetLineNumberDom.ts'

export const getGutterDom = (visibleLines: readonly VisibleLine[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: visibleLines.length,
      className: ClassNames.DiffEditorGutter,
      type: VirtualDomElements.Div,
    },
    ...visibleLines.flatMap((line) => getLineNumberDom(line.lineNumber)),
  ]
}
