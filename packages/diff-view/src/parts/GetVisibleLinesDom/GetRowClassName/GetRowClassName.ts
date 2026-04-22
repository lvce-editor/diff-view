import type { VisibleLine } from '../../VisibleLine/VisibleLine.ts'
import * as ClassNames from '../../ClassNames/ClassNames.ts'
import { VisibleLineType } from '../../VisibleLine/VisibleLine.ts'

type DiffSide = 'left' | 'right'

export const getRowClassName = (type: VisibleLine['type'], side: DiffSide): string => {
  if (type === VisibleLineType.Removed) {
    return ClassNames.EditorRowDeletion
  }
  if (type === VisibleLineType.Added) {
    return ClassNames.EditorRowInsertion
  }
  return ClassNames.EditorRow
}
