import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { SyntaxToken } from '../SyntaxToken/SyntaxToken.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getRowDom } from '../GetRowDom/GetRowDom.ts'

export const getRowsDom = (
  lines: readonly string[],
  classNames: readonly string[] = [],
  rowParts: readonly (readonly SyntaxToken[])[] = [],
): readonly VirtualDomNode[] => {
  return lines.flatMap((line, index) => getRowDom(line, classNames[index] || ClassNames.EditorRow, rowParts[index] || []))
}
