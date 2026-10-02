import * as ClassNames from '../ClassNames/ClassNames.ts'
import { InlineDiffRowType, type InlineDiffRow } from '../GetInlineDiffRows/GetInlineDiffRows.ts'
import { mergeClassNames } from '../MergeClassNames/MergeClassNames.ts'
import { VisibleLineType, type VisibleLine } from '../VisibleLine/VisibleLine.ts'

type LineNumberType = VisibleLine['type'] | InlineDiffRow['type']

const diffEditorLineNumberDeletionClassName = mergeClassNames(ClassNames.DiffEditorLineNumber, ClassNames.DiffEditorLineNumberDeletion)
const diffEditorLineNumberInsertionClassName = mergeClassNames(ClassNames.DiffEditorLineNumber, ClassNames.DiffEditorLineNumberInsertion)
const diffEditorLineNumberMetaClassName = mergeClassNames(ClassNames.DiffEditorLineNumber, ClassNames.DiffEditorLineNumberMeta)

export const getLineNumberClassName = (type: LineNumberType = VisibleLineType.Normal): string => {
  if (type === VisibleLineType.Removed || type === InlineDiffRowType.Deletion) {
    return diffEditorLineNumberDeletionClassName
  }
  if (type === VisibleLineType.Added || type === InlineDiffRowType.Insertion) {
    return diffEditorLineNumberInsertionClassName
  }
  if (type === InlineDiffRowType.GitButtons || type === InlineDiffRowType.IncomingChange) {
    return diffEditorLineNumberMetaClassName
  }
  return ClassNames.DiffEditorLineNumber
}
