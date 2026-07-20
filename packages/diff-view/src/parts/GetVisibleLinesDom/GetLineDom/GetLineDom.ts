import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleLine } from '../../VisibleLine/VisibleLine.ts'
import * as ClassNames from '../../ClassNames/ClassNames.ts'
import { mergeClassNames } from '../../MergeClassNames/MergeClassNames.ts'
import { getRowClassName } from '../GetRowClassName/GetRowClassName.ts'
import { getTokenDom } from '../GetTokenDom/GetTokenDom.ts'

export const getLineDom = (line: VisibleLine): readonly VirtualDomNode[] => {
  const children = line.tokens.length === 0 ? [text('')] : line.tokens.flatMap(getTokenDom)
  const childCount = line.tokens.length === 0 ? 1 : line.tokens.length
  const className = line.lineNumber === -1 ? mergeClassNames(ClassNames.EditorRow, ClassNames.DiffEditorLineMissing) : getRowClassName(line.type)
  return [
    {
      childCount,
      className,
      type: VirtualDomElements.Div,
    },
    ...children,
  ]
}
