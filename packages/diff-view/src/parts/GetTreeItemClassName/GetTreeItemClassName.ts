import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getTreeItemClassName = (indent: number): string => {
  let className = ClassNames.TreeItem
  className = MergeClassNames.mergeClassNames(className, `Indent-${indent}`)
  return className
}
