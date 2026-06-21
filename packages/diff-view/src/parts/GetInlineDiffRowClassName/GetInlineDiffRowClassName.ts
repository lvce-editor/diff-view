import * as ClassNames from '../ClassNames/ClassNames.ts'
import { InlineDiffRowType, type InlineDiffRow } from '../GetInlineDiffRows/GetInlineDiffRows.ts'

export const getInlineDiffRowClassName = (row: InlineDiffRow): string => {
  switch (row.type) {
    case InlineDiffRowType.Deletion:
      return ClassNames.EditorRowDeletion
    case InlineDiffRowType.GitButtons:
      return ClassNames.EditorRowGitButtons
    case InlineDiffRowType.IncomingChange:
      return ClassNames.EditorRowIncomingChange
    case InlineDiffRowType.Insertion:
      return ClassNames.EditorRowInsertion
    default:
      return ClassNames.EditorRow
  }
}
