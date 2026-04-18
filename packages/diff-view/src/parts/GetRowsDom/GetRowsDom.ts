import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getRowDom } from '../GetRowDom/GetRowDom.ts'

export const getRowsDom = (lines: readonly string[], classNames: readonly string[] = []): readonly VirtualDomNode[] => {
  return lines.flatMap((line, index) => getRowDom(line, classNames[index] || ClassNames.EditorRow))
}
