import * as ClassNames from '../ClassNames/ClassNames.ts'
import { InlineDiffRowType, type InlineDiffRow } from '../GetInlineDiffRows/GetInlineDiffRows.ts'
import { VisibleLineType, type VisibleLine } from '../VisibleLine/VisibleLine.ts'

type LineNumberType = VisibleLine['type'] | InlineDiffRow['type']

export const getLineNumberClassName = (type: LineNumberType = VisibleLineType.Normal): string => {
  if (type === VisibleLineType.Removed || type === InlineDiffRowType.Deletion) {
    return `${ClassNames.DiffEditorLineNumber} ${ClassNames.DiffEditorLineNumberDeletion}`
  }
  if (type === VisibleLineType.Added || type === InlineDiffRowType.Insertion) {
    return `${ClassNames.DiffEditorLineNumber} ${ClassNames.DiffEditorLineNumberInsertion}`
  }
  if (type === InlineDiffRowType.GitButtons || type === InlineDiffRowType.IncomingChange) {
    return `${ClassNames.DiffEditorLineNumber} ${ClassNames.DiffEditorLineNumberMeta}`
  }
  return ClassNames.DiffEditorLineNumber
}
